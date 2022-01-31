import { useEthers } from '@usedapp/core'
import { Biconomy } from '@biconomy/mexa'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ABI, DEPLOYED_ADDRESS } from '../contract'

const trustedForwarder = {
  'maticTestnet': '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b',
  'maticMainnet': '0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8'
}

const Home = () => {
  
  const { activateBrowserWallet, active, account, library } = useEthers()
  
  const mintNft = async () => {
    
    const biconomy = 
      new Biconomy(library, {
        apiKey: 'kmWOG5auW.4b175ffc-6bb1-45cc-ae49-135d65b48979',
        debug: true
      })
    
    const metaTxProvider = new ethers.providers.Web3Provider(biconomy)
    biconomy.onEvent(biconomy.READY, async () => {
      const contract = new ethers.Contract(
        DEPLOYED_ADDRESS,
        ABI,
        biconomy.getSignerByAddress(account)
      )
      let { data } = await contract.populateTransaction.safeMint(
        account,
        'Nft Token URI goes here'
      )
  
      const txParams = {
        data: data,
        to: DEPLOYED_ADDRESS,
        from: account,
      }
  
      const tx = await metaTxProvider.send('eth_sendTransaction', [txParams])
      if(tx){
        console.log(`Transaction hash: `, tx)
        // const txReceipt = await tx.wait()
        // console.log(`Transaction Receipt: `, txReceipt)
      }
    }).onEvent(biconomy.ERROR, (error, message) => {
      console.log(message)
    })

  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => activateBrowserWallet()} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      <button onClick={mintNft}>Mint Nft</button>
    </div>
  )
}

export default Home