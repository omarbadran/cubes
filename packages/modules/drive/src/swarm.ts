import { EventEmitter } from 'node:events';
import Hyperswarm from 'hyperswarm';
import Hypercore from 'hypercore';
import RPC from 'protomux-rpc';
import { json } from 'compact-encoding';

import type { Duplex } from 'stream';
import type { Options, PeerDiscovery } from 'hyperswarm';

type RPCMethod = (req: object, from: Buffer) => object;

export default class Swarm extends EventEmitter {
  public swarm: Hyperswarm;

  private streams = new Map();
  private discoveries = new Set();
  private sessions = new Set();
  private rpcs = new Map<Buffer, typeof RPC>();
  private rpcMethods = new Map<string, RPCMethod>();

  /**
   * Create a swarm interface.
   *
   * @param opts - options to be passed to hyperswarm
   */
  constructor(opts?: Options) {
    super();

    this.swarm = new Hyperswarm(opts);

    this.swarm.on('connection', async (socket, peer) => {
      this.emit('connection', peer.publicKey);
      return this.createProtocolStream(socket, peer.publicKey);
    });
  }

  /**
   * Join a topic in the DHT.
   *
   * @param topic - the dht topic to join.
   * @param server - join as a server.
   * @param client join as a client.
   * @returns PeerDiscovery
   * @public
   */
  joinTopic(
    topic: Buffer,
    server: boolean = true,
    client: boolean = true
  ): PeerDiscovery {
    const discovery = this.swarm.join(topic, { server, client });

    this.discoveries.add(discovery);

    if (server) {
      discovery.flushed().then(() => {
        this.emit('announced');
      });
    }

    this.swarm.flush().then(() => {
      this.emit('connected');
    });

    return discovery;
  }

  /**
   * Start listening for incoming connections.
   *
   * @returns void
   * @public
   */
  listen() {
    return this.swarm.listen();
  }

  destroy() {
    return this.swarm.destroy();
  }

  flush() {
    return this.swarm.flush();
  }

  /**
   * Establish a direct connection to a known peer.
   *
   * @param noisePublicKey - 32-byte buffer key.
   * @returns void
   * @public
   */
  joinPeer(noisePublicKey: Buffer) {
    this.swarm.joinPeer(noisePublicKey);
    return this.flush();
  }

  /**
   * Stop attempting direct connections to a known peer.
   *
   * @param noisePublicKey - 32-byte buffer key.
   * @returns void
   * @public
   */
  leavePeer(noisePublicKey: Buffer) {
    return this.swarm.leavePeer(noisePublicKey);
  }

  /**
   * Create a protocol stream with rpc and hypercore replication capabilities.
   *
   * @param socket - a duplex stream to be wrapped with the protocol.
   * @param peer - a public key to identify the connection.
   * @returns duplex stream.
   * @public
   */
  createProtocolStream(socket: Duplex | boolean, peer: Buffer) {
    let stream = Hypercore.createProtocolStream(socket, {
      ondiscoverykey: (discoveryKey: Buffer) => {
        this.emit('core-added', discoveryKey);
      }
    });

    this.streams.set(peer, stream);

    const rpc = new RPC(stream, {
      valueEncoding: json
    });

    this.rpcs.set(peer, rpc);

    for (const [method, handle] of this.rpcMethods) {
      rpc.respond(method, (req: object) => {
        return handle(req, peer);
      });
    }

    stream.once('close', () => {
      this.emit('stream-closed', peer);
    });

    this.emit('stream-created', peer);

    return stream;
  }

  /**
   * Add a hypercore session to a replication stream.
   *
   * @param session - a hypercore session.
   * @param peer - a public key to identify the connection.
   * @returns duplex stream.
   * @public
   */
  addCore(peer: Buffer, session: Hypercore) {
    let stream = this.streams.get(peer);

    if (stream) {
      this.sessions.add({ strem: peer, core: session.key, session });

      session.replicate(stream);

      return true;
    }

    return 'stream_not_found';
  }

  /**
   * Add an RPC method.
   *
   * @param name - the method name
   * @param handle - a function to handle the request.
   * @returns response req.
   * @public
   */
  respond(name: string, handle: RPCMethod) {
    this.rpcMethods.set(name, handle);

    for (const [from, rpc] of this.rpcs) {
      rpc.respond(name, (req: object) => {
        return handle(req, from);
      });
    }
  }

  /**
   * Send a RPC request.
   *
   * @param method - the name of the method to send
   * @param req - json object to be sent
   * @param to - key of the reciveing peer.
   * @returns response from other side.
   * @public
   */
  async send(method: string, req: object, to: Buffer) {
    let rpc = this.rpcs.get(to);

    return rpc.request(method, req);
  }
}
