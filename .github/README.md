<!--suppress HtmlDeprecatedAttribute -->

<div align="center">
  <h1>KYVE + Stacks</h1>
</div>

![banner](https://github.com/kyve-org/assets/raw/main/banners/Stacks.png)

## Configuration

```json
{
  "rpc": "https://api.stacks.org",
  "github": "https://github.com/kyve-org/stacks"
}
```

## Endpoints

- [`/extended/v1/status`](https://hirosystems.github.io/stacks-blockchain-api/#operation/get_status)
- [`/extended/v1/block/by_height/{height}`](https://hirosystems.github.io/stacks-blockchain-api/#operation/get_block_by_height)
- [`/extended/v1/tx/block_height/{height}`](https://hirosystems.github.io/stacks-blockchain-api/#operation/get_transactions_by_block_height)
- [`/extended/v1/microblock/{hash}`](https://hirosystems.github.io/stacks-blockchain-api/#operation/get_microblock_by_hash)
