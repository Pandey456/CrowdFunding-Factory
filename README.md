# CrowdFunding-Factory
Trustless Crowdfunding Platform Using the Factory Pattern

Live Demo: [QuickFund Live DApp](https://quickfund-sepolia.netlify.app)
Sepolia Ehterscan : [View Factory contract on Explorer](https://sepolia.etherscan.io/address/0x8746b2f4B89A47B0A22a6173Bc3d36082125222E)

## What is does
A factory pattern DAPP where anyone can create a campaign giving Title and Goal ( in eth) and others can look at those campaign and invest, only the campaign creator can withdraw the funds.

## Architecture
 - factory.sol - spawns campaign contracts, tracks deployed campaigns by address
 - quickStarter.sol - individual campaign contract with goal, contributors mapping and withdraw logic

```text
    ┌────────────────────────────────────────────────────────┐
       │                      factory.sol                       │
       ├────────────────────────────────────────────────────────┤
       │ 📄 State:                                              │
       │   ├── campaigns (mapping: owner => campaign addresses) │
       │   └── allCampaign (array: global list of all addresses)│
       │                                                        │
       │ ⚙️ Functions:                                           │
       │   ├── CreateACampaign() ──┐                            │
       │   └── getAllCampaign()    │                            │
       └───────────────────────────┼────────────────────────────┘
                                   │
                             Deploys (New)
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │                    quickStarter.sol                    │
       ├────────────────────────────────────────────────────────┤
       │ 📄 State:                                              │
       │   ├── owner (address)                                  │
       │   ├── fee/goal (uint256) & title (string)              │
       │   └── donarRecords (mapping: contributor => amount)    │
       │                                                        │
       │ ⚙️ Functions:                                           │
       │   ├── donate()                                         │
       │   └── withdraw()                                       │
       └────────────────────────────────────────────────────────┘
```
## Test Coverage
```
forge coverage
```
Results:

```text
╭----------------------------+-----------------+-----------------+---------------+---------------╮
| File                       | % Lines         | % Statements    | % Branches    | % Funcs       |
+================================================================================================+
| src/factory.sol            | 100.00% (10/10) | 100.00% (8/8)    | 50.00% (1/2) | 100.00% (3/3) |
|----------------------------+-----------------+-----------------+---------------+---------------|
| src/quickStarter.sol       | 100.00% (12/12) | 100.00% (10/10) | 66.67% (4/6)  | 100.00% (3/3) |
╰----------------------------+-----------------+-----------------+---------------+---------------╯
```


## Local Development

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

## Private Key - Deployment without .env file having private key.

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
