import Hyperbee, { Options } from 'hyperbee';
import Autobase from 'autobase';
import b4a from 'b4a';

export default class Autobee<K, V> {
  autobase: Autobase;
  bee: Hyperbee<K, V>;
  opts;

  constructor(autobase: Autobase, opts: Options = {}, sub?: Hyperbee<K, V>) {
    this.autobase = autobase;
    this.opts = opts;

    if (!sub) {
      this.autobase.start({
        unwrap: true,
        apply: this._apply,
        view: (core) => {
          return new Hyperbee<K, V>(core.unwrap(), {
            ...opts,
            extension: false
          });
        }
      });

      this.bee = this.autobase.view;
    } else {
      this.bee = sub;
    }
  }

  ready() {
    return this.autobase.ready();
  }

  feed() {
    return this.bee.feed;
  }

  close() {
    return this.bee.close();
  }

  async put(key: K, value: V) {
    const op = encode({ type: 'put', key, value, prefix: this.bee.prefix });
    return await this.autobase.append(op);
  }

  async del(key: K) {
    const op = encode({ type: 'del', key, prefix: this.bee.prefix });
    return await this.autobase.append(op);
  }

  async get(key: K) {
    const node = await this.bee.get(key);

    if (!node) return null;

    return node;
  }

  sub<K, V>(name: string) {
    const sub = this.bee.sub<K, V>(name);

    return new Autobee(this.autobase, this.opts || {}, sub);
  }

  createReadStream(opts = {}) {
    return this.bee.createReadStream(opts);
  }

  async _apply(bee: Hyperbee<Buffer, Buffer>, batch: any[]) {
    let b = bee.batch({ update: false });

    for (const node of batch) {
      const op = decode(node.value);
      const key = getPrefixedKey(op.key, op.prefix);

      if (op.type === 'put') {
        let exist = await b.get(key, { update: false });

        if (!exist) {
          await b.put(key, op.value);
        } else {
          // TODO: something other than last write win
          await b.put(key, op.value);
        }
      } else if (op.type === 'del') {
        await b.del(key);
      }
    }

    return await b.flush();
  }
}

function encode(op: object) {
  return b4a.from(JSON.stringify(op));
}

function decode(op: Buffer) {
  return JSON.parse(b4a.toString(op));
}

function getPrefixedKey(key: Buffer, prefix: Buffer) {
  return prefix ? b4a.concat([b4a.from(prefix), b4a.from(key)]) : b4a.from(key);
}
