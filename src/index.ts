import KYVE, { Item } from '@kyve/core';
import { Block } from './types';
import { fetchBlock, fetchHeight } from './utils';
import { name, version } from '../package.json';

process.env.KYVE_RUNTIME = name;
process.env.KYVE_VERSION = version;

KYVE.metrics.register.setDefaultLabels({
  app: process.env.KYVE_RUNTIME,
});

class KyveStacks extends KYVE {
  public async getDataItem(key: string): Promise<Item> {
    let block: Block;

    const height = await fetchHeight(this.pool.config.rpc);
    if (+key > height) throw new Error();

    try {
      block = await fetchBlock(this.pool.config.rpc, +key);
    } catch (err) {
      this.logger.warn(`Failed to fetch block ${key}. Retrying ...`);

      throw err;
    }

    return { key, value: block };
  }

  public async getNextKey(key: string): Promise<string> {
    if (key) {
      return (parseInt(key) + 1).toString();
    }

    return '0';
  }

  public async formatValue(value: any): Promise<string> {
    return value.hash;
  }
}

// noinspection JSIgnoredPromiseFromCall
new KyveStacks().start();
