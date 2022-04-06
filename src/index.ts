import KYVE from "@kyve/core";
import { Block } from "./types";
import { fetchBlock, fetchHeight } from "./utils";
import { version } from "../package.json";

process.env.KYVE_RUNTIME = "@kyve/stacks";
process.env.KYVE_VERSION = version;

KYVE.metrics.register.setDefaultLabels({
  app: process.env.KYVE_RUNTIME,
});

class KyveStacks extends KYVE {
  public async getDataItem(key: number): Promise<{ key: number; value: any }> {
    let block: Block;

    const height = await fetchHeight(this.pool.config.rpc);
    if (key > height) throw new Error();

    try {
      block = await fetchBlock(this.pool.config.rpc, key);
    } catch (err) {
      this.logger.warn(
        `⚠️  EXTERNAL ERROR: Failed to fetch block ${key}. Retrying ...`
      );

      throw err;
    }

    return { key, value: block };
  }
}

// noinspection JSIgnoredPromiseFromCall
new KyveStacks().start();
