### This is my first non tutorial project
### DAY - 1 
```
Created Foundry Project
Created both Smart Contract, one creating campaign
Factory Smart contract as well
------
Issues:
 1. function should be payable to receive funds
 2. (bool success,)=campaign.owner.call{value:balance}("");
 3. and issues in testing, setup shd be external,
 4. "Factory public factory;" should be outside setup etc
```
### Day 2
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
## Day 3: Frontend Integration & Wallet Connection

Started building the frontend interface from scratch. 

* **Milestones:**
  * Built the core HTML user interface.
  * Integrated wallet connection utilizing **Viem**.
* **Debugging & Fixes:**
  * **Issue:** The wallet connection button was initially completely unresponsive.
  * **Resolution:** Resolved the issue by adding `type="module"` to the `<script>` tag, enabling proper ES module execution. Wallet popups are now functioning perfectly.

---

## Day 4: Contract Interaction via UI

Progressed further into frontend-to-smart-contract integration without the use of external tutorials.

* **Milestones:**
  * Verified successful wallet connection lifecycle.
  * Enabled campaign creation directly through the `CampaignFactory` contract via the basic HTML UI.
* **Next Steps:** Finalize the UI for the funding function and initiate end-to-end live testing on the **Sepolia testnet**.

---

## Day 5: Data Retrieval & Architecture Refactoring

Hit a major architectural roadblock regarding data retrieval on the frontend and refactored the factory contract layout.

### Technical Challenges & Architecture

#### 1. The Storage Mapping Limitation
To track campaign ownership, I initially implemented a standard mapping:
```solidity
mapping(address => address) public creatorToCampaign;
```
## Day 6: Project Completion & Live Deployment

Successfully completed the end-to-end decentralized crowdfunding application (**QuickFund**) within a 6-day timeline.

* **Core Deliverables Achieved:**
  * Written entirely in **Solidity** using the **Foundry** framework with 100% test coverage.
  * `CampaignFactory` contract successfully deployed to the **Sepolia Testnet**.
  * Created a vanilla frontend interface constructed with clean HTML, CSS, JavaScript, and **Viem**.
  * Automated deployment and hosting via Netlify.
* **Production Build:** [QuickFund Live DApp](https://quickfund-sepolia.netlify.app)

> **Project Retrospective:** This served as an excellent exercise in navigating raw Web3 assembly, debugging state structures on the fly, and handling deployment lifecycles without boilerplate tutorials. Project officially closed out. Moving on to the next build tomorrow.