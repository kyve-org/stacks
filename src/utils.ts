import {
  Block as _Block,
  Microblock,
  Transaction,
} from "@stacks/stacks-blockchain-api-types";
import axios from "axios";
import { Block, StatusResponse, TransactionResponse } from "./types";

export async function fetchHeight(endpoint: string): Promise<number> {
  const { data } = await axios.get<StatusResponse>(
    `${endpoint}/extended/v1/status`
  );

  return data.chain_tip.block_height;
}

export async function fetchBlock(
  endpoint: string,
  height: number
): Promise<Block> {
  const { data } = await axios.get<_Block>(
    `${endpoint}/extended/v1/block/by_height/${height}`
  );

  // @ts-ignore
  delete data.microblocks_streamed;

  const txs = await fetchTransactions(endpoint, height);
  const microblocks_accepted = await fetchMicroblocks(
    endpoint,
    data.microblocks_accepted
  );

  return {
    ...data,
    txs,
    microblocks_accepted,
  };
}

async function fetchMicroblocks(
  endpoint: string,
  hashes: string[]
): Promise<Microblock[]> {
  const res: Microblock[] = [];

  for (const hash of hashes) {
    const { data } = await axios.get<Microblock>(
      `${endpoint}/extended/v1/microblock/${hash}`
    );

    res.push(data);
  }

  return res;
}

async function fetchTransactions(
  endpoint: string,
  height: number,
  offset: number = 0
): Promise<Transaction[]> {
  const { data } = await axios.get<TransactionResponse>(
    `${endpoint}/extended/v1/tx/block_height/${height}?offset=${offset}`
  );

  if (data.total > offset + data.results.length) {
    const res = await fetchTransactions(
      endpoint,
      height,
      offset + data.results.length
    );
    return [...data.results, ...res];
  }

  return data.results;
}
