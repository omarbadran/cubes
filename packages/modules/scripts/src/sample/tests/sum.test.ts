import assert from 'node:assert';
import test from 'node:test';

import { sum } from '../src';

test('sum', (t) => {
  assert.strictEqual(2, sum(1, 1));
});
