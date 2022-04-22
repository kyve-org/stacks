import {
  Block as _Block,
  Microblock,
  Transaction,
} from "@stacks/stacks-blockchain-api-types";

export interface Block
  extends Omit<
    _Block,
    "txs" | "microblocks_accepted" | "microblocks_streamed"
  > {
  txs: Transaction[];
  microblocks_accepted: Microblock[];
}

export interface StatusResponse {
  server_version: string;
  status: string;
  chain_tip: {
    block_height: number;
    block_hash: string;
    index_block_hash: string;
    microblock_hash: string;
    microblock_sequence: number;
  };
}

export interface TransactionResponse {
  limit: number;
  offset: number;
  total: number;
  results: Transaction[];
}
