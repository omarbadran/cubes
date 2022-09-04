import assert from 'node:assert';
import { test } from 'node:test';
import Database from '../src/index';
import { posts } from './misc/data';

import Hypercore from 'hypercore';
import Autobase from 'autobase';
import ram from 'random-access-memory';
import Autobee from '../src/autobee';

const AutobeeFactory = (opts) => {
  const writerA = new Hypercore(ram);
  const writerB = new Hypercore(ram);

  const outputA = new Hypercore(ram);

  const A = new Autobase({
    inputs: [writerA, writerB],
    localInput: writerA,
    localOutput: outputA
  });

  return new Autobee(A, opts);
};

type Result = Array<{
  [index: string]: any;
}>;

test('Autobase: Create, read, update & delete a document', async (t) => {
  const db = new Database(AutobeeFactory);

  await db.ready();

  // Create
  let id = await db.create({
    name: 'omar'
  });

  // Read
  let document = await db.one(id);

  assert.equal(document?.name, 'omar');

  // Update
  await db.update(id, (doc) => {
    doc.name = 'carl';

    return doc;
  });

  let updated = await db.one(id);

  assert.equal(updated?.name, 'carl');

  // Delete
  await db.delete(id);

  let isDeleted = await db.one(id);

  assert.equal(isDeleted, null);
});

test('Autobase: $containAll', async () => {
  const db = new Database(AutobeeFactory);

  await db.ready();

  await db.initializeIndex('tags', AutobeeFactory);

  let inserted: Result = [];
  let target = ['magical', 'crime'];

  // Insert posts
  for (const i in posts) {
    let id = await db.create(posts[i]);

    inserted.push({ id, ...posts[i] });
  }

  let found: Result = [];

  // Query
  let query = db.find({
    selector: [
      {
        field: 'tags',
        operation: '$containAll',
        value: target
      }
    ]
  });

  for await (const item of query) {
    found.push(item);
  }

  // What should we get?
  let expected: Result = inserted
    //@ts-ignore our mock data doesn't have types
    .filter((a) => target.every((b) => a.tags.includes(b)));

  // Finish
  assert.deepEqual(expected, found);
});
