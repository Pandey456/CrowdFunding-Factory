import {createWalletClient , custom, createPublicClient} from "https://esm.sh/viem"
const connectBTN = document.getElementById("connect_btn")
const title_in = document.getElementById("title")
const goal_amt = document.getElementById("goal")
const crt_cmp = document.getElementById("campgn")
const display = document.getElementById("display")

import {contractAddress,abi} from "./constant-js.js"
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
}


    else{
        connectBTN.innerHTML='Install Metamask First'
    }

}

async function display_sm(){
    display.innerHTML="here u will see the addres"
     if(window.ethereum){
        const [data] = await publicClient.readContract({
        address:contractAddress,
        abi:abi,
        functionName: 'getuserCampaign',
        
     }
}