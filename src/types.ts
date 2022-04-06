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
  microblocks_streamed: Microblock[];
}

export interface PaginatedResponse {
  limit: number;
  offset: number;
  total: number;
  results: any[];
}
