import assert from 'node:assert';
import test from 'node:test';

import { createDB, createCore } from './misc/helpers';

test('Load an index', async (t) => {
  const db = createDB();

  await db.ready();

  await db.initializeIndex('age');

  assert.ok('age' in db.indexes);

  assert.ok('ready' in db.indexes?.age);
});

test('Indexing and de-indexing documents', async (t) => {
  const db = createDB();

  await db.ready();

  // initialize indexes
  await db.initializeIndex('tags', createCore());
  await db.initializeIndex('nested.age', createCore());

  // get index state
  const indexState = async (): Promise<{ age: number; tags: number }> => {
    let ageIndex: { [key: string]: string } = {};
    let tagsIndex: { [key: string]: string } = {};

    // age index
    for await (const item of db.indexes['nested.age'].createReadStream()) {
      ageIndex[item.key] = item.value;
    }

    // tags index
    for await (const item of db.indexes['tags'].createReadStream()) {
      tagsIndex[item.key] = item.value;
    }

    let lth = (obj: object): number => Object.keys(obj).length;

    return { age: lth(ageIndex), tags: lth(tagsIndex) };
  };

  // CREATING DOCUMENTS
  let firstUser = await db.create({
    name: 'carl',
    tags: ['one', 'two', 'three'],
    nested: {
      age: 21
    }
  });

  let secondUser = await db.create({
    name: 'carl',
    tags: ['four', 'five'],
    nested: {
      age: 19
    }
  });

  let state = await indexState();

  assert.equal(state?.age, 2);
  assert.equal(state?.tags, 7);

  // UPDATING DOCUMENTS
  await db.update(secondUser, (doc) => {
    doc.tags = ['four'];
    doc.nested.age = 20;

    return doc;
  });

  state = await indexState();

  assert.equal(state?.age, 2);
  assert.equal(state?.tags, 6);

  // DELETING DOCUMENTS
  await db.delete(secondUser);

  state = await indexState();

  assert.equal(state?.age, 1);
  assert.equal(state?.tags, 4);
});
