import {createWalletClient , custom} from "https://esm.sh/viem"
const connectBTN = document.getElementById("connect_btn")
connectBTN.onclick = connect
let walletClient
async function connect(){
    if(window.ethereum){
       walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })
    await walletClient.requestAddresses();
    console.log("waiting over")
    }
    else{
        connectBTN.innerHTML='Install Metamask First'
    }
}