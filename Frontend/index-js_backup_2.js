import {createWalletClient , custom, createPublicClient,formatEther, parseEther} from "https://esm.sh/viem"
const connectBTN = document.getElementById("connect_btn")
const title_in = document.getElementById("title")
const goal_amt = document.getElementById("goal")
const crt_cmp = document.getElementById("campgn")
const display = document.getElementById("display")

import {contractAddress,abi,abi_cmg} from "./constant-js_backup_2.js"
import { sepolia } from "https://esm.sh/viem/chains"



connectBTN.onclick = connect
crt_cmp.onclick= create_c
window.onload=display_sm
let walletClient
let publicClient
async function connect(){
    if(window.ethereum){
       walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })
    await walletClient.requestAddresses();
    connectBTN.innerHTML='Connected'
    }
    else{
        connectBTN.innerHTML='Install Metamask First'
    }
}

async function create_c(e){
    e.preventDefault();
    let title = title_in.value
    let goal = goal_amt.value
    
   
   
    if(window.ethereum){
       walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })
    const [accountAddress]=await walletClient.requestAddresses();

    publicClient = createPublicClient({ transport: custom(window.ethereum)})
    
    const { request }=await publicClient.simulateContract({
        address:contractAddress,
        abi: abi,
        functionName: 'CreateACampaign',
        account:accountAddress,
        chain:sepolia,
        args:[goal,title]
        
    })
    const cam_ca= await walletClient.writeContract(request)
    console.log(`the campaign hash is ${cam_ca}`);
    await display_sm();
}


    else{
        connectBTN.innerHTML='Install Metamask First'
    }

}

async function display_sm(){
     display.innerHTML="Loading..." 
     if(window.ethereum){
        publicClient = createPublicClient({ transport: custom(window.ethereum)})
        const data = await publicClient.readContract({
        address:contractAddress,
        abi:abi,
        functionName: 'getAllCampaign',
        
     })
     if(data.length===0){
        display.innerHTML="No Campaign.."

     }
    display.innerHTML="" 
    const len = data.length
    for(let i=0;i<len;i++){
     await display_card(data[i])
    }
}}

async function display_card(data){
     const i_address = data
      
     const title= await publicClient.readContract({
        address:data,
        abi:abi_cmg,
        functionName: 'campaign',
      
        
     })
    const cardContainer = document.createElement('div')
    cardContainer.className = 'campaign-card'
    //CSS
    
    //END_CSS

    
    const balance = await publicClient.getBalance({
        address:i_address,
    });

    //USE THIS SNIPPER WITH INDEX BACKUP
    /*
    cardContainer.innerHTML=`<h3>${title[2]}</h3><br>
    Goal : ${title[1]} <br>
    CA: ${i_address} <br>
    Balance: ${formatEther(balance)} ETH <br>
    <label >Fund Now</label><br>
    <input class="fund form-control"/> <br><br>
    <button class="fund_now">Fund</button><hr>`
    */
   cardContainer.innerHTML = `<h3>${title[2]}</h3>
    
    <div class="card-text-group">
        <p class="card-info-label">Goal</p>
        <p class="card-info-value">${title[1]}</p>
    </div>
    
    <div class="card-text-group">
        <p class="card-info-label">CA</p>
        <p class="card-info-value">${i_address}</p>
    </div>
    
    <div class="card-text-group">
        <p class="card-info-label">Balance</p>
        <p class="card-info-value">${formatEther(balance)} ETH</p>
    </div>
    <br>
    
    <div class="form-group">
        <input class="form-control fund" required="required" />
        <label class="form-label">Fund Now</label>
    </div>
    
    <button class="fund_now btn">Fund</button><hr>`;

    const fund_value= cardContainer.querySelector(".fund")
    const fund_btn = cardContainer.querySelector(".fund_now")

    fund_btn.onclick=fund_now
    async function fund_now(){
        console.log(fund_value.value)
         if(window.ethereum){
       walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })
    const [funder_accountAddress] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
       address:i_address,
        abi: abi_cmg,
        functionName: 'donate',
        account:funder_accountAddress,
        chain:sepolia,
        value:parseEther(fund_value.value),
    })
    console.log(request)
    await walletClient.writeContract(request)
    
    }
    else{
        connectBTN.innerHTML='Install Metamask First'
    }
        
    }
    display.appendChild(cardContainer);
     console.log(data)
}