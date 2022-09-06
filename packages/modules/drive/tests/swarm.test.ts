import assert from 'node:assert';
import { test, describe } from 'node:test';

import Swarm from '../src/swarm';

test('Swarm', async (t) => {
  const swarmA = new Swarm();
  const swarmB = new Swarm();

  swarmB.respond('echo', (req, peer) => {
    return req;
  });

  await swarmB.listen();

  await t.test('RPC', async (t) => {
    let peer = swarmB.swarm.keyPair.publicKey;

    await swarmA.joinPeer(peer);

    const received = await swarmA.send('echo', { a: 'b' }, peer);

    await swarmA.destroy();
    await swarmB.destroy();

    assert.equal(received.a, 'b');
  });
});
