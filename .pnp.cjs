#!/usr/bin/env node
/* eslint-disable */

try {
  Object.freeze({}).detectStrictMode = true;
} catch (error) {
  throw new Error(`The whole PnP file got strict-mode-ified, which is known to break (Emscripten libraries aren't strict mode). This usually happens when the file goes through Babel.`);
}

function $$SETUP_STATE(hydrateRuntimeState, basePath) {
  var path = require('path');
  var dataLocation = path.resolve(__dirname, ".pnp.data.json");
  return hydrateRuntimeState(require(dataLocation), {basePath: basePath || path.dirname(dataLocation)});
  }

const fs = require('fs');
const path = require('path');
const require$$0 = require('module');
const StringDecoder = require('string_decoder');
const url = require('url');
const os = require('os');
const nodeUtils = require('util');
const stream = require('stream');
const zlib = require('zlib');
const events = require('events');

const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
const path__default = /*#__PURE__*/_interopDefaultLegacy(path);
const require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
const StringDecoder__default = /*#__PURE__*/_interopDefaultLegacy(StringDecoder);
const nodeUtils__namespace = /*#__PURE__*/_interopNamespace(nodeUtils);
const zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

const S_IFMT = 61440;
const S_IFDIR = 16384;
const S_IFREG = 32768;
const S_IFLNK = 40960;
const SAFE_TIME = 456789e3;

const DEFAULT_MODE = S_IFREG | 420;
class StatEntry {
  constructor() {
    this.uid = 0;
    this.gid = 0;
    this.size = 0;
    this.blksize = 0;
    this.atimeMs = 0;
    this.mtimeMs = 0;
    this.ctimeMs = 0;
    this.birthtimeMs = 0;
    this.atime = new Date(0);
    this.mtime = new Date(0);
    this.ctime = new Date(0);
    this.birthtime = new Date(0);
    this.dev = 0;
    this.ino = 0;
    this.mode = DEFAULT_MODE;
    this.nlink = 1;
    this.rdev = 0;
    this.blocks = 1;
  }
  isBlockDevice() {
    return false;
  }
  isCharacterDevice() {
    return false;
  }
  isDirectory() {
    return (this.mode & S_IFMT) === S_IFDIR;
  }
  isFIFO() {
    return false;
  }
  isFile() {
    return (this.mode & S_IFMT) === S_IFREG;
  }
  isSocket() {
    return false;
  }
  isSymbolicLink() {
    return (this.mode & S_IFMT) === S_IFLNK;
  }
}
class BigIntStatsEntry {
  constructor() {
    this.uid = BigInt(0);
    this.gid = BigInt(0);
    this.size = BigInt(0);
    this.blksize = BigInt(0);
    this.atimeMs = BigInt(0);
    this.mtimeMs = BigInt(0);
    this.ctimeMs = BigInt(0);
    this.birthtimeMs = BigInt(0);
    this.atimeNs = BigInt(0);
    this.mtimeNs = BigInt(0);
    this.ctimeNs = BigInt(0);
    this.birthtimeNs = BigInt(0);
    this.atime = new Date(0);
    this.mtime = new Date(0);
    this.ctime = new Date(0);
    this.birthtime = new Date(0);
    this.dev = BigInt(0);
    this.ino = BigInt(0);
    this.mode = BigInt(DEFAULT_MODE);
    this.nlink = BigInt(1);
    this.rdev = BigInt(0);
    this.blocks = BigInt(1);
  }
  isBlockDevice() {
    return false;
  }
  isCharacterDevice() {
    return false;
  }
  isDirectory() {
    return (this.mode & BigInt(S_IFMT)) === BigInt(S_IFDIR);
  }
  isFIFO() {
    return false;
  }
  isFile() {
    return (this.mode & BigInt(S_IFMT)) === BigInt(S_IFREG);
  }
  isSocket() {
    return false;
  }
  isSymbolicLink() {
    return (this.mode & BigInt(S_IFMT)) === BigInt(S_IFLNK);
  }
}
function makeDefaultStats() {
  return new StatEntry();
}
function clearStats(stats) {
  for (const key in stats) {
    if (Object.prototype.hasOwnProperty.call(stats, key)) {
      const element = stats[key];
      if (typeof element === `number`) {
        stats[key] = 0;
      } else if (typeof element === `bigint`) {
        stats[key] = BigInt(0);
      } else if (nodeUtils__namespace.types.isDate(element)) {
        stats[key] = new Date(0);
      }
    }
  }
  return stats;
}
function convertToBigIntStats(stats) {
  const bigintStats = new BigIntStatsEntry();
  for (const key in stats) {
    if (Object.prototype.hasOwnProperty.call(stats, key)) {
      const element = stats[key];
      if (typeof element === `number`) {
        bigintStats[key] = BigInt(element);
      } else if (nodeUtils__namespace.types.isDate(element)) {
        bigintStats[key] = new Date(element);
      }
    }
  }
  bigintStats.atimeNs = bigintStats.atimeMs * BigInt(1e6);
  bigintStats.mtimeNs = bigintStats.mtimeMs * BigInt(1e6);
  bigintStats.ctimeNs = bigintStats.ctimeMs * BigInt(1e6);
  bigintStats.birthtimeNs = bigintStats.birthtimeMs * BigInt(1e6);
  return bigintStats;
}
function areStatsEqual(a, b) {
  if (a.atimeMs !== b.atimeMs)
    return false;
  if (a.birthtimeMs !== b.birthtimeMs)
    return false;
  if (a.blksize !== b.blksize)
    return false;
  if (a.blocks !== b.blocks)
    return false;
  if (a.ctimeMs !== b.ctimeMs)
    return false;
  if (a.dev !== b.dev)
    return false;
  if (a.gid !== b.gid)
    return false;
  if (a.ino !== b.ino)
    return false;
  if (a.isBlockDevice() !== b.isBlockDevice())
    return false;
  if (a.isCharacterDevice() !== b.isCharacterDevice())
    return false;
  if (a.isDirectory() !== b.isDirectory())
    return false;
  if (a.isFIFO() !== b.isFIFO())
    return false;
  if (a.isFile() !== b.isFile())
    return false;
  if (a.isSocket() !== b.isSocket())
    return false;
  if (a.isSymbolicLink() !== b.isSymbolicLink())
    return false;
  if (a.mode !== b.mode)
    return false;
  if (a.mtimeMs !== b.mtimeMs)
    return false;
  if (a.nlink !== b.nlink)
    return false;
  if (a.rdev !== b.rdev)
    return false;
  if (a.size !== b.size)
    return false;
  if (a.uid !== b.uid)
    return false;
  const aN = a;
  const bN = b;
  if (aN.atimeNs !== bN.atimeNs)
    return false;
  if (aN.mtimeNs !== bN.mtimeNs)
    return false;
  if (aN.ctimeNs !== bN.ctimeNs)
    return false;
  if (aN.birthtimeNs !== bN.birthtimeNs)
    return false;
  return true;
}

var PathType;
(function(PathType2) {
  PathType2[PathType2["File"] = 0] = "File";
  PathType2[PathType2["Portable"] = 1] = "Portable";
  PathType2[PathType2["Native"] = 2] = "Native";
})(PathType || (PathType = {}));
const PortablePath = {
  root: `/`,
  dot: `.`
};
const Filename = {
  nodeModules: `node_modules`,
  manifest: `package.json`,
  lockfile: `yarn.lock`,
  virtual: `__virtual__`,
  pnpJs: `.pnp.js`,
  pnpCjs: `.pnp.cjs`,
  rc: `.yarnrc.yml`
};
const npath = Object.create(path__default.default);
const ppath = Object.create(path__default.default.posix);
npath.cwd = () => process.cwd();
ppath.cwd = () => toPortablePath(process.cwd());
ppath.resolve = (...segments) => {
  if (segments.length > 0 && ppath.isAbsolute(segments[0])) {
    return path__default.default.posix.resolve(...segments);
  } else {
    return path__default.default.posix.resolve(ppath.cwd(), ...segments);
  }
};
const contains = function(pathUtils, from, to) {
  from = pathUtils.normalize(from);
  to = pathUtils.normalize(to);
  if (from === to)
    return `.`;
  if (!from.endsWith(pathUtils.sep))
    from = from + pathUtils.sep;
  if (to.startsWith(from)) {
    return to.slice(from.length);
  } else {
    return null;
  }
};
npath.fromPortablePath = fromPortablePath;
npath.toPortablePath = toPortablePath;
npath.contains = (from, to) => contains(npath, from, to);
ppath.contains = (from, to) => contains(ppath, from, to);
const WINDOWS_PATH_REGEXP = /^([a-zA-Z]:.*)$/;
const UNC_WINDOWS_PATH_REGEXP = /^\/\/(\.\/)?(.*)$/;
const PORTABLE_PATH_REGEXP = /^\/([a-zA-Z]:.*)$/;
const UNC_PORTABLE_PATH_REGEXP = /^\/unc\/(\.dot\/)?(.*)$/;
function fromPortablePath(p) {
  if (process.platform !== `win32`)
    return p;
  let portablePathMatch, uncPortablePathMatch;
  if (portablePathMatch = p.match(PORTABLE_PATH_REGEXP))
    p = portablePathMatch[1];
  else if (uncPortablePathMatch = p.match(UNC_PORTABLE_PATH_REGEXP))
    p = `\\\\${uncPortablePathMatch[1] ? `.\\` : ``}${uncPortablePathMatch[2]}`;
  else
    return p;
  return p.replace(/\//g, `\\`);
}
function toPortablePath(p) {
  if (process.platform !== `win32`)
    return p;
  p = p.replace(/\\/g, `/`);
  let windowsPathMatch, uncWindowsPathMatch;
  if (windowsPathMatch = p.match(WINDOWS_PATH_REGEXP))
    p = `/${windowsPathMatch[1]}`;
  else if (uncWindowsPathMatch = p.match(UNC_WINDOWS_PATH_REGEXP))
    p = `/unc/${uncWindowsPathMatch[1] ? `.dot/` : ``}${uncWindowsPathMatch[2]}`;
  return p;
}
function convertPath(targetPathUtils, sourcePath) {
  return targetPathUtils === npath ? fromPortablePath(sourcePath) : toPortablePath(sourcePath);
}

var __defProp$5 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
const defaultTime = new Date(SAFE_TIME * 1e3);
var LinkStrategy;
(function(LinkStrategy2) {
  LinkStrategy2["Allow"] = `allow`;
  LinkStrategy2["ReadOnly"] = `readOnly`;
})(LinkStrategy || (LinkStrategy = {}));
async function copyPromise(destinationFs, destination, sourceFs, source, opts) {
  const normalizedDestination = destinationFs.pathUtils.normalize(destination);
  const normalizedSource = sourceFs.pathUtils.normalize(source);
  const prelayout = [];
  const postlayout = [];
  const {atime, mtime} = opts.stableTime ? {atime: defaultTime, mtime: defaultTime} : await sourceFs.lstatPromise(normalizedSource);
  await destinationFs.mkdirpPromise(destinationFs.pathUtils.dirname(destination), {utimes: [atime, mtime]});
  const updateTime = typeof destinationFs.lutimesPromise === `function` ? destinationFs.lutimesPromise.bind(destinationFs) : destinationFs.utimesPromise.bind(destinationFs);
  await copyImpl(prelayout, postlayout, updateTime, destinationFs, normalizedDestination, sourceFs, normalizedSource, __spreadProps$3(__spreadValues$5({}, opts), {didParentExist: true}));
  for (const operation of prelayout)
    await operation();
  await Promise.all(postlayout.map((operation) => {
    return operation();
  }));
}
async function copyImpl(prelayout, postlayout, updateTime, destinationFs, destination, sourceFs, source, opts) {
  var _a, _b;
  const destinationStat = opts.didParentExist ? await maybeLStat(destinationFs, destination) : null;
  const sourceStat = await sourceFs.lstatPromise(source);
  const {atime, mtime} = opts.stableTime ? {atime: defaultTime, mtime: defaultTime} : sourceStat;
  let updated;
  switch (true) {
    case sourceStat.isDirectory():
      {
        updated = await copyFolder(prelayout, postlayout, updateTime, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;
    case sourceStat.isFile():
      {
        updated = await copyFile(prelayout, postlayout, updateTime, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;
    case sourceStat.isSymbolicLink():
      {
        updated = await copySymlink(prelayout, postlayout, updateTime, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts);
      }
      break;
    default:
      {
        throw new Error(`Unsupported file type (${sourceStat.mode})`);
      }
  }
  if (updated || ((_a = destinationStat == null ? void 0 : destinationStat.mtime) == null ? void 0 : _a.getTime()) !== mtime.getTime() || ((_b = destinationStat == null ? void 0 : destinationStat.atime) == null ? void 0 : _b.getTime()) !== atime.getTime()) {
    postlayout.push(() => updateTime(destination, atime, mtime));
    updated = true;
  }
  if (destinationStat === null || (destinationStat.mode & 511) !== (sourceStat.mode & 511)) {
    postlayout.push(() => destinationFs.chmodPromise(destination, sourceStat.mode & 511));
    updated = true;
  }
  return updated;
}
async function maybeLStat(baseFs, p) {
  try {
    return await baseFs.lstatPromise(p);
  } catch (e) {
    return null;
  }
}
async function copyFolder(prelayout, postlayout, updateTime, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null && !destinationStat.isDirectory()) {
    if (opts.overwrite) {
      prelayout.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return false;
    }
  }
  let updated = false;
  if (destinationStat === null) {
    prelayout.push(async () => {
      try {
        await destinationFs.mkdirPromise(destination, {mode: sourceStat.mode});
      } catch (err) {
        if (err.code !== `EEXIST`) {
          throw err;
        }
      }
    });
    updated = true;
  }
  const entries = await sourceFs.readdirPromise(source);
  const nextOpts = opts.didParentExist && !destinationStat ? __spreadProps$3(__spreadValues$5({}, opts), {didParentExist: false}) : opts;
  if (opts.stableSort) {
    for (const entry of entries.sort()) {
      if (await copyImpl(prelayout, postlayout, updateTime, destinationFs, destinationFs.pathUtils.join(destination, entry), sourceFs, sourceFs.pathUtils.join(source, entry), nextOpts)) {
        updated = true;
      }
    }
  } else {
    const entriesUpdateStatus = await Promise.all(entries.map(async (entry) => {
      await copyImpl(prelayout, postlayout, updateTime, destinationFs, destinationFs.pathUtils.join(destination, entry), sourceFs, sourceFs.pathUtils.join(source, entry), nextOpts);
    }));
    if (entriesUpdateStatus.some((status) => status)) {
      updated = true;
    }
  }
  return updated;
}
const isCloneSupportedCache = new WeakMap();
function makeLinkOperation(opFs, destination, source, sourceStat, linkStrategy) {
  return async () => {
    await opFs.linkPromise(source, destination);
    if (linkStrategy === LinkStrategy.ReadOnly) {
      sourceStat.mode &= ~146;
      await opFs.chmodPromise(destination, sourceStat.mode);
    }
  };
}
function makeCloneLinkOperation(opFs, destination, source, sourceStat, linkStrategy) {
  const isCloneSupported = isCloneSupportedCache.get(opFs);
  if (typeof isCloneSupported === `undefined`) {
    return async () => {
      try {
        await opFs.copyFilePromise(source, destination, fs__default.default.constants.COPYFILE_FICLONE_FORCE);
        isCloneSupportedCache.set(opFs, true);
      } catch (err) {
        if (err.code === `ENOSYS` || err.code === `ENOTSUP`) {
          isCloneSupportedCache.set(opFs, false);
          await makeLinkOperation(opFs, destination, source, sourceStat, linkStrategy)();
        } else {
          throw err;
        }
      }
    };
  } else {
    if (isCloneSupported) {
      return async () => opFs.copyFilePromise(source, destination, fs__default.default.constants.COPYFILE_FICLONE_FORCE);
    } else {
      return makeLinkOperation(opFs, destination, source, sourceStat, linkStrategy);
    }
  }
}
async function copyFile(prelayout, postlayout, updateTime, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  var _a;
  if (destinationStat !== null) {
    if (opts.overwrite) {
      prelayout.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return false;
    }
  }
  const linkStrategy = (_a = opts.linkStrategy) != null ? _a : null;
  const op = destinationFs === sourceFs ? linkStrategy !== null ? makeCloneLinkOperation(destinationFs, destination, source, sourceStat, linkStrategy) : async () => destinationFs.copyFilePromise(source, destination, fs__default.default.constants.COPYFILE_FICLONE) : linkStrategy !== null ? makeLinkOperation(destinationFs, destination, source, sourceStat, linkStrategy) : async () => destinationFs.writeFilePromise(destination, await sourceFs.readFilePromise(source));
  prelayout.push(async () => op());
  return true;
}
async function copySymlink(prelayout, postlayout, updateTime, destinationFs, destination, destinationStat, sourceFs, source, sourceStat, opts) {
  if (destinationStat !== null) {
    if (opts.overwrite) {
      prelayout.push(async () => destinationFs.removePromise(destination));
      destinationStat = null;
    } else {
      return false;
    }
  }
  prelayout.push(async () => {
    await destinationFs.symlinkPromise(convertPath(destinationFs.pathUtils, await sourceFs.readlinkPromise(source)), destination);
  });
  return true;
}

function makeError$1(code, message) {
  return Object.assign(new Error(`${code}: ${message}`), {code});
}
function EBUSY(message) {
  return makeError$1(`EBUSY`, message);
}
function ENOSYS(message, reason) {
  return makeError$1(`ENOSYS`, `${message}, ${reason}`);
}
function EINVAL(reason) {
  return makeError$1(`EINVAL`, `invalid argument, ${reason}`);
}
function EBADF(reason) {
  return makeError$1(`EBADF`, `bad file descriptor, ${reason}`);
}
function ENOENT(reason) {
  return makeError$1(`ENOENT`, `no such file or directory, ${reason}`);
}
function ENOTDIR(reason) {
  return makeError$1(`ENOTDIR`, `not a directory, ${reason}`);
}
function EISDIR(reason) {
  return makeError$1(`EISDIR`, `illegal operation on a directory, ${reason}`);
}
function EEXIST(reason) {
  return makeError$1(`EEXIST`, `file already exists, ${reason}`);
}
function EROFS(reason) {
  return makeError$1(`EROFS`, `read-only filesystem, ${reason}`);
}
function ENOTEMPTY(reason) {
  return makeError$1(`ENOTEMPTY`, `directory not empty, ${reason}`);
}
function EOPNOTSUPP(reason) {
  return makeError$1(`EOPNOTSUPP`, `operation not supported, ${reason}`);
}
function ERR_DIR_CLOSED() {
  return makeError$1(`ERR_DIR_CLOSED`, `Directory handle was closed`);
}
class LibzipError extends Error {
  constructor(message, code) {
    super(message);
    this.name = `Libzip Error`;
    this.code = code;
  }
}

class CustomDir {
  constructor(path, nextDirent, opts = {}) {
    this.path = path;
    this.nextDirent = nextDirent;
    this.opts = opts;
    this.closed = false;
  }
  throwIfClosed() {
    if (this.closed) {
      throw ERR_DIR_CLOSED();
    }
  }
  async *[Symbol.asyncIterator]() {
    try {
      let dirent;
      while ((dirent = await this.read()) !== null) {
        yield dirent;
      }
    } finally {
      await this.close();
    }
  }
  read(cb) {
    const dirent = this.readSync();
    if (typeof cb !== `undefined`)
      return cb(null, dirent);
    return Promise.resolve(dirent);
  }
  readSync() {
    this.throwIfClosed();
    return this.nextDirent();
  }
  close(cb) {
    this.closeSync();
    if (typeof cb !== `undefined`)
      return cb(null);
    return Promise.resolve();
  }
  closeSync() {
    var _a, _b;
    this.throwIfClosed();
    (_b = (_a = this.opts).onClose) == null ? void 0 : _b.call(_a);
    this.closed = true;
  }
}
function opendir(fakeFs, path, entries, opts) {
  const nextDirent = () => {
    const filename = entries.shift();
    if (typeof filename === `undefined`)
      return null;
    return Object.assign(fakeFs.statSync(fakeFs.pathUtils.join(path, filename)), {
      name: filename
    });
  };
  return new CustomDir(path, nextDirent, opts);
}

class FakeFS {
  constructor(pathUtils) {
    this.pathUtils = pathUtils;
  }
  async *genTraversePromise(init, {stableSort = false} = {}) {
    const stack = [init];
    while (stack.length > 0) {
      const p = stack.shift();
      const entry = await this.lstatPromise(p);
      if (entry.isDirectory()) {
        const entries = await this.readdirPromise(p);
        if (stableSort) {
          for (const entry2 of entries.sort()) {
            stack.push(this.pathUtils.join(p, entry2));
          }
        } else {
          throw new Error(`Not supported`);
        }
      } else {
        yield p;
      }
    }
  }
  async removePromise(p, {recursive = true, maxRetries = 5} = {}) {
    let stat;
    try {
      stat = await this.lstatPromise(p);
    } catch (error) {
      if (error.code === `ENOENT`) {
        return;
      } else {
        throw error;
      }
    }
    if (stat.isDirectory()) {
      if (recursive) {
        const entries = await this.readdirPromise(p);
        await Promise.all(entries.map((entry) => {
          return this.removePromise(this.pathUtils.resolve(p, entry));
        }));
      }
      for (let t = 0; t <= maxRetries; t++) {
        try {
          await this.rmdirPromise(p);
          break;
        } catch (error) {
          if (error.code !== `EBUSY` && error.code !== `ENOTEMPTY`) {
            throw error;
          } else if (t < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, t * 100));
          }
        }
      }
    } else {
      await this.unlinkPromise(p);
    }
  }
  removeSync(p, {recursive = true} = {}) {
    let stat;
    try {
      stat = this.lstatSync(p);
    } catch (error) {
      if (error.code === `ENOENT`) {
        return;
      } else {
        throw error;
      }
    }
    if (stat.isDirectory()) {
      if (recursive)
        for (const entry of this.readdirSync(p))
          this.removeSync(this.pathUtils.resolve(p, entry));
      this.rmdirSync(p);
    } else {
      this.unlinkSync(p);
    }
  }
  async mkdirpPromise(p, {chmod, utimes} = {}) {
    p = this.resolve(p);
    if (p === this.pathUtils.dirname(p))
      return void 0;
    const parts = p.split(this.pathUtils.sep);
    let createdDirectory;
    for (let u = 2; u <= parts.length; ++u) {
      const subPath = parts.slice(0, u).join(this.pathUtils.sep);
      if (!this.existsSync(subPath)) {
        try {
          await this.mkdirPromise(subPath);
        } catch (error) {
          if (error.code === `EEXIST`) {
            continue;
          } else {
            throw error;
          }
        }
        createdDirectory != null ? createdDirectory : createdDirectory = subPath;
        if (chmod != null)
          await this.chmodPromise(subPath, chmod);
        if (utimes != null) {
          await this.utimesPromise(subPath, utimes[0], utimes[1]);
        } else {
          const parentStat = await this.statPromise(this.pathUtils.dirname(subPath));
          await this.utimesPromise(subPath, parentStat.atime, parentStat.mtime);
        }
      }
    }
    return createdDirectory;
  }
  mkdirpSync(p, {chmod, utimes} = {}) {
    p = this.resolve(p);
    if (p === this.pathUtils.dirname(p))
      return void 0;
    const parts = p.split(this.pathUtils.sep);
    let createdDirectory;
    for (let u = 2; u <= parts.length; ++u) {
      const subPath = parts.slice(0, u).join(this.pathUtils.sep);
      if (!this.existsSync(subPath)) {
        try {
          this.mkdirSync(subPath);
        } catch (error) {
          if (error.code === `EEXIST`) {
            continue;
          } else {
            throw error;
          }
        }
        createdDirectory != null ? createdDirectory : createdDirectory = subPath;
        if (chmod != null)
          this.chmodSync(subPath, chmod);
        if (utimes != null) {
          this.utimesSync(subPath, utimes[0], utimes[1]);
        } else {
          const parentStat = this.statSync(this.pathUtils.dirname(subPath));
          this.utimesSync(subPath, parentStat.atime, parentStat.mtime);
        }
      }
    }
    return createdDirectory;
  }
  async copyPromise(destination, source, {baseFs = this, overwrite = true, stableSort = false, stableTime = false, linkStrategy = null} = {}) {
    return await copyPromise(this, destination, baseFs, source, {overwrite, stableSort, stableTime, linkStrategy});
  }
  copySync(destination, source, {baseFs = this, overwrite = true} = {}) {
    const stat = baseFs.lstatSync(source);
    const exists = this.existsSync(destination);
    if (stat.isDirectory()) {
      this.mkdirpSync(destination);
      const directoryListing = baseFs.readdirSync(source);
      for (const entry of directoryListing) {
        this.copySync(this.pathUtils.join(destination, entry), baseFs.pathUtils.join(source, entry), {baseFs, overwrite});
      }
    } else if (stat.isFile()) {
      if (!exists || overwrite) {
        if (exists)
          this.removeSync(destination);
        const content = baseFs.readFileSync(source);
        this.writeFileSync(destination, content);
      }
    } else if (stat.isSymbolicLink()) {
      if (!exists || overwrite) {
        if (exists)
          this.removeSync(destination);
        const target = baseFs.readlinkSync(source);
        this.symlinkSync(convertPath(this.pathUtils, target), destination);
      }
    } else {
      throw new Error(`Unsupported file type (file: ${source}, mode: 0o${stat.mode.toString(8).padStart(6, `0`)})`);
    }
    const mode = stat.mode & 511;
    this.chmodSync(destination, mode);
  }
  async changeFilePromise(p, content, opts = {}) {
    if (Buffer.isBuffer(content)) {
      return this.changeFileBufferPromise(p, content, opts);
    } else {
      return this.changeFileTextPromise(p, content, opts);
    }
  }
  async changeFileBufferPromise(p, content, {mode} = {}) {
    let current = Buffer.alloc(0);
    try {
      current = await this.readFilePromise(p);
    } catch (error) {
    }
    if (Buffer.compare(current, content) === 0)
      return;
    await this.writeFilePromise(p, content, {mode});
  }
  async changeFileTextPromise(p, content, {automaticNewlines, mode} = {}) {
    let current = ``;
    try {
      current = await this.readFilePromise(p, `utf8`);
    } catch (error) {
    }
    const normalizedContent = automaticNewlines ? normalizeLineEndings(current, content) : content;
    if (current === normalizedContent)
      return;
    await this.writeFilePromise(p, normalizedContent, {mode});
  }
  changeFileSync(p, content, opts = {}) {
    if (Buffer.isBuffer(content)) {
      return this.changeFileBufferSync(p, content, opts);
    } else {
      return this.changeFileTextSync(p, content, opts);
    }
  }
  changeFileBufferSync(p, content, {mode} = {}) {
    let current = Buffer.alloc(0);
    try {
      current = this.readFileSync(p);
    } catch (error) {
    }
    if (Buffer.compare(current, content) === 0)
      return;
    this.writeFileSync(p, content, {mode});
  }
  changeFileTextSync(p, content, {automaticNewlines = false, mode} = {}) {
    let current = ``;
    try {
      current = this.readFileSync(p, `utf8`);
    } catch (error) {
    }
    const normalizedContent = automaticNewlines ? normalizeLineEndings(current, content) : content;
    if (current === normalizedContent)
      return;
    this.writeFileSync(p, normalizedContent, {mode});
  }
  async movePromise(fromP, toP) {
    try {
      await this.renamePromise(fromP, toP);
    } catch (error) {
      if (error.code === `EXDEV`) {
        await this.copyPromise(toP, fromP);
        await this.removePromise(fromP);
      } else {
        throw error;
      }
    }
  }
  moveSync(fromP, toP) {
    try {
      this.renameSync(fromP, toP);
    } catch (error) {
      if (error.code === `EXDEV`) {
        this.copySync(toP, fromP);
        this.removeSync(fromP);
      } else {
        throw error;
      }
    }
  }
  async lockPromise(affectedPath, callback) {
    const lockPath = `${affectedPath}.flock`;
    const interval = 1e3 / 60;
    const startTime = Date.now();
    let fd = null;
    const isAlive = async () => {
      let pid;
      try {
        [pid] = await this.readJsonPromise(lockPath);
      } catch (error) {
        return Date.now() - startTime < 500;
      }
      try {
        process.kill(pid, 0);
        return true;
      } catch (error) {
        return false;
      }
    };
    while (fd === null) {
      try {
        fd = await this.openPromise(lockPath, `wx`);
      } catch (error) {
        if (error.code === `EEXIST`) {
          if (!await isAlive()) {
            try {
              await this.unlinkPromise(lockPath);
              continue;
            } catch (error2) {
            }
          }
          if (Date.now() - startTime < 60 * 1e3) {
            await new Promise((resolve) => setTimeout(resolve, interval));
          } else {
            throw new Error(`Couldn't acquire a lock in a reasonable time (via ${lockPath})`);
          }
        } else {
          throw error;
        }
      }
    }
    await this.writePromise(fd, JSON.stringify([process.pid]));
    try {
      return await callback();
    } finally {
      try {
        await this.closePromise(fd);
        await this.unlinkPromise(lockPath);
      } catch (error) {
      }
    }
  }
  async readJsonPromise(p) {
    const content = await this.readFilePromise(p, `utf8`);
    try {
      return JSON.parse(content);
    } catch (error) {
      error.message += ` (in ${p})`;
      throw error;
    }
  }
  readJsonSync(p) {
    const content = this.readFileSync(p, `utf8`);
    try {
      return JSON.parse(content);
    } catch (error) {
      error.message += ` (in ${p})`;
      throw error;
    }
  }
  async writeJsonPromise(p, data) {
    return await this.writeFilePromise(p, `${JSON.stringify(data, null, 2)}
`);
  }
  writeJsonSync(p, data) {
    return this.writeFileSync(p, `${JSON.stringify(data, null, 2)}
`);
  }
  async preserveTimePromise(p, cb) {
    const stat = await this.lstatPromise(p);
    const result = await cb();
    if (typeof result !== `undefined`)
      p = result;
    if (this.lutimesPromise) {
      await this.lutimesPromise(p, stat.atime, stat.mtime);
    } else if (!stat.isSymbolicLink()) {
      await this.utimesPromise(p, stat.atime, stat.mtime);
    }
  }
  async preserveTimeSync(p, cb) {
    const stat = this.lstatSync(p);
    const result = cb();
    if (typeof result !== `undefined`)
      p = result;
    if (this.lutimesSync) {
      this.lutimesSync(p, stat.atime, stat.mtime);
    } else if (!stat.isSymbolicLink()) {
      this.utimesSync(p, stat.atime, stat.mtime);
    }
  }
}
class BasePortableFakeFS extends FakeFS {
  constructor() {
    super(ppath);
  }
}
function getEndOfLine(content) {
  const matches = content.match(/\r?\n/g);
  if (matches === null)
    return os.EOL;
  const crlf = matches.filter((nl) => nl === `\r
`).length;
  const lf = matches.length - crlf;
  return crlf > lf ? `\r
` : `
`;
}
function normalizeLineEndings(originalContent, newContent) {
  return newContent.replace(/\r?\n/g, getEndOfLine(originalContent));
}

class NodeFS extends BasePortableFakeFS {
  constructor(realFs = fs__default.default) {
    super();
    this.realFs = realFs;
    if (typeof this.realFs.lutimes !== `undefined`) {
      this.lutimesPromise = this.lutimesPromiseImpl;
      this.lutimesSync = this.lutimesSyncImpl;
    }
  }
  getExtractHint() {
    return false;
  }
  getRealPath() {
    return PortablePath.root;
  }
  resolve(p) {
    return ppath.resolve(p);
  }
  async openPromise(p, flags, mode) {
    return await new Promise((resolve, reject) => {
      this.realFs.open(npath.fromPortablePath(p), flags, mode, this.makeCallback(resolve, reject));
    });
  }
  openSync(p, flags, mode) {
    return this.realFs.openSync(npath.fromPortablePath(p), flags, mode);
  }
  async opendirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (typeof opts !== `undefined`) {
        this.realFs.opendir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.opendir(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    }).then((dir) => {
      return Object.defineProperty(dir, `path`, {value: p, configurable: true, writable: true});
    });
  }
  opendirSync(p, opts) {
    const dir = typeof opts !== `undefined` ? this.realFs.opendirSync(npath.fromPortablePath(p), opts) : this.realFs.opendirSync(npath.fromPortablePath(p));
    return Object.defineProperty(dir, `path`, {value: p, configurable: true, writable: true});
  }
  async readPromise(fd, buffer, offset = 0, length = 0, position = -1) {
    return await new Promise((resolve, reject) => {
      this.realFs.read(fd, buffer, offset, length, position, (error, bytesRead) => {
        if (error) {
          reject(error);
        } else {
          resolve(bytesRead);
        }
      });
    });
  }
  readSync(fd, buffer, offset, length, position) {
    return this.realFs.readSync(fd, buffer, offset, length, position);
  }
  async writePromise(fd, buffer, offset, length, position) {
    return await new Promise((resolve, reject) => {
      if (typeof buffer === `string`) {
        return this.realFs.write(fd, buffer, offset, this.makeCallback(resolve, reject));
      } else {
        return this.realFs.write(fd, buffer, offset, length, position, this.makeCallback(resolve, reject));
      }
    });
  }
  writeSync(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.realFs.writeSync(fd, buffer, offset);
    } else {
      return this.realFs.writeSync(fd, buffer, offset, length, position);
    }
  }
  async closePromise(fd) {
    await new Promise((resolve, reject) => {
      this.realFs.close(fd, this.makeCallback(resolve, reject));
    });
  }
  closeSync(fd) {
    this.realFs.closeSync(fd);
  }
  createReadStream(p, opts) {
    const realPath = p !== null ? npath.fromPortablePath(p) : p;
    return this.realFs.createReadStream(realPath, opts);
  }
  createWriteStream(p, opts) {
    const realPath = p !== null ? npath.fromPortablePath(p) : p;
    return this.realFs.createWriteStream(realPath, opts);
  }
  async realpathPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.realpath(npath.fromPortablePath(p), {}, this.makeCallback(resolve, reject));
    }).then((path) => {
      return npath.toPortablePath(path);
    });
  }
  realpathSync(p) {
    return npath.toPortablePath(this.realFs.realpathSync(npath.fromPortablePath(p), {}));
  }
  async existsPromise(p) {
    return await new Promise((resolve) => {
      this.realFs.exists(npath.fromPortablePath(p), resolve);
    });
  }
  accessSync(p, mode) {
    return this.realFs.accessSync(npath.fromPortablePath(p), mode);
  }
  async accessPromise(p, mode) {
    return await new Promise((resolve, reject) => {
      this.realFs.access(npath.fromPortablePath(p), mode, this.makeCallback(resolve, reject));
    });
  }
  existsSync(p) {
    return this.realFs.existsSync(npath.fromPortablePath(p));
  }
  async statPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.stat(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.stat(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  statSync(p, opts) {
    if (opts) {
      return this.realFs.statSync(npath.fromPortablePath(p), opts);
    } else {
      return this.realFs.statSync(npath.fromPortablePath(p));
    }
  }
  async fstatPromise(fd, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.fstat(fd, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.fstat(fd, this.makeCallback(resolve, reject));
      }
    });
  }
  fstatSync(fd, opts) {
    if (opts) {
      return this.realFs.fstatSync(fd, opts);
    } else {
      return this.realFs.fstatSync(fd);
    }
  }
  async lstatPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.lstat(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.lstat(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  lstatSync(p, opts) {
    if (opts) {
      return this.realFs.lstatSync(npath.fromPortablePath(p), opts);
    } else {
      return this.realFs.lstatSync(npath.fromPortablePath(p));
    }
  }
  async fchmodPromise(fd, mask) {
    return await new Promise((resolve, reject) => {
      this.realFs.fchmod(fd, mask, this.makeCallback(resolve, reject));
    });
  }
  fchmodSync(fd, mask) {
    return this.realFs.fchmodSync(fd, mask);
  }
  async chmodPromise(p, mask) {
    return await new Promise((resolve, reject) => {
      this.realFs.chmod(npath.fromPortablePath(p), mask, this.makeCallback(resolve, reject));
    });
  }
  chmodSync(p, mask) {
    return this.realFs.chmodSync(npath.fromPortablePath(p), mask);
  }
  async chownPromise(p, uid, gid) {
    return await new Promise((resolve, reject) => {
      this.realFs.chown(npath.fromPortablePath(p), uid, gid, this.makeCallback(resolve, reject));
    });
  }
  chownSync(p, uid, gid) {
    return this.realFs.chownSync(npath.fromPortablePath(p), uid, gid);
  }
  async renamePromise(oldP, newP) {
    return await new Promise((resolve, reject) => {
      this.realFs.rename(npath.fromPortablePath(oldP), npath.fromPortablePath(newP), this.makeCallback(resolve, reject));
    });
  }
  renameSync(oldP, newP) {
    return this.realFs.renameSync(npath.fromPortablePath(oldP), npath.fromPortablePath(newP));
  }
  async copyFilePromise(sourceP, destP, flags = 0) {
    return await new Promise((resolve, reject) => {
      this.realFs.copyFile(npath.fromPortablePath(sourceP), npath.fromPortablePath(destP), flags, this.makeCallback(resolve, reject));
    });
  }
  copyFileSync(sourceP, destP, flags = 0) {
    return this.realFs.copyFileSync(npath.fromPortablePath(sourceP), npath.fromPortablePath(destP), flags);
  }
  async appendFilePromise(p, content, opts) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
      if (opts) {
        this.realFs.appendFile(fsNativePath, content, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.appendFile(fsNativePath, content, this.makeCallback(resolve, reject));
      }
    });
  }
  appendFileSync(p, content, opts) {
    const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
    if (opts) {
      this.realFs.appendFileSync(fsNativePath, content, opts);
    } else {
      this.realFs.appendFileSync(fsNativePath, content);
    }
  }
  async writeFilePromise(p, content, opts) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
      if (opts) {
        this.realFs.writeFile(fsNativePath, content, opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.writeFile(fsNativePath, content, this.makeCallback(resolve, reject));
      }
    });
  }
  writeFileSync(p, content, opts) {
    const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
    if (opts) {
      this.realFs.writeFileSync(fsNativePath, content, opts);
    } else {
      this.realFs.writeFileSync(fsNativePath, content);
    }
  }
  async unlinkPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.unlink(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    });
  }
  unlinkSync(p) {
    return this.realFs.unlinkSync(npath.fromPortablePath(p));
  }
  async utimesPromise(p, atime, mtime) {
    return await new Promise((resolve, reject) => {
      this.realFs.utimes(npath.fromPortablePath(p), atime, mtime, this.makeCallback(resolve, reject));
    });
  }
  utimesSync(p, atime, mtime) {
    this.realFs.utimesSync(npath.fromPortablePath(p), atime, mtime);
  }
  async lutimesPromiseImpl(p, atime, mtime) {
    const lutimes = this.realFs.lutimes;
    if (typeof lutimes === `undefined`)
      throw ENOSYS(`unavailable Node binding`, `lutimes '${p}'`);
    return await new Promise((resolve, reject) => {
      lutimes.call(this.realFs, npath.fromPortablePath(p), atime, mtime, this.makeCallback(resolve, reject));
    });
  }
  lutimesSyncImpl(p, atime, mtime) {
    const lutimesSync = this.realFs.lutimesSync;
    if (typeof lutimesSync === `undefined`)
      throw ENOSYS(`unavailable Node binding`, `lutimes '${p}'`);
    lutimesSync.call(this.realFs, npath.fromPortablePath(p), atime, mtime);
  }
  async mkdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      this.realFs.mkdir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
    });
  }
  mkdirSync(p, opts) {
    return this.realFs.mkdirSync(npath.fromPortablePath(p), opts);
  }
  async rmdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts) {
        this.realFs.rmdir(npath.fromPortablePath(p), opts, this.makeCallback(resolve, reject));
      } else {
        this.realFs.rmdir(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
      }
    });
  }
  rmdirSync(p, opts) {
    return this.realFs.rmdirSync(npath.fromPortablePath(p), opts);
  }
  async linkPromise(existingP, newP) {
    return await new Promise((resolve, reject) => {
      this.realFs.link(npath.fromPortablePath(existingP), npath.fromPortablePath(newP), this.makeCallback(resolve, reject));
    });
  }
  linkSync(existingP, newP) {
    return this.realFs.linkSync(npath.fromPortablePath(existingP), npath.fromPortablePath(newP));
  }
  async symlinkPromise(target, p, type) {
    return await new Promise((resolve, reject) => {
      this.realFs.symlink(npath.fromPortablePath(target.replace(/\/+$/, ``)), npath.fromPortablePath(p), type, this.makeCallback(resolve, reject));
    });
  }
  symlinkSync(target, p, type) {
    return this.realFs.symlinkSync(npath.fromPortablePath(target.replace(/\/+$/, ``)), npath.fromPortablePath(p), type);
  }
  async readFilePromise(p, encoding) {
    return await new Promise((resolve, reject) => {
      const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
      this.realFs.readFile(fsNativePath, encoding, this.makeCallback(resolve, reject));
    });
  }
  readFileSync(p, encoding) {
    const fsNativePath = typeof p === `string` ? npath.fromPortablePath(p) : p;
    return this.realFs.readFileSync(fsNativePath, encoding);
  }
  async readdirPromise(p, opts) {
    return await new Promise((resolve, reject) => {
      if (opts == null ? void 0 : opts.withFileTypes) {
        this.realFs.readdir(npath.fromPortablePath(p), {withFileTypes: true}, this.makeCallback(resolve, reject));
      } else {
        this.realFs.readdir(npath.fromPortablePath(p), this.makeCallback((value) => resolve(value), reject));
      }
    });
  }
  readdirSync(p, opts) {
    if (opts == null ? void 0 : opts.withFileTypes) {
      return this.realFs.readdirSync(npath.fromPortablePath(p), {withFileTypes: true});
    } else {
      return this.realFs.readdirSync(npath.fromPortablePath(p));
    }
  }
  async readlinkPromise(p) {
    return await new Promise((resolve, reject) => {
      this.realFs.readlink(npath.fromPortablePath(p), this.makeCallback(resolve, reject));
    }).then((path) => {
      return npath.toPortablePath(path);
    });
  }
  readlinkSync(p) {
    return npath.toPortablePath(this.realFs.readlinkSync(npath.fromPortablePath(p)));
  }
  async truncatePromise(p, len) {
    return await new Promise((resolve, reject) => {
      this.realFs.truncate(npath.fromPortablePath(p), len, this.makeCallback(resolve, reject));
    });
  }
  truncateSync(p, len) {
    return this.realFs.truncateSync(npath.fromPortablePath(p), len);
  }
  async ftruncatePromise(fd, len) {
    return await new Promise((resolve, reject) => {
      this.realFs.ftruncate(fd, len, this.makeCallback(resolve, reject));
    });
  }
  ftruncateSync(fd, len) {
    return this.realFs.ftruncateSync(fd, len);
  }
  watch(p, a, b) {
    return this.realFs.watch(npath.fromPortablePath(p), a, b);
  }
  watchFile(p, a, b) {
    return this.realFs.watchFile(npath.fromPortablePath(p), a, b);
  }
  unwatchFile(p, cb) {
    return this.realFs.unwatchFile(npath.fromPortablePath(p), cb);
  }
  makeCallback(resolve, reject) {
    return (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    };
  }
}

var Event;
(function(Event2) {
  Event2["Change"] = `change`;
  Event2["Stop"] = `stop`;
})(Event || (Event = {}));
var Status;
(function(Status2) {
  Status2["Ready"] = `ready`;
  Status2["Running"] = `running`;
  Status2["Stopped"] = `stopped`;
})(Status || (Status = {}));
function assertStatus(current, expected) {
  if (current !== expected) {
    throw new Error(`Invalid StatWatcher status: expected '${expected}', got '${current}'`);
  }
}
class CustomStatWatcher extends events.EventEmitter {
  constructor(fakeFs, path, {bigint = false} = {}) {
    super();
    this.status = Status.Ready;
    this.changeListeners = new Map();
    this.startTimeout = null;
    this.fakeFs = fakeFs;
    this.path = path;
    this.bigint = bigint;
    this.lastStats = this.stat();
  }
  static create(fakeFs, path, opts) {
    const statWatcher = new CustomStatWatcher(fakeFs, path, opts);
    statWatcher.start();
    return statWatcher;
  }
  start() {
    assertStatus(this.status, Status.Ready);
    this.status = Status.Running;
    this.startTimeout = setTimeout(() => {
      this.startTimeout = null;
      if (!this.fakeFs.existsSync(this.path)) {
        this.emit(Event.Change, this.lastStats, this.lastStats);
      }
    }, 3);
  }
  stop() {
    assertStatus(this.status, Status.Running);
    this.status = Status.Stopped;
    if (this.startTimeout !== null) {
      clearTimeout(this.startTimeout);
      this.startTimeout = null;
    }
    this.emit(Event.Stop);
  }
  stat() {
    try {
      return this.fakeFs.statSync(this.path, {bigint: this.bigint});
    } catch (error) {
      const statInstance = this.bigint ? new BigIntStatsEntry() : new StatEntry();
      return clearStats(statInstance);
    }
  }
  makeInterval(opts) {
    const interval = setInterval(() => {
      const currentStats = this.stat();
      const previousStats = this.lastStats;
      if (areStatsEqual(currentStats, previousStats))
        return;
      this.lastStats = currentStats;
      this.emit(Event.Change, currentStats, previousStats);
    }, opts.interval);
    return opts.persistent ? interval : interval.unref();
  }
  registerChangeListener(listener, opts) {
    this.addListener(Event.Change, listener);
    this.changeListeners.set(listener, this.makeInterval(opts));
  }
  unregisterChangeListener(listener) {
    this.removeListener(Event.Change, listener);
    const interval = this.changeListeners.get(listener);
    if (typeof interval !== `undefined`)
      clearInterval(interval);
    this.changeListeners.delete(listener);
  }
  unregisterAllChangeListeners() {
    for (const listener of this.changeListeners.keys()) {
      this.unregisterChangeListener(listener);
    }
  }
  hasChangeListeners() {
    return this.changeListeners.size > 0;
  }
  ref() {
    for (const interval of this.changeListeners.values())
      interval.ref();
    return this;
  }
  unref() {
    for (const interval of this.changeListeners.values())
      interval.unref();
    return this;
  }
}

const statWatchersByFakeFS = new WeakMap();
function watchFile(fakeFs, path, a, b) {
  let bigint;
  let persistent;
  let interval;
  let listener;
  switch (typeof a) {
    case `function`:
      {
        bigint = false;
        persistent = true;
        interval = 5007;
        listener = a;
      }
      break;
    default:
      {
        ({
          bigint = false,
          persistent = true,
          interval = 5007
        } = a);
        listener = b;
      }
      break;
  }
  let statWatchers = statWatchersByFakeFS.get(fakeFs);
  if (typeof statWatchers === `undefined`)
    statWatchersByFakeFS.set(fakeFs, statWatchers = new Map());
  let statWatcher = statWatchers.get(path);
  if (typeof statWatcher === `undefined`) {
    statWatcher = CustomStatWatcher.create(fakeFs, path, {bigint});
    statWatchers.set(path, statWatcher);
  }
  statWatcher.registerChangeListener(listener, {persistent, interval});
  return statWatcher;
}
function unwatchFile(fakeFs, path, cb) {
  const statWatchers = statWatchersByFakeFS.get(fakeFs);
  if (typeof statWatchers === `undefined`)
    return;
  const statWatcher = statWatchers.get(path);
  if (typeof statWatcher === `undefined`)
    return;
  if (typeof cb === `undefined`)
    statWatcher.unregisterAllChangeListeners();
  else
    statWatcher.unregisterChangeListener(cb);
  if (!statWatcher.hasChangeListeners()) {
    statWatcher.stop();
    statWatchers.delete(path);
  }
}
function unwatchAllFiles(fakeFs) {
  const statWatchers = statWatchersByFakeFS.get(fakeFs);
  if (typeof statWatchers === `undefined`)
    return;
  for (const path of statWatchers.keys()) {
    unwatchFile(fakeFs, path);
  }
}

var __defProp$4 = Object.defineProperty;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
const DEFAULT_COMPRESSION_LEVEL = `mixed`;
function toUnixTimestamp(time) {
  if (typeof time === `string` && String(+time) === time)
    return +time;
  if (Number.isFinite(time)) {
    if (time < 0) {
      return Date.now() / 1e3;
    } else {
      return time;
    }
  }
  if (nodeUtils.types.isDate(time))
    return time.getTime() / 1e3;
  throw new Error(`Invalid time`);
}
function makeEmptyArchive() {
  return Buffer.from([
    80,
    75,
    5,
    6,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
}
class ZipFS extends BasePortableFakeFS {
  constructor(source, opts) {
    super();
    this.lzSource = null;
    this.listings = new Map();
    this.entries = new Map();
    this.fileSources = new Map();
    this.fds = new Map();
    this.nextFd = 0;
    this.ready = false;
    this.readOnly = false;
    this.libzip = opts.libzip;
    const pathOptions = opts;
    this.level = typeof pathOptions.level !== `undefined` ? pathOptions.level : DEFAULT_COMPRESSION_LEVEL;
    source != null ? source : source = makeEmptyArchive();
    if (typeof source === `string`) {
      const {baseFs = new NodeFS()} = pathOptions;
      this.baseFs = baseFs;
      this.path = source;
    } else {
      this.path = null;
      this.baseFs = null;
    }
    if (opts.stats) {
      this.stats = opts.stats;
    } else {
      if (typeof source === `string`) {
        try {
          this.stats = this.baseFs.statSync(source);
        } catch (error) {
          if (error.code === `ENOENT` && pathOptions.create) {
            this.stats = makeDefaultStats();
          } else {
            throw error;
          }
        }
      } else {
        this.stats = makeDefaultStats();
      }
    }
    const errPtr = this.libzip.malloc(4);
    try {
      let flags = 0;
      if (typeof source === `string` && pathOptions.create)
        flags |= this.libzip.ZIP_CREATE | this.libzip.ZIP_TRUNCATE;
      if (opts.readOnly) {
        flags |= this.libzip.ZIP_RDONLY;
        this.readOnly = true;
      }
      if (typeof source === `string`) {
        this.zip = this.libzip.open(npath.fromPortablePath(source), flags, errPtr);
      } else {
        const lzSource = this.allocateUnattachedSource(source);
        try {
          this.zip = this.libzip.openFromSource(lzSource, flags, errPtr);
          this.lzSource = lzSource;
        } catch (error) {
          this.libzip.source.free(lzSource);
          throw error;
        }
      }
      if (this.zip === 0) {
        const error = this.libzip.struct.errorS();
        this.libzip.error.initWithCode(error, this.libzip.getValue(errPtr, `i32`));
        throw this.makeLibzipError(error);
      }
    } finally {
      this.libzip.free(errPtr);
    }
    this.listings.set(PortablePath.root, new Set());
    const entryCount = this.libzip.getNumEntries(this.zip, 0);
    for (let t = 0; t < entryCount; ++t) {
      const raw = this.libzip.getName(this.zip, t, 0);
      if (ppath.isAbsolute(raw))
        continue;
      const p = ppath.resolve(PortablePath.root, raw);
      this.registerEntry(p, t);
      if (raw.endsWith(`/`)) {
        this.registerListing(p);
      }
    }
    this.symlinkCount = this.libzip.ext.countSymlinks(this.zip);
    if (this.symlinkCount === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    this.ready = true;
  }
  makeLibzipError(error) {
    const errorCode = this.libzip.struct.errorCodeZip(error);
    const strerror = this.libzip.error.strerror(error);
    const libzipError = new LibzipError(strerror, this.libzip.errors[errorCode]);
    if (errorCode === this.libzip.errors.ZIP_ER_CHANGED)
      throw new Error(`Assertion failed: Unexpected libzip error: ${libzipError.message}`);
    return libzipError;
  }
  getExtractHint(hints) {
    for (const fileName of this.entries.keys()) {
      const ext = this.pathUtils.extname(fileName);
      if (hints.relevantExtensions.has(ext)) {
        return true;
      }
    }
    return false;
  }
  getAllFiles() {
    return Array.from(this.entries.keys());
  }
  getRealPath() {
    if (!this.path)
      throw new Error(`ZipFS don't have real paths when loaded from a buffer`);
    return this.path;
  }
  getBufferAndClose() {
    this.prepareClose();
    if (!this.lzSource)
      throw new Error(`ZipFS was not created from a Buffer`);
    try {
      this.libzip.source.keep(this.lzSource);
      if (this.libzip.close(this.zip) === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      if (this.libzip.source.open(this.lzSource) === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      if (this.libzip.source.seek(this.lzSource, 0, 0, this.libzip.SEEK_END) === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      const size = this.libzip.source.tell(this.lzSource);
      if (size === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      if (this.libzip.source.seek(this.lzSource, 0, 0, this.libzip.SEEK_SET) === -1)
        throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
      const buffer = this.libzip.malloc(size);
      if (!buffer)
        throw new Error(`Couldn't allocate enough memory`);
      try {
        const rc = this.libzip.source.read(this.lzSource, buffer, size);
        if (rc === -1)
          throw this.makeLibzipError(this.libzip.source.error(this.lzSource));
        else if (rc < size)
          throw new Error(`Incomplete read`);
        else if (rc > size)
          throw new Error(`Overread`);
        const memory = this.libzip.HEAPU8.subarray(buffer, buffer + size);
        return Buffer.from(memory);
      } finally {
        this.libzip.free(buffer);
      }
    } finally {
      this.libzip.source.close(this.lzSource);
      this.libzip.source.free(this.lzSource);
      this.ready = false;
    }
  }
  prepareClose() {
    if (!this.ready)
      throw EBUSY(`archive closed, close`);
    unwatchAllFiles(this);
  }
  saveAndClose() {
    if (!this.path || !this.baseFs)
      throw new Error(`ZipFS cannot be saved and must be discarded when loaded from a buffer`);
    this.prepareClose();
    if (this.readOnly) {
      this.discardAndClose();
      return;
    }
    const newMode = this.baseFs.existsSync(this.path) || this.stats.mode === DEFAULT_MODE ? void 0 : this.stats.mode;
    if (this.entries.size === 0) {
      this.discardAndClose();
      this.baseFs.writeFileSync(this.path, makeEmptyArchive(), {mode: newMode});
    } else {
      const rc = this.libzip.close(this.zip);
      if (rc === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      if (typeof newMode !== `undefined`) {
        this.baseFs.chmodSync(this.path, newMode);
      }
    }
    this.ready = false;
  }
  discardAndClose() {
    this.prepareClose();
    this.libzip.discard(this.zip);
    this.ready = false;
  }
  resolve(p) {
    return ppath.resolve(PortablePath.root, p);
  }
  async openPromise(p, flags, mode) {
    return this.openSync(p, flags, mode);
  }
  openSync(p, flags, mode) {
    const fd = this.nextFd++;
    this.fds.set(fd, {cursor: 0, p});
    return fd;
  }
  hasOpenFileHandles() {
    return !!this.fds.size;
  }
  async opendirPromise(p, opts) {
    return this.opendirSync(p, opts);
  }
  opendirSync(p, opts = {}) {
    const resolvedP = this.resolveFilename(`opendir '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`opendir '${p}'`);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`opendir '${p}'`);
    const entries = [...directoryListing];
    const fd = this.openSync(resolvedP, `r`);
    const onClose = () => {
      this.closeSync(fd);
    };
    return opendir(this, resolvedP, entries, {onClose});
  }
  async readPromise(fd, buffer, offset, length, position) {
    return this.readSync(fd, buffer, offset, length, position);
  }
  readSync(fd, buffer, offset = 0, length = buffer.byteLength, position = -1) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    const realPosition = position === -1 || position === null ? entry.cursor : position;
    const source = this.readFileSync(entry.p);
    source.copy(buffer, offset, realPosition, realPosition + length);
    const bytesRead = Math.max(0, Math.min(source.length - realPosition, length));
    if (position === -1 || position === null)
      entry.cursor += bytesRead;
    return bytesRead;
  }
  async writePromise(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.writeSync(fd, buffer, position);
    } else {
      return this.writeSync(fd, buffer, offset, length, position);
    }
  }
  writeSync(fd, buffer, offset, length, position) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    throw new Error(`Unimplemented`);
  }
  async closePromise(fd) {
    return this.closeSync(fd);
  }
  closeSync(fd) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    this.fds.delete(fd);
  }
  createReadStream(p, {encoding} = {}) {
    if (p === null)
      throw new Error(`Unimplemented`);
    const fd = this.openSync(p, `r`);
    const stream$1 = Object.assign(new stream.PassThrough({
      emitClose: true,
      autoDestroy: true,
      destroy: (error, callback) => {
        clearImmediate(immediate);
        this.closeSync(fd);
        callback(error);
      }
    }), {
      close() {
        stream$1.destroy();
      },
      bytesRead: 0,
      path: p
    });
    const immediate = setImmediate(async () => {
      try {
        const data = await this.readFilePromise(p, encoding);
        stream$1.bytesRead = data.length;
        stream$1.end(data);
      } catch (error) {
        stream$1.destroy(error);
      }
    });
    return stream$1;
  }
  createWriteStream(p, {encoding} = {}) {
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    if (p === null)
      throw new Error(`Unimplemented`);
    const chunks = [];
    const fd = this.openSync(p, `w`);
    const stream$1 = Object.assign(new stream.PassThrough({
      autoDestroy: true,
      emitClose: true,
      destroy: (error, callback) => {
        try {
          if (error) {
            callback(error);
          } else {
            this.writeFileSync(p, Buffer.concat(chunks), encoding);
            callback(null);
          }
        } catch (err) {
          callback(err);
        } finally {
          this.closeSync(fd);
        }
      }
    }), {
      bytesWritten: 0,
      path: p,
      close() {
        stream$1.destroy();
      }
    });
    stream$1.on(`data`, (chunk) => {
      const chunkBuffer = Buffer.from(chunk);
      stream$1.bytesWritten += chunkBuffer.length;
      chunks.push(chunkBuffer);
    });
    return stream$1;
  }
  async realpathPromise(p) {
    return this.realpathSync(p);
  }
  realpathSync(p) {
    const resolvedP = this.resolveFilename(`lstat '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`lstat '${p}'`);
    return resolvedP;
  }
  async existsPromise(p) {
    return this.existsSync(p);
  }
  existsSync(p) {
    if (!this.ready)
      throw EBUSY(`archive closed, existsSync '${p}'`);
    if (this.symlinkCount === 0) {
      const resolvedP2 = ppath.resolve(PortablePath.root, p);
      return this.entries.has(resolvedP2) || this.listings.has(resolvedP2);
    }
    let resolvedP;
    try {
      resolvedP = this.resolveFilename(`stat '${p}'`, p, void 0, false);
    } catch (error) {
      return false;
    }
    if (resolvedP === void 0)
      return false;
    return this.entries.has(resolvedP) || this.listings.has(resolvedP);
  }
  async accessPromise(p, mode) {
    return this.accessSync(p, mode);
  }
  accessSync(p, mode = fs.constants.F_OK) {
    const resolvedP = this.resolveFilename(`access '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`access '${p}'`);
    if (this.readOnly && mode & fs.constants.W_OK) {
      throw EROFS(`access '${p}'`);
    }
  }
  async statPromise(p, opts = {bigint: false}) {
    if (opts.bigint)
      return this.statSync(p, {bigint: true});
    return this.statSync(p);
  }
  statSync(p, opts = {bigint: false, throwIfNoEntry: true}) {
    const resolvedP = this.resolveFilename(`stat '${p}'`, p, void 0, opts.throwIfNoEntry);
    if (resolvedP === void 0)
      return void 0;
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) {
      if (opts.throwIfNoEntry === false)
        return void 0;
      throw ENOENT(`stat '${p}'`);
    }
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`stat '${p}'`);
    return this.statImpl(`stat '${p}'`, resolvedP, opts);
  }
  async fstatPromise(fd, opts) {
    return this.fstatSync(fd, opts);
  }
  fstatSync(fd, opts) {
    const entry = this.fds.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fstatSync`);
    const {p} = entry;
    const resolvedP = this.resolveFilename(`stat '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`stat '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`stat '${p}'`);
    return this.statImpl(`fstat '${p}'`, resolvedP, opts);
  }
  async lstatPromise(p, opts = {bigint: false}) {
    if (opts.bigint)
      return this.lstatSync(p, {bigint: true});
    return this.lstatSync(p);
  }
  lstatSync(p, opts = {bigint: false, throwIfNoEntry: true}) {
    const resolvedP = this.resolveFilename(`lstat '${p}'`, p, false, opts.throwIfNoEntry);
    if (resolvedP === void 0)
      return void 0;
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP)) {
      if (opts.throwIfNoEntry === false)
        return void 0;
      throw ENOENT(`lstat '${p}'`);
    }
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`lstat '${p}'`);
    return this.statImpl(`lstat '${p}'`, resolvedP, opts);
  }
  statImpl(reason, p, opts = {}) {
    const entry = this.entries.get(p);
    if (typeof entry !== `undefined`) {
      const stat = this.libzip.struct.statS();
      const rc = this.libzip.statIndex(this.zip, entry, 0, 0, stat);
      if (rc === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      const uid = this.stats.uid;
      const gid = this.stats.gid;
      const size = this.libzip.struct.statSize(stat) >>> 0;
      const blksize = 512;
      const blocks = Math.ceil(size / blksize);
      const mtimeMs = (this.libzip.struct.statMtime(stat) >>> 0) * 1e3;
      const atimeMs = mtimeMs;
      const birthtimeMs = mtimeMs;
      const ctimeMs = mtimeMs;
      const atime = new Date(atimeMs);
      const birthtime = new Date(birthtimeMs);
      const ctime = new Date(ctimeMs);
      const mtime = new Date(mtimeMs);
      const type = this.listings.has(p) ? S_IFDIR : this.isSymbolicLink(entry) ? S_IFLNK : S_IFREG;
      const defaultMode = type === S_IFDIR ? 493 : 420;
      const mode = type | this.getUnixMode(entry, defaultMode) & 511;
      const crc = this.libzip.struct.statCrc(stat);
      const statInstance = Object.assign(new StatEntry(), {uid, gid, size, blksize, blocks, atime, birthtime, ctime, mtime, atimeMs, birthtimeMs, ctimeMs, mtimeMs, mode, crc});
      return opts.bigint === true ? convertToBigIntStats(statInstance) : statInstance;
    }
    if (this.listings.has(p)) {
      const uid = this.stats.uid;
      const gid = this.stats.gid;
      const size = 0;
      const blksize = 512;
      const blocks = 0;
      const atimeMs = this.stats.mtimeMs;
      const birthtimeMs = this.stats.mtimeMs;
      const ctimeMs = this.stats.mtimeMs;
      const mtimeMs = this.stats.mtimeMs;
      const atime = new Date(atimeMs);
      const birthtime = new Date(birthtimeMs);
      const ctime = new Date(ctimeMs);
      const mtime = new Date(mtimeMs);
      const mode = S_IFDIR | 493;
      const crc = 0;
      const statInstance = Object.assign(new StatEntry(), {uid, gid, size, blksize, blocks, atime, birthtime, ctime, mtime, atimeMs, birthtimeMs, ctimeMs, mtimeMs, mode, crc});
      return opts.bigint === true ? convertToBigIntStats(statInstance) : statInstance;
    }
    throw new Error(`Unreachable`);
  }
  getUnixMode(index, defaultMode) {
    const rc = this.libzip.file.getExternalAttributes(this.zip, index, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (rc === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX)
      return defaultMode;
    return this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
  }
  registerListing(p) {
    const existingListing = this.listings.get(p);
    if (existingListing)
      return existingListing;
    const parentListing = this.registerListing(ppath.dirname(p));
    parentListing.add(ppath.basename(p));
    const newListing = new Set();
    this.listings.set(p, newListing);
    return newListing;
  }
  registerEntry(p, index) {
    const parentListing = this.registerListing(ppath.dirname(p));
    parentListing.add(ppath.basename(p));
    this.entries.set(p, index);
  }
  unregisterListing(p) {
    this.listings.delete(p);
    const parentListing = this.listings.get(ppath.dirname(p));
    parentListing == null ? void 0 : parentListing.delete(ppath.basename(p));
  }
  unregisterEntry(p) {
    this.unregisterListing(p);
    const entry = this.entries.get(p);
    this.entries.delete(p);
    if (typeof entry === `undefined`)
      return;
    this.fileSources.delete(entry);
    if (this.isSymbolicLink(entry)) {
      this.symlinkCount--;
    }
  }
  deleteEntry(p, index) {
    this.unregisterEntry(p);
    const rc = this.libzip.delete(this.zip, index);
    if (rc === -1) {
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
  }
  resolveFilename(reason, p, resolveLastComponent = true, throwIfNoEntry = true) {
    if (!this.ready)
      throw EBUSY(`archive closed, ${reason}`);
    let resolvedP = ppath.resolve(PortablePath.root, p);
    if (resolvedP === `/`)
      return PortablePath.root;
    const fileIndex = this.entries.get(resolvedP);
    if (resolveLastComponent && fileIndex !== void 0) {
      if (this.symlinkCount !== 0 && this.isSymbolicLink(fileIndex)) {
        const target = this.getFileSource(fileIndex).toString();
        return this.resolveFilename(reason, ppath.resolve(ppath.dirname(resolvedP), target), true, throwIfNoEntry);
      } else {
        return resolvedP;
      }
    }
    while (true) {
      const parentP = this.resolveFilename(reason, ppath.dirname(resolvedP), true, throwIfNoEntry);
      if (parentP === void 0)
        return parentP;
      const isDir = this.listings.has(parentP);
      const doesExist = this.entries.has(parentP);
      if (!isDir && !doesExist) {
        if (throwIfNoEntry === false)
          return void 0;
        throw ENOENT(reason);
      }
      if (!isDir)
        throw ENOTDIR(reason);
      resolvedP = ppath.resolve(parentP, ppath.basename(resolvedP));
      if (!resolveLastComponent || this.symlinkCount === 0)
        break;
      const index = this.libzip.name.locate(this.zip, resolvedP.slice(1));
      if (index === -1)
        break;
      if (this.isSymbolicLink(index)) {
        const target = this.getFileSource(index).toString();
        resolvedP = ppath.resolve(ppath.dirname(resolvedP), target);
      } else {
        break;
      }
    }
    return resolvedP;
  }
  allocateBuffer(content) {
    if (!Buffer.isBuffer(content))
      content = Buffer.from(content);
    const buffer = this.libzip.malloc(content.byteLength);
    if (!buffer)
      throw new Error(`Couldn't allocate enough memory`);
    const heap = new Uint8Array(this.libzip.HEAPU8.buffer, buffer, content.byteLength);
    heap.set(content);
    return {buffer, byteLength: content.byteLength};
  }
  allocateUnattachedSource(content) {
    const error = this.libzip.struct.errorS();
    const {buffer, byteLength} = this.allocateBuffer(content);
    const source = this.libzip.source.fromUnattachedBuffer(buffer, byteLength, 0, true, error);
    if (source === 0) {
      this.libzip.free(error);
      throw this.makeLibzipError(error);
    }
    return source;
  }
  allocateSource(content) {
    const {buffer, byteLength} = this.allocateBuffer(content);
    const source = this.libzip.source.fromBuffer(this.zip, buffer, byteLength, 0, true);
    if (source === 0) {
      this.libzip.free(buffer);
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
    return source;
  }
  setFileSource(p, content) {
    const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const target = ppath.relative(PortablePath.root, p);
    const lzSource = this.allocateSource(content);
    try {
      const newIndex = this.libzip.file.add(this.zip, target, lzSource, this.libzip.ZIP_FL_OVERWRITE);
      if (newIndex === -1)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      if (this.level !== `mixed`) {
        const method = this.level === 0 ? this.libzip.ZIP_CM_STORE : this.libzip.ZIP_CM_DEFLATE;
        const rc = this.libzip.file.setCompression(this.zip, newIndex, 0, method, this.level);
        if (rc === -1) {
          throw this.makeLibzipError(this.libzip.getError(this.zip));
        }
      }
      this.fileSources.set(newIndex, buffer);
      return newIndex;
    } catch (error) {
      this.libzip.source.free(lzSource);
      throw error;
    }
  }
  isSymbolicLink(index) {
    if (this.symlinkCount === 0)
      return false;
    const attrs = this.libzip.file.getExternalAttributes(this.zip, index, 0, 0, this.libzip.uint08S, this.libzip.uint32S);
    if (attrs === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    const opsys = this.libzip.getValue(this.libzip.uint08S, `i8`) >>> 0;
    if (opsys !== this.libzip.ZIP_OPSYS_UNIX)
      return false;
    const attributes = this.libzip.getValue(this.libzip.uint32S, `i32`) >>> 16;
    return (attributes & S_IFMT) === S_IFLNK;
  }
  getFileSource(index, opts = {asyncDecompress: false}) {
    const cachedFileSource = this.fileSources.get(index);
    if (typeof cachedFileSource !== `undefined`)
      return cachedFileSource;
    const stat = this.libzip.struct.statS();
    const rc = this.libzip.statIndex(this.zip, index, 0, 0, stat);
    if (rc === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    const size = this.libzip.struct.statCompSize(stat);
    const compressionMethod = this.libzip.struct.statCompMethod(stat);
    const buffer = this.libzip.malloc(size);
    try {
      const file = this.libzip.fopenIndex(this.zip, index, 0, this.libzip.ZIP_FL_COMPRESSED);
      if (file === 0)
        throw this.makeLibzipError(this.libzip.getError(this.zip));
      try {
        const rc2 = this.libzip.fread(file, buffer, size, 0);
        if (rc2 === -1)
          throw this.makeLibzipError(this.libzip.file.getError(file));
        else if (rc2 < size)
          throw new Error(`Incomplete read`);
        else if (rc2 > size)
          throw new Error(`Overread`);
        const memory = this.libzip.HEAPU8.subarray(buffer, buffer + size);
        const data = Buffer.from(memory);
        if (compressionMethod === 0) {
          this.fileSources.set(index, data);
          return data;
        } else if (opts.asyncDecompress) {
          return new Promise((resolve, reject) => {
            zlib__default.default.inflateRaw(data, (error, result) => {
              if (error) {
                reject(error);
              } else {
                this.fileSources.set(index, result);
                resolve(result);
              }
            });
          });
        } else {
          const decompressedData = zlib__default.default.inflateRawSync(data);
          this.fileSources.set(index, decompressedData);
          return decompressedData;
        }
      } finally {
        this.libzip.fclose(file);
      }
    } finally {
      this.libzip.free(buffer);
    }
  }
  async fchmodPromise(fd, mask) {
    return this.chmodPromise(this.fdToPath(fd, `fchmod`), mask);
  }
  fchmodSync(fd, mask) {
    return this.chmodSync(this.fdToPath(fd, `fchmodSync`), mask);
  }
  async chmodPromise(p, mask) {
    return this.chmodSync(p, mask);
  }
  chmodSync(p, mask) {
    if (this.readOnly)
      throw EROFS(`chmod '${p}'`);
    mask &= 493;
    const resolvedP = this.resolveFilename(`chmod '${p}'`, p, false);
    const entry = this.entries.get(resolvedP);
    if (typeof entry === `undefined`)
      throw new Error(`Assertion failed: The entry should have been registered (${resolvedP})`);
    const oldMod = this.getUnixMode(entry, S_IFREG | 0);
    const newMod = oldMod & ~511 | mask;
    const rc = this.libzip.file.setExternalAttributes(this.zip, entry, 0, 0, this.libzip.ZIP_OPSYS_UNIX, newMod << 16);
    if (rc === -1) {
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
  }
  async chownPromise(p, uid, gid) {
    return this.chownSync(p, uid, gid);
  }
  chownSync(p, uid, gid) {
    throw new Error(`Unimplemented`);
  }
  async renamePromise(oldP, newP) {
    return this.renameSync(oldP, newP);
  }
  renameSync(oldP, newP) {
    throw new Error(`Unimplemented`);
  }
  async copyFilePromise(sourceP, destP, flags) {
    const {indexSource, indexDest, resolvedDestP} = this.prepareCopyFile(sourceP, destP, flags);
    const source = await this.getFileSource(indexSource, {asyncDecompress: true});
    const newIndex = this.setFileSource(resolvedDestP, source);
    if (newIndex !== indexDest) {
      this.registerEntry(resolvedDestP, newIndex);
    }
  }
  copyFileSync(sourceP, destP, flags = 0) {
    const {indexSource, indexDest, resolvedDestP} = this.prepareCopyFile(sourceP, destP, flags);
    const source = this.getFileSource(indexSource);
    const newIndex = this.setFileSource(resolvedDestP, source);
    if (newIndex !== indexDest) {
      this.registerEntry(resolvedDestP, newIndex);
    }
  }
  prepareCopyFile(sourceP, destP, flags = 0) {
    if (this.readOnly)
      throw EROFS(`copyfile '${sourceP} -> '${destP}'`);
    if ((flags & fs.constants.COPYFILE_FICLONE_FORCE) !== 0)
      throw ENOSYS(`unsupported clone operation`, `copyfile '${sourceP}' -> ${destP}'`);
    const resolvedSourceP = this.resolveFilename(`copyfile '${sourceP} -> ${destP}'`, sourceP);
    const indexSource = this.entries.get(resolvedSourceP);
    if (typeof indexSource === `undefined`)
      throw EINVAL(`copyfile '${sourceP}' -> '${destP}'`);
    const resolvedDestP = this.resolveFilename(`copyfile '${sourceP}' -> ${destP}'`, destP);
    const indexDest = this.entries.get(resolvedDestP);
    if ((flags & (fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE_FORCE)) !== 0 && typeof indexDest !== `undefined`)
      throw EEXIST(`copyfile '${sourceP}' -> '${destP}'`);
    return {
      indexSource,
      resolvedDestP,
      indexDest
    };
  }
  async appendFilePromise(p, content, opts) {
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    if (typeof opts === `undefined`)
      opts = {flag: `a`};
    else if (typeof opts === `string`)
      opts = {flag: `a`, encoding: opts};
    else if (typeof opts.flag === `undefined`)
      opts = __spreadValues$4({flag: `a`}, opts);
    return this.writeFilePromise(p, content, opts);
  }
  appendFileSync(p, content, opts = {}) {
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    if (typeof opts === `undefined`)
      opts = {flag: `a`};
    else if (typeof opts === `string`)
      opts = {flag: `a`, encoding: opts};
    else if (typeof opts.flag === `undefined`)
      opts = __spreadValues$4({flag: `a`}, opts);
    return this.writeFileSync(p, content, opts);
  }
  fdToPath(fd, reason) {
    var _a;
    const path = (_a = this.fds.get(fd)) == null ? void 0 : _a.p;
    if (typeof path === `undefined`)
      throw EBADF(reason);
    return path;
  }
  async writeFilePromise(p, content, opts) {
    const {encoding, mode, index, resolvedP} = this.prepareWriteFile(p, opts);
    if (index !== void 0 && typeof opts === `object` && opts.flag && opts.flag.includes(`a`))
      content = Buffer.concat([await this.getFileSource(index, {asyncDecompress: true}), Buffer.from(content)]);
    if (encoding !== null)
      content = content.toString(encoding);
    const newIndex = this.setFileSource(resolvedP, content);
    if (newIndex !== index)
      this.registerEntry(resolvedP, newIndex);
    if (mode !== null) {
      await this.chmodPromise(resolvedP, mode);
    }
  }
  writeFileSync(p, content, opts) {
    const {encoding, mode, index, resolvedP} = this.prepareWriteFile(p, opts);
    if (index !== void 0 && typeof opts === `object` && opts.flag && opts.flag.includes(`a`))
      content = Buffer.concat([this.getFileSource(index), Buffer.from(content)]);
    if (encoding !== null)
      content = content.toString(encoding);
    const newIndex = this.setFileSource(resolvedP, content);
    if (newIndex !== index)
      this.registerEntry(resolvedP, newIndex);
    if (mode !== null) {
      this.chmodSync(resolvedP, mode);
    }
  }
  prepareWriteFile(p, opts) {
    if (typeof p === `number`)
      p = this.fdToPath(p, `read`);
    if (this.readOnly)
      throw EROFS(`open '${p}'`);
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    if (this.listings.has(resolvedP))
      throw EISDIR(`open '${p}'`);
    let encoding = null, mode = null;
    if (typeof opts === `string`) {
      encoding = opts;
    } else if (typeof opts === `object`) {
      ({
        encoding = null,
        mode = null
      } = opts);
    }
    const index = this.entries.get(resolvedP);
    return {
      encoding,
      mode,
      resolvedP,
      index
    };
  }
  async unlinkPromise(p) {
    return this.unlinkSync(p);
  }
  unlinkSync(p) {
    if (this.readOnly)
      throw EROFS(`unlink '${p}'`);
    const resolvedP = this.resolveFilename(`unlink '${p}'`, p);
    if (this.listings.has(resolvedP))
      throw EISDIR(`unlink '${p}'`);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`unlink '${p}'`);
    this.deleteEntry(resolvedP, index);
  }
  async utimesPromise(p, atime, mtime) {
    return this.utimesSync(p, atime, mtime);
  }
  utimesSync(p, atime, mtime) {
    if (this.readOnly)
      throw EROFS(`utimes '${p}'`);
    const resolvedP = this.resolveFilename(`utimes '${p}'`, p);
    this.utimesImpl(resolvedP, mtime);
  }
  async lutimesPromise(p, atime, mtime) {
    return this.lutimesSync(p, atime, mtime);
  }
  lutimesSync(p, atime, mtime) {
    if (this.readOnly)
      throw EROFS(`lutimes '${p}'`);
    const resolvedP = this.resolveFilename(`utimes '${p}'`, p, false);
    this.utimesImpl(resolvedP, mtime);
  }
  utimesImpl(resolvedP, mtime) {
    if (this.listings.has(resolvedP)) {
      if (!this.entries.has(resolvedP))
        this.hydrateDirectory(resolvedP);
    }
    const entry = this.entries.get(resolvedP);
    if (entry === void 0)
      throw new Error(`Unreachable`);
    const rc = this.libzip.file.setMtime(this.zip, entry, 0, toUnixTimestamp(mtime), 0);
    if (rc === -1) {
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    }
  }
  async mkdirPromise(p, opts) {
    return this.mkdirSync(p, opts);
  }
  mkdirSync(p, {mode = 493, recursive = false} = {}) {
    if (recursive)
      return this.mkdirpSync(p, {chmod: mode});
    if (this.readOnly)
      throw EROFS(`mkdir '${p}'`);
    const resolvedP = this.resolveFilename(`mkdir '${p}'`, p);
    if (this.entries.has(resolvedP) || this.listings.has(resolvedP))
      throw EEXIST(`mkdir '${p}'`);
    this.hydrateDirectory(resolvedP);
    this.chmodSync(resolvedP, mode);
    return void 0;
  }
  async rmdirPromise(p, opts) {
    return this.rmdirSync(p, opts);
  }
  rmdirSync(p, {recursive = false} = {}) {
    if (this.readOnly)
      throw EROFS(`rmdir '${p}'`);
    if (recursive) {
      this.removeSync(p);
      return;
    }
    const resolvedP = this.resolveFilename(`rmdir '${p}'`, p);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`rmdir '${p}'`);
    if (directoryListing.size > 0)
      throw ENOTEMPTY(`rmdir '${p}'`);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`rmdir '${p}'`);
    this.deleteEntry(p, index);
  }
  hydrateDirectory(resolvedP) {
    const index = this.libzip.dir.add(this.zip, ppath.relative(PortablePath.root, resolvedP));
    if (index === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    this.registerListing(resolvedP);
    this.registerEntry(resolvedP, index);
    return index;
  }
  async linkPromise(existingP, newP) {
    return this.linkSync(existingP, newP);
  }
  linkSync(existingP, newP) {
    throw EOPNOTSUPP(`link '${existingP}' -> '${newP}'`);
  }
  async symlinkPromise(target, p) {
    return this.symlinkSync(target, p);
  }
  symlinkSync(target, p) {
    if (this.readOnly)
      throw EROFS(`symlink '${target}' -> '${p}'`);
    const resolvedP = this.resolveFilename(`symlink '${target}' -> '${p}'`, p);
    if (this.listings.has(resolvedP))
      throw EISDIR(`symlink '${target}' -> '${p}'`);
    if (this.entries.has(resolvedP))
      throw EEXIST(`symlink '${target}' -> '${p}'`);
    const index = this.setFileSource(resolvedP, target);
    this.registerEntry(resolvedP, index);
    const rc = this.libzip.file.setExternalAttributes(this.zip, index, 0, 0, this.libzip.ZIP_OPSYS_UNIX, (S_IFLNK | 511) << 16);
    if (rc === -1)
      throw this.makeLibzipError(this.libzip.getError(this.zip));
    this.symlinkCount += 1;
  }
  async readFilePromise(p, encoding) {
    if (typeof encoding === `object`)
      encoding = encoding ? encoding.encoding : void 0;
    const data = await this.readFileBuffer(p, {asyncDecompress: true});
    return encoding ? data.toString(encoding) : data;
  }
  readFileSync(p, encoding) {
    if (typeof encoding === `object`)
      encoding = encoding ? encoding.encoding : void 0;
    const data = this.readFileBuffer(p);
    return encoding ? data.toString(encoding) : data;
  }
  readFileBuffer(p, opts = {asyncDecompress: false}) {
    if (typeof p === `number`)
      p = this.fdToPath(p, `read`);
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`open '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`open '${p}'`);
    if (this.listings.has(resolvedP))
      throw EISDIR(`read`);
    const entry = this.entries.get(resolvedP);
    if (entry === void 0)
      throw new Error(`Unreachable`);
    return this.getFileSource(entry, opts);
  }
  async readdirPromise(p, opts) {
    return this.readdirSync(p, opts);
  }
  readdirSync(p, opts) {
    const resolvedP = this.resolveFilename(`scandir '${p}'`, p);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`scandir '${p}'`);
    const directoryListing = this.listings.get(resolvedP);
    if (!directoryListing)
      throw ENOTDIR(`scandir '${p}'`);
    const entries = [...directoryListing];
    if (!(opts == null ? void 0 : opts.withFileTypes))
      return entries;
    return entries.map((name) => {
      return Object.assign(this.statImpl(`lstat`, ppath.join(p, name)), {
        name
      });
    });
  }
  async readlinkPromise(p) {
    const entry = this.prepareReadlink(p);
    return (await this.getFileSource(entry, {asyncDecompress: true})).toString();
  }
  readlinkSync(p) {
    const entry = this.prepareReadlink(p);
    return this.getFileSource(entry).toString();
  }
  prepareReadlink(p) {
    const resolvedP = this.resolveFilename(`readlink '${p}'`, p, false);
    if (!this.entries.has(resolvedP) && !this.listings.has(resolvedP))
      throw ENOENT(`readlink '${p}'`);
    if (p[p.length - 1] === `/` && !this.listings.has(resolvedP))
      throw ENOTDIR(`open '${p}'`);
    if (this.listings.has(resolvedP))
      throw EINVAL(`readlink '${p}'`);
    const entry = this.entries.get(resolvedP);
    if (entry === void 0)
      throw new Error(`Unreachable`);
    if (!this.isSymbolicLink(entry))
      throw EINVAL(`readlink '${p}'`);
    return entry;
  }
  async truncatePromise(p, len = 0) {
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`open '${p}'`);
    const source = await this.getFileSource(index, {asyncDecompress: true});
    const truncated = Buffer.alloc(len, 0);
    source.copy(truncated);
    return await this.writeFilePromise(p, truncated);
  }
  truncateSync(p, len = 0) {
    const resolvedP = this.resolveFilename(`open '${p}'`, p);
    const index = this.entries.get(resolvedP);
    if (typeof index === `undefined`)
      throw EINVAL(`open '${p}'`);
    const source = this.getFileSource(index);
    const truncated = Buffer.alloc(len, 0);
    source.copy(truncated);
    return this.writeFileSync(p, truncated);
  }
  async ftruncatePromise(fd, len) {
    return this.truncatePromise(this.fdToPath(fd, `ftruncate`), len);
  }
  ftruncateSync(fd, len) {
    return this.truncateSync(this.fdToPath(fd, `ftruncateSync`), len);
  }
  watch(p, a, b) {
    let persistent;
    switch (typeof a) {
      case `function`:
      case `string`:
      case `undefined`:
        {
          persistent = true;
        }
        break;
      default:
        {
          ({persistent = true} = a);
        }
        break;
    }
    if (!persistent)
      return {on: () => {
      }, close: () => {
      }};
    const interval = setInterval(() => {
    }, 24 * 60 * 60 * 1e3);
    return {on: () => {
    }, close: () => {
      clearInterval(interval);
    }};
  }
  watchFile(p, a, b) {
    const resolvedP = ppath.resolve(PortablePath.root, p);
    return watchFile(this, resolvedP, a, b);
  }
  unwatchFile(p, cb) {
    const resolvedP = ppath.resolve(PortablePath.root, p);
    return unwatchFile(this, resolvedP, cb);
  }
}

class ProxiedFS extends FakeFS {
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }
  resolve(path) {
    return this.mapFromBase(this.baseFs.resolve(this.mapToBase(path)));
  }
  getRealPath() {
    return this.mapFromBase(this.baseFs.getRealPath());
  }
  async openPromise(p, flags, mode) {
    return this.baseFs.openPromise(this.mapToBase(p), flags, mode);
  }
  openSync(p, flags, mode) {
    return this.baseFs.openSync(this.mapToBase(p), flags, mode);
  }
  async opendirPromise(p, opts) {
    return Object.assign(await this.baseFs.opendirPromise(this.mapToBase(p), opts), {path: p});
  }
  opendirSync(p, opts) {
    return Object.assign(this.baseFs.opendirSync(this.mapToBase(p), opts), {path: p});
  }
  async readPromise(fd, buffer, offset, length, position) {
    return await this.baseFs.readPromise(fd, buffer, offset, length, position);
  }
  readSync(fd, buffer, offset, length, position) {
    return this.baseFs.readSync(fd, buffer, offset, length, position);
  }
  async writePromise(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return await this.baseFs.writePromise(fd, buffer, offset);
    } else {
      return await this.baseFs.writePromise(fd, buffer, offset, length, position);
    }
  }
  writeSync(fd, buffer, offset, length, position) {
    if (typeof buffer === `string`) {
      return this.baseFs.writeSync(fd, buffer, offset);
    } else {
      return this.baseFs.writeSync(fd, buffer, offset, length, position);
    }
  }
  async closePromise(fd) {
    return this.baseFs.closePromise(fd);
  }
  closeSync(fd) {
    this.baseFs.closeSync(fd);
  }
  createReadStream(p, opts) {
    return this.baseFs.createReadStream(p !== null ? this.mapToBase(p) : p, opts);
  }
  createWriteStream(p, opts) {
    return this.baseFs.createWriteStream(p !== null ? this.mapToBase(p) : p, opts);
  }
  async realpathPromise(p) {
    return this.mapFromBase(await this.baseFs.realpathPromise(this.mapToBase(p)));
  }
  realpathSync(p) {
    return this.mapFromBase(this.baseFs.realpathSync(this.mapToBase(p)));
  }
  async existsPromise(p) {
    return this.baseFs.existsPromise(this.mapToBase(p));
  }
  existsSync(p) {
    return this.baseFs.existsSync(this.mapToBase(p));
  }
  accessSync(p, mode) {
    return this.baseFs.accessSync(this.mapToBase(p), mode);
  }
  async accessPromise(p, mode) {
    return this.baseFs.accessPromise(this.mapToBase(p), mode);
  }
  async statPromise(p, opts) {
    return this.baseFs.statPromise(this.mapToBase(p), opts);
  }
  statSync(p, opts) {
    return this.baseFs.statSync(this.mapToBase(p), opts);
  }
  async fstatPromise(fd, opts) {
    return this.baseFs.fstatPromise(fd, opts);
  }
  fstatSync(fd, opts) {
    return this.baseFs.fstatSync(fd, opts);
  }
  lstatPromise(p, opts) {
    return this.baseFs.lstatPromise(this.mapToBase(p), opts);
  }
  lstatSync(p, opts) {
    return this.baseFs.lstatSync(this.mapToBase(p), opts);
  }
  async fchmodPromise(fd, mask) {
    return this.baseFs.fchmodPromise(fd, mask);
  }
  fchmodSync(fd, mask) {
    return this.baseFs.fchmodSync(fd, mask);
  }
  async chmodPromise(p, mask) {
    return this.baseFs.chmodPromise(this.mapToBase(p), mask);
  }
  chmodSync(p, mask) {
    return this.baseFs.chmodSync(this.mapToBase(p), mask);
  }
  async chownPromise(p, uid, gid) {
    return this.baseFs.chownPromise(this.mapToBase(p), uid, gid);
  }
  chownSync(p, uid, gid) {
    return this.baseFs.chownSync(this.mapToBase(p), uid, gid);
  }
  async renamePromise(oldP, newP) {
    return this.baseFs.renamePromise(this.mapToBase(oldP), this.mapToBase(newP));
  }
  renameSync(oldP, newP) {
    return this.baseFs.renameSync(this.mapToBase(oldP), this.mapToBase(newP));
  }
  async copyFilePromise(sourceP, destP, flags = 0) {
    return this.baseFs.copyFilePromise(this.mapToBase(sourceP), this.mapToBase(destP), flags);
  }
  copyFileSync(sourceP, destP, flags = 0) {
    return this.baseFs.copyFileSync(this.mapToBase(sourceP), this.mapToBase(destP), flags);
  }
  async appendFilePromise(p, content, opts) {
    return this.baseFs.appendFilePromise(this.fsMapToBase(p), content, opts);
  }
  appendFileSync(p, content, opts) {
    return this.baseFs.appendFileSync(this.fsMapToBase(p), content, opts);
  }
  async writeFilePromise(p, content, opts) {
    return this.baseFs.writeFilePromise(this.fsMapToBase(p), content, opts);
  }
  writeFileSync(p, content, opts) {
    return this.baseFs.writeFileSync(this.fsMapToBase(p), content, opts);
  }
  async unlinkPromise(p) {
    return this.baseFs.unlinkPromise(this.mapToBase(p));
  }
  unlinkSync(p) {
    return this.baseFs.unlinkSync(this.mapToBase(p));
  }
  async utimesPromise(p, atime, mtime) {
    return this.baseFs.utimesPromise(this.mapToBase(p), atime, mtime);
  }
  utimesSync(p, atime, mtime) {
    return this.baseFs.utimesSync(this.mapToBase(p), atime, mtime);
  }
  async mkdirPromise(p, opts) {
    return this.baseFs.mkdirPromise(this.mapToBase(p), opts);
  }
  mkdirSync(p, opts) {
    return this.baseFs.mkdirSync(this.mapToBase(p), opts);
  }
  async rmdirPromise(p, opts) {
    return this.baseFs.rmdirPromise(this.mapToBase(p), opts);
  }
  rmdirSync(p, opts) {
    return this.baseFs.rmdirSync(this.mapToBase(p), opts);
  }
  async linkPromise(existingP, newP) {
    return this.baseFs.linkPromise(this.mapToBase(existingP), this.mapToBase(newP));
  }
  linkSync(existingP, newP) {
    return this.baseFs.linkSync(this.mapToBase(existingP), this.mapToBase(newP));
  }
  async symlinkPromise(target, p, type) {
    const mappedP = this.mapToBase(p);
    if (this.pathUtils.isAbsolute(target))
      return this.baseFs.symlinkPromise(this.mapToBase(target), mappedP, type);
    const mappedAbsoluteTarget = this.mapToBase(this.pathUtils.join(this.pathUtils.dirname(p), target));
    const mappedTarget = this.baseFs.pathUtils.relative(this.baseFs.pathUtils.dirname(mappedP), mappedAbsoluteTarget);
    return this.baseFs.symlinkPromise(mappedTarget, mappedP, type);
  }
  symlinkSync(target, p, type) {
    const mappedP = this.mapToBase(p);
    if (this.pathUtils.isAbsolute(target))
      return this.baseFs.symlinkSync(this.mapToBase(target), mappedP, type);
    const mappedAbsoluteTarget = this.mapToBase(this.pathUtils.join(this.pathUtils.dirname(p), target));
    const mappedTarget = this.baseFs.pathUtils.relative(this.baseFs.pathUtils.dirname(mappedP), mappedAbsoluteTarget);
    return this.baseFs.symlinkSync(mappedTarget, mappedP, type);
  }
  async readFilePromise(p, encoding) {
    if (encoding === `utf8`) {
      return this.baseFs.readFilePromise(this.fsMapToBase(p), encoding);
    } else {
      return this.baseFs.readFilePromise(this.fsMapToBase(p), encoding);
    }
  }
  readFileSync(p, encoding) {
    if (encoding === `utf8`) {
      return this.baseFs.readFileSync(this.fsMapToBase(p), encoding);
    } else {
      return this.baseFs.readFileSync(this.fsMapToBase(p), encoding);
    }
  }
  async readdirPromise(p, opts) {
    return this.baseFs.readdirPromise(this.mapToBase(p), opts);
  }
  readdirSync(p, opts) {
    return this.baseFs.readdirSync(this.mapToBase(p), opts);
  }
  async readlinkPromise(p) {
    return this.mapFromBase(await this.baseFs.readlinkPromise(this.mapToBase(p)));
  }
  readlinkSync(p) {
    return this.mapFromBase(this.baseFs.readlinkSync(this.mapToBase(p)));
  }
  async truncatePromise(p, len) {
    return this.baseFs.truncatePromise(this.mapToBase(p), len);
  }
  truncateSync(p, len) {
    return this.baseFs.truncateSync(this.mapToBase(p), len);
  }
  async ftruncatePromise(fd, len) {
    return this.baseFs.ftruncatePromise(fd, len);
  }
  ftruncateSync(fd, len) {
    return this.baseFs.ftruncateSync(fd, len);
  }
  watch(p, a, b) {
    return this.baseFs.watch(this.mapToBase(p), a, b);
  }
  watchFile(p, a, b) {
    return this.baseFs.watchFile(this.mapToBase(p), a, b);
  }
  unwatchFile(p, cb) {
    return this.baseFs.unwatchFile(this.mapToBase(p), cb);
  }
  fsMapToBase(p) {
    if (typeof p === `number`) {
      return p;
    } else {
      return this.mapToBase(p);
    }
  }
}

class PosixFS extends ProxiedFS {
  constructor(baseFs) {
    super(npath);
    this.baseFs = baseFs;
  }
  mapFromBase(path) {
    return npath.fromPortablePath(path);
  }
  mapToBase(path) {
    return npath.toPortablePath(path);
  }
}

const NUMBER_REGEXP = /^[0-9]+$/;
const VIRTUAL_REGEXP = /^(\/(?:[^/]+\/)*?(?:\$\$virtual|__virtual__))((?:\/((?:[^/]+-)?[a-f0-9]+)(?:\/([^/]+))?)?((?:\/.*)?))$/;
const VALID_COMPONENT = /^([^/]+-)?[a-f0-9]+$/;
class VirtualFS extends ProxiedFS {
  static makeVirtualPath(base, component, to) {
    if (ppath.basename(base) !== `__virtual__`)
      throw new Error(`Assertion failed: Virtual folders must be named "__virtual__"`);
    if (!ppath.basename(component).match(VALID_COMPONENT))
      throw new Error(`Assertion failed: Virtual components must be ended by an hexadecimal hash`);
    const target = ppath.relative(ppath.dirname(base), to);
    const segments = target.split(`/`);
    let depth = 0;
    while (depth < segments.length && segments[depth] === `..`)
      depth += 1;
    const finalSegments = segments.slice(depth);
    const fullVirtualPath = ppath.join(base, component, String(depth), ...finalSegments);
    return fullVirtualPath;
  }
  static resolveVirtual(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match || !match[3] && match[5])
      return p;
    const target = ppath.dirname(match[1]);
    if (!match[3] || !match[4])
      return target;
    const isnum = NUMBER_REGEXP.test(match[4]);
    if (!isnum)
      return p;
    const depth = Number(match[4]);
    const backstep = `../`.repeat(depth);
    const subpath = match[5] || `.`;
    return VirtualFS.resolveVirtual(ppath.join(target, backstep, subpath));
  }
  constructor({baseFs = new NodeFS()} = {}) {
    super(ppath);
    this.baseFs = baseFs;
  }
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }
  getRealPath() {
    return this.baseFs.getRealPath();
  }
  realpathSync(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match)
      return this.baseFs.realpathSync(p);
    if (!match[5])
      return p;
    const realpath = this.baseFs.realpathSync(this.mapToBase(p));
    return VirtualFS.makeVirtualPath(match[1], match[3], realpath);
  }
  async realpathPromise(p) {
    const match = p.match(VIRTUAL_REGEXP);
    if (!match)
      return await this.baseFs.realpathPromise(p);
    if (!match[5])
      return p;
    const realpath = await this.baseFs.realpathPromise(this.mapToBase(p));
    return VirtualFS.makeVirtualPath(match[1], match[3], realpath);
  }
  mapToBase(p) {
    if (p === ``)
      return p;
    if (this.pathUtils.isAbsolute(p))
      return VirtualFS.resolveVirtual(p);
    const resolvedRoot = VirtualFS.resolveVirtual(this.baseFs.resolve(PortablePath.dot));
    const resolvedP = VirtualFS.resolveVirtual(this.baseFs.resolve(p));
    return ppath.relative(resolvedRoot, resolvedP) || PortablePath.dot;
  }
  mapFromBase(p) {
    return p;
  }
}

const ZIP_FD = 2147483648;
const getArchivePart = (path, extension) => {
  let idx = path.indexOf(extension);
  if (idx <= 0)
    return null;
  let nextCharIdx = idx;
  while (idx >= 0) {
    nextCharIdx = idx + extension.length;
    if (path[nextCharIdx] === ppath.sep)
      break;
    if (path[idx - 1] === ppath.sep)
      return null;
    idx = path.indexOf(extension, nextCharIdx);
  }
  if (path.length > nextCharIdx && path[nextCharIdx] !== ppath.sep)
    return null;
  return path.slice(0, nextCharIdx);
};
class ZipOpenFS extends BasePortableFakeFS {
  constructor({libzip, baseFs = new NodeFS(), filter = null, maxOpenFiles = Infinity, readOnlyArchives = false, useCache = true, maxAge = 5e3, fileExtensions = null}) {
    super();
    this.fdMap = new Map();
    this.nextFd = 3;
    this.isZip = new Set();
    this.notZip = new Set();
    this.realPaths = new Map();
    this.limitOpenFilesTimeout = null;
    this.libzipFactory = typeof libzip !== `function` ? () => libzip : libzip;
    this.baseFs = baseFs;
    this.zipInstances = useCache ? new Map() : null;
    this.filter = filter;
    this.maxOpenFiles = maxOpenFiles;
    this.readOnlyArchives = readOnlyArchives;
    this.maxAge = maxAge;
    this.fileExtensions = fileExtensions;
  }
  static async openPromise(fn, opts) {
    const zipOpenFs = new ZipOpenFS(opts);
    try {
      return await fn(zipOpenFs);
    } finally {
      zipOpenFs.saveAndClose();
    }
  }
  get libzip() {
    if (typeof this.libzipInstance === `undefined`)
      this.libzipInstance = this.libzipFactory();
    return this.libzipInstance;
  }
  getExtractHint(hints) {
    return this.baseFs.getExtractHint(hints);
  }
  getRealPath() {
    return this.baseFs.getRealPath();
  }
  saveAndClose() {
    unwatchAllFiles(this);
    if (this.zipInstances) {
      for (const [path, {zipFs}] of this.zipInstances.entries()) {
        zipFs.saveAndClose();
        this.zipInstances.delete(path);
      }
    }
  }
  discardAndClose() {
    unwatchAllFiles(this);
    if (this.zipInstances) {
      for (const [path, {zipFs}] of this.zipInstances.entries()) {
        zipFs.discardAndClose();
        this.zipInstances.delete(path);
      }
    }
  }
  resolve(p) {
    return this.baseFs.resolve(p);
  }
  remapFd(zipFs, fd) {
    const remappedFd = this.nextFd++ | ZIP_FD;
    this.fdMap.set(remappedFd, [zipFs, fd]);
    return remappedFd;
  }
  async openPromise(p, flags, mode) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.openPromise(p, flags, mode);
    }, async (zipFs, {subPath}) => {
      return this.remapFd(zipFs, await zipFs.openPromise(subPath, flags, mode));
    });
  }
  openSync(p, flags, mode) {
    return this.makeCallSync(p, () => {
      return this.baseFs.openSync(p, flags, mode);
    }, (zipFs, {subPath}) => {
      return this.remapFd(zipFs, zipFs.openSync(subPath, flags, mode));
    });
  }
  async opendirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.opendirPromise(p, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.opendirPromise(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  opendirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.opendirSync(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.opendirSync(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  async readPromise(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0)
      return await this.baseFs.readPromise(fd, buffer, offset, length, position);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`read`);
    const [zipFs, realFd] = entry;
    return await zipFs.readPromise(realFd, buffer, offset, length, position);
  }
  readSync(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.readSync(fd, buffer, offset, length, position);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`readSync`);
    const [zipFs, realFd] = entry;
    return zipFs.readSync(realFd, buffer, offset, length, position);
  }
  async writePromise(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0) {
      if (typeof buffer === `string`) {
        return await this.baseFs.writePromise(fd, buffer, offset);
      } else {
        return await this.baseFs.writePromise(fd, buffer, offset, length, position);
      }
    }
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`write`);
    const [zipFs, realFd] = entry;
    if (typeof buffer === `string`) {
      return await zipFs.writePromise(realFd, buffer, offset);
    } else {
      return await zipFs.writePromise(realFd, buffer, offset, length, position);
    }
  }
  writeSync(fd, buffer, offset, length, position) {
    if ((fd & ZIP_FD) === 0) {
      if (typeof buffer === `string`) {
        return this.baseFs.writeSync(fd, buffer, offset);
      } else {
        return this.baseFs.writeSync(fd, buffer, offset, length, position);
      }
    }
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`writeSync`);
    const [zipFs, realFd] = entry;
    if (typeof buffer === `string`) {
      return zipFs.writeSync(realFd, buffer, offset);
    } else {
      return zipFs.writeSync(realFd, buffer, offset, length, position);
    }
  }
  async closePromise(fd) {
    if ((fd & ZIP_FD) === 0)
      return await this.baseFs.closePromise(fd);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`close`);
    this.fdMap.delete(fd);
    const [zipFs, realFd] = entry;
    return await zipFs.closePromise(realFd);
  }
  closeSync(fd) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.closeSync(fd);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`closeSync`);
    this.fdMap.delete(fd);
    const [zipFs, realFd] = entry;
    return zipFs.closeSync(realFd);
  }
  createReadStream(p, opts) {
    if (p === null)
      return this.baseFs.createReadStream(p, opts);
    return this.makeCallSync(p, () => {
      return this.baseFs.createReadStream(p, opts);
    }, (zipFs, {archivePath, subPath}) => {
      const stream = zipFs.createReadStream(subPath, opts);
      stream.path = npath.fromPortablePath(this.pathUtils.join(archivePath, subPath));
      return stream;
    });
  }
  createWriteStream(p, opts) {
    if (p === null)
      return this.baseFs.createWriteStream(p, opts);
    return this.makeCallSync(p, () => {
      return this.baseFs.createWriteStream(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.createWriteStream(subPath, opts);
    });
  }
  async realpathPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.realpathPromise(p);
    }, async (zipFs, {archivePath, subPath}) => {
      let realArchivePath = this.realPaths.get(archivePath);
      if (typeof realArchivePath === `undefined`) {
        realArchivePath = await this.baseFs.realpathPromise(archivePath);
        this.realPaths.set(archivePath, realArchivePath);
      }
      return this.pathUtils.join(realArchivePath, this.pathUtils.relative(PortablePath.root, await zipFs.realpathPromise(subPath)));
    });
  }
  realpathSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.realpathSync(p);
    }, (zipFs, {archivePath, subPath}) => {
      let realArchivePath = this.realPaths.get(archivePath);
      if (typeof realArchivePath === `undefined`) {
        realArchivePath = this.baseFs.realpathSync(archivePath);
        this.realPaths.set(archivePath, realArchivePath);
      }
      return this.pathUtils.join(realArchivePath, this.pathUtils.relative(PortablePath.root, zipFs.realpathSync(subPath)));
    });
  }
  async existsPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.existsPromise(p);
    }, async (zipFs, {subPath}) => {
      return await zipFs.existsPromise(subPath);
    });
  }
  existsSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.existsSync(p);
    }, (zipFs, {subPath}) => {
      return zipFs.existsSync(subPath);
    });
  }
  async accessPromise(p, mode) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.accessPromise(p, mode);
    }, async (zipFs, {subPath}) => {
      return await zipFs.accessPromise(subPath, mode);
    });
  }
  accessSync(p, mode) {
    return this.makeCallSync(p, () => {
      return this.baseFs.accessSync(p, mode);
    }, (zipFs, {subPath}) => {
      return zipFs.accessSync(subPath, mode);
    });
  }
  async statPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.statPromise(p, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.statPromise(subPath, opts);
    });
  }
  statSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.statSync(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.statSync(subPath, opts);
    });
  }
  async fstatPromise(fd, opts) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.fstatPromise(fd, opts);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fstat`);
    const [zipFs, realFd] = entry;
    return zipFs.fstatPromise(realFd, opts);
  }
  fstatSync(fd, opts) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.fstatSync(fd, opts);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fstatSync`);
    const [zipFs, realFd] = entry;
    return zipFs.fstatSync(realFd, opts);
  }
  async lstatPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.lstatPromise(p, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.lstatPromise(subPath, opts);
    });
  }
  lstatSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.lstatSync(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.lstatSync(subPath, opts);
    });
  }
  async fchmodPromise(fd, mask) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.fchmodPromise(fd, mask);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fchmod`);
    const [zipFs, realFd] = entry;
    return zipFs.fchmodPromise(realFd, mask);
  }
  fchmodSync(fd, mask) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.fchmodSync(fd, mask);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`fchmodSync`);
    const [zipFs, realFd] = entry;
    return zipFs.fchmodSync(realFd, mask);
  }
  async chmodPromise(p, mask) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.chmodPromise(p, mask);
    }, async (zipFs, {subPath}) => {
      return await zipFs.chmodPromise(subPath, mask);
    });
  }
  chmodSync(p, mask) {
    return this.makeCallSync(p, () => {
      return this.baseFs.chmodSync(p, mask);
    }, (zipFs, {subPath}) => {
      return zipFs.chmodSync(subPath, mask);
    });
  }
  async chownPromise(p, uid, gid) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.chownPromise(p, uid, gid);
    }, async (zipFs, {subPath}) => {
      return await zipFs.chownPromise(subPath, uid, gid);
    });
  }
  chownSync(p, uid, gid) {
    return this.makeCallSync(p, () => {
      return this.baseFs.chownSync(p, uid, gid);
    }, (zipFs, {subPath}) => {
      return zipFs.chownSync(subPath, uid, gid);
    });
  }
  async renamePromise(oldP, newP) {
    return await this.makeCallPromise(oldP, async () => {
      return await this.makeCallPromise(newP, async () => {
        return await this.baseFs.renamePromise(oldP, newP);
      }, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {code: `EEXDEV`});
      });
    }, async (zipFsO, {subPath: subPathO}) => {
      return await this.makeCallPromise(newP, async () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {code: `EEXDEV`});
      }, async (zipFsN, {subPath: subPathN}) => {
        if (zipFsO !== zipFsN) {
          throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {code: `EEXDEV`});
        } else {
          return await zipFsO.renamePromise(subPathO, subPathN);
        }
      });
    });
  }
  renameSync(oldP, newP) {
    return this.makeCallSync(oldP, () => {
      return this.makeCallSync(newP, () => {
        return this.baseFs.renameSync(oldP, newP);
      }, () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {code: `EEXDEV`});
      });
    }, (zipFsO, {subPath: subPathO}) => {
      return this.makeCallSync(newP, () => {
        throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {code: `EEXDEV`});
      }, (zipFsN, {subPath: subPathN}) => {
        if (zipFsO !== zipFsN) {
          throw Object.assign(new Error(`EEXDEV: cross-device link not permitted`), {code: `EEXDEV`});
        } else {
          return zipFsO.renameSync(subPathO, subPathN);
        }
      });
    });
  }
  async copyFilePromise(sourceP, destP, flags = 0) {
    const fallback = async (sourceFs, sourceP2, destFs, destP2) => {
      if ((flags & fs.constants.COPYFILE_FICLONE_FORCE) !== 0)
        throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP2}' -> ${destP2}'`), {code: `EXDEV`});
      if (flags & fs.constants.COPYFILE_EXCL && await this.existsPromise(sourceP2))
        throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP2}' -> '${destP2}'`), {code: `EEXIST`});
      let content;
      try {
        content = await sourceFs.readFilePromise(sourceP2);
      } catch (error) {
        throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP2}' -> '${destP2}'`), {code: `EINVAL`});
      }
      await destFs.writeFilePromise(destP2, content);
    };
    return await this.makeCallPromise(sourceP, async () => {
      return await this.makeCallPromise(destP, async () => {
        return await this.baseFs.copyFilePromise(sourceP, destP, flags);
      }, async (zipFsD, {subPath: subPathD}) => {
        return await fallback(this.baseFs, sourceP, zipFsD, subPathD);
      });
    }, async (zipFsS, {subPath: subPathS}) => {
      return await this.makeCallPromise(destP, async () => {
        return await fallback(zipFsS, subPathS, this.baseFs, destP);
      }, async (zipFsD, {subPath: subPathD}) => {
        if (zipFsS !== zipFsD) {
          return await fallback(zipFsS, subPathS, zipFsD, subPathD);
        } else {
          return await zipFsS.copyFilePromise(subPathS, subPathD, flags);
        }
      });
    });
  }
  copyFileSync(sourceP, destP, flags = 0) {
    const fallback = (sourceFs, sourceP2, destFs, destP2) => {
      if ((flags & fs.constants.COPYFILE_FICLONE_FORCE) !== 0)
        throw Object.assign(new Error(`EXDEV: cross-device clone not permitted, copyfile '${sourceP2}' -> ${destP2}'`), {code: `EXDEV`});
      if (flags & fs.constants.COPYFILE_EXCL && this.existsSync(sourceP2))
        throw Object.assign(new Error(`EEXIST: file already exists, copyfile '${sourceP2}' -> '${destP2}'`), {code: `EEXIST`});
      let content;
      try {
        content = sourceFs.readFileSync(sourceP2);
      } catch (error) {
        throw Object.assign(new Error(`EINVAL: invalid argument, copyfile '${sourceP2}' -> '${destP2}'`), {code: `EINVAL`});
      }
      destFs.writeFileSync(destP2, content);
    };
    return this.makeCallSync(sourceP, () => {
      return this.makeCallSync(destP, () => {
        return this.baseFs.copyFileSync(sourceP, destP, flags);
      }, (zipFsD, {subPath: subPathD}) => {
        return fallback(this.baseFs, sourceP, zipFsD, subPathD);
      });
    }, (zipFsS, {subPath: subPathS}) => {
      return this.makeCallSync(destP, () => {
        return fallback(zipFsS, subPathS, this.baseFs, destP);
      }, (zipFsD, {subPath: subPathD}) => {
        if (zipFsS !== zipFsD) {
          return fallback(zipFsS, subPathS, zipFsD, subPathD);
        } else {
          return zipFsS.copyFileSync(subPathS, subPathD, flags);
        }
      });
    });
  }
  async appendFilePromise(p, content, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.appendFilePromise(p, content, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.appendFilePromise(subPath, content, opts);
    });
  }
  appendFileSync(p, content, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.appendFileSync(p, content, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.appendFileSync(subPath, content, opts);
    });
  }
  async writeFilePromise(p, content, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.writeFilePromise(p, content, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.writeFilePromise(subPath, content, opts);
    });
  }
  writeFileSync(p, content, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.writeFileSync(p, content, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.writeFileSync(subPath, content, opts);
    });
  }
  async unlinkPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.unlinkPromise(p);
    }, async (zipFs, {subPath}) => {
      return await zipFs.unlinkPromise(subPath);
    });
  }
  unlinkSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.unlinkSync(p);
    }, (zipFs, {subPath}) => {
      return zipFs.unlinkSync(subPath);
    });
  }
  async utimesPromise(p, atime, mtime) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.utimesPromise(p, atime, mtime);
    }, async (zipFs, {subPath}) => {
      return await zipFs.utimesPromise(subPath, atime, mtime);
    });
  }
  utimesSync(p, atime, mtime) {
    return this.makeCallSync(p, () => {
      return this.baseFs.utimesSync(p, atime, mtime);
    }, (zipFs, {subPath}) => {
      return zipFs.utimesSync(subPath, atime, mtime);
    });
  }
  async mkdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.mkdirPromise(p, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.mkdirPromise(subPath, opts);
    });
  }
  mkdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.mkdirSync(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.mkdirSync(subPath, opts);
    });
  }
  async rmdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.rmdirPromise(p, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.rmdirPromise(subPath, opts);
    });
  }
  rmdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.rmdirSync(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.rmdirSync(subPath, opts);
    });
  }
  async linkPromise(existingP, newP) {
    return await this.makeCallPromise(newP, async () => {
      return await this.baseFs.linkPromise(existingP, newP);
    }, async (zipFs, {subPath}) => {
      return await zipFs.linkPromise(existingP, subPath);
    });
  }
  linkSync(existingP, newP) {
    return this.makeCallSync(newP, () => {
      return this.baseFs.linkSync(existingP, newP);
    }, (zipFs, {subPath}) => {
      return zipFs.linkSync(existingP, subPath);
    });
  }
  async symlinkPromise(target, p, type) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.symlinkPromise(target, p, type);
    }, async (zipFs, {subPath}) => {
      return await zipFs.symlinkPromise(target, subPath);
    });
  }
  symlinkSync(target, p, type) {
    return this.makeCallSync(p, () => {
      return this.baseFs.symlinkSync(target, p, type);
    }, (zipFs, {subPath}) => {
      return zipFs.symlinkSync(target, subPath);
    });
  }
  async readFilePromise(p, encoding) {
    return this.makeCallPromise(p, async () => {
      switch (encoding) {
        case `utf8`:
          return await this.baseFs.readFilePromise(p, encoding);
        default:
          return await this.baseFs.readFilePromise(p, encoding);
      }
    }, async (zipFs, {subPath}) => {
      return await zipFs.readFilePromise(subPath, encoding);
    });
  }
  readFileSync(p, encoding) {
    return this.makeCallSync(p, () => {
      switch (encoding) {
        case `utf8`:
          return this.baseFs.readFileSync(p, encoding);
        default:
          return this.baseFs.readFileSync(p, encoding);
      }
    }, (zipFs, {subPath}) => {
      return zipFs.readFileSync(subPath, encoding);
    });
  }
  async readdirPromise(p, opts) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.readdirPromise(p, opts);
    }, async (zipFs, {subPath}) => {
      return await zipFs.readdirPromise(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  readdirSync(p, opts) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readdirSync(p, opts);
    }, (zipFs, {subPath}) => {
      return zipFs.readdirSync(subPath, opts);
    }, {
      requireSubpath: false
    });
  }
  async readlinkPromise(p) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.readlinkPromise(p);
    }, async (zipFs, {subPath}) => {
      return await zipFs.readlinkPromise(subPath);
    });
  }
  readlinkSync(p) {
    return this.makeCallSync(p, () => {
      return this.baseFs.readlinkSync(p);
    }, (zipFs, {subPath}) => {
      return zipFs.readlinkSync(subPath);
    });
  }
  async truncatePromise(p, len) {
    return await this.makeCallPromise(p, async () => {
      return await this.baseFs.truncatePromise(p, len);
    }, async (zipFs, {subPath}) => {
      return await zipFs.truncatePromise(subPath, len);
    });
  }
  truncateSync(p, len) {
    return this.makeCallSync(p, () => {
      return this.baseFs.truncateSync(p, len);
    }, (zipFs, {subPath}) => {
      return zipFs.truncateSync(subPath, len);
    });
  }
  async ftruncatePromise(fd, len) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.ftruncatePromise(fd, len);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`ftruncate`);
    const [zipFs, realFd] = entry;
    return zipFs.ftruncatePromise(realFd, len);
  }
  ftruncateSync(fd, len) {
    if ((fd & ZIP_FD) === 0)
      return this.baseFs.ftruncateSync(fd, len);
    const entry = this.fdMap.get(fd);
    if (typeof entry === `undefined`)
      throw EBADF(`ftruncateSync`);
    const [zipFs, realFd] = entry;
    return zipFs.ftruncateSync(realFd, len);
  }
  watch(p, a, b) {
    return this.makeCallSync(p, () => {
      return this.baseFs.watch(p, a, b);
    }, (zipFs, {subPath}) => {
      return zipFs.watch(subPath, a, b);
    });
  }
  watchFile(p, a, b) {
    return this.makeCallSync(p, () => {
      return this.baseFs.watchFile(p, a, b);
    }, () => {
      return watchFile(this, p, a, b);
    });
  }
  unwatchFile(p, cb) {
    return this.makeCallSync(p, () => {
      return this.baseFs.unwatchFile(p, cb);
    }, () => {
      return unwatchFile(this, p, cb);
    });
  }
  async makeCallPromise(p, discard, accept, {requireSubpath = true} = {}) {
    if (typeof p !== `string`)
      return await discard();
    const normalizedP = this.resolve(p);
    const zipInfo = this.findZip(normalizedP);
    if (!zipInfo)
      return await discard();
    if (requireSubpath && zipInfo.subPath === `/`)
      return await discard();
    return await this.getZipPromise(zipInfo.archivePath, async (zipFs) => await accept(zipFs, zipInfo));
  }
  makeCallSync(p, discard, accept, {requireSubpath = true} = {}) {
    if (typeof p !== `string`)
      return discard();
    const normalizedP = this.resolve(p);
    const zipInfo = this.findZip(normalizedP);
    if (!zipInfo)
      return discard();
    if (requireSubpath && zipInfo.subPath === `/`)
      return discard();
    return this.getZipSync(zipInfo.archivePath, (zipFs) => accept(zipFs, zipInfo));
  }
  findZip(p) {
    if (this.filter && !this.filter.test(p))
      return null;
    let filePath = ``;
    while (true) {
      const pathPartWithArchive = p.substring(filePath.length);
      let archivePart;
      if (!this.fileExtensions) {
        archivePart = getArchivePart(pathPartWithArchive, `.zip`);
      } else {
        for (const ext of this.fileExtensions) {
          archivePart = getArchivePart(pathPartWithArchive, ext);
          if (archivePart) {
            break;
          }
        }
      }
      if (!archivePart)
        return null;
      filePath = this.pathUtils.join(filePath, archivePart);
      if (this.isZip.has(filePath) === false) {
        if (this.notZip.has(filePath))
          continue;
        try {
          if (!this.baseFs.lstatSync(filePath).isFile()) {
            this.notZip.add(filePath);
            continue;
          }
        } catch {
          return null;
        }
        this.isZip.add(filePath);
      }
      return {
        archivePath: filePath,
        subPath: this.pathUtils.join(PortablePath.root, p.substring(filePath.length))
      };
    }
  }
  limitOpenFiles(max) {
    if (this.zipInstances === null)
      return;
    const now = Date.now();
    let nextExpiresAt = now + this.maxAge;
    let closeCount = max === null ? 0 : this.zipInstances.size - max;
    for (const [path, {zipFs, expiresAt, refCount}] of this.zipInstances.entries()) {
      if (refCount !== 0 || zipFs.hasOpenFileHandles()) {
        continue;
      } else if (now >= expiresAt) {
        zipFs.saveAndClose();
        this.zipInstances.delete(path);
        closeCount -= 1;
        continue;
      } else if (max === null || closeCount <= 0) {
        nextExpiresAt = expiresAt;
        break;
      }
      zipFs.saveAndClose();
      this.zipInstances.delete(path);
      closeCount -= 1;
    }
    if (this.limitOpenFilesTimeout === null && (max === null && this.zipInstances.size > 0 || max !== null)) {
      this.limitOpenFilesTimeout = setTimeout(() => {
        this.limitOpenFilesTimeout = null;
        this.limitOpenFiles(null);
      }, nextExpiresAt - now).unref();
    }
  }
  async getZipPromise(p, accept) {
    const getZipOptions = async () => ({
      baseFs: this.baseFs,
      libzip: this.libzip,
      readOnly: this.readOnlyArchives,
      stats: await this.baseFs.statPromise(p)
    });
    if (this.zipInstances) {
      let cachedZipFs = this.zipInstances.get(p);
      if (!cachedZipFs) {
        const zipOptions = await getZipOptions();
        cachedZipFs = this.zipInstances.get(p);
        if (!cachedZipFs) {
          cachedZipFs = {
            zipFs: new ZipFS(p, zipOptions),
            expiresAt: 0,
            refCount: 0
          };
        }
      }
      this.zipInstances.delete(p);
      this.limitOpenFiles(this.maxOpenFiles - 1);
      this.zipInstances.set(p, cachedZipFs);
      cachedZipFs.expiresAt = Date.now() + this.maxAge;
      cachedZipFs.refCount += 1;
      try {
        return await accept(cachedZipFs.zipFs);
      } finally {
        cachedZipFs.refCount -= 1;
      }
    } else {
      const zipFs = new ZipFS(p, await getZipOptions());
      try {
        return await accept(zipFs);
      } finally {
        zipFs.saveAndClose();
      }
    }
  }
  getZipSync(p, accept) {
    const getZipOptions = () => ({
      baseFs: this.baseFs,
      libzip: this.libzip,
      readOnly: this.readOnlyArchives,
      stats: this.baseFs.statSync(p)
    });
    if (this.zipInstances) {
      let cachedZipFs = this.zipInstances.get(p);
      if (!cachedZipFs) {
        cachedZipFs = {
          zipFs: new ZipFS(p, getZipOptions()),
          expiresAt: 0,
          refCount: 0
        };
      }
      this.zipInstances.delete(p);
      this.limitOpenFiles(this.maxOpenFiles - 1);
      this.zipInstances.set(p, cachedZipFs);
      cachedZipFs.expiresAt = Date.now() + this.maxAge;
      return accept(cachedZipFs.zipFs);
    } else {
      const zipFs = new ZipFS(p, getZipOptions());
      try {
        return accept(zipFs);
      } finally {
        zipFs.saveAndClose();
      }
    }
  }
}

class URLFS extends ProxiedFS {
  constructor(baseFs) {
    super(npath);
    this.baseFs = baseFs;
  }
  mapFromBase(path) {
    return path;
  }
  mapToBase(path) {
    if (path instanceof url.URL)
      return url.fileURLToPath(path);
    return path;
  }
}

var __defProp$3 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var _a, _b, _c, _d;
const kBaseFs = Symbol(`kBaseFs`);
const kFd = Symbol(`kFd`);
const kClosePromise = Symbol(`kClosePromise`);
const kCloseResolve = Symbol(`kCloseResolve`);
const kCloseReject = Symbol(`kCloseReject`);
const kRefs = Symbol(`kRefs`);
const kRef = Symbol(`kRef`);
const kUnref = Symbol(`kUnref`);
class FileHandle {
  constructor(fd, baseFs) {
    this[_a] = 1;
    this[_b] = void 0;
    this[_c] = void 0;
    this[_d] = void 0;
    this[kBaseFs] = baseFs;
    this[kFd] = fd;
  }
  get fd() {
    return this[kFd];
  }
  async appendFile(data, options) {
    var _a2;
    try {
      this[kRef](this.appendFile);
      const encoding = (_a2 = typeof options === `string` ? options : options == null ? void 0 : options.encoding) != null ? _a2 : void 0;
      return await this[kBaseFs].appendFilePromise(this.fd, data, encoding ? {encoding} : void 0);
    } finally {
      this[kUnref]();
    }
  }
  chown(uid, gid) {
    throw new Error(`Method not implemented.`);
  }
  async chmod(mode) {
    try {
      this[kRef](this.chmod);
      return await this[kBaseFs].fchmodPromise(this.fd, mode);
    } finally {
      this[kUnref]();
    }
  }
  createReadStream(options) {
    return this[kBaseFs].createReadStream(null, __spreadProps$2(__spreadValues$3({}, options), {fd: this.fd}));
  }
  createWriteStream(options) {
    return this[kBaseFs].createWriteStream(null, __spreadProps$2(__spreadValues$3({}, options), {fd: this.fd}));
  }
  datasync() {
    throw new Error(`Method not implemented.`);
  }
  sync() {
    throw new Error(`Method not implemented.`);
  }
  async read(bufferOrOptions, offset, length, position) {
    var _a2, _b2, _c2;
    try {
      this[kRef](this.read);
      let buffer;
      if (!Buffer.isBuffer(bufferOrOptions)) {
        bufferOrOptions != null ? bufferOrOptions : bufferOrOptions = {};
        buffer = (_a2 = bufferOrOptions.buffer) != null ? _a2 : Buffer.alloc(16384);
        offset = bufferOrOptions.offset || 0;
        length = (_b2 = bufferOrOptions.length) != null ? _b2 : buffer.byteLength;
        position = (_c2 = bufferOrOptions.position) != null ? _c2 : null;
      } else {
        buffer = bufferOrOptions;
      }
      offset != null ? offset : offset = 0;
      length != null ? length : length = 0;
      if (length === 0) {
        return {
          bytesRead: length,
          buffer
        };
      }
      const bytesRead = await this[kBaseFs].readPromise(this.fd, buffer, offset, length, position);
      return {
        bytesRead,
        buffer
      };
    } finally {
      this[kUnref]();
    }
  }
  async readFile(options) {
    var _a2;
    try {
      this[kRef](this.readFile);
      const encoding = (_a2 = typeof options === `string` ? options : options == null ? void 0 : options.encoding) != null ? _a2 : void 0;
      return await this[kBaseFs].readFilePromise(this.fd, encoding);
    } finally {
      this[kUnref]();
    }
  }
  async stat(opts) {
    try {
      this[kRef](this.stat);
      return await this[kBaseFs].fstatPromise(this.fd, opts);
    } finally {
      this[kUnref]();
    }
  }
  async truncate(len) {
    try {
      this[kRef](this.truncate);
      return await this[kBaseFs].ftruncatePromise(this.fd, len);
    } finally {
      this[kUnref]();
    }
  }
  utimes(atime, mtime) {
    throw new Error(`Method not implemented.`);
  }
  async writeFile(data, options) {
    var _a2;
    try {
      this[kRef](this.writeFile);
      const encoding = (_a2 = typeof options === `string` ? options : options == null ? void 0 : options.encoding) != null ? _a2 : void 0;
      await this[kBaseFs].writeFilePromise(this.fd, data, encoding);
    } finally {
      this[kUnref]();
    }
  }
  async write(...args) {
    try {
      this[kRef](this.write);
      if (ArrayBuffer.isView(args[0])) {
        const [buffer, offset, length, position] = args;
        const bytesWritten = await this[kBaseFs].writePromise(this.fd, buffer, offset != null ? offset : void 0, length != null ? length : void 0, position != null ? position : void 0);
        return {bytesWritten, buffer};
      } else {
        const [data, position, encoding] = args;
        const bytesWritten = await this[kBaseFs].writePromise(this.fd, data, position, encoding);
        return {bytesWritten, buffer: data};
      }
    } finally {
      this[kUnref]();
    }
  }
  async writev(buffers, position) {
    try {
      this[kRef](this.writev);
      let bytesWritten = 0;
      if (typeof position !== `undefined`) {
        for (const buffer of buffers) {
          const writeResult = await this.write(buffer, void 0, void 0, position);
          bytesWritten += writeResult.bytesWritten;
          position += writeResult.bytesWritten;
        }
      } else {
        for (const buffer of buffers) {
          const writeResult = await this.write(buffer);
          bytesWritten += writeResult.bytesWritten;
        }
      }
      return {
        buffers,
        bytesWritten
      };
    } finally {
      this[kUnref]();
    }
  }
  readv(buffers, position) {
    throw new Error(`Method not implemented.`);
  }
  close() {
    if (this[kFd] === -1)
      return Promise.resolve();
    if (this[kClosePromise])
      return this[kClosePromise];
    this[kRefs]--;
    if (this[kRefs] === 0) {
      const fd = this[kFd];
      this[kFd] = -1;
      this[kClosePromise] = this[kBaseFs].closePromise(fd).finally(() => {
        this[kClosePromise] = void 0;
      });
    } else {
      this[kClosePromise] = new Promise((resolve, reject) => {
        this[kCloseResolve] = resolve;
        this[kCloseReject] = reject;
      }).finally(() => {
        this[kClosePromise] = void 0;
        this[kCloseReject] = void 0;
        this[kCloseResolve] = void 0;
      });
    }
    return this[kClosePromise];
  }
  [(_a = kRefs, _b = kClosePromise, _c = kCloseResolve, _d = kCloseReject, kRef)](caller) {
    if (this[kFd] === -1) {
      const err = new Error(`file closed`);
      err.code = `EBADF`;
      err.syscall = caller.name;
      throw err;
    }
    this[kRefs]++;
  }
  [kUnref]() {
    this[kRefs]--;
    if (this[kRefs] === 0) {
      const fd = this[kFd];
      this[kFd] = -1;
      this[kBaseFs].closePromise(fd).then(this[kCloseResolve], this[kCloseReject]);
    }
  }
}

const SYNC_IMPLEMENTATIONS = new Set([
  `accessSync`,
  `appendFileSync`,
  `createReadStream`,
  `createWriteStream`,
  `chmodSync`,
  `fchmodSync`,
  `chownSync`,
  `closeSync`,
  `copyFileSync`,
  `linkSync`,
  `lstatSync`,
  `fstatSync`,
  `lutimesSync`,
  `mkdirSync`,
  `openSync`,
  `opendirSync`,
  `readlinkSync`,
  `readFileSync`,
  `readdirSync`,
  `readlinkSync`,
  `realpathSync`,
  `renameSync`,
  `rmdirSync`,
  `statSync`,
  `symlinkSync`,
  `truncateSync`,
  `ftruncateSync`,
  `unlinkSync`,
  `unwatchFile`,
  `utimesSync`,
  `watch`,
  `watchFile`,
  `writeFileSync`,
  `writeSync`
]);
const ASYNC_IMPLEMENTATIONS = new Set([
  `accessPromise`,
  `appendFilePromise`,
  `fchmodPromise`,
  `chmodPromise`,
  `chownPromise`,
  `closePromise`,
  `copyFilePromise`,
  `linkPromise`,
  `fstatPromise`,
  `lstatPromise`,
  `lutimesPromise`,
  `mkdirPromise`,
  `openPromise`,
  `opendirPromise`,
  `readdirPromise`,
  `realpathPromise`,
  `readFilePromise`,
  `readdirPromise`,
  `readlinkPromise`,
  `renamePromise`,
  `rmdirPromise`,
  `statPromise`,
  `symlinkPromise`,
  `truncatePromise`,
  `ftruncatePromise`,
  `unlinkPromise`,
  `utimesPromise`,
  `writeFilePromise`,
  `writeSync`
]);
function patchFs(patchedFs, fakeFs) {
  fakeFs = new URLFS(fakeFs);
  const setupFn = (target, name, replacement) => {
    const orig = target[name];
    target[name] = replacement;
    if (typeof (orig == null ? void 0 : orig[nodeUtils.promisify.custom]) !== `undefined`) {
      replacement[nodeUtils.promisify.custom] = orig[nodeUtils.promisify.custom];
    }
  };
  {
    setupFn(patchedFs, `exists`, (p, ...args) => {
      const hasCallback = typeof args[args.length - 1] === `function`;
      const callback = hasCallback ? args.pop() : () => {
      };
      process.nextTick(() => {
        fakeFs.existsPromise(p).then((exists) => {
          callback(exists);
        }, () => {
          callback(false);
        });
      });
    });
    setupFn(patchedFs, `read`, (...args) => {
      let [fd, buffer, offset, length, position, callback] = args;
      if (args.length <= 3) {
        let options = {};
        if (args.length < 3) {
          callback = args[1];
        } else {
          options = args[1];
          callback = args[2];
        }
        ({
          buffer = Buffer.alloc(16384),
          offset = 0,
          length = buffer.byteLength,
          position
        } = options);
      }
      if (offset == null)
        offset = 0;
      length |= 0;
      if (length === 0) {
        process.nextTick(() => {
          callback(null, 0, buffer);
        });
        return;
      }
      if (position == null)
        position = -1;
      process.nextTick(() => {
        fakeFs.readPromise(fd, buffer, offset, length, position).then((bytesRead) => {
          callback(null, bytesRead, buffer);
        }, (error) => {
          callback(error, 0, buffer);
        });
      });
    });
    for (const fnName of ASYNC_IMPLEMENTATIONS) {
      const origName = fnName.replace(/Promise$/, ``);
      if (typeof patchedFs[origName] === `undefined`)
        continue;
      const fakeImpl = fakeFs[fnName];
      if (typeof fakeImpl === `undefined`)
        continue;
      const wrapper = (...args) => {
        const hasCallback = typeof args[args.length - 1] === `function`;
        const callback = hasCallback ? args.pop() : () => {
        };
        process.nextTick(() => {
          fakeImpl.apply(fakeFs, args).then((result) => {
            callback(null, result);
          }, (error) => {
            callback(error);
          });
        });
      };
      setupFn(patchedFs, origName, wrapper);
    }
    patchedFs.realpath.native = patchedFs.realpath;
  }
  {
    setupFn(patchedFs, `existsSync`, (p) => {
      try {
        return fakeFs.existsSync(p);
      } catch (error) {
        return false;
      }
    });
    setupFn(patchedFs, `readSync`, (...args) => {
      let [fd, buffer, offset, length, position] = args;
      if (args.length <= 3) {
        const options = args[2] || {};
        ({offset = 0, length = buffer.byteLength, position} = options);
      }
      if (offset == null)
        offset = 0;
      length |= 0;
      if (length === 0)
        return 0;
      if (position == null)
        position = -1;
      return fakeFs.readSync(fd, buffer, offset, length, position);
    });
    for (const fnName of SYNC_IMPLEMENTATIONS) {
      const origName = fnName;
      if (typeof patchedFs[origName] === `undefined`)
        continue;
      const fakeImpl = fakeFs[fnName];
      if (typeof fakeImpl === `undefined`)
        continue;
      setupFn(patchedFs, origName, fakeImpl.bind(fakeFs));
    }
    patchedFs.realpathSync.native = patchedFs.realpathSync;
  }
  {
    const origEmitWarning = process.emitWarning;
    process.emitWarning = () => {
    };
    let patchedFsPromises;
    try {
      patchedFsPromises = patchedFs.promises;
    } finally {
      process.emitWarning = origEmitWarning;
    }
    if (typeof patchedFsPromises !== `undefined`) {
      for (const fnName of ASYNC_IMPLEMENTATIONS) {
        const origName = fnName.replace(/Promise$/, ``);
        if (typeof patchedFsPromises[origName] === `undefined`)
          continue;
        const fakeImpl = fakeFs[fnName];
        if (typeof fakeImpl === `undefined`)
          continue;
        if (fnName === `open`)
          continue;
        setupFn(patchedFsPromises, origName, (pathLike, ...args) => {
          if (pathLike instanceof FileHandle) {
            return pathLike[origName].apply(pathLike, args);
          } else {
            return fakeImpl.call(fakeFs, pathLike, ...args);
          }
        });
      }
      setupFn(patchedFsPromises, `open`, async (...args) => {
        const fd = await fakeFs.openPromise(...args);
        return new FileHandle(fd, fakeFs);
      });
    }
  }
  {
    patchedFs.read[nodeUtils.promisify.custom] = async (fd, buffer, ...args) => {
      const res = fakeFs.readPromise(fd, buffer, ...args);
      return {bytesRead: await res, buffer};
    };
    patchedFs.write[nodeUtils.promisify.custom] = async (fd, buffer, ...args) => {
      const res = fakeFs.writePromise(fd, buffer, ...args);
      return {bytesWritten: await res, buffer};
    };
  }
}

var libzipSync = {exports: {}};

(function (module, exports) {
var frozenFs = Object.assign({}, fs__default.default);
var createModule = function() {
  var _scriptDir = void 0;
  if (typeof __filename !== "undefined")
    _scriptDir = _scriptDir || __filename;
  return function(createModule2) {
    createModule2 = createModule2 || {};
    var Module = typeof createModule2 !== "undefined" ? createModule2 : {};
    var readyPromiseResolve, readyPromiseReject;
    Module["ready"] = new Promise(function(resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
    var moduleOverrides = {};
    var key;
    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_, readBinary;
    var nodeFS;
    var nodePath;
    {
      {
        scriptDirectory = __dirname + "/";
      }
      read_ = function shell_read(filename, binary) {
        var ret = tryParseAsDataURI(filename);
        if (ret) {
          return binary ? ret : ret.toString();
        }
        if (!nodeFS)
          nodeFS = frozenFs;
        if (!nodePath)
          nodePath = path__default.default;
        filename = nodePath["normalize"](filename);
        return nodeFS["readFileSync"](filename, binary ? null : "utf8");
      };
      readBinary = function readBinary2(filename) {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      if (process["argv"].length > 1) {
        process["argv"][1].replace(/\\/g, "/");
      }
      process["argv"].slice(2);
      Module["inspect"] = function() {
        return "[Emscripten Module object]";
      };
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    }
    moduleOverrides = null;
    if (Module["arguments"])
      ;
    if (Module["thisProgram"])
      ;
    if (Module["quit"])
      ;
    var STACK_ALIGN = 16;
    function alignMemory(size, factor) {
      if (!factor)
        factor = STACK_ALIGN;
      return Math.ceil(size / factor) * factor;
    }
    var wasmBinary;
    if (Module["wasmBinary"])
      wasmBinary = Module["wasmBinary"];
    Module["noExitRuntime"] || true;
    if (typeof WebAssembly !== "object") {
      abort("no native wasm support detected");
    }
    function getValue(ptr, type, noSafe) {
      type = type || "i8";
      if (type.charAt(type.length - 1) === "*")
        type = "i32";
      switch (type) {
        case "i1":
          return HEAP8[ptr >> 0];
        case "i8":
          return HEAP8[ptr >> 0];
        case "i16":
          return HEAP16[ptr >> 1];
        case "i32":
          return HEAP32[ptr >> 2];
        case "i64":
          return HEAP32[ptr >> 2];
        case "float":
          return HEAPF32[ptr >> 2];
        case "double":
          return HEAPF64[ptr >> 3];
        default:
          abort("invalid type for getValue: " + type);
      }
      return null;
    }
    var wasmMemory;
    var ABORT = false;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed: " + text);
      }
    }
    function getCFunc(ident) {
      var func = Module["_" + ident];
      assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
      return func;
    }
    function ccall(ident, returnType, argTypes, args, opts) {
      var toC = {
        string: function(str) {
          var ret2 = 0;
          if (str !== null && str !== void 0 && str !== 0) {
            var len = (str.length << 2) + 1;
            ret2 = stackAlloc(len);
            stringToUTF8(str, ret2, len);
          }
          return ret2;
        },
        array: function(arr) {
          var ret2 = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret2);
          return ret2;
        }
      };
      function convertReturnValue(ret2) {
        if (returnType === "string")
          return UTF8ToString(ret2);
        if (returnType === "boolean")
          return Boolean(ret2);
        return ret2;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0)
              stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      ret = convertReturnValue(ret);
      if (stack !== 0)
        stackRestore(stack);
      return ret;
    }
    function cwrap(ident, returnType, argTypes, opts) {
      argTypes = argTypes || [];
      var numericArgs = argTypes.every(function(type) {
        return type === "number";
      });
      var numericRet = returnType !== "string";
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return function() {
        return ccall(ident, returnType, argTypes, arguments);
      };
    }
    var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
    function UTF8ArrayToString(heap, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heap[endPtr] && !(endPtr >= endIdx))
        ++endPtr;
      if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(heap.subarray(idx, endPtr));
      } else {
        var str = "";
        while (idx < endPtr) {
          var u0 = heap[idx++];
          if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue;
          }
          var u1 = heap[idx++] & 63;
          if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }
          var u2 = heap[idx++] & 63;
          if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
          }
          if (u0 < 65536) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          }
        }
      }
      return str;
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0))
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx)
            break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx)
            break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx)
            break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx)
            break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343)
          u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
        if (u <= 127)
          ++len;
        else if (u <= 2047)
          len += 2;
        else if (u <= 65535)
          len += 3;
        else
          len += 4;
      }
      return len;
    }
    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret)
        stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    }
    function writeArrayToMemory(array, buffer2) {
      HEAP8.set(array, buffer2);
    }
    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - x % multiple;
      }
      return x;
    }
    var buffer, HEAP8, HEAPU8, HEAP16, HEAP32, HEAPF32, HEAPF64;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = HEAP16 = new Int16Array(buf);
      Module["HEAP32"] = HEAP32 = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = new Uint16Array(buf);
      Module["HEAPU32"] = new Uint32Array(buf);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
    }
    Module["INITIAL_MEMORY"] || 16777216;
    var wasmTable;
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      if (!Module["noFSInit"] && !FS.init.initialized)
        FS.init();
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var dependenciesFulfilled = null;
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    Module["preloadedImages"] = {};
    Module["preloadedAudios"] = {};
    function abort(what) {
      if (Module["onAbort"]) {
        Module["onAbort"](what);
      }
      what += "";
      err(what);
      ABORT = true;
      what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    var wasmBinaryFile = "data:application/octet-stream;base64,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ACgCFC0AAiAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQADIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhQtAAQgACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0ABSAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQAGIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhQtAAcgACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0ACCAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQAJIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhQtAAogACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0ACyAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQAMIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhQtAA0gACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0ADiAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQAPIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhRBEGo2AhQgACAAKAIIQQFrIgE2AgggAQ0ACyAAIAAoAhhB8f8DcDYCGCAAIAAoAgxB8f8DcDYCDAwBCwsgACgCEARAA0AgACgCEEEQTwRAIAAgACgCEEEQazYCECAAIAAoAhQtAAAgACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0AASAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQACIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhQtAAMgACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0ABCAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQAFIAAoAhhqNgIYIAAgACgCGCAAKAIMajYCDCAAIAAoAhQtAAYgACgCGGo2AhggACAAKAIYIAAoAgxqNgIMIAAgACgCFC0AByAAKAIYajYCGCAAIAAoAhggACgCDGo2AgwgACAAKAIULQAIIAAoAhhqNgIYIAAgACgCGCAAKAIMajYC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NgIYIAEoAgxCADcDICABKAIMQgA3AyggASgCDEEANgIwIAEoAgxBADYCNCABKAIMQQA2AjggASgCDEEANgI8IAEoAgxBADsBQCABKAIMQYCA2I14NgJEIAEoAgxCADcDSCABKAIMQQA7AVAgASgCDEEAOwFSIAEoAgxBADYCVAvSEwEBfyMAQbABayIDJAAgAyAANgKoASADIAE2AqQBIAMgAjYCoAEgA0EANgKQASADIAMoAqQBKAIwQQAQOjYClAEgAyADKAKkASgCOEEAEDo2ApgBAkACQAJAAkAgAygClAFBAkYEQCADKAKYAUEBRg0BCyADKAKUAUEBRgRAIAMoApgBQQJGDQELIAMoApQBQQJHDQEgAygCmAFBAkcNAQsgAygCpAEiACAALwEMQYAQcjsBDAwBCyADKAKkASIAIAAvAQxB/+8DcTsBDCADKAKUAUECRgRAIANB9eABIAMoAqQBKAIwIAMoAqgBQQhqEI4BNgKQASADKAKQAUUEQCADQX82AqwBDAMLCwJAIAMoAqABQYACcQ0AIAMoApgBQQJHDQAgA0H1xgEgAygCpAEoAjggAygCqAFBCGoQjgE2AkggAygCSEUEQCADKAKQARAjIANBfzYCrAEMAwsgAygCSCADKAKQATYCACADIAMoAkg2ApABCwsCQCADKAKkAS8BUkUEQCADKAKkASIAIAAvAQxB/v8DcTsBDAwBCyADKAKkASIAIAAvAQxBAXI7AQwLIAMgAygCpAEgAygCoAEQZUEBcToAhgEgAyADKAKgAUGACnFBgApHBH8gAy0AhgEFQQELQQFxOgCHASADAn9BASADKAKkAS8BUkGBAkYNABpBASADKAKkAS8BUkGCAkYNABogAygCpAEvAVJBgwJGC0EBcToAhQEgAy0AhwFBAXEEQCADIANBIGpCHBApNgIcIAMoAhxFBEAgAygCqAFBCGpBDkEAEBQgAygCkAEQIyADQX82AqwBDAILAkAgAygCoAFBgAJxBEACQCADKAKgAUGACHENACADKAKkASkDIEL/////D1YNACADKAKkASkDKEL/////D1gNAgsgAygCHCADKAKkASkDKBAtIAMoAhwgAygCpAEpAyAQLQwBCwJAAkAgAygCoAFBgAhxDQAgAygCpAEpAyBC/////w9WDQAgAygCpAEpAyhC/////w9WDQAgAygCpAEpA0hC/////w9YDQELIAMoAqQBKQMoQv////8PWgRAIAMoAhwgAygCpAEpAygQLQsgAygCpAEpAyBC/////w9aBEAgAygCHCADKAKkASkDIBAtCyADKAKkASkDSEL/////D1oEQCADKAIcIAMoAqQBKQNIEC0LCwsCfyMAQRBrIgAgAygCHDYCDCAAKAIMLQAAQQFxRQsEQCADKAKoAUEIakEUQQAQFCADKAIcEBYgAygCkAEQIyADQX82AqwBDAILIANBAQJ/IwBBEGsiACADKAIcNgIMAn4gACgCDC0AAEEBcQRAIAAoAgwpAxAMAQtCAAunQf//A3ELIANBIGpBgAYQVTYCjAEgAygCHBAWIAMoAowBIAMoApABNgIAIAMgAygCjAE2ApABCyADLQCFAUEBcQRAIAMgA0EVakIHECk2AhAgAygCEEUEQCADKAKoAUEIakEOQQAQFCADKAKQARAjIANBfzYCrAEMAgsgAygCEEECEB8gAygCEEG9EkECEEEgAygCECADKAKkAS8BUkH/AXEQlgEgAygCECADKAKkASgCEEH//wNxEB8CfyMAQRBrIgAgAygCEDYCDCAAKAIMLQAAQQFxRQsEQCADKAKoAUEIakEUQQAQFCADKAIQEBYgAygCkAEQIyADQX82AqwBDAILIANBgbICQQcgA0EVakGABhBVNgIMIAMoAhAQFiADKAIMIAMoApABNgIAIAMgAygCDDYCkAELIAMgA0HQAGpCLhApIgA2AkwgAEUEQCADKAKoAUEIakEOQQAQFCADKAKQARAjIANBfzYCrAEMAQsgAygCTEHxEkH2EiADKAKgAUGAAnEbQQQQQSADKAKgAUGAAnFFBEAgAygCTCADLQCGAUEBcQR/QS0FIAMoAqQBLwEIC0H//wNxEB8LIAMoAkwgAy0AhgFBAXEEf0EtBSADKAKkAS8BCgtB//8DcRAfIAMoAkwgAygCpAEvAQwQHwJAIAMtAIUBQQFxBEAgAygCTEHjABAfDAELIAMoAkwgAygCpAEoAhBB//8DcRAfCyADKAKkASgCFCADQZ4BaiADQZwBahCNASADKAJMIAMvAZ4BEB8gAygCTCADLwGcARAfAkACQCADLQCFAUEBcUUNACADKAKkASkDKEIUWg0AIAMoAkxBABAhDAELIAMoAkwgAygCpAEoAhgQIQsCQAJAIAMoAqABQYACcUGAAkcNACADKAKkASkDIEL/////D1QEQCADKAKkASkDKEL/////D1QNAQsgAygCTEF/ECEgAygCTEF/ECEMAQsCQCADKAKkASkDIEL/////D1QEQCADKAJMIAMoAqQBKQMgpxAhDAELIAMoAkxBfxAhCwJAIAMoAqQBKQMoQv////8PVARAIAMoAkwgAygCpAEpAyinECEMAQsgAygCTEF/ECELCyADKAJMIAMoAqQBKAIwEFFB//8DcRAfIAMgAygCpAEoAjQgAygCoAEQkgFB//8DcSADKAKQAUGABhCSAUH//wNxajYCiAEgAygCTCADKAKIAUH//wNxEB8gAygCoAFBgAJxRQRAIAMoAkwgAygCpAEoAjgQUUH//wNxEB8gAygCTCADKAKkASgCPEH//wNxEB8gAygCTCADKAKkAS8BQBAfIAMoAkwgAygCpAEoAkQQIQJAIAMoAqQBKQNIQv////8PVARAIAMoAkwgAygCpAEpA0inECEMAQsgAygCTEF/ECELCwJ/IwBBEGsiACADKAJMNgIMIAAoAgwtAABBAXFFCwRAIAMoAqgBQQhqQRRBABAUIAMoAkwQFiADKAKQARAjIANBfzYCrAEMAQsgAygCqAEgA0HQAGoCfiMAQRBrIgAgAygCTDYCDAJ+IAAoAgwtAABBAXEEQCAAKAIMKQMQDAELQgALCxA2QQBIBEAgAygCTBAWIAMoApABECMgA0F/NgKsAQwBCyADKAJMEBYgAygCpAEoAjAEQCADKAKoASADKAKkASgCMBCFAUEASARAIAMoApABECMgA0F/NgKsAQwCCwsgAygCkAEEQCADKAKoASADKAKQAUGABhCRAUEASARAIAMoApABECMgA0F/NgKsAQwCCwsgAygCkAEQIyADKAKkASgCNARAIAMoAqgBIAMoAqQBKAI0IAMoAqABEJEBQQBIBEAgA0F/NgKsAQwCCwsgAygCoAFBgAJxRQRAIAMoAqQBKAI4BEAgAygCqAEgAygCpAEoAjgQhQFBAEgEQCADQX82AqwBDAMLCwsgAyADLQCHAUEBcTYCrAELIAMoAqwBIQAgA0GwAWokACAAC+ACAQF/IwBBIGsiBCQAIAQgADsBGiAEIAE7ARggBCACNgIUIAQgAzYCECAEQRAQGCIANgIMAkAg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AAAgAygCHEHcFmogAygCDEECdGooAgAgAygCHEHYKGpqLQAASg0ADAELIAMoAhxB3BZqIAMoAhRBAnRqIAMoAhxB3BZqIAMoAgxBAnRqKAIANgIAIAMgAygCDDYCFCADIAMoAgxBAXQ2AgwMAQsLIAMoAhxB3BZqIAMoAhRBAnRqIAMoAhA2AgAL1xMBA38jAEEwayICJAAgAiAANgIsIAIgATYCKCACIAIoAigoAgA2AiQgAiACKAIoKAIIKAIANgIgIAIgAigCKCgCCCgCDDYCHCACQX82AhAgAigCLEEANgLQKCACKAIsQb0ENgLUKCACQQA2AhgDQCACKAIYIAIoAhxIBEACQCACKAIkIAIoAhhBAnRqLwEABEAgAiACKAIYIgE2AhAgAigCLEHcFmohAyACKAIsIgQoAtAoQQFqIQAgBCAANgLQKCAAQQJ0IANqIAE2AgAgAigCGCACKAIsQdgoampBADoAAAwBCyACKAIkIAIoAhhBAnRqQQA7AQILIAIgAigCGEEBajYCGAwBCwsDQCACKAIsKALQKEECSARAAkAgAigCEEECSARAIAIgAigCEEEBaiIANgIQDAELQQAhAAsgAigCLEHcFmohAyACKAIsIgQoAtAoQQFqIQEgBCABNgLQKCABQQJ0IANqIAA2AgAgAiAANgIMIAIoAiQgAigCDEECdGpBATsBACACKAIMIAIoAixB2ChqakEAOgAAIAIoAiwiACAAKAKoLUEBazYCqC0gAigCIARAIAIoAiwiACAAKAKsLSACKAIgIAIoAgxBAnRqLwECazYCrC0LDAELCyACKAIoIAIoAhA2AgQgAiACKAIsKALQKEECbTYCGANAIAIoAhhBAU4EQCACKAIsIAIoAiQgAigCGBB5IAIgAigCGEEBazYCGAwBCwsgAiACKAIcNgIMA0AgAiACKAIsKALgFjYCGCACKAIsQdwWaiEBIAIoAiwiAygC0CghACADIABBAWs2AtAoIAIoAiwgAEECdCABaigCADYC4BYgAigCLCACKAIkQQEQeSACIAIoAiwoAuAWNgIUIAIoAhghASACKAIsQdwWaiEDIAIoAiwiBCgC1ChBAWshACAEIAA2AtQoIABBAnQgA2ogATYCACACKAIUIQEgAigCLEHcFmohAyACKAIsIgQoAtQoQQFrIQAgBCAANgLUKCAA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AQsgAigCCEEANgIAIAIoAghCADcDECACKAIIQgA3AwggAigCCEIANwMgIAIoAghCADcDGCACKAIIQQA2AiggAigCCEEAOgAsIAIoAgggAikDECACKAIMEI8BQQFxRQRAIAIoAggQJSACQQA2AhwMAQsgAiACKAIINgIcCyACKAIcIQEgAkEgaiQAIAEL1gIBAX8jAEEgayIDJAAgAyAANgIYIAMgATYCFCADIAI2AhAgAyADQQxqQgQQKTYCCAJAIAMoAghFBEAgA0F/NgIcDAELA0AgAygCFARAIAMoAhQoAgQgAygCEHFBgAZxBEAgAygCCEIAECwaIAMoAgggAygCFC8BCBAfIAMoAgggAygCFC8BChAfAn8jAEEQayIAIAMoAgg2AgwgACgCDC0AAEEBcUULBEAgAygCGEEIakEUQQAQFCADKAIIEBYgA0F/NgIcDAQLIAMoAhggA0EMakIEEDZBAEgEQCADKAIIEBYgA0F/NgIcDAQLIAMoAhQvAQoEQCADKAIYIAMoAhQoAgwgAygCFC8BCq0QNkEASARAIAMoAggQFiADQX82AhwMBQsLCyADIAMoAhQoAgA2AhQMAQsLIAMoAggQFiADQQA2AhwLIAMoAhwhACADQSBqJAAgAAtoAQF/IwBBEGsiAiAANgIMIAIgATYCCCACQQA7AQYDQCACKAIMBEAgAigCDCgCBCACKAIIcUGABnEEQCACIAIoAgwvAQogAi8BBkEEamo7AQYLIAIgAigCDCgCADYCDAwBCwsgAi8BBgvwAQEBfyMAQRBrIgEkACABIAA2AgwgASABKAIMNgIIIAFBADYCBANAIAEoAgwEQAJAAkAgASgCDC8BCEH1xgFGDQAgASgCDC8BCEH14AFGDQAgASgCDC8BCEGBsgJGDQAgASgCDC8BCEEBRw0BCyABIAEoAgwoAgA2AgAgASgCCCABKAIMRgRAIAEgASgCADYCCAsgASgCDEEANgIAIAEoAgwQIyABKAIEBEAgASgCBCABKAIANgIACyABIAEoAgA2AgwMAgsgASABKAIMNgIEIAEgASgCDCgCADYCDAwBCwsgASgCCCEAIAFBEGokACAAC7IEAQF/IwBBQGoiBSQAIAUgADYCOCAFIAE7ATYgBSACNgIwIAUgAzYCLCAFIAQ2AiggBSAFKAI4IAUvATatECkiADYC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IAEoAhBB//8DRgRAIAEgASgCDDYCEAsgASgCCEH//wNGBEAgASABKAIENgIICwJAIAEoApQBQQRxRQ0AIAEoAgggASgCBEYEQCABKAIQIAEoAgxGDQELIAEoApABQRVBABAUIAEtABdBAXEEQCABKAKkARAWCyABQQA2AqwBDAELAkAgASgCEEUEQCABKAIIRQ0BCyABKAKQAUEBQQAQFCABLQAXQQFxBEAgASgCpAEQFgsgAUEANgKsAQwBCyABIAEoAqQBEDE3AyggASABKAKkARAxNwMgIAEpAyggASkDIFIEQCABKAKQAUEBQQAQFCABLQAXQQFxBEAgASgCpAEQFgsgAUEANgKsAQwBCyABIAEoAqQBEDE3AzAgASABKAKkARAxNwOAAQJ/IwBBEGsiBSABKAKkATYCDCAFKAIMLQAAQQFxRQsEQCABKAKQAUEUQQAQFCABLQAXQQFxBEAgASgCpAEQFgsgAUEANgKsAQwBCyABLQAXQQFxBEAgASgCpAEQFgsCQCABKQOAAUL///////////8AWARAIAEpA4ABIAEpA4ABIAEpAzB8WA0BCyABKAKQAUEEQRYQFCABQQA2AqwBDAELIAEpA4ABIAEpAzB8IAEpA5gBIAEpAzh8VgRAIAEoApABQRVBABAUIAFBADYCrAEMAQsCQCABKAKUAUEEcUUNACABKQOAASABKQMwfCABKQOYASABKQM4fFENACABKAKQAUEVQQAQFCABQQA2AqwBDAELIAEpAyggASkDMEIugFYEQCABKAKQAUEVQQAQFCABQQA2AqwBDAELIAEgASkDKCABKAKQARCQASIFNgKMASAFRQRAIAFBADYCrAEMAQsgASgCjAFBAToALCABKAKMASABKQMwNwMYIAEoAowBIAEpA4ABNwMgIAEgASgCjAE2AqwBCyABKAKsASEFIAFBsAFqJAAgACAFNgJQDAELIAAoAmQgACkDMBAsGiAAKAJkIQUgACkDWCEJIAAoAmgoAhQhBiAAKAJUIQcjAEHQAGsiASQAIAEgBTYCSCABIAk3A0AgASAGNgI8IAEgBzYCOAJAIAEoAkgQMEIWVARAIAEoAjhBFUEAEBQgAUEANgJMDAELIwBBEGsiBSABKAJINgIMIAECfiAFKAIMLQAAQQFxBEAgBSgCDCkDEAwBC0IACzcDCCABKAJI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ECADQcgAEBgiADYCDAJAIABFBEAgAygCEEEBQbSbASgCABAUIANBADYCHAwBCyADKAIMIAMoAhA2AgAgAygCDCADLQAbQQFxOgAEIAMoAgwgAygCFDYCCAJAIAMoAgwoAghBAU4EQCADKAIMKAIIQQlMDQELIAMoAgxBCTYCCAsgAygCDEEAOgAMIAMoAgxBADYCMCADKAIMQQA2AjQgAygCDEEANgI4IAMgAygCDDYCHAsgAygCHCEAIANBIGokACAACzgBAX8jAEEQayIBIAA2AgwgASgCDEEANgIAIAEoAgxBADYCBCABKAIMQQA2AgggASgCDEEAOgAMC+MIAQF/IwBBQGoiAiAANgI4IAIgATYCNCACIAIoAjgoAnw2AjAgAiACKAI4KAI4IAIoAjgoAmxqNgIsIAIgAigCOCgCeDYCICACIAIoAjgoApABNgIcIAICfyACKAI4KAJsIAIoAjgoAixBhgJrSwRAIAIoAjgoAmwgAigCOCgCLEGGAmtrDAELQQALNgIYIAIgAigCOCgCQDYCFCACIAIoAjgoAjQ2AhAgAiACKAI4KAI4IAIoAjgoAmxqQYICajYCDCACIAIoAiwgAigCIEEBa2otAAA6AAsgAiACKAIsIAIoAiBqLQAAOgAKIAIoAjgoAnggAigCOCgCjAFPBEAgAiACKAIwQQJ2NgIwCyACKAIcIAIoAjgoAnRLBEAgAiACKAI4KAJ0NgIcCwNAAkAgAiACKAI4KAI4IAIoAjRqNgIoAkAgAigCKCACKAIgai0AACACLQAKRw0AIAIoAiggAigCIEEBa2otAAAgAi0AC0cNACACKAIoLQAAIAIoAiwtAABHDQAgAiACKAIoIgBBAWo2AiggAC0AASACKAIsLQABRwRADAELIAIgAigCLEECajYCLCACIAIoAihBAWo2AigDQCACIAIoAiwiAEEBajYCLCAALQABIQEgAiACKAIoIgBBAWo2AigCf0EAIAAtAAEgAUcNABogAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoQQAgAC0AASABRw0AGiACIAIoAiwiAEEBajYCLCAALQABIQEgAiACKAIoIgBBAWo2AihBACAALQABIAFHDQAaIAIgAigCLCIAQQFqNgIsIAAtAAEhASACIAIoAigiAEEBajYCKEEAIAAtAAEgAUcNABogAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoQQAgAC0AASABRw0AGiACIAIoAiwiAEEBajYCLCAALQABIQEgAiACKAIoIgBBAWo2AihBACAALQABIAFHDQAaIAIgAigCLCIAQQFqNgIsIAAtAAEhASACIAIoAigiAEEBajYCKEEAIAAtAAEgAUcNABogAiACKAIsIgBBAWo2AiwgAC0AASEBIAIgAigCKCIAQQFqNgIoQQAgAC0AASABRw0AGiACKAIsIAIoAgxJC0EBcQ0ACyACQYICIAIoAgwgAigCLGtrNgIkIAIgAigCDEGCAms2AiwgAigCJCACKAIgSgRAIAIoAjggAigCNDYCcCACIAIoAiQ2AiAgAigCJCACKAIcTg0CIAIgAigCLCACKAIgQQFrai0AADoACyACIAIoAiwgAigCIGotAAA6AAoLCyACIAIoAhQgAigCNCACKAIQcUEBdGovAQAiATYCNEEAIQAgASACKAIYSwR/IAIgAigCMEEBayIANgIwIABBAEcFQQALQQFxDQELCwJAIAIoAiAgAigCOCgCdE0EQCACIAIoAiA2AjwMAQsgAiACKAI4KAJ0NgI8CyACKAI8C5IQAQF/IwBBMGsiAiQAIAIgADYCKCACIAE2AiQgAgJ/IAIoAigoAiwgAigCKCgCDEEFa0kEQCACKAIoKAIsDAELIAIoAigoAgxBBWsLNgIgIAJBADYCECACIAIoAigoAgAoAgQ2AgwDQAJAIAJB//8DNgIcIAIgAigCKCgCvC1BKmpBA3U2AhQgAigCKCgCACgCECACKAIUSQ0AIAIgAigCKCgCACgCECACKAIUazYCFCACIAIoAigoAmwgAigCKCgCXGs2AhggAigCHCACKAIYIAIoAigoAgAoAgRqSwRAIAIgAigCGCACKAIoKAIAKAIEajYCHAsgAigCHCACKAIUSwRAIAIgAigCFDYCHAsCQCACKAIcIAIoAiBPDQACQCACKAIcRQRAIAIoAiRBBEcNAQsgAigCJEUNACACKAIcIAIoAhggAigCKCgCACgCBGpGDQELDAELQQAhACACIAIoAiRBBEYEfyACKAIcIAIoAhggAigCKCgCACgCBGpGBUEAC0EBcTYCECACKAIoQQBBACACKAIQEF0gAigCKCgCCCACKAIoKAIUQQRraiACKAIcOgAAIAIoAigoAgggAigCKCgCFEEDa2ogAigCHEEIdjoAACACKAIoKAIIIAIoAigoAhRBAmtqIAIoAhxBf3M6AAAgAigCKCgCCCACKAIoKAIUQQFraiACKAIcQX9zQQh2OgAAIAIoAigoAgAQHCACKAIYBEAgAigCGCACKAIcSwRAIAIgAigCHDYCGAsgAigCKCgCACgCDCACKAIoKAI4IAIoAigoAlxqIAIoAhgQGRogAigCKCgCACIAIAIoAhggACgCDGo2AgwgAigCKCgCACIAIAAoAhAgAigCGGs2AhAgAigCKCgCACIAIAIoAhggACgCFGo2AhQgAigCKCIAIAIoAhggACgCXGo2AlwgAiACKAIcIAIoAhhrNgIcCyACKAIcBEAgAigCKCgCACACKAIoKAIAKAIMIAIoAhwQdhogAigCKCgCACIAIAIoAhwgACgCDGo2AgwgAigCKCgCACIAIAAoAhAgAigCHGs2AhAgAigCKCgCACIAIAIoAhwgACgCFGo2AhQLIAIoAhBFDQELCyACIAIoAgwgAigCKCgCACgCBGs2AgwgAigCDARAAkAgAigCDCACKAIoKAIsTwRAIAIoAihBAjYCsC0gAigCKCgCOCACKAIoKAIAKAIAIAIoAigoAixrIAIoAigoAiwQGRogAigCKCACKAIoKAIsNgJsDAELIAIoAgwgAigCKCgCPCACKAIoKAJsa08EQCACKAIoIgAgACgCbCACKAIoKAIsazYCbCACKAIoKAI4IAIoAigoAjggAigCKCgCLGogAigCKCgCbBAZGiACKAIoKAKwLUECSQRAIAIoAigiACAAKAKwLUEBajYCsC0LCyACKAIoKAI4IAIoAigoAmxqIAIoAigoAgAoAgAgAigCDGsgAigCDBAZGiACKAIoIgAgAigCDCAAKAJsajYCbAsgAigCKCACKAIoKAJsNgJcIAIoAigiAQJ/IAIoAgwgAigCKCgCLCACKAIoKAK0LWtLBEAgAigCKCgCLCACKAIoKAK0LWsMAQsgAigCDAsgASgCtC1qNgK0LQsgAigCKCgCwC0gAigCKCgCbEkEQCACKAIoIAIoAigoAmw2AsAtCwJAIAIoAhAEQCACQQM2AiwMAQsCQCACKAIkRQ0AIAIoAiRBBEYNACACKAIoKAIAKAIEDQAgAigCKCgCbCACKAIoKAJcRw0AIAJBATYCLAwBCyACIAIoAigoAjwgAigCKCgCbGtBAWs2AhQCQCACKAIoKAIAKAIEIAIoAhRNDQAgAigCKCgCXCACKAIoKAIsSA0AIAIoAigiACAAKAJcIAIoAigoAixrNgJcIAIoAigiACAAKAJsIAIoAigoAixrNgJsIAIoAigoAjggAigCKCgCOCACKAIoKAIsaiACKAIoKAJsEBkaIAIoAigoArAtQQJJBEAgAigCKCIAIAAoArAtQQFqNgKwLQsgAiACKAIoKAIsIAIoAhRqNgIUCyACKAIUIAIoAigoAgAoAgRLBEAgAiACKAIoKAIAKAIENgIUCyACKAIUBEAgAigCKCgCACACKAIoKAI4IAIoAigoAmxqIAIoAhQQdhogAigCKCIAIAIoAhQgACgCbGo2AmwLIAIoAigoAsAtIAIoAigoAmxJBEAgAigCKCACKAIoKAJsNgLALQsgAiACKAIoKAK8LUEqakEDdTYCFCACIAIoAigoAgwgAigCFGtB//8DSwR/Qf//AwUgAigCKCgCDCACKAIUaws2AhQgAgJ/IAIoAhQgAigCKCgCLEsEQCACKAIoKAIsDAELIAIoAhQLNgIgIAIgAigCKCgCbCACKAIoKAJcazYCGAJAIAIoAhggAigCIEkEQCACKAIYRQRAIAIoAiRBBEcNAgsgAigCJEUNASACKAIoKAIAKAIEDQEgAigCGCACKAIUSw0BCyACAn8gAigCGCACKAIUSwRAIAIoAhQMAQsgAigCGAs2AhwgAgJ/QQAgAigCJEEERw0AGkEAIAIoAigoAgAoAgQNABogAigCHCACKAIYRgtBAXE2AhAgAigCKCACKAIoKAI4IAIoAigoAlxqIAIoAhwgAigCEBBdIAIoAigiACACKAIcIAAoAlxqNgJcIAIoAigoAgAQHAsgAkECQQAgAigCEBs2AiwLIAIoAiwhACACQTBqJAAgAAuyAgEBfyMAQRBrIgEkACABIAA2AggCQCABKAIIEHgEQCABQX42AgwMAQsgASABKAIIKAIcKAIENgIEIAEoAggoAhwoAggEQCABKAIIKAIoIAEoAggoAhwoAgggASgCCCgCJBEEAAsgASgCCCgCHCgCRARAIAEoAggoAiggASgCCCgCHCgCRCABKAIIKAIkEQQACyABKAIIKAIc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DQAgAiEAIANBAWsiAw0ACwsgBCgCFBogASACNgKgAQwCCyMAQRBrIgAgASgCqAEoAgQ2AgwgAUEAIAAoAgxrQQJ0QajZAGooAgA2AqABDAELIAFBADYCoAELCwJAIAEoAqABRQRAIAEgASgCpAE2AqwBDAELIAEgASgCoAEQLgJ/IAEoAqQBBEAgASgCpAEQLkECagwBC0EAC2pBAWoQGCIANgIcIABFBEAgAUG4EygCADYCrAEMAQsgASgCHCEAAn8gASgCpAEEQCABKAKkAQwBC0H6EgshA0HfEkH6EiABKAKkARshAiABIAEoAqABNgIIIAEgAjYCBCABIAM2AgAgAEG+CiABEG8gASgCqAEgASgCHDYCCCABIAEoAhw2AqwBCyABKAKsASEAIAFBsAFqJAAgAAsIAEEBQTgQfwszAQF/IAAoAhQiAyABIAIgACgCECADayIBIAEgAksbIgEQGRogACAAKAIUIAFqNgIUIAILjwUCBn4BfyABIAEoAgBBD2pBcHEiAUEQajYCACAAAnwgASkDACEDIAEpAwghBiMAQSBrIggkAAJAIAZC////////////AIMiBEKAgICAgIDAgDx9IARCgICAgICAwP/DAH1UBEAgBkIEhiADQjyIhCEEIANC//////////8PgyIDQoGAgICAgICACFoEQCAEQoGAgICAgICAwAB8IQIMAgsgBEKAgICAgICAgEB9IQIgA0KAgICAgICAgAiFQgBSDQEgAiAEQgGDfCECDAELIANQIARCgICAgICAwP//AFQgBEKAgICAgIDA//8AURtFBEAgBkIEhiADQjyIhEL/////////A4NCgICAgICAgPz/AIQhAgwBC0KAgICAgICA+P8AIQIgBEL///////+//8MAVg0AQgAhAiAEQjCIpyIAQZH3AEkNACADIQIgBkL///////8/g0KAgICAgIDAAIQiBSEHAkAgAEGB9wBrIgFBwABxBEAgAiABQUBqrYYhB0IAIQIMAQsgAUUNACAHIAGtIgSGIAJBwAAgAWutiIQhByACIASGIQILIAggAjcDECAIIAc3AxgCQEGB+AAgAGsiAEHAAHEEQCAFIABBQGqtiCEDQgAhBQwBCyAARQ0AIAVBwAAgAGuthiADIACtIgKIhCEDIAUgAoghBQsgCCADNwMAIAggBTcDCCAIKQMI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ADYCtC0gASgCFEEERgRAIAEoAhgCfyABKAIYKAJcQQBOBEAgASgCGCgCOCABKAIYKAJcagwBC0EACyABKAIYKAJsIAEoAhgoAlxrQQEQKCABKAIYIAEoAhgoAmw2AlwgASgCGCgCABAcIAEoAhgoAgAoAhBFBEAgAUECNgIcDAILIAFBAzYCHAwBCyABKAIYKAKgLQRAIAEoAhgCfyABKAIYKAJcQQBOBEAgASgCGCgCOCABKAIYKAJcagwBC0EACyABKAIYKAJsIAEoAhgoAlxrQQAQKCABKAIYIAEoAhgoAmw2AlwgASgCGCgCABAcIAEoAhgoAgAoAhBFBEAgAUEANgIcDAILCyABQQE2AhwLIAEoAhwhAiABQSBqJAAgAgwBCwJ/IAAoAiwoAogBQQNGBEAgACgCLCECIAAoAjQhAyMAQTBrIgEkACABIAI2AiggASADNgIkAkADQAJAIAEoAigoAnRBggJNBEAgASgCKBBcAkAgASgCKCgCdEGCAksNACABKAIkDQAgAUEANgIsDAQLIAEoAigoAnRFDQELIAEoAihBADYCYAJAIAEoAigoAnRBA0kNACABKAIoKAJsRQ0AIAEgASgCKCgCOCABKAIoKAJsakEBazYCGCABIAEoAhgtAAA2AhwgASgCHCECIAEgASgCGCIDQQFqNgIYAkAgAy0AASACRw0AIAEoAhwhAiABIAEoAhgiA0EBajYCGCADLQABIAJHDQAgASgCHCECIAEgASgCGCIDQQFqNgIYIAMtAAEgAkcNACABIAEoAigoAjggASgCKCgCbGpBggJqNgIUA0AgASgCHCECIAEgASgCGCIDQQFqNgIYAn9BACADLQABIAJHDQAaIAEoAhwhAiABIAEoAhgiA0EBajYCGEEAIAMtAAEgAkcNABogASgCHCECIAEgASgCGCIDQQFqNgIYQQAgAy0AASACRw0AGiABKAIcIQIgASABKAIYIgNBAWo2AhhBACADLQABIAJHDQAaIAEoAhwhAiABIAEoAhgiA0EBajYCGEEAIAMtAAEgAkcNABogASgCHCECIAEgASgCGCIDQQFqNgIYQQAgAy0AASACRw0AGiABKAIcIQIgASABKAIYIgNBAWo2AhhBACADLQABIAJHDQAaIAEoAhwhAiABIAEoAhgiA0EBajYCGEEAIAMtAAEgAkcNABog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AS8BEiECIAEgASgCSCIDQQFqNgJIIAMgAjoAAAwCCyABKAIMQRBxBEAgASABLwESNgIIIAEgASgCDEEPcTYCDCABKAIMBEAgASgCKCABKAIMSQRAIAEgASgCUCICQQFqNgJQIAEgASgCLCACLQAAIAEoAih0ajYCLCABIAEoAihBCGo2AigLIAEgASgCCCABKAIsQQEgASgCDHRBAWtxajYCCCABIAEoAiwgASgCDHY2AiwgASABKAIoIAEoAgxrNgIoCyABKAIoQQ9JBEAgASABKAJQIgJBAWo2AlAgASABKAIsIAItAAAgASgCKHRqNgIsIAEgASgCKEEIajYCKCABIAEoAlAiAkEBajYCUCABIAEoAiwgAi0AACABKAIodGo2AiwgASABKAIoQQhqNgIoCyABIAEoAiAgASgCLCABKAIYcUECdGooAQA2ARACQANAIAEgAS0AETYCDCABIAEoAiwgASgCDHY2AiwgASABKAIoIAEoAgxrNgIoIAEgAS0AEDYCDCABKAIMQRBxBEAgASABLwESNgIEIAEgASgCDEEPcTYCDCABKAIoIAEoAgxJBEAgASABKAJQIgJBAWo2AlAgASABKAIsIAItAAAgASgCKHRqNgIsIAEgASgCKEEIajYCKCABKAIoIAEoAgxJBEAgASABKAJQIgJBAWo2AlAgASABKAIsIAItAAAgASgCKHRqNgIsIAEgASgCKEEIajYCKAsLIAEgASgCBCABKAIsQQEgASgCDHRBAWtxajYCBCABIAEoAiwgASgCDHY2AiwgASABKAIoIAEoAgxrNgIoIAEgASgCSCABKAJEazYCDAJAIAEoAgQgASgCDEsEQCABIAEoAgQgASgCDGs2AgwgASgCDCABKAI4SwRAIAEoAlQoAsQ3BEAgASgCXEHdDDYCGCABKAJUQdH+ADYCBAwKCwsgASABKAIwNgIAAkAgASgCNEUEQCABIAEoAgAgASgCPCABKAIMa2o2AgAgASgCDCABKAIISQRAIAEgASgCCCABKAIMazYCCANAIAEgASgCACICQQFqNgIAIAItAAAhAiABIAEoAkgiA0EBajYCSCADIAI6AAAgASABKAIMQQFrIgI2AgwgAg0ACyABIAEoAkggASgCBGs2AgALDAELAkAgASgCNCABKAIMSQRAIAEgASgCACABKAI8IAEoAjRqIAEoAgxrajYCACABIAEoAgwgASgCNGs2AgwgASgCDCABKAIISQRAIAEgASgCCCABKAIMazYCCANAIAEgASgCACICQQFqNgIAIAItAAAhAiABIAEoAkgiA0EBajYCSCADIAI6AAAgASABKAIMQQFrIgI2AgwgAg0ACyABIAEoAjA2AgAgASgCNCABKAIISQRAIAEgASgCNDYCDCABIAEoAgggASgCDGs2AggDQCABIAEoAgAiAkEBajYCACACLQAAIQIgASABKAJIIgNBAWo2AkggAyACOgAAIAEgASgCDEEBayICNgIMIAINAAsgASABKAJIIAEoAgRrNgIACwsMAQsgASABKAIAIAEoAjQgASgCDGtqNgIAIAEoAgwgASgCCEkEQCABIAEoAgggASgCDGs2AggDQCABIAEoAgAiAkEBajYCACACLQAAIQIgASABKAJIIgNBAWo2AkggAyACOgAAIAEgASgCDEEBayICNgIMIAINAAsgASABKAJIIAEoAgRrNgIACwsLA0AgASgCCEECSwRAIAEgASgCACICQQFqNgIAIAItAAAhAiABIAEoAkgiA0EBajYCSCADIAI6AAAgASABKAIAIgJBAWo2AgAgAi0AACECIAEgASgCSCIDQQFqNgJIIAMgAjoAACABIAEoAgAiAkEBajYCACACLQAAIQIgASABKAJIIgNBAWo2AkggAyACOgAAIAEgASgCCEEDazYCCAwBCwsMAQsgASABKAJIIAEoAgRrNgIAA0AgASABKAIAIgJBAWo2AgAgAi0AACECIAEgASgCSCIDQQFqNgJIIAMgAjoAACABIAEoAgAiAkEBajYCACACLQAAIQIgASABKAJIIgNBAWo2AkggAyACOgAAIAEgASgCACICQQFqNgIAIAItAAAhAiABIAEoAkgiA0EBajYCSCADIAI6AAAgASABKAIIQQNrNgIIIAEoAghBAksNAAsLIAEoAggEQCABIAEoAgAiAkEBajYCACACLQAAIQIgASABKAJIIgNBAWo2AkggAyACOgAAIAEoAghBAUsEQCABIAEoAgAiAkEBajYCACACLQAAIQIgASABKAJIIgNBAWo2AkggAyACOgAACwsMAgsgASgCDEHAAHFFBEAgASABKAIgIAEvARIgASgCLEEBIAEoAgx0QQFrcWpBAnRqKAEANgEQDAELCyAB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AG5hbgAvZGV2L3VyYW5kb20AaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrAGluY29ycmVjdCBoZWFkZXIgY2hlY2sAaW5jb3JyZWN0IGxlbmd0aCBjaGVjawBpbmNvcnJlY3QgZGF0YSBjaGVjawBpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjawBoZWFkZXIgY3JjIG1pc21hdGNoAGluZgBpbnZhbGlkIHdpbmRvdyBzaXplAFJlYWQtb25seSBhcmNoaXZlAE5vdCBhIHppcCBhcmNoaXZlAFJlc291cmNlIHN0aWxsIGluIHVzZQBNYWxsb2MgZmFpbHVyZQBpbnZhbGlkIGJsb2NrIHR5cGUARmFpbHVyZSB0byBjcmVhdGUgdGVtcG9yYXJ5IGZpbGUAQ2FuJ3Qgb3BlbiBmaWxlAE5vIHN1Y2ggZmlsZQBQcmVtYXR1cmUgZW5kIG9mIGZpbGUAQ2FuJ3QgcmVtb3ZlIGZpbGUAaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlAGludmFsaWQgZGlzdGFuY2UgY29kZQB1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZABzdHJlYW0gZW5kAENvbXByZXNzZWQgZGF0YSBpbnZhbGlkAE11bHRpLWRpc2sgemlwIGFyY2hpdmVzIG5vdCBzdXBwb3J0ZWQAT3BlcmF0aW9uIG5vdCBzdXBwb3J0ZWQARW5jcnlwdGlvbiBtZXRob2Qgbm90IHN1cHBvcnRlZABDb21wcmVzc2lvbiBtZXRob2Qgbm90IHN1cHBvcnRlZABFbnRyeSBoYXMgYmVlbiBkZWxldGVkAENvbnRhaW5pbmcgemlwIGFyY2hpdmUgd2FzIGNsb3NlZABDbG9zaW5nIHppcCBhcmNoaXZlIGZhaWxlZABSZW5hbWluZyB0ZW1wb3JhcnkgZmlsZSBmYWlsZWQARW50cnkgaGFzIGJlZW4gY2hhbmdlZABObyBwYXNzd29yZCBwcm92aWRlZABXcm9uZyBwYXNzd29yZCBwcm92aWRlZABVbmtub3duIGVycm9yICVkAHJiAHIrYgByd2EAJXMuWFhYWFhYAE5BTgBJTkYAQUUAMS4yLjExAC9wcm9jL3NlbGYvZmQvAC4AKG51bGwpADogAFBLBgcA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0gAIADIACACyAAgAcgAIAPIACAAKAAgAigAIAEoACADKAAgAKgAIAKoACABqAAgA6gAIABoACACaAAgAWgAIANoACAA6AAgAugAIAHoACAD6AAgABgAIAIYACABGAAgAxgAIACYACACmAAgAZgAIAOYACAAWAAgAlgAIAFYACADWAAgANgAIALYACAB2AAgA9gAIAA4ACACOAAgATgAIAM4ACAAuAAgArgAIAG4ACADuAAgAHgAIAJ4ACABeAAgA3gAIAD4ACAC+AAgAfgAIAP4ACAABAAgAgQAIAEEACADBAAgAIQAIAKEACABhAAgA4QAIABEACACRAAgAUQAIANEACAAxAAgAsQAIAHEACADxAAgACQAIAIkACABJAAgAyQAIACkACACpAAgAaQAIAOkACAAZAAgAmQAIAFkACADZAAgAOQAIALkACAB5AAgA+QAIAAUACACFAAgARQAIAMUACAAlAAgApQAIAGUACADlAAgAFQAIAJUACABVAAgA1QAIADUACAC1AAgAdQAIAPUACAANAAgAjQAIAE0ACADNAAgALQAIAK0ACABtAAgA7QAIAB0ACACdAAgAXQAIAN0ACAA9AAgAvQAIAH0ACAD9AAgAEwAJABMBCQCTAAkAkwEJAFMACQBTAQkA0wAJANMBCQAzAAkAMwEJALMACQCzAQkAcwAJAHMBCQDzAAkA8wEJAAsACQALAQkAiwAJAIsBCQBLAAkASwEJAMsACQDLAQkAKwAJACsBCQCrAAkAqwEJAGsACQBrAQkA6wAJAOsBCQAbAAkAGwEJAJsACQCbAQkAWwAJAFsBCQDbAAkA2wEJADsACQA7AQkAuwAJALsBCQB7AAkAewEJAPsACQD7AQkABwAJAAcBCQCHAAkAhwEJAEcACQBHAQkAxwAJAMcBCQAnAAkAJwEJAKcACQCnAQkAZwAJAGcBCQDnAAkA5wEJABcACQAXAQkAlwAJAJcBCQBXAAkAVwEJANcACQDXAQkANwAJADcBCQC3AAkAtwEJAHcACQB3AQkA9wAJAPcBCQAPAAkADwEJAI8ACQCPAQkATwAJAE8BCQDPAAkAzwEJAC8ACQAvAQkArwAJAK8BCQBvAAkAbwEJAO8ACQDvAQkAHwAJAB8BCQCfAAkAnwEJAF8ACQBfAQkA3wAJAN8BCQA/AAkAPwEJAL8ACQC/AQkAfwAJAH8BCQD/AAkA/wEJAAAABwBAAAcAIAAHAGAABwAQAAcAUAAHADAABwBwAAcACAAHAEgABwAoAAcAaAAHABgABwBYAAcAOAAHAHgABwAEAAcARAAHACQABwBkAAcAFAAHAFQABwA0AAcAdAAHAAMACACDAAgAQwAIAMMACAAjAAgAowAIAGMACADjAAgAAAAFABAABQAIAAUAGAAFAAQABQAUAAUADAAFABwABQACAAUAEgAFAAoABQAaAAUABgAFABYABQAOAAUAHgAFAAEABQARAAUACQAFABkABQAFAAUAFQAFAA0ABQAdAAUAAwAFABMABQALAAUAGwAFAAcABQAXAAUAQbDqAAtNAQAAAAEAAAABAAAAAQAAAAIAAAACAAAAAgAAAAIAAAADAAAAAwAAAAMAAAADAAAABAAAAAQAAAAEAAAABAAAAAUAAAAFAAAABQAAAAUAQaDrAAtlAQAAAAEAAAACAAAAAgAAAAMAAAADAAAABAAAAAQAAAAFAAAABQAAAAYAAAAGAAAABwAAAAcAAAAIAAAACAAAAAkAAAAJAAAACgAAAAoAAAALAAAACwAAAAwAAAAMAAAADQAAAA0AQdDsAAsjAgAAAAMAAAAHAAAAAAAAABAREgAIBwkGCgULBAwDDQIOAQ8AQYTtAAtpAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAKAAAADAAAAA4AAAAQAAAAFAAAABgAAAAcAAAAIAAAACgAAAAwAAAAOAAAAEAAAABQAAAAYAAAAHAAAACAAAAAoAAAAMAAAADgAEGE7gALegEAAAACAAAAAwAAAAQAAAAGAAAACAAAAAwAAAAQAAAAGAAAACAAAAAwAAAAQAAAAGAAAACAAAAAwAAAAAABAACAAQAAAAIAAAADAAAABAAAAAYAAAAIAAAADAAAABAAAAAYAAAAIAAAADAAAABAAAAAYAAAMS4yLjExAEGI7wALbQcAAAAEAAQACAAEAAgAAAAEAAUAEAAIAAgAAAAEAAYAIAAgAAgAAAAEAAQAEAAQAAkAAAAIABAAIAAgAAkAAAAIABAAgACAAAkAAAAIACAAgAAAAQkAAAAgAIAAAgEABAkAAAAgAAIBAgEAEAkAQYDwAAulAgMABAAFAAYABwAIAAkACgALAA0ADwARABMAFwAbAB8AIwArADMAOwBDAFMAYwBzAIMAowDDAOMAAgEAAAAAAAAQABAAEAAQABAAEAAQABAAEQARABEAEQASABIAEgASABMAEwATABMAFAAUABQAFAAVABUAFQAVABAATQDKAAAAAQACAAMABAAFAAcACQANABEAGQAhADEAQQBhAIEAwQABAYEBAQIBAwEEAQYBCAEMARABGAEgATABQAFgAAAAABAAEAAQABAAEQARABIAEgATABMAFAAUABUAFQAWABYAFwAXABgAGAAZABkAGgAaABsAGwAcABwAHQAdAEAAQAAQABEAEgAAAAgABwAJAAYACgAFAAsABAAMAAMADQACAA4AAQAPAEGw8gALwRFgBwAAAAhQAAAIEAAUCHMAEgcfAAAIcAAACDAAAAnAABAHCgAACGAAAAggAAAJoAAACAAAAAiAAAAIQAAACeAAEAcGAAAIWAAACBgAAAmQABMHOwAACHgAAAg4AAAJ0AARBxEAAAhoAAAIKAAACbAAAAgIAAAIiAAACEgAAAnwABAHBAAACFQAAAgUABUI4wATBysAAAh0AAAINAAACcgAEQcNAAAIZAAACCQAAAmoAAAIBAAACIQAAAhEAAAJ6AAQBwgAAAhcAAAIHAAACZgAFAdTAAAIfAAACDwAAAnYABIHFwAACGwAAAgsAAAJuAAACAwAAAiMAAAITAAACfgAEAcDAAAIUgAACBIAFQijABMHIwAACHIAAAgyAAAJxAARBwsAAAhiAAAIIgAACaQAAAgCAAAIggAACEIAAAnkABAHBwAACFoAAAgaAAAJlAAUB0MAAAh6AAAIOgAACdQAEgcTAAAIagAACCoAAAm0AAAICgAACIoAAAhKAAAJ9AAQBwUAAAhWAAAIFgBACAAAEwczAAAIdgAACDYAAAnMABEHDwAACGYAAAgmAAAJrAAACAYAAAiGAAAIRgAACewAEAcJAAAIXgAACB4AAAmcABQHYwAACH4AAAg+AAAJ3AASBxsAAAhuAAAILgAACbwAAAgOAAAIjgAACE4AAAn8AGAHAAAACFEAAAgRABUIgwASBx8AAAhxAAAIMQAACcIAEAcKAAAIYQAACCEAAAmiAAAIAQAACIEAAAhBAAAJ4gAQBwYAAAhZAAAIGQAACZIAEwc7AAAIeQAACDkAAAnSABEHEQAACGkAAAgpAAAJsgAACAkAAAiJAAAISQAACfIAEAcEAAAIVQAACBUAEAgCARMHKwAACHUAAAg1AAAJygARBw0AAAhlAAAIJQAACaoAAAgFAAAIhQAACEUAAAnqABAHCAAACF0AAAgdAAAJmgAUB1MAAAh9AAAIPQAACdoAEgcXAAAIbQAACC0AAAm6AAAIDQAACI0AAAhNAAAJ+gAQBwMAAAhTAAAIEwAVCMMAEwcjAAAIcwAACDMAAAnGABEHCwAACGMAAAgjAAAJpgAACAMAAAiDAAAIQwAACeYAEAcHAAAIWwAACBsAAAmWABQHQwAACHsAAAg7AAAJ1gASBxMAAAhrAAAIKwAACbYAAAgLAAAIiwAACEsAAAn2ABAHBQAACFcAAAgXAEAIAAATBzMAAAh3AAAINwAACc4AEQcPAAAIZwAACCcAAAmuAAAIBwAACIcAAAhHAAAJ7gAQBwkAAAhfAAAIHwAACZ4AFAdjAAAIfwAACD8AAAneABIHGwAACG8AAAgvAAAJvgAACA8AAAiPAAAITwAACf4AYAcAAAAIUAAACBAAFAhzABIHHwAACHAAAAgwAAAJwQAQBwoAAAhgAAAIIAAACaEAAAgAAAAIgAAACEAAAAnhABAHBgAACFgAAAgYAAAJkQATBzsAAAh4AAAIOAAACdEAEQcRAAAIaAAACCgAAAmxAAAICAAACIgAAAhIAAAJ8QAQBwQAAAhUAAAIFAAVCOMAEwcrAAAIdAAACDQAAAnJABEHDQAACGQAAAgkAAAJqQAACAQAAAiEAAAIRAAACekAEAcIAAAIXAAACBwAAAmZABQHUwAACHwAAAg8AAAJ2QASBxcAAAhsAAAILAAACbkAAAgMAAAIjAAACEwAAAn5ABAHAwAACFIAAAgSABUIowATByMAAAhyAAAIMgAACcUAEQcLAAAIYgAACCIAAAmlAAAIAgAACIIAAAhCAAAJ5QAQBwcAAAhaAAAIGgAACZUAFAdDAAAIegAACDoAAAnVABIHEwAACGoAAAgqAAAJtQAACAoAAAiKAAAISgAACfUAEAcFAAAIVgAACBYAQAgAABMHMwAACHYAAAg2AAAJzQARBw8AAAhmAAAIJgAACa0AAAgGAAAIhgAACEYAAAntABAHCQAACF4AAAgeAAAJnQAUB2MAAAh+AAAIPgAACd0AEgcbAAAIbgAACC4AAAm9AAAIDgAACI4AAAhOAAAJ/QBgBwAAAAhRAAAIEQAVCIMAEgcfAAAIcQAACDEAAAnDABAHCgAACGEAAAghAAAJowAACAEAAAiBAAAIQQAACeMAEAcGAAAIWQAACBkAAAmTABMHOwAACHkAAAg5AAAJ0wARBxEAAAhpAAAIKQAACbMAAAgJAAAIiQAACEkAAAnzABAHBAAACFUAAAgVABAIAgETBysAAAh1AAAINQAACcsAEQcNAAAIZQAACCUAAAmrAAAIBQAACIUAAAhFAAAJ6wAQBwgAAAhdAAAIHQAACZsAFAdTAAAIfQAACD0AAAnbABIHFwAACG0AAAgtAAAJuwAACA0AAAiNAAAITQAACfsAEAcDAAAIUwAACBMAFQjDABMHIwAACHMAAAgzAAAJxwARBwsAAAhjAAAIIwAACacAAAgDAAAIgwAACEMAAAnnABAHBwAACFsAAAgbAAAJlwAUB0MAAAh7AAAIOwAACdcAEgcTAAAIawAACCsAAAm3AAAICwAACIsAAAhLAAAJ9wAQBwUAAAhXAAAIFwBACAAAEwczAAAIdwAACDcAAAnPABEHDwAACGcAAAgnAAAJrwAACAcAAAiHAAAIRwAACe8AEAcJAAAIXwAACB8AAAmfABQHYwAACH8AAAg/AAAJ3wASBxsAAAhvAAAILwAACb8AAAgPAAAIjwAACE8AAAn/ABAFAQAXBQEBEwURABsFARARBQUAGQUBBBUFQQAdBQFAEAUDABgFAQIUBSEAHAUBIBIFCQAaBQEIFgWBAEAFAAAQBQIAFwWBARMFGQAbBQEYEQUHABkFAQYVBWEAHQUBYBAFBAAYBQEDFAUxABwFATASBQ0AGgUBDBYFwQBABQAAEQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAEACQsLAAAJBgsAAAsABhEAAAAREREAQYGEAQshCwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAALAEG7hAELAQwAQceEAQsVDAAAAAAMAAAAAAkMAAAAAAAMAAAMAEH1hAELAQ4AQYGFAQsVDQAAAAQNAAAAAAkOAAAAAAAOAAAOAEGvhQELARAAQbuFAQseDwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhISAEHyhQELDhIAAAASEhIAAAAAAAAJAEGjhgELAQsAQa+GAQsVCgAAAAAKAAAAAAkLAAAAAAALAAALAEHdhgELAQwAQemGAQsnDAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGAEG0hwELARkAQduHAQsF//////8AQaCIAQtXGRJEOwI/LEcUPTMwChsGRktFNw9JDo4XA0AdPGkrNh9KLRwBICUpIQgMFRYiLhA4Pgs0MRhkdHV2L0EJfzkRI0MyQomKiwUEJignDSoeNYwHGkiTE5SVAEGAiQELig5JbGxlZ2FsIGJ5dGUgc2VxdWVuY2UARG9tYWluIGVycm9yAFJlc3VsdCBub3QgcmVwcmVzZW50YWJsZQBOb3QgYSB0dHkAUGVybWlzc2lvbiBkZW5pZWQAT3BlcmF0aW9uIG5vdCBwZXJtaXR0ZWQATm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeQBObyBzdWNoIHByb2Nlc3MARmlsZSBleGlzdHMAVmFsdWUgdG9vIGxhcmdlIGZvciBkYXRhIHR5cGUATm8gc3BhY2UgbGVmdCBvbiBkZXZpY2UAT3V0IG9mIG1lbW9yeQBSZXNvdXJjZSBidXN5AEludGVycnVwdGVkIHN5c3RlbSBjYWxsAFJlc291cmNlIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlAEludmFsaWQgc2VlawBDcm9zcy1kZXZpY2UgbGluawBSZWFkLW9ubHkgZmlsZSBzeXN0ZW0ARGlyZWN0b3J5IG5vdCBlbXB0eQBDb25uZWN0aW9uIHJlc2V0IGJ5IHBlZXIAT3BlcmF0aW9uIHRpbWVkIG91dABDb25uZWN0aW9uIHJlZnVzZWQASG9zdCBpcyBkb3duAEhvc3QgaXMgdW5yZWFjaGFibGUAQWRkcmVzcyBpbiB1c2UAQnJva2VuIHBpcGUASS9PIGVycm9yAE5vIHN1Y2ggZGV2aWNlIG9yIGFkZHJlc3MAQmxvY2sgZGV2aWNlIHJlcXVpcmVkAE5vIHN1Y2ggZGV2aWNlAE5vdCBhIGRpcmVjdG9yeQBJcyBhIGRpcmVjdG9yeQBUZXh0IGZpbGUgYnVzeQBFeGVjIGZvcm1hdCBlcnJvcgBJbnZhbGlkIGFyZ3VtZW50AEFyZ3VtZW50IGxpc3QgdG9vIGxvbmcAU3ltYm9saWMgbGluayBsb29wAEZpbGVuYW1lIHRvbyBsb25nAFRvbyBtYW55IG9wZW4gZmlsZXMgaW4gc3lzdGVtAE5vIGZpbGUgZGVzY3JpcHRvcnMgYXZhaWxhYmxlAEJhZCBmaWxlIGRlc2NyaXB0b3IATm8gY2hpbGQgcHJvY2VzcwBCYWQgYWRkcmVzcwBGaWxlIHRvbyBsYXJnZQBUb28gbWFueSBsaW5rcwBObyBsb2NrcyBhdmFpbGFibGUAUmVzb3VyY2UgZGVhZGxvY2sgd291bGQgb2NjdXIAU3RhdGUgbm90IHJlY292ZXJhYmxlAFByZXZpb3VzIG93bmVyIGRpZWQAT3BlcmF0aW9uIGNhbmNlbGVkAEZ1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZABObyBtZXNzYWdlIG9mIGRlc2lyZWQgdHlwZQBJZGVudGlmaWVyIHJlbW92ZWQARGV2aWNlIG5vdCBhIHN0cmVhbQBObyBkYXRhIGF2YWlsYWJsZQBEZXZpY2UgdGltZW91dABPdXQgb2Ygc3RyZWFtcyByZXNvdXJjZXMATGluayBoYXMgYmVlbiBzZXZlcmVkAFByb3RvY29sIGVycm9yAEJhZCBtZXNzYWdlAEZpbGUgZGVzY3JpcHRvciBpbiBiYWQgc3RhdGUATm90IGEgc29ja2V0AERlc3RpbmF0aW9uIGFkZHJlc3MgcmVxdWlyZWQATWVzc2FnZSB0b28gbGFyZ2UAUHJvdG9jb2wgd3JvbmcgdHlwZSBmb3Igc29ja2V0AFByb3RvY29sIG5vdCBhdmFpbGFibGUAUHJvdG9jb2wgbm90IHN1cHBvcnRlZABTb2NrZXQgdHlwZSBub3Qgc3VwcG9ydGVkAE5vdCBzdXBwb3J0ZWQAUHJvdG9jb2wgZmFtaWx5IG5vdCBzdXBwb3J0ZWQAQWRkcmVzcyBmYW1pbHkgbm90IHN1cHBvcnRlZCBieSBwcm90b2NvbABBZGRyZXNzIG5vdCBhdmFpbGFibGUATmV0d29yayBpcyBkb3duAE5ldHdvcmsgdW5yZWFjaGFibGUAQ29ubmVjdGlvbiByZXNldCBieSBuZXR3b3JrAENvbm5lY3Rpb24gYWJvcnRlZABObyBidWZmZXIgc3BhY2UgYXZhaWxhYmxlAFNvY2tldCBpcyBjb25uZWN0ZWQAU29ja2V0IG5vdCBjb25uZWN0ZWQAQ2Fubm90IHNlbmQgYWZ0ZXIgc29ja2V0IHNodXRkb3duAE9wZXJhdGlvbiBhbHJlYWR5IGluIHByb2dyZXNzAE9wZXJhdGlvbiBpbiBwcm9ncmVzcwBTdGFsZSBmaWxlIGhhbmRsZQBSZW1vdGUgSS9PIGVycm9yAFF1b3RhIGV4Y2VlZGVkAE5vIG1lZGl1bSBmb3VuZABXcm9uZyBtZWRpdW0gdHlwZQBObyBlcnJvciBpbmZvcm1hdGlvbgBBkJcBC1JQUFAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAAAEAAAAIAAAAlEsAALRLAEGQmQELAgxQAEHImQELCR8AAADkTAAAAwBB5JkBC4wBLfRRWM+MscBG9rXLKTEDxwRbcDC0Xf0geH+LmthZKVBoSImrp1YDbP+3zYg/1He0K6WjcPG65Kj8QYP92W/hinovLXSWBx8NCV4Ddixw90ClLKdvV0GoqnTfoFhkA0rHxDxTrq9fGAQVseNtKIarDKS/Q/DpUIE5VxZSN/////////////////////8=";
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        var binary = tryParseAsDataURI(file);
        if (binary) {
          return binary;
        }
        if (readBinary) {
          return readBinary(file);
        } else {
          throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
        }
      } catch (err2) {
        abort(err2);
      }
    }
    function instantiateSync(file, info) {
      var instance;
      var module2;
      var binary;
      try {
        binary = getBinary(file);
        module2 = new WebAssembly.Module(binary);
        instance = new WebAssembly.Instance(module2, info);
      } catch (e) {
        var str = e.toString();
        err("failed to compile wasm module: " + str);
        if (str.includes("imported Memory") || str.includes("memory import")) {
          err("Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time).");
        }
        throw e;
      }
      return [instance, module2];
    }
    function createWasm() {
      var info = {a: asmLibraryArg};
      function receiveInstance(instance, module2) {
        var exports3 = instance.exports;
        Module["asm"] = exports3;
        wasmMemory = Module["asm"]["u"];
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module["asm"]["pa"];
        addOnInit(Module["asm"]["v"]);
        removeRunDependency();
      }
      addRunDependency();
      if (Module["instantiateWasm"]) {
        try {
          var exports2 = Module["instantiateWasm"](info, receiveInstance);
          return exports2;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      var result = instantiateSync(wasmBinaryFile, info);
      receiveInstance(result[0]);
      return Module["asm"];
    }
    var tempDouble;
    var tempI64;
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == "function") {
          callback(Module);
          continue;
        }
        var func = callback.func;
        if (typeof func === "number") {
          if (callback.arg === void 0) {
            wasmTable.get(func)();
          } else {
            wasmTable.get(func)(callback.arg);
          }
        } else {
          func(callback.arg === void 0 ? null : callback.arg);
        }
      }
    }
    function _gmtime_r(time, tmPtr) {
      var date = new Date(HEAP32[time >> 2] * 1e3);
      HEAP32[tmPtr >> 2] = date.getUTCSeconds();
      HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
      HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
      HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
      HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
      HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
      HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
      HEAP32[tmPtr + 36 >> 2] = 0;
      HEAP32[tmPtr + 32 >> 2] = 0;
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
      if (!_gmtime_r.GMTString)
        _gmtime_r.GMTString = allocateUTF8("GMT");
      HEAP32[tmPtr + 40 >> 2] = _gmtime_r.GMTString;
      return tmPtr;
    }
    function ___gmtime_r(a0, a1) {
      return _gmtime_r(a0, a1);
    }
    var PATH = {
      splitPath: function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
      normalizeArray: function(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1);
          } else if (last === "..") {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift("..");
          }
        }
        return parts;
      },
      normalize: function(path) {
        var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(path.split("/").filter(function(p) {
          return !!p;
        }), !isAbsolute).join("/");
        if (!path && !isAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isAbsolute ? "/" : "") + path;
      },
      dirname: function(path) {
        var result = PATH.splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
      basename: function(path) {
        if (path === "/")
          return "/";
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1)
          return path;
        return path.substr(lastSlash + 1);
      },
      extname: function(path) {
        return PATH.splitPath(path)[3];
      },
      join: function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join("/"));
      },
      join2: function(l, r) {
        return PATH.normalize(l + "/" + r);
      }
    };
    function getRandomDevice() {
      {
        try {
          var crypto_module = require("crypto");
          return function() {
            return crypto_module["randomBytes"](1)[0];
          };
        } catch (e) {
        }
      }
      return function() {
        abort("randomDevice");
      };
    }
    var PATH_FS = {
      resolve: function() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd();
          if (typeof path !== "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            return "";
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = path.charAt(0) === "/";
        }
        resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      },
      relative: function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== "")
              break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== "")
              break;
          }
          if (start > end)
            return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      }
    };
    var TTY = {
      ttys: [],
      init: function() {
      },
      shutdown: function() {
      },
      register: function(dev, ops) {
        TTY.ttys[dev] = {input: [], output: [], ops};
        FS.registerDevice(dev, TTY.stream_ops);
      },
      stream_ops: {
        open: function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
        close: function(stream) {
          stream.tty.ops.flush(stream.tty);
        },
        flush: function(stream) {
          stream.tty.ops.flush(stream.tty);
        },
        read: function(stream, buffer2, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0)
              break;
            bytesRead++;
            buffer2[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
        write: function(stream, buffer2, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer2[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }
      },
      default_tty_ops: {
        get_char: function(tty) {
          if (!tty.input.length) {
            var result = null;
            {
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
              try {
                bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch (e) {
                if (e.toString().includes("EOF"))
                  bytesRead = 0;
                else
                  throw e;
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString("utf-8");
              } else {
                result = null;
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },
        put_char: function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0)
              tty.output.push(val);
          }
        },
        flush: function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }
      },
      default_tty1_ops: {
        put_char: function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0)
              tty.output.push(val);
          }
        },
        flush: function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }
      }
    };
    function mmapAlloc(size) {
      var alignedSize = alignMemory(size, 65536);
      var ptr = _malloc(alignedSize);
      while (size < alignedSize)
        HEAP8[ptr + size++] = 0;
      return ptr;
    }
    var MEMFS = {
      ops_table: null,
      mount: function(mount) {
        return MEMFS.createNode(null, "/", 16384 | 511, 0);
      },
      createNode: function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {llseek: MEMFS.stream_ops.llseek}
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0;
          node.contents = null;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
      getFileDataAsTypedArray: function(node) {
        if (!node.contents)
          return new Uint8Array(0);
        if (node.contents.subarray)
          return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
      },
      expandFileStorage: function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity)
          return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
        if (prevCapacity != 0)
          newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
          node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      },
      resizeFileStorage: function(node, newSize) {
        if (node.usedBytes == newSize)
          return;
        if (newSize == 0) {
          node.contents = null;
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
          }
          node.usedBytes = newSize;
        }
      },
      node_ops: {
        getattr: function(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
        setattr: function(node, attr) {
          if (attr.mode !== void 0) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== void 0) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
        lookup: function(parent, name) {
          throw FS.genericErrors[44];
        },
        mknod: function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
        rename: function(old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now();
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },
        unlink: function(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        rmdir: function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        readdir: function(node) {
          var entries = [".", ".."];
          for (var key2 in node.contents) {
            if (!node.contents.hasOwnProperty(key2)) {
              continue;
            }
            entries.push(key2);
          }
          return entries;
        },
        symlink: function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        },
        readlink: function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }
      },
      stream_ops: {
        read: function(stream, buffer2, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes)
            return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer2.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++)
              buffer2[offset + i] = contents[position + i];
          }
          return size;
        },
        write: function(stream, buffer2, offset, length, position, canOwn) {
          if (buffer2.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length)
            return 0;
          var node = stream.node;
          node.timestamp = Date.now();
          if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer2.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer2.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(buffer2.subarray(offset, offset + length), position);
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer2.subarray) {
            node.contents.set(buffer2.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer2[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
        llseek: function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
        allocate: function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
        mmap: function(stream, address, length, position, prot, flags) {
          if (address !== 0) {
            throw new FS.ErrnoError(28);
          }
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents.buffer === buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return {ptr, allocated};
        },
        msync: function(stream, buffer2, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            return 0;
          }
          MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
          return 0;
        }
      }
    };
    var ERRNO_CODES = {
      EPERM: 63,
      ENOENT: 44,
      ESRCH: 71,
      EINTR: 27,
      EIO: 29,
      ENXIO: 60,
      E2BIG: 1,
      ENOEXEC: 45,
      EBADF: 8,
      ECHILD: 12,
      EAGAIN: 6,
      EWOULDBLOCK: 6,
      ENOMEM: 48,
      EACCES: 2,
      EFAULT: 21,
      ENOTBLK: 105,
      EBUSY: 10,
      EEXIST: 20,
      EXDEV: 75,
      ENODEV: 43,
      ENOTDIR: 54,
      EISDIR: 31,
      EINVAL: 28,
      ENFILE: 41,
      EMFILE: 33,
      ENOTTY: 59,
      ETXTBSY: 74,
      EFBIG: 22,
      ENOSPC: 51,
      ESPIPE: 70,
      EROFS: 69,
      EMLINK: 34,
      EPIPE: 64,
      EDOM: 18,
      ERANGE: 68,
      ENOMSG: 49,
      EIDRM: 24,
      ECHRNG: 106,
      EL2NSYNC: 156,
      EL3HLT: 107,
      EL3RST: 108,
      ELNRNG: 109,
      EUNATCH: 110,
      ENOCSI: 111,
      EL2HLT: 112,
      EDEADLK: 16,
      ENOLCK: 46,
      EBADE: 113,
      EBADR: 114,
      EXFULL: 115,
      ENOANO: 104,
      EBADRQC: 103,
      EBADSLT: 102,
      EDEADLOCK: 16,
      EBFONT: 101,
      ENOSTR: 100,
      ENODATA: 116,
      ETIME: 117,
      ENOSR: 118,
      ENONET: 119,
      ENOPKG: 120,
      EREMOTE: 121,
      ENOLINK: 47,
      EADV: 122,
      ESRMNT: 123,
      ECOMM: 124,
      EPROTO: 65,
      EMULTIHOP: 36,
      EDOTDOT: 125,
      EBADMSG: 9,
      ENOTUNIQ: 126,
      EBADFD: 127,
      EREMCHG: 128,
      ELIBACC: 129,
      ELIBBAD: 130,
      ELIBSCN: 131,
      ELIBMAX: 132,
      ELIBEXEC: 133,
      ENOSYS: 52,
      ENOTEMPTY: 55,
      ENAMETOOLONG: 37,
      ELOOP: 32,
      EOPNOTSUPP: 138,
      EPFNOSUPPORT: 139,
      ECONNRESET: 15,
      ENOBUFS: 42,
      EAFNOSUPPORT: 5,
      EPROTOTYPE: 67,
      ENOTSOCK: 57,
      ENOPROTOOPT: 50,
      ESHUTDOWN: 140,
      ECONNREFUSED: 14,
      EADDRINUSE: 3,
      ECONNABORTED: 13,
      ENETUNREACH: 40,
      ENETDOWN: 38,
      ETIMEDOUT: 73,
      EHOSTDOWN: 142,
      EHOSTUNREACH: 23,
      EINPROGRESS: 26,
      EALREADY: 7,
      EDESTADDRREQ: 17,
      EMSGSIZE: 35,
      EPROTONOSUPPORT: 66,
      ESOCKTNOSUPPORT: 137,
      EADDRNOTAVAIL: 4,
      ENETRESET: 39,
      EISCONN: 30,
      ENOTCONN: 53,
      ETOOMANYREFS: 141,
      EUSERS: 136,
      EDQUOT: 19,
      ESTALE: 72,
      ENOTSUP: 138,
      ENOMEDIUM: 148,
      EILSEQ: 25,
      EOVERFLOW: 61,
      ECANCELED: 11,
      ENOTRECOVERABLE: 56,
      EOWNERDEAD: 62,
      ESTRPIPE: 135
    };
    var NODEFS = {
      isWindows: false,
      staticInit: function() {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = {fs: fs.constants};
        if (flags["fs"]) {
          flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = {
          1024: flags["O_APPEND"],
          64: flags["O_CREAT"],
          128: flags["O_EXCL"],
          256: flags["O_NOCTTY"],
          0: flags["O_RDONLY"],
          2: flags["O_RDWR"],
          4096: flags["O_SYNC"],
          512: flags["O_TRUNC"],
          1: flags["O_WRONLY"]
        };
      },
      bufferFrom: function(arrayBuffer) {
        return Buffer["alloc"] ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
      },
      convertNodeCode: function(e) {
        var code = e.code;
        return ERRNO_CODES[code];
      },
      mount: function(mount) {
        return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
      },
      createNode: function(parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(28);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },
      getMode: function(path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            stat.mode = stat.mode | (stat.mode & 292) >> 2;
          }
        } catch (e) {
          if (!e.code)
            throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
        return stat.mode;
      },
      realPath: function(node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },
      flagsForNode: function(flags) {
        flags &= ~2097152;
        flags &= ~2048;
        flags &= ~32768;
        flags &= ~524288;
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }
        if (!flags) {
          return newFlags;
        } else {
          throw new FS.ErrnoError(28);
        }
      },
      node_ops: {
        getattr: function(node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },
        setattr: function(node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== void 0) {
              fs.chmodSync(path, attr.mode);
              node.mode = attr.mode;
            }
            if (attr.timestamp !== void 0) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== void 0) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        lookup: function(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },
        mknod: function(parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, "", {mode: node.mode});
            }
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          return node;
        },
        rename: function(oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          oldNode.name = newName;
        },
        unlink: function(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        rmdir: function(parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        readdir: function(node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        symlink: function(parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        readlink: function(node) {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        }
      },
      stream_ops: {
        open: function(stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        close: function(stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        read: function(stream, buffer2, offset, length, position) {
          if (length === 0)
            return 0;
          try {
            return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer2.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        write: function(stream, buffer2, offset, length, position) {
          try {
            return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer2.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },
        llseek: function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
              }
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
        mmap: function(stream, address, length, position, prot, flags) {
          if (address !== 0) {
            throw new FS.ErrnoError(28);
          }
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr = mmapAlloc(length);
          NODEFS.stream_ops.read(stream, HEAP8, ptr, length, position);
          return {ptr, allocated: true};
        },
        msync: function(stream, buffer2, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            return 0;
          }
          NODEFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
          return 0;
        }
      }
    };
    var NODERAWFS = {
      lookupPath: function(path) {
        return {path, node: {mode: NODEFS.getMode(path)}};
      },
      createStandardStreams: function() {
        FS.streams[0] = {
          fd: 0,
          nfd: 0,
          position: 0,
          path: "",
          flags: 0,
          tty: true,
          seekable: false
        };
        for (var i = 1; i < 3; i++) {
          FS.streams[i] = {
            fd: i,
            nfd: i,
            position: 0,
            path: "",
            flags: 577,
            tty: true,
            seekable: false
          };
        }
      },
      cwd: function() {
        return process.cwd();
      },
      chdir: function() {
        process.chdir.apply(void 0, arguments);
      },
      mknod: function(path, mode) {
        if (FS.isDir(path)) {
          fs.mkdirSync(path, mode);
        } else {
          fs.writeFileSync(path, "", {mode});
        }
      },
      mkdir: function() {
        fs.mkdirSync.apply(void 0, arguments);
      },
      symlink: function() {
        fs.symlinkSync.apply(void 0, arguments);
      },
      rename: function() {
        fs.renameSync.apply(void 0, arguments);
      },
      rmdir: function() {
        fs.rmdirSync.apply(void 0, arguments);
      },
      readdir: function() {
        fs.readdirSync.apply(void 0, arguments);
      },
      unlink: function() {
        fs.unlinkSync.apply(void 0, arguments);
      },
      readlink: function() {
        return fs.readlinkSync.apply(void 0, arguments);
      },
      stat: function() {
        return fs.statSync.apply(void 0, arguments);
      },
      lstat: function() {
        return fs.lstatSync.apply(void 0, arguments);
      },
      chmod: function() {
        fs.chmodSync.apply(void 0, arguments);
      },
      fchmod: function() {
        fs.fchmodSync.apply(void 0, arguments);
      },
      chown: function() {
        fs.chownSync.apply(void 0, arguments);
      },
      fchown: function() {
        fs.fchownSync.apply(void 0, arguments);
      },
      truncate: function() {
        fs.truncateSync.apply(void 0, arguments);
      },
      ftruncate: function(fd, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        fs.ftruncateSync.apply(void 0, arguments);
      },
      utime: function() {
        fs.utimesSync.apply(void 0, arguments);
      },
      open: function(path, flags, mode, suggestFD) {
        if (typeof flags === "string") {
          flags = VFS.modeStringToFlags(flags);
        }
        var nfd = fs.openSync(path, NODEFS.flagsForNode(flags), mode);
        var fd = suggestFD != null ? suggestFD : FS.nextfd(nfd);
        var stream = {
          fd,
          nfd,
          position: 0,
          path,
          flags,
          seekable: true
        };
        FS.streams[fd] = stream;
        return stream;
      },
      close: function(stream) {
        if (!stream.stream_ops) {
          fs.closeSync(stream.nfd);
        }
        FS.closeStream(stream.fd);
      },
      llseek: function(stream, offset, whence) {
        if (stream.stream_ops) {
          return VFS.llseek(stream, offset, whence);
        }
        var position = offset;
        if (whence === 1) {
          position += stream.position;
        } else if (whence === 2) {
          position += fs.fstatSync(stream.nfd).size;
        } else if (whence !== 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if (position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        stream.position = position;
        return position;
      },
      read: function(stream, buffer2, offset, length, position) {
        if (stream.stream_ops) {
          return VFS.read(stream, buffer2, offset, length, position);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking && stream.seekable)
          position = stream.position;
        var bytesRead = fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer2.buffer), offset, length, position);
        if (!seeking)
          stream.position += bytesRead;
        return bytesRead;
      },
      write: function(stream, buffer2, offset, length, position) {
        if (stream.stream_ops) {
          return VFS.write(stream, buffer2, offset, length, position);
        }
        if (stream.flags & +"1024") {
          FS.llseek(stream, 0, +"2");
        }
        var seeking = typeof position !== "undefined";
        if (!seeking && stream.seekable)
          position = stream.position;
        var bytesWritten = fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer2.buffer), offset, length, position);
        if (!seeking)
          stream.position += bytesWritten;
        return bytesWritten;
      },
      allocate: function() {
        throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
      },
      mmap: function(stream, address, length, position, prot, flags) {
        if (stream.stream_ops) {
          return VFS.mmap(stream, address, length, position, prot, flags);
        }
        if (address !== 0) {
          throw new FS.ErrnoError(28);
        }
        var ptr = mmapAlloc(length);
        FS.read(stream, HEAP8, ptr, length, position);
        return {ptr, allocated: true};
      },
      msync: function(stream, buffer2, offset, length, mmapFlags) {
        if (stream.stream_ops) {
          return VFS.msync(stream, buffer2, offset, length, mmapFlags);
        }
        if (mmapFlags & 2) {
          return 0;
        }
        FS.write(stream, buffer2, 0, length, offset);
        return 0;
      },
      munmap: function() {
        return 0;
      },
      ioctl: function() {
        throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
      }
    };
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: false,
      ignorePermissions: true,
      trackingDelegate: {},
      tracking: {openFlags: {READ: 1, WRITE: 2}},
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      lookupPath: function(path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
        if (!path)
          return {path: "", node: null};
        var defaults = {follow_mount: true, recurse_count: 0};
        for (var key2 in defaults) {
          if (opts[key2] === void 0) {
            opts[key2] = defaults[key2];
          }
        }
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32);
        }
        var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
          return !!p;
        }), false);
        var current = FS.root;
        var current_path = "/";
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          if (FS.isMountpoint(current)) {
            if (!islast || islast && opts.follow_mount) {
              current = current.mounted.root;
            }
          }
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, {
                recurse_count: opts.recurse_count
              });
              current = lookup.node;
              if (count++ > 40) {
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
        return {path: current_path, node: current};
      },
      getPath: function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path)
              return mount;
            return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
          }
          path = path ? node.name + "/" + path : node.name;
          node = node.parent;
        }
      },
      hashName: function(parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
        }
        return (parentid + hash >>> 0) % FS.nameTable.length;
      },
      hashAddNode: function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
      hashRemoveNode: function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
      lookupNode: function(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        return FS.lookup(parent, name);
      },
      createNode: function(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      },
      destroyNode: function(node) {
        FS.hashRemoveNode(node);
      },
      isRoot: function(node) {
        return node === node.parent;
      },
      isMountpoint: function(node) {
        return !!node.mounted;
      },
      isFile: function(mode) {
        return (mode & 61440) === 32768;
      },
      isDir: function(mode) {
        return (mode & 61440) === 16384;
      },
      isLink: function(mode) {
        return (mode & 61440) === 40960;
      },
      isChrdev: function(mode) {
        return (mode & 61440) === 8192;
      },
      isBlkdev: function(mode) {
        return (mode & 61440) === 24576;
      },
      isFIFO: function(mode) {
        return (mode & 61440) === 4096;
      },
      isSocket: function(mode) {
        return (mode & 49152) === 49152;
      },
      flagModes: {r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090},
      modeStringToFlags: function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === "undefined") {
          throw new Error("Unknown file open mode: " + str);
        }
        return flags;
      },
      flagsToPermissionString: function(flag) {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
          perms += "w";
        }
        return perms;
      },
      nodePermissions: function(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        if (perms.includes("r") && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes("w") && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes("x") && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
      mayLookup: function(dir) {
        var errCode = FS.nodePermissions(dir, "x");
        if (errCode)
          return errCode;
        if (!dir.node_ops.lookup)
          return 2;
        return 0;
      },
      mayCreate: function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, "wx");
      },
      mayDelete: function(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, "wx");
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
      mayOpen: function(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
      MAX_OPEN_FDS: 4096,
      nextfd: function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
      getStream: function(fd) {
        return FS.streams[fd];
      },
      createStream: function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function() {
          };
          FS.FSStream.prototype = {
            object: {
              get: function() {
                return this.node;
              },
              set: function(val) {
                this.node = val;
              }
            },
            isRead: {
              get: function() {
                return (this.flags & 2097155) !== 1;
              }
            },
            isWrite: {
              get: function() {
                return (this.flags & 2097155) !== 0;
              }
            },
            isAppend: {
              get: function() {
                return this.flags & 1024;
              }
            }
          };
        }
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
      closeStream: function(fd) {
        FS.streams[fd] = null;
      },
      chrdev_stream_ops: {
        open: function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },
        llseek: function() {
          throw new FS.ErrnoError(70);
        }
      },
      major: function(dev) {
        return dev >> 8;
      },
      minor: function(dev) {
        return dev & 255;
      },
      makedev: function(ma, mi) {
        return ma << 8 | mi;
      },
      registerDevice: function(dev, ops) {
        FS.devices[dev] = {stream_ops: ops};
      },
      getDevice: function(dev) {
        return FS.devices[dev];
      },
      getMounts: function(mount) {
        var mounts = [];
        var check = [mount];
        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push.apply(check, m.mounts);
        }
        return mounts;
      },
      syncfs: function(populate, callback) {
        if (typeof populate === "function") {
          callback = populate;
          populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
          err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(errCode) {
          FS.syncFSRequests--;
          return callback(errCode);
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }
        mounts.forEach(function(mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
      mount: function(type, opts, mountpoint) {
        var root = mountpoint === "/";
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, {follow_mount: false});
          mountpoint = lookup.path;
          node = lookup.node;
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          node.mounted = mount;
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
        return mountRoot;
      },
      unmount: function(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, {follow_mount: false});
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach(function(hash) {
          var current = FS.nameTable[hash];
          while (current) {
            var next = current.name_next;
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
            current = next;
          }
        });
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
      },
      lookup: function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
      mknod: function(path, mode, dev) {
        var lookup = FS.lookupPath(path, {parent: true});
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === "." || name === "..") {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
      create: function(path, mode) {
        mode = mode !== void 0 ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
      mkdir: function(path, mode) {
        mode = mode !== void 0 ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
      mkdirTree: function(path, mode) {
        var dirs = path.split("/");
        var d = "";
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i])
            continue;
          d += "/" + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch (e) {
            if (e.errno != 20)
              throw e;
          }
        }
      },
      mkdev: function(path, mode, dev) {
        if (typeof dev === "undefined") {
          dev = mode;
          mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
      symlink: function(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, {parent: true});
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
      rename: function(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        lookup = FS.lookupPath(old_path, {parent: true});
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, {parent: true});
        new_dir = lookup.node;
        if (!old_dir || !new_dir)
          throw new FS.ErrnoError(44);
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(28);
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(55);
        }
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
        }
        if (old_node === new_node) {
          return;
        }
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
          throw new FS.ErrnoError(10);
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        try {
          if (FS.trackingDelegate["willMovePath"]) {
            FS.trackingDelegate["willMovePath"](old_path, new_path);
          }
        } catch (e) {
          err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
        }
        FS.hashRemoveNode(old_node);
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate["onMovePath"])
            FS.trackingDelegate["onMovePath"](old_path, new_path);
        } catch (e) {
          err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
        }
      },
      rmdir: function(path) {
        var lookup = FS.lookupPath(path, {parent: true});
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate["willDeletePath"]) {
            FS.trackingDelegate["willDeletePath"](path);
          }
        } catch (e) {
          err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate["onDeletePath"])
            FS.trackingDelegate["onDeletePath"](path);
        } catch (e) {
          err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
        }
      },
      readdir: function(path) {
        var lookup = FS.lookupPath(path, {follow: true});
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
      unlink: function(path) {
        var lookup = FS.lookupPath(path, {parent: true});
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate["willDeletePath"]) {
            FS.trackingDelegate["willDeletePath"](path);
          }
        } catch (e) {
          err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate["onDeletePath"])
            FS.trackingDelegate["onDeletePath"](path);
        } catch (e) {
          err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
        }
      },
      readlink: function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
      stat: function(path, dontFollow) {
        var lookup = FS.lookupPath(path, {follow: !dontFollow});
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
      lstat: function(path) {
        return FS.stat(path, true);
      },
      chmod: function(path, mode, dontFollow) {
        var node;
        if (typeof path === "string") {
          var lookup = FS.lookupPath(path, {follow: !dontFollow});
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: mode & 4095 | node.mode & ~4095,
          timestamp: Date.now()
        });
      },
      lchmod: function(path, mode) {
        FS.chmod(path, mode, true);
      },
      fchmod: function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },
      chown: function(path, uid, gid, dontFollow) {
        var node;
        if (typeof path === "string") {
          var lookup = FS.lookupPath(path, {follow: !dontFollow});
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {timestamp: Date.now()});
      },
      lchown: function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
      fchown: function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },
      truncate: function(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path === "string") {
          var lookup = FS.lookupPath(path, {follow: true});
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {size: len, timestamp: Date.now()});
      },
      ftruncate: function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
      utime: function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, {follow: true});
        var node = lookup.node;
        node.node_ops.setattr(node, {timestamp: Math.max(atime, mtime)});
      },
      open: function(path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === "undefined" ? 438 : mode;
        if (flags & 64) {
          mode = mode & 4095 | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === "object") {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {follow: !(flags & 131072)});
            node = lookup.node;
          } catch (e) {
          }
        }
        var created = false;
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20);
            }
          } else {
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        if (flags & 512) {
          FS.truncate(node, 0);
        }
        flags &= ~(128 | 512 | 131072);
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module["logReadFiles"] && !(flags & 1)) {
          if (!FS.readFiles)
            FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            err("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate["onOpenFile"]) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate["onOpenFile"](path, trackingFlags);
          }
        } catch (e) {
          err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
        }
        return stream;
      },
      close: function(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents)
          stream.getdents = null;
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
      isClosed: function(stream) {
        return stream.fd === null;
      },
      llseek: function(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
      read: function(stream, buffer2, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer2, offset, length, position);
        if (!seeking)
          stream.position += bytesRead;
        return bytesRead;
      },
      write: function(stream, buffer2, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer2, offset, length, position, canOwn);
        if (!seeking)
          stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate["onWriteToFile"])
            FS.trackingDelegate["onWriteToFile"](stream.path);
        } catch (e) {
          err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
        }
        return bytesWritten;
      },
      allocate: function(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
      mmap: function(stream, address, length, position, prot, flags) {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
      },
      msync: function(stream, buffer2, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer2, offset, length, mmapFlags);
      },
      munmap: function(stream) {
        return 0;
      },
      ioctl: function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
      readFile: function(path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || "binary";
        if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === "utf8") {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === "binary") {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
      writeFile: function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === "string") {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
        } else {
          throw new Error("Unsupported data type");
        }
        FS.close(stream);
      },
      cwd: function() {
        return FS.currentPath;
      },
      chdir: function(path) {
        var lookup = FS.lookupPath(path, {follow: true});
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, "x");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
      createDefaultDirectories: function() {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
      },
      createDefaultDevices: function() {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() {
            return 0;
          },
          write: function(stream, buffer2, offset, length, pos) {
            return length;
          }
        });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var random_device = getRandomDevice();
        FS.createDevice("/dev", "random", random_device);
        FS.createDevice("/dev", "urandom", random_device);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp");
      },
      createSpecialDirectories: function() {
        FS.mkdir("/proc");
        var proc_self = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount({
          mount: function() {
            var node = FS.createNode(proc_self, "fd", 16384 | 511, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream)
                  throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: {mountpoint: "fake"},
                  node_ops: {
                    readlink: function() {
                      return stream.path;
                    }
                  }
                };
                ret.parent = ret;
                return ret;
              }
            };
            return node;
          }
        }, {}, "/proc/self/fd");
      },
      createStandardStreams: function() {
        if (Module["stdin"]) {
          FS.createDevice("/dev", "stdin", Module["stdin"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdin");
        }
        if (Module["stdout"]) {
          FS.createDevice("/dev", "stdout", null, Module["stdout"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdout");
        }
        if (Module["stderr"]) {
          FS.createDevice("/dev", "stderr", null, Module["stderr"]);
        } else {
          FS.symlink("/dev/tty1", "/dev/stderr");
        }
        FS.open("/dev/stdin", 0);
        FS.open("/dev/stdout", 1);
        FS.open("/dev/stderr", 1);
      },
      ensureErrnoError: function() {
        if (FS.ErrnoError)
          return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno2) {
            this.errno = errno2;
          };
          this.setErrno(errno);
          this.message = "FS error";
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = "<generic error, no stack>";
        });
      },
      staticInit: function() {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = {MEMFS, NODEFS};
      },
      init: function(input, output, error) {
        FS.init.initialized = true;
        FS.ensureErrnoError();
        Module["stdin"] = input || Module["stdin"];
        Module["stdout"] = output || Module["stdout"];
        Module["stderr"] = error || Module["stderr"];
        FS.createStandardStreams();
      },
      quit: function() {
        FS.init.initialized = false;
        var fflush = Module["_fflush"];
        if (fflush)
          fflush(0);
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
      getMode: function(canRead, canWrite) {
        var mode = 0;
        if (canRead)
          mode |= 292 | 73;
        if (canWrite)
          mode |= 146;
        return mode;
      },
      findObject: function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          return null;
        }
      },
      analyzePath: function(path, dontResolveLastLink) {
        try {
          var lookup = FS.lookupPath(path, {follow: !dontResolveLastLink});
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, {parent: true});
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, {follow: !dontResolveLastLink});
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === "/";
        } catch (e) {
          ret.error = e.errno;
        }
        return ret;
      },
      createPath: function(parent, path, canRead, canWrite) {
        parent = typeof parent === "string" ? parent : FS.getPath(parent);
        var parts = path.split("/").reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part)
            continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
          }
          parent = current;
        }
        return current;
      },
      createFile: function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
      createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === "string") {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i)
              arr[i] = data.charCodeAt(i);
            data = arr;
          }
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },
      createDevice: function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major)
          FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer2, offset, length, pos) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0)
                break;
              bytesRead++;
              buffer2[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer2, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer2[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
      forceLoadFile: function(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
          return true;
        if (read_) {
          try {
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error("Cannot load without read() or XMLHttpRequest.");
        }
      },
      createLazyFile: function(parent, name, url, canRead, canWrite) {
        var properties; {
          var properties = {isDevice: false, url};
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        Object.defineProperties(node, {
          usedBytes: {
            get: function() {
              return this.contents.length;
            }
          }
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key2) {
          var fn = node.stream_ops[key2];
          stream_ops[key2] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        stream_ops.read = function stream_ops_read(stream, buffer2, offset, length, position) {
          FS.forceLoadFile(node);
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer2[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer2[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },
      createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init();
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray2) {
            if (preFinish)
              preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
            }
            if (onload)
              onload();
            removeRunDependency();
          }
          var handled = false;
          Module["preloadPlugins"].forEach(function(plugin) {
            if (handled)
              return;
            if (plugin["canHandle"](fullname)) {
              plugin["handle"](byteArray, fullname, finish, function() {
                if (onerror)
                  onerror();
                removeRunDependency();
              });
              handled = true;
            }
          });
          if (!handled)
            finish(byteArray);
        }
        addRunDependency();
        if (typeof url == "string") {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },
      indexedDB: function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },
      DB_NAME: function() {
        return "EM_FS_" + window.location.pathname;
      },
      DB_VERSION: 20,
      DB_STORE_NAME: "FILE_DATA",
      saveFilesToDB: function(paths, onload, onerror) {
        onload = onload || function() {
        };
        onerror = onerror || function() {
        };
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          out("creating db");
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0)
              onload();
            else
              onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() {
              ok++;
              if (ok + fail == total)
                finish();
            };
            putRequest.onerror = function putRequest_onerror() {
              fail++;
              if (ok + fail == total)
                finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },
      loadFilesFromDB: function(paths, onload, onerror) {
        onload = onload || function() {
        };
        onerror = onerror || function() {
        };
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror;
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
          } catch (e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0)
              onload();
            else
              onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total)
                finish();
            };
            getRequest.onerror = function getRequest_onerror() {
              fail++;
              if (ok + fail == total)
                finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }
    };
    var SYSCALLS = {
      mappings: {},
      DEFAULT_POLLMASK: 5,
      umask: 511,
      calculateAt: function(dirfd, path, allowEmpty) {
        if (path[0] === "/") {
          return path;
        }
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = FS.getStream(dirfd);
          if (!dirstream)
            throw new FS.ErrnoError(8);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
      doStat: function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            return -54;
          }
          throw e;
        }
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[buf + 4 >> 2] = 0;
        HEAP32[buf + 8 >> 2] = stat.ino;
        HEAP32[buf + 12 >> 2] = stat.mode;
        HEAP32[buf + 16 >> 2] = stat.nlink;
        HEAP32[buf + 20 >> 2] = stat.uid;
        HEAP32[buf + 24 >> 2] = stat.gid;
        HEAP32[buf + 28 >> 2] = stat.rdev;
        HEAP32[buf + 32 >> 2] = 0;
        tempI64 = [
          stat.size >>> 0,
          (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
        ], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
        HEAP32[buf + 48 >> 2] = 4096;
        HEAP32[buf + 52 >> 2] = stat.blocks;
        HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
        HEAP32[buf + 60 >> 2] = 0;
        HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
        HEAP32[buf + 68 >> 2] = 0;
        HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
        HEAP32[buf + 76 >> 2] = 0;
        tempI64 = [
          stat.ino >>> 0,
          (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
        ], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
        return 0;
      },
      doMsync: function(addr, stream, len, flags, offset) {
        var buffer2 = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer2, offset, len, flags);
      },
      doMkdir: function(path, mode) {
        path = PATH.normalize(path);
        if (path[path.length - 1] === "/")
          path = path.substr(0, path.length - 1);
        FS.mkdir(path, mode, 0);
        return 0;
      },
      doMknod: function(path, mode, dev) {
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default:
            return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },
      doReadlink: function(path, buf, bufsize) {
        if (bufsize <= 0)
          return -28;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf + len];
        stringToUTF8(ret, buf, bufsize + 1);
        HEAP8[buf + len] = endChar;
        return len;
      },
      doAccess: function(path, amode) {
        if (amode & ~7) {
          return -28;
        }
        var node;
        var lookup = FS.lookupPath(path, {follow: true});
        node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = "";
        if (amode & 4)
          perms += "r";
        if (amode & 2)
          perms += "w";
        if (amode & 1)
          perms += "x";
        if (perms && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      },
      doDup: function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest)
          FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },
      doReadv: function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          var curr = FS.read(stream, HEAP8, ptr, len, offset);
          if (curr < 0)
            return -1;
          ret += curr;
          if (curr < len)
            break;
        }
        return ret;
      },
      doWritev: function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
          var curr = FS.write(stream, HEAP8, ptr, len, offset);
          if (curr < 0)
            return -1;
          ret += curr;
        }
        return ret;
      },
      varargs: void 0,
      get: function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      },
      getStr: function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
      getStreamFromFD: function(fd) {
        var stream = FS.getStream(fd);
        if (!stream)
          throw new FS.ErrnoError(8);
        return stream;
      },
      get64: function(low, high) {
        return low;
      }
    };
    function ___sys_chmod(path, mode) {
      try {
        path = SYSCALLS.getStr(path);
        FS.chmod(path, mode);
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function setErrNo(value) {
      HEAP32[___errno_location() >> 2] = value;
      return value;
    }
    function ___sys_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = SYSCALLS.get();
            if (arg < 0) {
              return -28;
            }
            var newStream;
            newStream = FS.open(stream.path, stream.flags, 0, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = SYSCALLS.get();
            stream.flags |= arg;
            return 0;
          }
          case 12: {
            var arg = SYSCALLS.get();
            var offset = 0;
            HEAP16[arg + offset >> 1] = 2;
            return 0;
          }
          case 13:
          case 14:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            setErrNo(28);
            return -1;
          default: {
            return -28;
          }
        }
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_fstat64(fd, buf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        return SYSCALLS.doStat(FS.stat, stream.path, buf);
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
          case 21509:
          case 21505: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21519: {
            if (!stream.tty)
              return -59;
            var argp = SYSCALLS.get();
            HEAP32[argp >> 2] = 0;
            return 0;
          }
          case 21520: {
            if (!stream.tty)
              return -59;
            return -28;
          }
          case 21531: {
            var argp = SYSCALLS.get();
            return FS.ioctl(stream, op, argp);
          }
          case 21523: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21524: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          default:
            abort("bad ioctl syscall " + op);
        }
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_open(path, flags, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var pathname = SYSCALLS.getStr(path);
        var mode = varargs ? SYSCALLS.get() : 0;
        var stream = FS.open(pathname, flags, mode);
        return stream.fd;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_rename(old_path, new_path) {
      try {
        old_path = SYSCALLS.getStr(old_path);
        new_path = SYSCALLS.getStr(new_path);
        FS.rename(old_path, new_path);
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_rmdir(path) {
      try {
        path = SYSCALLS.getStr(path);
        FS.rmdir(path);
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.doStat(FS.stat, path, buf);
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function ___sys_unlink(path) {
      try {
        path = SYSCALLS.getStr(path);
        FS.unlink(path);
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return -e.errno;
      }
    }
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }
    function emscripten_realloc_buffer(size) {
      try {
        wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1;
      } catch (e) {
      }
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      var maxHeapSize = 2147483648;
      if (requestedSize > maxHeapSize) {
        return false;
      }
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    }
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return e.errno;
      }
    }
    function _fd_fdstat_get(fd, pbuf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4;
        HEAP8[pbuf >> 0] = type;
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return e.errno;
      }
    }
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = SYSCALLS.doReadv(stream, iov, iovcnt);
        HEAP32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return e.errno;
      }
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var HIGH_OFFSET = 4294967296;
        var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
        var DOUBLE_LIMIT = 9007199254740992;
        if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
          return -61;
        }
        FS.llseek(stream, offset, whence);
        tempI64 = [
          stream.position >>> 0,
          (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)
        ], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
        if (stream.getdents && offset === 0 && whence === 0)
          stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return e.errno;
      }
    }
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = SYSCALLS.doWritev(stream, iov, iovcnt);
        HEAP32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError))
          abort(e);
        return e.errno;
      }
    }
    function _setTempRet0(val) {
    }
    function _time(ptr) {
      var ret = Date.now() / 1e3 | 0;
      if (ptr) {
        HEAP32[ptr >> 2] = ret;
      }
      return ret;
    }
    function _tzset() {
      if (_tzset.called)
        return;
      _tzset.called = true;
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
      HEAP32[__get_timezone() >> 2] = stdTimezoneOffset * 60;
      HEAP32[__get_daylight() >> 2] = Number(winterOffset != summerOffset);
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      }
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = allocateUTF8(winterName);
      var summerNamePtr = allocateUTF8(summerName);
      if (summerOffset < winterOffset) {
        HEAP32[__get_tzname() >> 2] = winterNamePtr;
        HEAP32[__get_tzname() + 4 >> 2] = summerNamePtr;
      } else {
        HEAP32[__get_tzname() >> 2] = summerNamePtr;
        HEAP32[__get_tzname() + 4 >> 2] = winterNamePtr;
      }
    }
    function _timegm(tmPtr) {
      _tzset();
      var time = Date.UTC(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
      var date = new Date(time);
      HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
      HEAP32[tmPtr + 28 >> 2] = yday;
      return date.getTime() / 1e3 | 0;
    }
    var FSNode = function(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.mounted = null;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.node_ops = {};
      this.stream_ops = {};
      this.rdev = rdev;
    };
    var readMode = 292 | 73;
    var writeMode = 146;
    Object.defineProperties(FSNode.prototype, {
      read: {
        get: function() {
          return (this.mode & readMode) === readMode;
        },
        set: function(val) {
          val ? this.mode |= readMode : this.mode &= ~readMode;
        }
      },
      write: {
        get: function() {
          return (this.mode & writeMode) === writeMode;
        },
        set: function(val) {
          val ? this.mode |= writeMode : this.mode &= ~writeMode;
        }
      },
      isFolder: {
        get: function() {
          return FS.isDir(this.mode);
        }
      },
      isDevice: {
        get: function() {
          return FS.isChrdev(this.mode);
        }
      }
    });
    FS.FSNode = FSNode;
    FS.staticInit();
    {
      var fs = frozenFs;
      var NODEJS_PATH = path__default.default;
      NODEFS.staticInit();
    }
    {
      var _wrapNodeError = function(func) {
        return function() {
          try {
            return func.apply(this, arguments);
          } catch (e) {
            if (!e.code)
              throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        };
      };
      var VFS = Object.assign({}, FS);
      for (var _key in NODERAWFS)
        FS[_key] = _wrapNodeError(NODERAWFS[_key]);
    }
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull)
        u8array.length = numBytesWritten;
      return u8array;
    }
    function intArrayFromBase64(s) {
      {
        var buf;
        try {
          buf = Buffer.from(s, "base64");
        } catch (_) {
          buf = new Buffer(s, "base64");
        }
        return new Uint8Array(buf["buffer"], buf["byteOffset"], buf["byteLength"]);
      }
    }
    function tryParseAsDataURI(filename) {
      if (!isDataURI(filename)) {
        return;
      }
      return intArrayFromBase64(filename.slice(dataURIPrefix.length));
    }
    var asmLibraryArg = {
      s: ___gmtime_r,
      p: ___sys_chmod,
      e: ___sys_fcntl64,
      k: ___sys_fstat64,
      o: ___sys_ioctl,
      q: ___sys_open,
      i: ___sys_rename,
      r: ___sys_rmdir,
      c: ___sys_stat64,
      h: ___sys_unlink,
      l: _emscripten_memcpy_big,
      m: _emscripten_resize_heap,
      f: _fd_close,
      j: _fd_fdstat_get,
      g: _fd_read,
      n: _fd_seek,
      d: _fd_write,
      a: _setTempRet0,
      b: _time,
      t: _timegm
    };
    var asm = createWasm();
    Module["___wasm_call_ctors"] = asm["v"];
    Module["_zip_ext_count_symlinks"] = asm["w"];
    Module["_zip_file_get_external_attributes"] = asm["x"];
    Module["_zipstruct_stat"] = asm["y"];
    Module["_zipstruct_statS"] = asm["z"];
    Module["_zipstruct_stat_name"] = asm["A"];
    Module["_zipstruct_stat_index"] = asm["B"];
    Module["_zipstruct_stat_size"] = asm["C"];
    Module["_zipstruct_stat_mtime"] = asm["D"];
    Module["_zipstruct_stat_crc"] = asm["E"];
    Module["_zipstruct_error"] = asm["F"];
    Module["_zipstruct_errorS"] = asm["G"];
    Module["_zipstruct_error_code_zip"] = asm["H"];
    Module["_zipstruct_stat_comp_size"] = asm["I"];
    Module["_zipstruct_stat_comp_method"] = asm["J"];
    Module["_zip_close"] = asm["K"];
    Module["_zip_delete"] = asm["L"];
    Module["_zip_dir_add"] = asm["M"];
    Module["_zip_discard"] = asm["N"];
    Module["_zip_error_init_with_code"] = asm["O"];
    Module["_zip_get_error"] = asm["P"];
    Module["_zip_file_get_error"] = asm["Q"];
    Module["_zip_error_strerror"] = asm["R"];
    Module["_zip_fclose"] = asm["S"];
    Module["_zip_file_add"] = asm["T"];
    Module["_free"] = asm["U"];
    var _malloc = Module["_malloc"] = asm["V"];
    var ___errno_location = Module["___errno_location"] = asm["W"];
    Module["_zip_source_error"] = asm["X"];
    Module["_zip_source_seek"] = asm["Y"];
    Module["_zip_file_set_external_attributes"] = asm["Z"];
    Module["_zip_file_set_mtime"] = asm["_"];
    Module["_zip_fopen"] = asm["$"];
    Module["_zip_fopen_index"] = asm["aa"];
    Module["_zip_fread"] = asm["ba"];
    Module["_zip_get_name"] = asm["ca"];
    Module["_zip_get_num_entries"] = asm["da"];
    Module["_zip_source_read"] = asm["ea"];
    Module["_zip_name_locate"] = asm["fa"];
    Module["_zip_open"] = asm["ga"];
    Module["_zip_open_from_source"] = asm["ha"];
    Module["_zip_set_file_compression"] = asm["ia"];
    Module["_zip_source_buffer"] = asm["ja"];
    Module["_zip_source_buffer_create"] = asm["ka"];
    Module["_zip_source_close"] = asm["la"];
    Module["_zip_source_free"] = asm["ma"];
    Module["_zip_source_keep"] = asm["na"];
    Module["_zip_source_open"] = asm["oa"];
    Module["_zip_source_set_mtime"] = asm["qa"];
    Module["_zip_source_tell"] = asm["ra"];
    Module["_zip_stat"] = asm["sa"];
    Module["_zip_stat_index"] = asm["ta"];
    var __get_tzname = Module["__get_tzname"] = asm["ua"];
    var __get_daylight = Module["__get_daylight"] = asm["va"];
    var __get_timezone = Module["__get_timezone"] = asm["wa"];
    var stackSave = Module["stackSave"] = asm["xa"];
    var stackRestore = Module["stackRestore"] = asm["ya"];
    var stackAlloc = Module["stackAlloc"] = asm["za"];
    Module["cwrap"] = cwrap;
    Module["getValue"] = getValue;
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun)
        run();
      if (!calledRun)
        dependenciesFulfilled = runCaller;
    };
    function run(args) {
      if (runDependencies > 0) {
        return;
      }
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun)
          return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT)
          return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module["onRuntimeInitialized"])
          Module["onRuntimeInitialized"]();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    Module["run"] = run;
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
    return createModule2;
  };
}();
module.exports = createModule;
}(libzipSync));

const createModule = libzipSync.exports;

const number64 = [
  `number`,
  `number`
];
var Errors;
(function(Errors2) {
  Errors2[Errors2["ZIP_ER_OK"] = 0] = "ZIP_ER_OK";
  Errors2[Errors2["ZIP_ER_MULTIDISK"] = 1] = "ZIP_ER_MULTIDISK";
  Errors2[Errors2["ZIP_ER_RENAME"] = 2] = "ZIP_ER_RENAME";
  Errors2[Errors2["ZIP_ER_CLOSE"] = 3] = "ZIP_ER_CLOSE";
  Errors2[Errors2["ZIP_ER_SEEK"] = 4] = "ZIP_ER_SEEK";
  Errors2[Errors2["ZIP_ER_READ"] = 5] = "ZIP_ER_READ";
  Errors2[Errors2["ZIP_ER_WRITE"] = 6] = "ZIP_ER_WRITE";
  Errors2[Errors2["ZIP_ER_CRC"] = 7] = "ZIP_ER_CRC";
  Errors2[Errors2["ZIP_ER_ZIPCLOSED"] = 8] = "ZIP_ER_ZIPCLOSED";
  Errors2[Errors2["ZIP_ER_NOENT"] = 9] = "ZIP_ER_NOENT";
  Errors2[Errors2["ZIP_ER_EXISTS"] = 10] = "ZIP_ER_EXISTS";
  Errors2[Errors2["ZIP_ER_OPEN"] = 11] = "ZIP_ER_OPEN";
  Errors2[Errors2["ZIP_ER_TMPOPEN"] = 12] = "ZIP_ER_TMPOPEN";
  Errors2[Errors2["ZIP_ER_ZLIB"] = 13] = "ZIP_ER_ZLIB";
  Errors2[Errors2["ZIP_ER_MEMORY"] = 14] = "ZIP_ER_MEMORY";
  Errors2[Errors2["ZIP_ER_CHANGED"] = 15] = "ZIP_ER_CHANGED";
  Errors2[Errors2["ZIP_ER_COMPNOTSUPP"] = 16] = "ZIP_ER_COMPNOTSUPP";
  Errors2[Errors2["ZIP_ER_EOF"] = 17] = "ZIP_ER_EOF";
  Errors2[Errors2["ZIP_ER_INVAL"] = 18] = "ZIP_ER_INVAL";
  Errors2[Errors2["ZIP_ER_NOZIP"] = 19] = "ZIP_ER_NOZIP";
  Errors2[Errors2["ZIP_ER_INTERNAL"] = 20] = "ZIP_ER_INTERNAL";
  Errors2[Errors2["ZIP_ER_INCONS"] = 21] = "ZIP_ER_INCONS";
  Errors2[Errors2["ZIP_ER_REMOVE"] = 22] = "ZIP_ER_REMOVE";
  Errors2[Errors2["ZIP_ER_DELETED"] = 23] = "ZIP_ER_DELETED";
  Errors2[Errors2["ZIP_ER_ENCRNOTSUPP"] = 24] = "ZIP_ER_ENCRNOTSUPP";
  Errors2[Errors2["ZIP_ER_RDONLY"] = 25] = "ZIP_ER_RDONLY";
  Errors2[Errors2["ZIP_ER_NOPASSWD"] = 26] = "ZIP_ER_NOPASSWD";
  Errors2[Errors2["ZIP_ER_WRONGPASSWD"] = 27] = "ZIP_ER_WRONGPASSWD";
  Errors2[Errors2["ZIP_ER_OPNOTSUPP"] = 28] = "ZIP_ER_OPNOTSUPP";
  Errors2[Errors2["ZIP_ER_INUSE"] = 29] = "ZIP_ER_INUSE";
  Errors2[Errors2["ZIP_ER_TELL"] = 30] = "ZIP_ER_TELL";
  Errors2[Errors2["ZIP_ER_COMPRESSED_DATA"] = 31] = "ZIP_ER_COMPRESSED_DATA";
})(Errors || (Errors = {}));
const makeInterface = (libzip) => ({
  get HEAP8() {
    return libzip.HEAP8;
  },
  get HEAPU8() {
    return libzip.HEAPU8;
  },
  errors: Errors,
  SEEK_SET: 0,
  SEEK_CUR: 1,
  SEEK_END: 2,
  ZIP_CHECKCONS: 4,
  ZIP_CREATE: 1,
  ZIP_EXCL: 2,
  ZIP_TRUNCATE: 8,
  ZIP_RDONLY: 16,
  ZIP_FL_OVERWRITE: 8192,
  ZIP_FL_COMPRESSED: 4,
  ZIP_OPSYS_DOS: 0,
  ZIP_OPSYS_AMIGA: 1,
  ZIP_OPSYS_OPENVMS: 2,
  ZIP_OPSYS_UNIX: 3,
  ZIP_OPSYS_VM_CMS: 4,
  ZIP_OPSYS_ATARI_ST: 5,
  ZIP_OPSYS_OS_2: 6,
  ZIP_OPSYS_MACINTOSH: 7,
  ZIP_OPSYS_Z_SYSTEM: 8,
  ZIP_OPSYS_CPM: 9,
  ZIP_OPSYS_WINDOWS_NTFS: 10,
  ZIP_OPSYS_MVS: 11,
  ZIP_OPSYS_VSE: 12,
  ZIP_OPSYS_ACORN_RISC: 13,
  ZIP_OPSYS_VFAT: 14,
  ZIP_OPSYS_ALTERNATE_MVS: 15,
  ZIP_OPSYS_BEOS: 16,
  ZIP_OPSYS_TANDEM: 17,
  ZIP_OPSYS_OS_400: 18,
  ZIP_OPSYS_OS_X: 19,
  ZIP_CM_DEFAULT: -1,
  ZIP_CM_STORE: 0,
  ZIP_CM_DEFLATE: 8,
  uint08S: libzip._malloc(1),
  uint16S: libzip._malloc(2),
  uint32S: libzip._malloc(4),
  uint64S: libzip._malloc(8),
  malloc: libzip._malloc,
  free: libzip._free,
  getValue: libzip.getValue,
  open: libzip.cwrap(`zip_open`, `number`, [`string`, `number`, `number`]),
  openFromSource: libzip.cwrap(`zip_open_from_source`, `number`, [`number`, `number`, `number`]),
  close: libzip.cwrap(`zip_close`, `number`, [`number`]),
  discard: libzip.cwrap(`zip_discard`, null, [`number`]),
  getError: libzip.cwrap(`zip_get_error`, `number`, [`number`]),
  getName: libzip.cwrap(`zip_get_name`, `string`, [`number`, `number`, `number`]),
  getNumEntries: libzip.cwrap(`zip_get_num_entries`, `number`, [`number`, `number`]),
  delete: libzip.cwrap(`zip_delete`, `number`, [`number`, `number`]),
  stat: libzip.cwrap(`zip_stat`, `number`, [`number`, `string`, `number`, `number`]),
  statIndex: libzip.cwrap(`zip_stat_index`, `number`, [`number`, ...number64, `number`, `number`]),
  fopen: libzip.cwrap(`zip_fopen`, `number`, [`number`, `string`, `number`]),
  fopenIndex: libzip.cwrap(`zip_fopen_index`, `number`, [`number`, ...number64, `number`]),
  fread: libzip.cwrap(`zip_fread`, `number`, [`number`, `number`, `number`, `number`]),
  fclose: libzip.cwrap(`zip_fclose`, `number`, [`number`]),
  dir: {
    add: libzip.cwrap(`zip_dir_add`, `number`, [`number`, `string`])
  },
  file: {
    add: libzip.cwrap(`zip_file_add`, `number`, [`number`, `string`, `number`, `number`]),
    getError: libzip.cwrap(`zip_file_get_error`, `number`, [`number`]),
    getExternalAttributes: libzip.cwrap(`zip_file_get_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
    setExternalAttributes: libzip.cwrap(`zip_file_set_external_attributes`, `number`, [`number`, ...number64, `number`, `number`, `number`]),
    setMtime: libzip.cwrap(`zip_file_set_mtime`, `number`, [`number`, ...number64, `number`, `number`]),
    setCompression: libzip.cwrap(`zip_set_file_compression`, `number`, [`number`, ...number64, `number`, `number`])
  },
  ext: {
    countSymlinks: libzip.cwrap(`zip_ext_count_symlinks`, `number`, [`number`])
  },
  error: {
    initWithCode: libzip.cwrap(`zip_error_init_with_code`, null, [`number`, `number`]),
    strerror: libzip.cwrap(`zip_error_strerror`, `string`, [`number`])
  },
  name: {
    locate: libzip.cwrap(`zip_name_locate`, `number`, [`number`, `string`, `number`])
  },
  source: {
    fromUnattachedBuffer: libzip.cwrap(`zip_source_buffer_create`, `number`, [`number`, `number`, `number`, `number`]),
    fromBuffer: libzip.cwrap(`zip_source_buffer`, `number`, [`number`, `number`, ...number64, `number`]),
    free: libzip.cwrap(`zip_source_free`, null, [`number`]),
    keep: libzip.cwrap(`zip_source_keep`, null, [`number`]),
    open: libzip.cwrap(`zip_source_open`, `number`, [`number`]),
    close: libzip.cwrap(`zip_source_close`, `number`, [`number`]),
    seek: libzip.cwrap(`zip_source_seek`, `number`, [`number`, ...number64, `number`]),
    tell: libzip.cwrap(`zip_source_tell`, `number`, [`number`]),
    read: libzip.cwrap(`zip_source_read`, `number`, [`number`, `number`, `number`]),
    error: libzip.cwrap(`zip_source_error`, `number`, [`number`]),
    setMtime: libzip.cwrap(`zip_source_set_mtime`, `number`, [`number`, `number`])
  },
  struct: {
    stat: libzip.cwrap(`zipstruct_stat`, `number`, []),
    statS: libzip.cwrap(`zipstruct_statS`, `number`, []),
    statName: libzip.cwrap(`zipstruct_stat_name`, `string`, [`number`]),
    statIndex: libzip.cwrap(`zipstruct_stat_index`, `number`, [`number`]),
    statSize: libzip.cwrap(`zipstruct_stat_size`, `number`, [`number`]),
    statCompSize: libzip.cwrap(`zipstruct_stat_comp_size`, `number`, [`number`]),
    statCompMethod: libzip.cwrap(`zipstruct_stat_comp_method`, `number`, [`number`]),
    statMtime: libzip.cwrap(`zipstruct_stat_mtime`, `number`, [`number`]),
    statCrc: libzip.cwrap(`zipstruct_stat_crc`, `number`, [`number`]),
    error: libzip.cwrap(`zipstruct_error`, `number`, []),
    errorS: libzip.cwrap(`zipstruct_errorS`, `number`, []),
    errorCodeZip: libzip.cwrap(`zipstruct_error_code_zip`, `number`, [`number`])
  }
});

let mod = null;
function getLibzipSync() {
  if (mod === null)
    mod = makeInterface(createModule());
  return mod;
}

var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["API_ERROR"] = `API_ERROR`;
  ErrorCode2["BUILTIN_NODE_RESOLUTION_FAILED"] = `BUILTIN_NODE_RESOLUTION_FAILED`;
  ErrorCode2["EXPORTS_RESOLUTION_FAILED"] = `EXPORTS_RESOLUTION_FAILED`;
  ErrorCode2["MISSING_DEPENDENCY"] = `MISSING_DEPENDENCY`;
  ErrorCode2["MISSING_PEER_DEPENDENCY"] = `MISSING_PEER_DEPENDENCY`;
  ErrorCode2["QUALIFIED_PATH_RESOLUTION_FAILED"] = `QUALIFIED_PATH_RESOLUTION_FAILED`;
  ErrorCode2["INTERNAL"] = `INTERNAL`;
  ErrorCode2["UNDECLARED_DEPENDENCY"] = `UNDECLARED_DEPENDENCY`;
  ErrorCode2["UNSUPPORTED"] = `UNSUPPORTED`;
})(ErrorCode || (ErrorCode = {}));
const MODULE_NOT_FOUND_ERRORS = new Set([
  ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED,
  ErrorCode.MISSING_DEPENDENCY,
  ErrorCode.MISSING_PEER_DEPENDENCY,
  ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED,
  ErrorCode.UNDECLARED_DEPENDENCY
]);
function makeError(pnpCode, message, data = {}, code) {
  code != null ? code : code = MODULE_NOT_FOUND_ERRORS.has(pnpCode) ? `MODULE_NOT_FOUND` : pnpCode;
  const propertySpec = {
    configurable: true,
    writable: true,
    enumerable: false
  };
  return Object.defineProperties(new Error(message), {
    code: __spreadProps$1(__spreadValues$2({}, propertySpec), {
      value: code
    }),
    pnpCode: __spreadProps$1(__spreadValues$2({}, propertySpec), {
      value: pnpCode
    }),
    data: __spreadProps$1(__spreadValues$2({}, propertySpec), {
      value: data
    })
  });
}
function getIssuerModule(parent) {
  let issuer = parent;
  while (issuer && (issuer.id === `[eval]` || issuer.id === `<repl>` || !issuer.filename))
    issuer = issuer.parent;
  return issuer || null;
}
function getPathForDisplay(p) {
  return npath.normalize(npath.fromPortablePath(p));
}

const builtinModules = new Set(require$$0.Module.builtinModules || Object.keys(process.binding(`natives`)));
const isBuiltinModule = (request) => request.startsWith(`node:`) || builtinModules.has(request);
function readPackageScope(checkPath) {
  const rootSeparatorIndex = checkPath.indexOf(npath.sep);
  let separatorIndex;
  do {
    separatorIndex = checkPath.lastIndexOf(npath.sep);
    checkPath = checkPath.slice(0, separatorIndex);
    if (checkPath.endsWith(`${npath.sep}node_modules`))
      return false;
    const pjson = readPackage(checkPath + npath.sep);
    if (pjson) {
      return {
        data: pjson,
        path: checkPath
      };
    }
  } while (separatorIndex > rootSeparatorIndex);
  return false;
}
function readPackage(requestPath) {
  const jsonPath = npath.resolve(requestPath, `package.json`);
  if (!fs__default.default.existsSync(jsonPath))
    return null;
  return JSON.parse(fs__default.default.readFileSync(jsonPath, `utf8`));
}
function ERR_REQUIRE_ESM(filename, parentPath = null) {
  const basename = parentPath && path__default.default.basename(filename) === path__default.default.basename(parentPath) ? filename : path__default.default.basename(filename);
  const msg = `require() of ES Module ${filename}${parentPath ? ` from ${parentPath}` : ``} not supported.
Instead change the require of ${basename} in ${parentPath} to a dynamic import() which is available in all CommonJS modules.`;
  const err = new Error(msg);
  err.code = `ERR_REQUIRE_ESM`;
  return err;
}

var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function applyPatch(pnpapi, opts) {
  const defaultCache = {};
  let enableNativeHooks = true;
  process.versions.pnp = String(pnpapi.VERSIONS.std);
  const moduleExports = require$$0__default.default;
  moduleExports.findPnpApi = (lookupSource) => {
    const lookupPath = lookupSource instanceof url.URL ? url.fileURLToPath(lookupSource) : lookupSource;
    const apiPath = opts.manager.findApiPathFor(lookupPath);
    if (apiPath === null)
      return null;
    const apiEntry = opts.manager.getApiEntry(apiPath, true);
    return apiEntry.instance.findPackageLocator(lookupPath) ? apiEntry.instance : null;
  };
  function getRequireStack(parent) {
    const requireStack = [];
    for (let cursor = parent; cursor; cursor = cursor.parent)
      requireStack.push(cursor.filename || cursor.id);
    return requireStack;
  }
  const originalModuleLoad = require$$0.Module._load;
  require$$0.Module._load = function(request, parent, isMain) {
    if (!enableNativeHooks)
      return originalModuleLoad.call(require$$0.Module, request, parent, isMain);
    if (isBuiltinModule(request)) {
      try {
        enableNativeHooks = false;
        return originalModuleLoad.call(require$$0.Module, request, parent, isMain);
      } finally {
        enableNativeHooks = true;
      }
    }
    const parentApiPath = opts.manager.getApiPathFromParent(parent);
    const parentApi = parentApiPath !== null ? opts.manager.getApiEntry(parentApiPath, true).instance : null;
    if (parentApi === null)
      return originalModuleLoad(request, parent, isMain);
    if (request === `pnpapi`)
      return parentApi;
    const modulePath = require$$0.Module._resolveFilename(request, parent, isMain);
    const isOwnedByRuntime = parentApi !== null ? parentApi.findPackageLocator(modulePath) !== null : false;
    const moduleApiPath = isOwnedByRuntime ? parentApiPath : opts.manager.findApiPathFor(npath.dirname(modulePath));
    const entry = moduleApiPath !== null ? opts.manager.getApiEntry(moduleApiPath) : {instance: null, cache: defaultCache};
    const cacheEntry = entry.cache[modulePath];
    if (cacheEntry) {
      if (cacheEntry.loaded === false && cacheEntry.isLoading !== true) {
        try {
          cacheEntry.isLoading = true;
          if (isMain) {
            process.mainModule = cacheEntry;
            cacheEntry.id = `.`;
          }
          cacheEntry.load(modulePath);
        } finally {
          cacheEntry.isLoading = false;
        }
      }
      return cacheEntry.exports;
    }
    const module = new require$$0.Module(modulePath, parent != null ? parent : void 0);
    module.pnpApiPath = moduleApiPath;
    entry.cache[modulePath] = module;
    if (isMain) {
      process.mainModule = module;
      module.id = `.`;
    }
    let hasThrown = true;
    try {
      module.isLoading = true;
      module.load(modulePath);
      hasThrown = false;
    } finally {
      module.isLoading = false;
      if (hasThrown) {
        delete require$$0.Module._cache[modulePath];
      }
    }
    return module.exports;
  };
  function getIssuerSpecsFromPaths(paths) {
    return paths.map((path) => ({
      apiPath: opts.manager.findApiPathFor(path),
      path,
      module: null
    }));
  }
  function getIssuerSpecsFromModule(module) {
    var _a;
    if (module && module.id !== `<repl>` && module.id !== `internal/preload` && !module.parent && !module.filename && module.paths.length > 0) {
      return [{
        apiPath: opts.manager.findApiPathFor(module.paths[0]),
        path: module.paths[0],
        module
      }];
    }
    const issuer = getIssuerModule(module);
    if (issuer !== null) {
      const path = npath.dirname(issuer.filename);
      const apiPath = opts.manager.getApiPathFromParent(issuer);
      return [{apiPath, path, module}];
    } else {
      const path = process.cwd();
      const apiPath = (_a = opts.manager.findApiPathFor(npath.join(path, `[file]`))) != null ? _a : opts.manager.getApiPathFromParent(null);
      return [{apiPath, path, module}];
    }
  }
  function makeFakeParent(path) {
    const fakeParent = new require$$0.Module(``);
    const fakeFilePath = npath.join(path, `[file]`);
    fakeParent.paths = require$$0.Module._nodeModulePaths(fakeFilePath);
    return fakeParent;
  }
  const pathRegExp = /^(?![a-zA-Z]:[\\/]|\\\\|\.{0,2}(?:\/|$))((?:@[^/]+\/)?[^/]+)\/*(.*|)$/;
  const originalModuleResolveFilename = require$$0.Module._resolveFilename;
  require$$0.Module._resolveFilename = function(request, parent, isMain, options) {
    if (isBuiltinModule(request))
      return request;
    if (!enableNativeHooks)
      return originalModuleResolveFilename.call(require$$0.Module, request, parent, isMain, options);
    if (options && options.plugnplay === false) {
      const _a = options, rest = __objRest$1(_a, ["plugnplay"]);
      const forwardedOptions = Object.keys(rest).length > 0 ? rest : void 0;
      try {
        enableNativeHooks = false;
        return originalModuleResolveFilename.call(require$$0.Module, request, parent, isMain, forwardedOptions);
      } finally {
        enableNativeHooks = true;
      }
    }
    if (options) {
      const optionNames = new Set(Object.keys(options));
      optionNames.delete(`paths`);
      optionNames.delete(`plugnplay`);
      if (optionNames.size > 0) {
        throw makeError(ErrorCode.UNSUPPORTED, `Some options passed to require() aren't supported by PnP yet (${Array.from(optionNames).join(`, `)})`);
      }
    }
    const issuerSpecs = options && options.paths ? getIssuerSpecsFromPaths(options.paths) : getIssuerSpecsFromModule(parent);
    if (request.match(pathRegExp) === null) {
      const parentDirectory = (parent == null ? void 0 : parent.filename) != null ? npath.dirname(parent.filename) : null;
      const absoluteRequest = npath.isAbsolute(request) ? request : parentDirectory !== null ? npath.resolve(parentDirectory, request) : null;
      if (absoluteRequest !== null) {
        const apiPath = parentDirectory === npath.dirname(absoluteRequest) && (parent == null ? void 0 : parent.pnpApiPath) ? parent.pnpApiPath : opts.manager.findApiPathFor(absoluteRequest);
        if (apiPath !== null) {
          issuerSpecs.unshift({
            apiPath,
            path: parentDirectory,
            module: null
          });
        }
      }
    }
    let firstError;
    for (const {apiPath, path, module} of issuerSpecs) {
      let resolution;
      const issuerApi = apiPath !== null ? opts.manager.getApiEntry(apiPath, true).instance : null;
      try {
        if (issuerApi !== null) {
          resolution = issuerApi.resolveRequest(request, path !== null ? `${path}/` : null);
        } else {
          if (path === null)
            throw new Error(`Assertion failed: Expected the path to be set`);
          resolution = originalModuleResolveFilename.call(require$$0.Module, request, module || makeFakeParent(path), isMain);
        }
      } catch (error) {
        firstError = firstError || error;
        continue;
      }
      if (resolution !== null) {
        return resolution;
      }
    }
    const requireStack = getRequireStack(parent);
    Object.defineProperty(firstError, `requireStack`, {
      configurable: true,
      writable: true,
      enumerable: false,
      value: requireStack
    });
    if (requireStack.length > 0)
      firstError.message += `
Require stack:
- ${requireStack.join(`
- `)}`;
    if (typeof firstError.pnpCode === `string`)
      Error.captureStackTrace(firstError);
    throw firstError;
  };
  const originalFindPath = require$$0.Module._findPath;
  require$$0.Module._findPath = function(request, paths, isMain) {
    if (request === `pnpapi`)
      return false;
    if (!enableNativeHooks)
      return originalFindPath.call(require$$0.Module, request, paths, isMain);
    const isAbsolute = npath.isAbsolute(request);
    if (isAbsolute)
      paths = [``];
    else if (!paths || paths.length === 0)
      return false;
    for (const path of paths) {
      let resolution;
      try {
        const pnpApiPath = opts.manager.findApiPathFor(isAbsolute ? request : path);
        if (pnpApiPath !== null) {
          const api = opts.manager.getApiEntry(pnpApiPath, true).instance;
          resolution = api.resolveRequest(request, path) || false;
        } else {
          resolution = originalFindPath.call(require$$0.Module, request, [path], isMain);
        }
      } catch (error) {
        continue;
      }
      if (resolution) {
        return resolution;
      }
    }
    return false;
  };
  const originalExtensionJSFunction = require$$0.Module._extensions[`.js`];
  require$$0.Module._extensions[`.js`] = function(module, filename) {
    var _a, _b;
    if (filename.endsWith(`.js`)) {
      const pkg = readPackageScope(filename);
      if (pkg && ((_a = pkg.data) == null ? void 0 : _a.type) === `module`) {
        const err = ERR_REQUIRE_ESM(filename, (_b = module.parent) == null ? void 0 : _b.filename);
        Error.captureStackTrace(err);
        throw err;
      }
    }
    originalExtensionJSFunction.call(this, module, filename);
  };
  const originalDlopen = process.dlopen;
  process.dlopen = function(...args) {
    const [module, filename, ...rest] = args;
    return originalDlopen.call(this, module, npath.fromPortablePath(VirtualFS.resolveVirtual(npath.toPortablePath(filename))), ...rest);
  };
  const originalEmit = process.emit;
  process.emit = function(name, data, ...args) {
    if (name === `warning` && typeof data === `object` && data.name === `ExperimentalWarning` && (data.message.includes(`--experimental-loader`) || data.message.includes(`Custom ESM Loaders is an experimental feature`)))
      return false;
    return originalEmit.apply(process, arguments);
  };
  patchFs(fs__default.default, new PosixFS(opts.fakeFs));
}

function hydrateRuntimeState(data, {basePath}) {
  const portablePath = npath.toPortablePath(basePath);
  const absolutePortablePath = ppath.resolve(portablePath);
  const ignorePattern = data.ignorePatternData !== null ? new RegExp(data.ignorePatternData) : null;
  const packageLocatorsByLocations = new Map();
  const packageRegistry = new Map(data.packageRegistryData.map(([packageName, packageStoreData]) => {
    return [packageName, new Map(packageStoreData.map(([packageReference, packageInformationData]) => {
      var _a;
      if (packageName === null !== (packageReference === null))
        throw new Error(`Assertion failed: The name and reference should be null, or neither should`);
      const discardFromLookup = (_a = packageInformationData.discardFromLookup) != null ? _a : false;
      const packageLocator = {name: packageName, reference: packageReference};
      const entry = packageLocatorsByLocations.get(packageInformationData.packageLocation);
      if (!entry) {
        packageLocatorsByLocations.set(packageInformationData.packageLocation, {locator: packageLocator, discardFromLookup});
      } else {
        entry.discardFromLookup = entry.discardFromLookup && discardFromLookup;
        if (!discardFromLookup) {
          entry.locator = packageLocator;
        }
      }
      let resolvedPackageLocation = null;
      return [packageReference, {
        packageDependencies: new Map(packageInformationData.packageDependencies),
        packagePeers: new Set(packageInformationData.packagePeers),
        linkType: packageInformationData.linkType,
        discardFromLookup,
        get packageLocation() {
          return resolvedPackageLocation || (resolvedPackageLocation = ppath.join(absolutePortablePath, packageInformationData.packageLocation));
        }
      }];
    }))];
  }));
  const fallbackExclusionList = new Map(data.fallbackExclusionList.map(([packageName, packageReferences]) => {
    return [packageName, new Set(packageReferences)];
  }));
  const fallbackPool = new Map(data.fallbackPool);
  const dependencyTreeRoots = data.dependencyTreeRoots;
  const enableTopLevelFallback = data.enableTopLevelFallback;
  return {
    basePath: portablePath,
    dependencyTreeRoots,
    enableTopLevelFallback,
    fallbackExclusionList,
    fallbackPool,
    ignorePattern,
    packageLocatorsByLocations,
    packageRegistry
  };
}

/**
 * @param {object} exports
 * @param {Set<string>} keys
 */
function loop(exports, keys) {
	if (typeof exports === 'string') {
		return exports;
	}

	if (exports) {
		let idx, tmp;
		if (Array.isArray(exports)) {
			for (idx=0; idx < exports.length; idx++) {
				if (tmp = loop(exports[idx], keys)) return tmp;
			}
		} else {
			for (idx in exports) {
				if (keys.has(idx)) {
					return loop(exports[idx], keys);
				}
			}
		}
	}
}

/**
 * @param {string} name The package name
 * @param {string} entry The target entry, eg "."
 * @param {number} [condition] Unmatched condition?
 */
function bail(name, entry, condition) {
	throw new Error(
		condition
		? `No known conditions for "${entry}" entry in "${name}" package`
		: `Missing "${entry}" export in "${name}" package`
	);
}

/**
 * @param {string} name the package name
 * @param {string} entry the target path/import
 */
function toName(name, entry) {
	return entry === name ? '.'
		: entry[0] === '.' ? entry
		: entry.replace(new RegExp('^' + name + '\/'), './');
}

/**
 * @param {object} pkg package.json contents
 * @param {string} [entry] entry name or import path
 * @param {object} [options]
 * @param {boolean} [options.browser]
 * @param {boolean} [options.require]
 * @param {string[]} [options.conditions]
 * @param {boolean} [options.unsafe]
 */
function resolve(pkg, entry='.', options={}) {
	let { name, exports } = pkg;

	if (exports) {
		let { browser, require, unsafe, conditions=[] } = options;

		let target = toName(name, entry);
		if (target[0] !== '.') target = './' + target;

		if (typeof exports === 'string') {
			return target === '.' ? exports : bail(name, target);
		}

		let allows = new Set(['default', ...conditions]);
		unsafe || allows.add(require ? 'require' : 'import');
		unsafe || allows.add(browser ? 'browser' : 'node');

		let key, tmp, isSingle=false;

		for (key in exports) {
			isSingle = key[0] !== '.';
			break;
		}

		if (isSingle) {
			return target === '.'
				? loop(exports, allows) || bail(name, target, 1)
				: bail(name, target);
		}

		if (tmp = exports[target]) {
			return loop(tmp, allows) || bail(name, target, 1);
		}

		for (key in exports) {
			tmp = key[key.length - 1];
			if (tmp === '/' && target.startsWith(key)) {
				return (tmp = loop(exports[key], allows))
					? (tmp + target.substring(key.length))
					: bail(name, target, 1);
			}
			if (tmp === '*' && target.startsWith(key.slice(0, -1))) {
				// do not trigger if no *content* to inject
				if (target.substring(key.length - 1).length > 0) {
					return (tmp = loop(exports[key], allows))
						? tmp.replace('*', target.substring(key.length - 1))
						: bail(name, target, 1);
				}
			}
		}

		return bail(name, target);
	}
}

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function makeApi(runtimeState, opts) {
  const alwaysWarnOnFallback = Number(process.env.PNP_ALWAYS_WARN_ON_FALLBACK) > 0;
  const debugLevel = Number(process.env.PNP_DEBUG_LEVEL);
  const pathRegExp = /^(?![a-zA-Z]:[\\/]|\\\\|\.{0,2}(?:\/|$))((?:node:)?(?:@[^/]+\/)?[^/]+)\/*(.*|)$/;
  const isStrictRegExp = /^(\/|\.{1,2}(\/|$))/;
  const isDirRegExp = /\/$/;
  const isRelativeRegexp = /^\.{0,2}\//;
  const topLevelLocator = {name: null, reference: null};
  const fallbackLocators = [];
  const emittedWarnings = new Set();
  if (runtimeState.enableTopLevelFallback === true)
    fallbackLocators.push(topLevelLocator);
  if (opts.compatibilityMode !== false) {
    for (const name of [`react-scripts`, `gatsby`]) {
      const packageStore = runtimeState.packageRegistry.get(name);
      if (packageStore) {
        for (const reference of packageStore.keys()) {
          if (reference === null) {
            throw new Error(`Assertion failed: This reference shouldn't be null`);
          } else {
            fallbackLocators.push({name, reference});
          }
        }
      }
    }
  }
  const {
    ignorePattern,
    packageRegistry,
    packageLocatorsByLocations
  } = runtimeState;
  function makeLogEntry(name, args) {
    return {
      fn: name,
      args,
      error: null,
      result: null
    };
  }
  function trace(entry) {
    var _a, _b, _c, _d, _e, _f;
    const colors = (_c = (_b = (_a = process.stderr) == null ? void 0 : _a.hasColors) == null ? void 0 : _b.call(_a)) != null ? _c : process.stdout.isTTY;
    const c = (n, str) => `[${n}m${str}[0m`;
    const error = entry.error;
    if (error)
      console.error(c(`31;1`, `\u2716 ${(_d = entry.error) == null ? void 0 : _d.message.replace(/\n.*/s, ``)}`));
    else
      console.error(c(`33;1`, `\u203C Resolution`));
    if (entry.args.length > 0)
      console.error();
    for (const arg of entry.args)
      console.error(`  ${c(`37;1`, `In \u2190`)} ${nodeUtils.inspect(arg, {colors, compact: true})}`);
    if (entry.result) {
      console.error();
      console.error(`  ${c(`37;1`, `Out \u2192`)} ${nodeUtils.inspect(entry.result, {colors, compact: true})}`);
    }
    const stack = (_f = (_e = new Error().stack.match(/(?<=^ +)at.*/gm)) == null ? void 0 : _e.slice(2)) != null ? _f : [];
    if (stack.length > 0) {
      console.error();
      for (const line of stack) {
        console.error(`  ${c(`38;5;244`, line)}`);
      }
    }
    console.error();
  }
  function maybeLog(name, fn) {
    if (opts.allowDebug === false)
      return fn;
    if (Number.isFinite(debugLevel)) {
      if (debugLevel >= 2) {
        return (...args) => {
          const logEntry = makeLogEntry(name, args);
          try {
            return logEntry.result = fn(...args);
          } catch (error) {
            throw logEntry.error = error;
          } finally {
            trace(logEntry);
          }
        };
      } else if (debugLevel >= 1) {
        return (...args) => {
          try {
            return fn(...args);
          } catch (error) {
            const logEntry = makeLogEntry(name, args);
            logEntry.error = error;
            trace(logEntry);
            throw error;
          }
        };
      }
    }
    return fn;
  }
  function getPackageInformationSafe(packageLocator) {
    const packageInformation = getPackageInformation(packageLocator);
    if (!packageInformation) {
      throw makeError(ErrorCode.INTERNAL, `Couldn't find a matching entry in the dependency tree for the specified parent (this is probably an internal error)`);
    }
    return packageInformation;
  }
  function isDependencyTreeRoot(packageLocator) {
    if (packageLocator.name === null)
      return true;
    for (const dependencyTreeRoot of runtimeState.dependencyTreeRoots)
      if (dependencyTreeRoot.name === packageLocator.name && dependencyTreeRoot.reference === packageLocator.reference)
        return true;
    return false;
  }
  const defaultExportsConditions = new Set([`default`, `node`, `require`]);
  function applyNodeExportsResolution(unqualifiedPath, conditions = defaultExportsConditions) {
    const locator = findPackageLocator(ppath.join(unqualifiedPath, `internal.js`), {
      resolveIgnored: true,
      includeDiscardFromLookup: true
    });
    if (locator === null) {
      throw makeError(ErrorCode.INTERNAL, `The locator that owns the "${unqualifiedPath}" path can't be found inside the dependency tree (this is probably an internal error)`);
    }
    const {packageLocation} = getPackageInformationSafe(locator);
    const manifestPath = ppath.join(packageLocation, Filename.manifest);
    if (!opts.fakeFs.existsSync(manifestPath))
      return null;
    const pkgJson = JSON.parse(opts.fakeFs.readFileSync(manifestPath, `utf8`));
    let subpath = ppath.contains(packageLocation, unqualifiedPath);
    if (subpath === null) {
      throw makeError(ErrorCode.INTERNAL, `unqualifiedPath doesn't contain the packageLocation (this is probably an internal error)`);
    }
    if (!isRelativeRegexp.test(subpath))
      subpath = `./${subpath}`;
    let resolvedExport;
    try {
      resolvedExport = resolve(pkgJson, ppath.normalize(subpath), {
        conditions,
        unsafe: true
      });
    } catch (error) {
      throw makeError(ErrorCode.EXPORTS_RESOLUTION_FAILED, error.message, {unqualifiedPath: getPathForDisplay(unqualifiedPath), locator, pkgJson, subpath: getPathForDisplay(subpath), conditions}, `ERR_PACKAGE_PATH_NOT_EXPORTED`);
    }
    if (typeof resolvedExport === `string`)
      return ppath.join(packageLocation, resolvedExport);
    return null;
  }
  function applyNodeExtensionResolution(unqualifiedPath, candidates, {extensions}) {
    let stat;
    try {
      candidates.push(unqualifiedPath);
      stat = opts.fakeFs.statSync(unqualifiedPath);
    } catch (error) {
    }
    if (stat && !stat.isDirectory())
      return opts.fakeFs.realpathSync(unqualifiedPath);
    if (stat && stat.isDirectory()) {
      let pkgJson;
      try {
        pkgJson = JSON.parse(opts.fakeFs.readFileSync(ppath.join(unqualifiedPath, Filename.manifest), `utf8`));
      } catch (error) {
      }
      let nextUnqualifiedPath;
      if (pkgJson && pkgJson.main)
        nextUnqualifiedPath = ppath.resolve(unqualifiedPath, pkgJson.main);
      if (nextUnqualifiedPath && nextUnqualifiedPath !== unqualifiedPath) {
        const resolution = applyNodeExtensionResolution(nextUnqualifiedPath, candidates, {extensions});
        if (resolution !== null) {
          return resolution;
        }
      }
    }
    for (let i = 0, length = extensions.length; i < length; i++) {
      const candidateFile = `${unqualifiedPath}${extensions[i]}`;
      candidates.push(candidateFile);
      if (opts.fakeFs.existsSync(candidateFile)) {
        return candidateFile;
      }
    }
    if (stat && stat.isDirectory()) {
      for (let i = 0, length = extensions.length; i < length; i++) {
        const candidateFile = ppath.format({dir: unqualifiedPath, name: `index`, ext: extensions[i]});
        candidates.push(candidateFile);
        if (opts.fakeFs.existsSync(candidateFile)) {
          return candidateFile;
        }
      }
    }
    return null;
  }
  function makeFakeModule(path) {
    const fakeModule = new require$$0.Module(path, null);
    fakeModule.filename = path;
    fakeModule.paths = require$$0.Module._nodeModulePaths(path);
    return fakeModule;
  }
  function callNativeResolution(request, issuer) {
    if (issuer.endsWith(`/`))
      issuer = ppath.join(issuer, `internal.js`);
    return require$$0.Module._resolveFilename(npath.fromPortablePath(request), makeFakeModule(npath.fromPortablePath(issuer)), false, {plugnplay: false});
  }
  function isPathIgnored(path) {
    if (ignorePattern === null)
      return false;
    const subPath = ppath.contains(runtimeState.basePath, path);
    if (subPath === null)
      return false;
    if (ignorePattern.test(subPath.replace(/\/$/, ``))) {
      return true;
    } else {
      return false;
    }
  }
  const VERSIONS = {std: 3, resolveVirtual: 1, getAllLocators: 1};
  const topLevel = topLevelLocator;
  function getPackageInformation({name, reference}) {
    const packageInformationStore = packageRegistry.get(name);
    if (!packageInformationStore)
      return null;
    const packageInformation = packageInformationStore.get(reference);
    if (!packageInformation)
      return null;
    return packageInformation;
  }
  function findPackageDependents({name, reference}) {
    const dependents = [];
    for (const [dependentName, packageInformationStore] of packageRegistry) {
      if (dependentName === null)
        continue;
      for (const [dependentReference, packageInformation] of packageInformationStore) {
        if (dependentReference === null)
          continue;
        const dependencyReference = packageInformation.packageDependencies.get(name);
        if (dependencyReference !== reference)
          continue;
        if (dependentName === name && dependentReference === reference)
          continue;
        dependents.push({
          name: dependentName,
          reference: dependentReference
        });
      }
    }
    return dependents;
  }
  function findBrokenPeerDependencies(dependency, initialPackage) {
    const brokenPackages = new Map();
    const alreadyVisited = new Set();
    const traversal = (currentPackage) => {
      const identifier = JSON.stringify(currentPackage.name);
      if (alreadyVisited.has(identifier))
        return;
      alreadyVisited.add(identifier);
      const dependents = findPackageDependents(currentPackage);
      for (const dependent of dependents) {
        const dependentInformation = getPackageInformationSafe(dependent);
        if (dependentInformation.packagePeers.has(dependency)) {
          traversal(dependent);
        } else {
          let brokenSet = brokenPackages.get(dependent.name);
          if (typeof brokenSet === `undefined`)
            brokenPackages.set(dependent.name, brokenSet = new Set());
          brokenSet.add(dependent.reference);
        }
      }
    };
    traversal(initialPackage);
    const brokenList = [];
    for (const name of [...brokenPackages.keys()].sort())
      for (const reference of [...brokenPackages.get(name)].sort())
        brokenList.push({name, reference});
    return brokenList;
  }
  function findPackageLocator(location, {resolveIgnored = false, includeDiscardFromLookup = false} = {}) {
    if (isPathIgnored(location) && !resolveIgnored)
      return null;
    let relativeLocation = ppath.relative(runtimeState.basePath, location);
    if (!relativeLocation.match(isStrictRegExp))
      relativeLocation = `./${relativeLocation}`;
    if (!relativeLocation.endsWith(`/`))
      relativeLocation = `${relativeLocation}/`;
    do {
      const entry = packageLocatorsByLocations.get(relativeLocation);
      if (typeof entry === `undefined` || entry.discardFromLookup && !includeDiscardFromLookup) {
        relativeLocation = relativeLocation.substring(0, relativeLocation.lastIndexOf(`/`, relativeLocation.length - 2) + 1);
        continue;
      }
      return entry.locator;
    } while (relativeLocation !== ``);
    return null;
  }
  function resolveToUnqualified(request, issuer, {considerBuiltins = true} = {}) {
    if (request === `pnpapi`)
      return npath.toPortablePath(opts.pnpapiResolution);
    if (considerBuiltins && isBuiltinModule(request))
      return null;
    const requestForDisplay = getPathForDisplay(request);
    const issuerForDisplay = issuer && getPathForDisplay(issuer);
    if (issuer && isPathIgnored(issuer)) {
      if (!ppath.isAbsolute(request) || findPackageLocator(request) === null) {
        const result = callNativeResolution(request, issuer);
        if (result === false) {
          throw makeError(ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED, `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer was explicitely ignored by the regexp)

Require request: "${requestForDisplay}"
Required by: ${issuerForDisplay}
`, {request: requestForDisplay, issuer: issuerForDisplay});
        }
        return npath.toPortablePath(result);
      }
    }
    let unqualifiedPath;
    const dependencyNameMatch = request.match(pathRegExp);
    if (!dependencyNameMatch) {
      if (ppath.isAbsolute(request)) {
        unqualifiedPath = ppath.normalize(request);
      } else {
        if (!issuer) {
          throw makeError(ErrorCode.API_ERROR, `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`, {request: requestForDisplay, issuer: issuerForDisplay});
        }
        const absoluteIssuer = ppath.resolve(issuer);
        if (issuer.match(isDirRegExp)) {
          unqualifiedPath = ppath.normalize(ppath.join(absoluteIssuer, request));
        } else {
          unqualifiedPath = ppath.normalize(ppath.join(ppath.dirname(absoluteIssuer), request));
        }
      }
    } else {
      if (!issuer) {
        throw makeError(ErrorCode.API_ERROR, `The resolveToUnqualified function must be called with a valid issuer when the path isn't a builtin nor absolute`, {request: requestForDisplay, issuer: issuerForDisplay});
      }
      const [, dependencyName, subPath] = dependencyNameMatch;
      const issuerLocator = findPackageLocator(issuer);
      if (!issuerLocator) {
        const result = callNativeResolution(request, issuer);
        if (result === false) {
          throw makeError(ErrorCode.BUILTIN_NODE_RESOLUTION_FAILED, `The builtin node resolution algorithm was unable to resolve the requested module (it didn't go through the pnp resolver because the issuer doesn't seem to be part of the Yarn-managed dependency tree).

Require path: "${requestForDisplay}"
Required by: ${issuerForDisplay}
`, {request: requestForDisplay, issuer: issuerForDisplay});
        }
        return npath.toPortablePath(result);
      }
      const issuerInformation = getPackageInformationSafe(issuerLocator);
      let dependencyReference = issuerInformation.packageDependencies.get(dependencyName);
      let fallbackReference = null;
      if (dependencyReference == null) {
        if (issuerLocator.name !== null) {
          const exclusionEntry = runtimeState.fallbackExclusionList.get(issuerLocator.name);
          const canUseFallbacks = !exclusionEntry || !exclusionEntry.has(issuerLocator.reference);
          if (canUseFallbacks) {
            for (let t = 0, T = fallbackLocators.length; t < T; ++t) {
              const fallbackInformation = getPackageInformationSafe(fallbackLocators[t]);
              const reference = fallbackInformation.packageDependencies.get(dependencyName);
              if (reference == null)
                continue;
              if (alwaysWarnOnFallback)
                fallbackReference = reference;
              else
                dependencyReference = reference;
              break;
            }
            if (runtimeState.enableTopLevelFallback) {
              if (dependencyReference == null && fallbackReference === null) {
                const reference = runtimeState.fallbackPool.get(dependencyName);
                if (reference != null) {
                  fallbackReference = reference;
                }
              }
            }
          }
        }
      }
      let error = null;
      if (dependencyReference === null) {
        if (isDependencyTreeRoot(issuerLocator)) {
          error = makeError(ErrorCode.MISSING_PEER_DEPENDENCY, `Your application tried to access ${dependencyName} (a peer dependency); this isn't allowed as there is no ancestor to satisfy the requirement. Use a devDependency if needed.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`, {request: requestForDisplay, issuer: issuerForDisplay, dependencyName});
        } else {
          const brokenAncestors = findBrokenPeerDependencies(dependencyName, issuerLocator);
          if (brokenAncestors.every((ancestor) => isDependencyTreeRoot(ancestor))) {
            error = makeError(ErrorCode.MISSING_PEER_DEPENDENCY, `${issuerLocator.name} tried to access ${dependencyName} (a peer dependency) but it isn't provided by your application; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})
${brokenAncestors.map((ancestorLocator) => `Ancestor breaking the chain: ${ancestorLocator.name}@${ancestorLocator.reference}
`).join(``)}
`, {request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName, brokenAncestors});
          } else {
            error = makeError(ErrorCode.MISSING_PEER_DEPENDENCY, `${issuerLocator.name} tried to access ${dependencyName} (a peer dependency) but it isn't provided by its ancestors; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})

${brokenAncestors.map((ancestorLocator) => `Ancestor breaking the chain: ${ancestorLocator.name}@${ancestorLocator.reference}
`).join(``)}
`, {request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName, brokenAncestors});
          }
        }
      } else if (dependencyReference === void 0) {
        if (!considerBuiltins && isBuiltinModule(request)) {
          if (isDependencyTreeRoot(issuerLocator)) {
            error = makeError(ErrorCode.UNDECLARED_DEPENDENCY, `Your application tried to access ${dependencyName}. While this module is usually interpreted as a Node builtin, your resolver is running inside a non-Node resolution context where such builtins are ignored. Since ${dependencyName} isn't otherwise declared in your dependencies, this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`, {request: requestForDisplay, issuer: issuerForDisplay, dependencyName});
          } else {
            error = makeError(ErrorCode.UNDECLARED_DEPENDENCY, `${issuerLocator.name} tried to access ${dependencyName}. While this module is usually interpreted as a Node builtin, your resolver is running inside a non-Node resolution context where such builtins are ignored. Since ${dependencyName} isn't otherwise declared in ${issuerLocator.name}'s dependencies, this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`, {request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName});
          }
        } else {
          if (isDependencyTreeRoot(issuerLocator)) {
            error = makeError(ErrorCode.UNDECLARED_DEPENDENCY, `Your application tried to access ${dependencyName}, but it isn't declared in your dependencies; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerForDisplay}
`, {request: requestForDisplay, issuer: issuerForDisplay, dependencyName});
          } else {
            error = makeError(ErrorCode.UNDECLARED_DEPENDENCY, `${issuerLocator.name} tried to access ${dependencyName}, but it isn't declared in its dependencies; this makes the require call ambiguous and unsound.

Required package: ${dependencyName}${dependencyName !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})
`, {request: requestForDisplay, issuer: issuerForDisplay, issuerLocator: Object.assign({}, issuerLocator), dependencyName});
          }
        }
      }
      if (dependencyReference == null) {
        if (fallbackReference === null || error === null)
          throw error || new Error(`Assertion failed: Expected an error to have been set`);
        dependencyReference = fallbackReference;
        const message = error.message.replace(/\n.*/g, ``);
        error.message = message;
        if (!emittedWarnings.has(message) && debugLevel !== 0) {
          emittedWarnings.add(message);
          process.emitWarning(error);
        }
      }
      const dependencyLocator = Array.isArray(dependencyReference) ? {name: dependencyReference[0], reference: dependencyReference[1]} : {name: dependencyName, reference: dependencyReference};
      const dependencyInformation = getPackageInformationSafe(dependencyLocator);
      if (!dependencyInformation.packageLocation) {
        throw makeError(ErrorCode.MISSING_DEPENDENCY, `A dependency seems valid but didn't get installed for some reason. This might be caused by a partial install, such as dev vs prod.

Required package: ${dependencyLocator.name}@${dependencyLocator.reference}${dependencyLocator.name !== requestForDisplay ? ` (via "${requestForDisplay}")` : ``}
Required by: ${issuerLocator.name}@${issuerLocator.reference} (via ${issuerForDisplay})
`, {request: requestForDisplay, issuer: issuerForDisplay, dependencyLocator: Object.assign({}, dependencyLocator)});
      }
      const dependencyLocation = dependencyInformation.packageLocation;
      if (subPath) {
        unqualifiedPath = ppath.join(dependencyLocation, subPath);
      } else {
        unqualifiedPath = dependencyLocation;
      }
    }
    return ppath.normalize(unqualifiedPath);
  }
  function resolveUnqualifiedExport(request, unqualifiedPath, conditions = defaultExportsConditions) {
    if (isStrictRegExp.test(request))
      return unqualifiedPath;
    const unqualifiedExportPath = applyNodeExportsResolution(unqualifiedPath, conditions);
    if (unqualifiedExportPath) {
      return ppath.normalize(unqualifiedExportPath);
    } else {
      return unqualifiedPath;
    }
  }
  function resolveUnqualified(unqualifiedPath, {extensions = Object.keys(require$$0.Module._extensions)} = {}) {
    var _a, _b;
    const candidates = [];
    const qualifiedPath = applyNodeExtensionResolution(unqualifiedPath, candidates, {extensions});
    if (qualifiedPath) {
      return ppath.normalize(qualifiedPath);
    } else {
      const unqualifiedPathForDisplay = getPathForDisplay(unqualifiedPath);
      const containingPackage = findPackageLocator(unqualifiedPath);
      if (containingPackage) {
        const {packageLocation} = getPackageInformationSafe(containingPackage);
        let exists = true;
        try {
          opts.fakeFs.accessSync(packageLocation);
        } catch (err) {
          if ((err == null ? void 0 : err.code) === `ENOENT`) {
            exists = false;
          } else {
            const readableError = ((_b = (_a = err == null ? void 0 : err.message) != null ? _a : err) != null ? _b : `empty exception thrown`).replace(/^[A-Z]/, ($0) => $0.toLowerCase());
            throw makeError(ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED, `Required package exists but could not be accessed (${readableError}).

Missing package: ${containingPackage.name}@${containingPackage.reference}
Expected package location: ${getPathForDisplay(packageLocation)}
`, {unqualifiedPath: unqualifiedPathForDisplay, extensions});
          }
        }
        if (!exists) {
          const errorMessage = packageLocation.includes(`/unplugged/`) ? `Required unplugged package missing from disk. This may happen when switching branches without running installs (unplugged packages must be fully materialized on disk to work).` : `Required package missing from disk. If you keep your packages inside your repository then restarting the Node process may be enough. Otherwise, try to run an install first.`;
          throw makeError(ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED, `${errorMessage}

Missing package: ${containingPackage.name}@${containingPackage.reference}
Expected package location: ${getPathForDisplay(packageLocation)}
`, {unqualifiedPath: unqualifiedPathForDisplay, extensions});
        }
      }
      throw makeError(ErrorCode.QUALIFIED_PATH_RESOLUTION_FAILED, `Qualified path resolution failed: we looked for the following paths, but none could be accessed.

Source path: ${unqualifiedPathForDisplay}
${candidates.map((candidate) => `Not found: ${getPathForDisplay(candidate)}
`).join(``)}`, {unqualifiedPath: unqualifiedPathForDisplay, extensions});
    }
  }
  function resolveRequest(request, issuer, {considerBuiltins, extensions, conditions} = {}) {
    try {
      const unqualifiedPath = resolveToUnqualified(request, issuer, {considerBuiltins});
      if (request === `pnpapi`)
        return unqualifiedPath;
      if (unqualifiedPath === null)
        return null;
      const isIssuerIgnored = () => issuer !== null ? isPathIgnored(issuer) : false;
      const remappedPath = (!considerBuiltins || !isBuiltinModule(request)) && !isIssuerIgnored() ? resolveUnqualifiedExport(request, unqualifiedPath, conditions) : unqualifiedPath;
      return resolveUnqualified(remappedPath, {extensions});
    } catch (error) {
      if (Object.prototype.hasOwnProperty.call(error, `pnpCode`))
        Object.assign(error.data, {request: getPathForDisplay(request), issuer: issuer && getPathForDisplay(issuer)});
      throw error;
    }
  }
  function resolveVirtual(request) {
    const normalized = ppath.normalize(request);
    const resolved = VirtualFS.resolveVirtual(normalized);
    return resolved !== normalized ? resolved : null;
  }
  return {
    VERSIONS,
    topLevel,
    getLocator: (name, referencish) => {
      if (Array.isArray(referencish)) {
        return {name: referencish[0], reference: referencish[1]};
      } else {
        return {name, reference: referencish};
      }
    },
    getDependencyTreeRoots: () => {
      return [...runtimeState.dependencyTreeRoots];
    },
    getAllLocators() {
      const locators = [];
      for (const [name, entry] of packageRegistry)
        for (const reference of entry.keys())
          if (name !== null && reference !== null)
            locators.push({name, reference});
      return locators;
    },
    getPackageInformation: (locator) => {
      const info = getPackageInformation(locator);
      if (info === null)
        return null;
      const packageLocation = npath.fromPortablePath(info.packageLocation);
      const nativeInfo = __spreadProps(__spreadValues$1({}, info), {packageLocation});
      return nativeInfo;
    },
    findPackageLocator: (path) => {
      return findPackageLocator(npath.toPortablePath(path));
    },
    resolveToUnqualified: maybeLog(`resolveToUnqualified`, (request, issuer, opts2) => {
      const portableIssuer = issuer !== null ? npath.toPortablePath(issuer) : null;
      const resolution = resolveToUnqualified(npath.toPortablePath(request), portableIssuer, opts2);
      if (resolution === null)
        return null;
      return npath.fromPortablePath(resolution);
    }),
    resolveUnqualified: maybeLog(`resolveUnqualified`, (unqualifiedPath, opts2) => {
      return npath.fromPortablePath(resolveUnqualified(npath.toPortablePath(unqualifiedPath), opts2));
    }),
    resolveRequest: maybeLog(`resolveRequest`, (request, issuer, opts2) => {
      const portableIssuer = issuer !== null ? npath.toPortablePath(issuer) : null;
      const resolution = resolveRequest(npath.toPortablePath(request), portableIssuer, opts2);
      if (resolution === null)
        return null;
      return npath.fromPortablePath(resolution);
    }),
    resolveVirtual: maybeLog(`resolveVirtual`, (path) => {
      const result = resolveVirtual(npath.toPortablePath(path));
      if (result !== null) {
        return npath.fromPortablePath(result);
      } else {
        return null;
      }
    })
  };
}

function makeManager(pnpapi, opts) {
  const initialApiPath = npath.toPortablePath(pnpapi.resolveToUnqualified(`pnpapi`, null));
  const initialApiStats = opts.fakeFs.statSync(npath.toPortablePath(initialApiPath));
  const apiMetadata = new Map([
    [initialApiPath, {
      cache: require$$0.Module._cache,
      instance: pnpapi,
      stats: initialApiStats,
      lastRefreshCheck: Date.now()
    }]
  ]);
  function loadApiInstance(pnpApiPath) {
    const nativePath = npath.fromPortablePath(pnpApiPath);
    const module = new require$$0.Module(nativePath, null);
    module.load(nativePath);
    return module.exports;
  }
  function refreshApiEntry(pnpApiPath, apiEntry) {
    const timeNow = Date.now();
    if (timeNow - apiEntry.lastRefreshCheck < 500)
      return;
    apiEntry.lastRefreshCheck = timeNow;
    const stats = opts.fakeFs.statSync(pnpApiPath);
    if (stats.mtime > apiEntry.stats.mtime) {
      process.emitWarning(`[Warning] The runtime detected new informations in a PnP file; reloading the API instance (${npath.fromPortablePath(pnpApiPath)})`);
      apiEntry.stats = stats;
      apiEntry.instance = loadApiInstance(pnpApiPath);
    }
  }
  function getApiEntry(pnpApiPath, refresh = false) {
    let apiEntry = apiMetadata.get(pnpApiPath);
    if (typeof apiEntry !== `undefined`) {
      if (refresh) {
        refreshApiEntry(pnpApiPath, apiEntry);
      }
    } else {
      apiMetadata.set(pnpApiPath, apiEntry = {
        cache: {},
        instance: loadApiInstance(pnpApiPath),
        stats: opts.fakeFs.statSync(pnpApiPath),
        lastRefreshCheck: Date.now()
      });
    }
    return apiEntry;
  }
  const findApiPathCache = new Map();
  function addToCacheAndReturn(start, end, target) {
    if (target !== null)
      target = VirtualFS.resolveVirtual(target);
    let curr;
    let next = start;
    do {
      curr = next;
      findApiPathCache.set(curr, target);
      next = ppath.dirname(curr);
    } while (curr !== end);
    return target;
  }
  function findApiPathFor(modulePath) {
    let bestCandidate = null;
    for (const [apiPath, apiEntry] of apiMetadata) {
      const locator = apiEntry.instance.findPackageLocator(modulePath);
      if (!locator)
        continue;
      if (apiMetadata.size === 1)
        return apiPath;
      const packageInformation = apiEntry.instance.getPackageInformation(locator);
      if (!packageInformation)
        throw new Error(`Assertion failed: Couldn't get package information for '${modulePath}'`);
      if (!bestCandidate)
        bestCandidate = {packageLocation: packageInformation.packageLocation, apiPaths: []};
      if (packageInformation.packageLocation === bestCandidate.packageLocation) {
        bestCandidate.apiPaths.push(apiPath);
      } else if (packageInformation.packageLocation.length > bestCandidate.packageLocation.length) {
        bestCandidate = {packageLocation: packageInformation.packageLocation, apiPaths: [apiPath]};
      }
    }
    if (bestCandidate) {
      if (bestCandidate.apiPaths.length === 1)
        return bestCandidate.apiPaths[0];
      const controlSegment = bestCandidate.apiPaths.map((apiPath) => `  ${npath.fromPortablePath(apiPath)}`).join(`
`);
      throw new Error(`Unable to locate pnpapi, the module '${modulePath}' is controlled by multiple pnpapi instances.
This is usually caused by using the global cache (enableGlobalCache: true)

Controlled by:
${controlSegment}
`);
    }
    const start = ppath.resolve(npath.toPortablePath(modulePath));
    let curr;
    let next = start;
    do {
      curr = next;
      const cached = findApiPathCache.get(curr);
      if (cached !== void 0)
        return addToCacheAndReturn(start, curr, cached);
      const cjsCandidate = ppath.join(curr, Filename.pnpCjs);
      if (opts.fakeFs.existsSync(cjsCandidate) && opts.fakeFs.statSync(cjsCandidate).isFile())
        return addToCacheAndReturn(start, curr, cjsCandidate);
      const legacyCjsCandidate = ppath.join(curr, Filename.pnpJs);
      if (opts.fakeFs.existsSync(legacyCjsCandidate) && opts.fakeFs.statSync(legacyCjsCandidate).isFile())
        return addToCacheAndReturn(start, curr, legacyCjsCandidate);
      next = ppath.dirname(curr);
    } while (curr !== PortablePath.root);
    return addToCacheAndReturn(start, curr, null);
  }
  function getApiPathFromParent(parent) {
    if (parent == null)
      return initialApiPath;
    if (typeof parent.pnpApiPath === `undefined`) {
      if (parent.filename !== null) {
        return parent.pnpApiPath = findApiPathFor(parent.filename);
      } else {
        return initialApiPath;
      }
    }
    if (parent.pnpApiPath !== null)
      return parent.pnpApiPath;
    return null;
  }
  return {
    getApiPathFromParent,
    findApiPathFor,
    getApiEntry
  };
}

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const localFs = __spreadValues({}, fs__default.default);
const nodeFs = new NodeFS(localFs);
const defaultRuntimeState = $$SETUP_STATE(hydrateRuntimeState);
const defaultPnpapiResolution = __filename;
const defaultFsLayer = new VirtualFS({
  baseFs: new ZipOpenFS({
    baseFs: nodeFs,
    libzip: () => getLibzipSync(),
    maxOpenFiles: 80,
    readOnlyArchives: true
  })
});
class DynamicFS extends ProxiedFS {
  constructor() {
    super(ppath);
    this.baseFs = defaultFsLayer;
  }
  mapToBase(p) {
    return p;
  }
  mapFromBase(p) {
    return p;
  }
}
const dynamicFsLayer = new DynamicFS();
let manager;
const defaultApi = Object.assign(makeApi(defaultRuntimeState, {
  fakeFs: dynamicFsLayer,
  pnpapiResolution: defaultPnpapiResolution
}), {
  makeApi: (_a) => {
    var _b = _a, {
      basePath = void 0,
      fakeFs = dynamicFsLayer,
      pnpapiResolution = defaultPnpapiResolution
    } = _b, rest = __objRest(_b, [
      "basePath",
      "fakeFs",
      "pnpapiResolution"
    ]);
    const apiRuntimeState = typeof basePath !== `undefined` ? $$SETUP_STATE(hydrateRuntimeState, basePath) : defaultRuntimeState;
    return makeApi(apiRuntimeState, __spreadValues({
      fakeFs,
      pnpapiResolution
    }, rest));
  },
  setup: (api) => {
    applyPatch(api || defaultApi, {
      fakeFs: defaultFsLayer,
      manager
    });
    dynamicFsLayer.baseFs = new NodeFS(fs__default.default);
  }
});
manager = makeManager(defaultApi, {
  fakeFs: dynamicFsLayer
});
if (module.parent && module.parent.id === `internal/preload`) {
  defaultApi.setup();
  if (module.filename) {
    delete require$$0__default.default._cache[module.filename];
  }
}
if (process.mainModule === module) {
  const reportError = (code, message, data) => {
    process.stdout.write(`${JSON.stringify([{code, message, data}, null])}
`);
  };
  const reportSuccess = (resolution) => {
    process.stdout.write(`${JSON.stringify([null, resolution])}
`);
  };
  const processResolution = (request, issuer) => {
    try {
      reportSuccess(defaultApi.resolveRequest(request, issuer));
    } catch (error) {
      reportError(error.code, error.message, error.data);
    }
  };
  const processRequest = (data) => {
    try {
      const [request, issuer] = JSON.parse(data);
      processResolution(request, issuer);
    } catch (error) {
      reportError(`INVALID_JSON`, error.message, error.data);
    }
  };
  if (process.argv.length > 2) {
    if (process.argv.length !== 4) {
      process.stderr.write(`Usage: ${process.argv[0]} ${process.argv[1]} <request> <issuer>
`);
      process.exitCode = 64;
    } else {
      processResolution(process.argv[2], process.argv[3]);
    }
  } else {
    let buffer = ``;
    const decoder = new StringDecoder__default.default.StringDecoder();
    process.stdin.on(`data`, (chunk) => {
      buffer += decoder.write(chunk);
      do {
        const index = buffer.indexOf(`
`);
        if (index === -1)
          break;
        const line = buffer.slice(0, index);
        buffer = buffer.slice(index + 1);
        processRequest(line);
      } while (true);
    });
  }
}

module.exports = defaultApi;
