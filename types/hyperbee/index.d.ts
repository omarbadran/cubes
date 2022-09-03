declare module 'hyperbee' {
  import { Readable } from 'stream';
  import Hypercore from 'hypercore';
  import { LinearizedView } from 'autobase';

  type Feed = Hypercore | LinearizedView;

  type IterableOptions = {
    gt?: string | Buffer;
    gte?: string | Buffer;
    lt?: string | Buffer;
    lte?: string | Buffer;
    reverse?: boolean;
    limit?: number;
  };

  type HistoryOptions = {
    live?: boolean;
    reverse?: boolean;
    gte?: number;
    gt?: number;
    lte?: number;
    lt?: number;
    limit?: number;
  };

  type keyEncoding = 'binary' | 'ascii' | 'utf8' | Encoding;
  type valueEncoding = 'binary' | 'ascii' | 'utf8' | 'json' | Encoding;

  type Options = {
    keyEncoding?: keyEncoding;
    valueEncoding?: valueEncoding;
    extension?: boolean;
    [index: string]: any;
  };

  type Encoding = {
    encode(value: any): Buffer;
    decode(buffer: Buffer): any;
  };

  class Batch<K, V> {
    put(key: K, value?: V): Promise<void>;
    get(key: K): Promise<{
      seq: number;
      key: K;
      value: V;
    }>;
    del(key: K): Promise<void>;
    flush(): Promise<void>;
    destroy(): void;
  }

  class HyperBee<K, V> {
    constructor(feed: Feed, options?: Options);

    version: number;
    feed: Feed;
    prefix: any;

    put(key: K, value?: V): Promise<void>;
    get(
      key: K,
      opts?: { update: boolean }
    ): Promise<{
      seq: number;
      key: K;
      value: V;
    }>;
    del(key: K): Promise<void>;
    batch(opts?: { update: boolean }): Batch<K, V>;
    createReadStream(options?: IterableOptions): Readable;
    peek(options?: IterableOptions): Promise<{
      seq: number;
      key: K;
      value: V;
    }>;
    createHistoryStream(options?: HistoryOptions): Readable;
    createDiffStream(otherVersion: HyperBee, options?: any): Readable;
    checkout(version: number): HyperBee;
    snapshot(): HyperBee;
    sub<K, V>(
      prefix: K,
      opts?: {
        sep?: K;
        keyEncoding?: keyEncoding;
        valueEncoding?: valueEncoding;
      }
    ): HyperBee<K, V>;
    close(): Promise<void>;
    ready(): Promise<void>;
  }

  export default HyperBee;
  export type { Options, IterableOptions, HistoryOptions, Encoding };
}
