import { Node, Arweave, Gzip, JsonFileCache } from '@kyve/core';

import Stacks from './runtime';

new Node()
  .addRuntime(new Stacks())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();
