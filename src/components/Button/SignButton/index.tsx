import { ethers } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'

function SignButton() {
  const { walletProvider } = useWeb3ModalProvider()

  async function onSignMessage() {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(walletProvider)
    const signer = provider.getSigner()
    const signature = await signer?.signMessage('Hello Web3Modal Ethers')
    console.log(signature)
  }

  return <button onClick={() => onSignMessage()}>Sign Message</button>
}