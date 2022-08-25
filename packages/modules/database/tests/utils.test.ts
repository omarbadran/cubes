import assert from 'node:assert';
import test from 'node:test';

import { flatten, getFields } from '../src/utils';

test('Get document fields', async () => {
  let document = {
    a: 'string',
    b: {
      c: 'string',
      d: {
        e: ['string', 1],
        f: {
          g: true
        }
      }
    }
  };

  let expected = ['a', 'b', 'b.c', 'b.d', 'b.d.e', 'b.d.f', 'b.d.f.g'];

  let fields = getFields(document);

  assert.deepEqual(fields, expected);
});

test('Flatten a document', async () => {
  let document = {
    a: 'string',
    b: {
      c: 'string',
      d: {
        e: ['string']
      }
    }
  };

  let flattened = flatten(document);

  let expected = {
    a: 'string',
    'b.c': 'string',
    'b.d.e': ['string']
  };

  assert.deepEqual(flattened, expected);
});
