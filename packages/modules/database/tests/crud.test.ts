import assert from 'node:assert';
import test from 'node:test';
import Database from '../src/index';

test('Create, read, update & delete a document', async (t) => {
  const db = new Database();

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
