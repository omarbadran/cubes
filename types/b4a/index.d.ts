declare module 'b4a' {
  function toString(
    buf: Buffer,
    encoding?: 'hex' | 'base64' | 'utf8' | 'utf16le' | 'ascii'
  ): string;
  function isBuffer(value: any): boolean;
  function alloc(n: number): Buffer;
  function allocUnsafe(n: number): Buffer;
  function from(
    input: string | Buffer | number[],
    encoding?: 'hex' | 'base64' | 'utf8' | 'utf16le' | 'ascii'
  ): Buffer;
  function byteLength(
    input: string | Buffer,
    encoding?: 'hex' | 'base64' | 'utf8' | 'utf16le' | 'ascii'
  ): number;
  function concat(args: Array<Buffer>): Buffer;
  function equals(buf: Buffer, buf2: Buffer): boolean;
}
