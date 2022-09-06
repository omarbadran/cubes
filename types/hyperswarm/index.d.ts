declare module 'hyperswarm' {
  import type { Duplex } from 'stream';

  type KeyPair = { publicKey: Buffer; secretKey: Buffer };

  type Options = {
    keyPair?: KeyPair;
    seed?: Buffer;
    maxPeers?: number;
    firewall?: (remotePublicKey: Buffer) => boolean;
    dht?: any; //To-do
  };

  class PeerDiscovery {
    flushed(): Promise<void>;
    refresh(opts: { client: boolean; server: boolean }): Promise<void>;
    destroy(): Promise<void>;
  }

  class PeerInfo {
    publicKey: Buffer;
    topics: Buffer[];
    prioritized: boolean;
    client: boolean;
    ban(): void;
  }

  class Hyperswarm {
    constructor(opts?: Options);

    keyPair: KeyPair;
    connections: Set<any>; //To-do Double check type
    peers: Map<string, PeerInfo>;
    dht: any; //To-do

    maxPeers: number;

    join(topic: Buffer, opts: { client: boolean; server: boolean }): PeerDiscovery;
    leave(topic: Buffer): Promise<void>;
    joinPeer(noisePublicKey: Buffer): void; //To-do Double check return type
    leavePeer(noisePublicKey: Buffer): void;
    status(topic: Buffer): PeerDiscovery;
    listen(): Promise<void>;
    flush(): Promise<void>;
    destroy(): Promise<void>;

    on(event: 'connection', cb: (socket: Duplex, info: PeerInfo) => void): void;
  }

  export default Hyperswarm;
  export type { Options, PeerInfo, PeerDiscovery };
}
