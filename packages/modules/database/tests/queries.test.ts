import assert from 'node:assert';
import test from 'node:test';
import Database from '../src/index';

import { users, posts } from './misc/data';

type Result = Array<{
  [index: string]: any;
}>;

test('Skip & limit', async () => {
  const db = new Database();

  await db.ready();

  await db.initializeIndex('reactions');

  let inserted: Result = [];

  for (const i in posts) {
    let id = await db.create(posts[i]);

    inserted.push({ id, ...posts[i] });
  }

  let found: Result = [];

  // Query
  let query = db.find({
    selector: [
      {
        field: 'reactions',
        operation: '$gt',
        value: 0
      }
    ],
    limit: 10,
    skip: 5
  });

  for await (const item of query) {
    found.push(item);
  }

  // What should we get?
  let expected: Result = inserted
    //@ts-ignore our mock data doesn't have types
    .sort((a, b) => a.reactions - b.reactions)
    .slice(5, 15);

  // Finish
  assert.deepEqual(expected, found);
});

test('$eq, $gt, $lt, $lte, $gte', async () => {
  const db = new Database();

  await db.ready();

  await db.initializeIndex('age');

  let inserted: Result = [];
  let values = [-100, -31.00245062, -1, 0, 1, 28, 28.0014, 45, 50, 50.140404, 5000];

  let ops = {
    $eq: (a: number, b: number) => a === b,
    $gt: (a: number, b: number) => a > b,
    $lt: (a: number, b: number) => a < b,
    $gte: (a: number, b: number) => a >= b,
    $lte: (a: number, b: number) => a <= b
  };

  // Insert users
  for (const i in users) {
    let id = await db.create(users[i]);

    inserted.push({ id, ...users[i] });
  }

  // Test all operations
  for (const op in ops) {
    for (const value of values) {
      let found: Result = [];

      // Query
      let query = db.find({
        selector: [
          {
            field: 'age',
            //@ts-ignore
            operation: op,
            value
          }
        ]
      });

      for await (const item of query) {
        found.push(item);
      }

      // What should we get?
      let expected: Result = inserted
        //@ts-ignore our mock data doesn't have types
        .filter((a) => ops[op](a.age, value))
        .sort((a, b) => a.age - b.age);

      // Finish
      assert.deepEqual(expected, found);
    }
  }
});

test('$between, $betweenInclusive', async () => {
  const db = new Database();

  await db.ready();

  await db.initializeIndex('age');

  let inserted: Result = [];
  let values = [
    [0, 0],
    [-10, 99],
    [50, 0],
    [49, 49.00000495049913],
    [-8.42352345, 10000]
  ];

  let ops = {
    $between: (a: number, range: number[]) => a > range[0] && a < range[1],
    $betweenInclusive: (a: number, range: number[]) => a >= range[0] && a <= range[1]
  };

  // Insert users
  for (const i in users) {
    let id = await db.create(users[i]);

    inserted.push({ id, ...users[i] });
  }

  // Test all operations
  for (const op in ops) {
    for (const value of values) {
      let found: Result = [];

      // Query
      let query = db.find({
        selector: [
          {
            field: 'age',
            //@ts-ignore
            operation: op,
            value
          }
        ]
      });

      for await (const item of query) {
        found.push(item);
      }

      // What should we get?
      let expected: Result = inserted
        //@ts-ignore our mock data doesn't have types
        .filter((a) => ops[op](a.age, value))
        .sort((a, b) => a.age - b.age);

      // Finish
      assert.deepEqual(expected, found);
    }
  }
});

test('$containAny', async () => {
  const db = new Database();

  await db.ready();

  await db.initializeIndex('tags');

  let inserted: Result = [];
  let target = ['english'];

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
        operation: '$containAny',
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
    .filter((a) => a.tags.includes(target[0]));

  // Finish
  assert.deepEqual(expected, found);
});

test('$containAll', async () => {
  const db = new Database();

  await db.ready();

  await db.initializeIndex('tags');

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
