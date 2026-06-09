## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### Private Key - Deployment without .env file having private key.

1. Initiating 
```
$ cast wallet import <keyName> --interactive
```
2. Put in Private key => copy and paste your Private key
3. Give a Password => Give a new Password 
4. success message
5. in order to deploy use:
```
forge script script/deployFactory.sol --rpc-url http://sepolia.infura.io --account <keyName> --sender <wallet Address(of which private key you provided)> --broadcast
```
in this case it was:
```
forge script script/deployFactory.s.sol --rpc-url https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY --account defaultKey --sender 0x8efdfcdf25fbdaf795bd636f57a0cee2a3848335 --broadcast

```
or using public rpc :
```
forge script script/deployFactory.s.sol --rpc-url https://eth-sepolia.g.alchemy.com/v2/demo --account defaultKey --sender 0x8efdfcdf25fbdaf795bd636f57a0cee2a3848335 --broadcast
```
## Test Coverage
```
forge coverage
```
### Test Coverage

```text
╭----------------------------+-----------------+-----------------+---------------+---------------╮
| File                       | % Lines         | % Statements    | % Branches    | % Funcs       |
+================================================================================================+
| src/factory.sol            | 80.00% (8/10)   | 87.50% (7/8)    | 50.00% (1/2)  | 66.67% (2/3)  |
|----------------------------+-----------------+-----------------+---------------+---------------|
| src/quickStarter.sol       | 100.00% (12/12) | 100.00% (10/10) | 66.67% (4/6)  | 100.00% (3/3) |
╰----------------------------+-----------------+-----------------+---------------+---------------╯