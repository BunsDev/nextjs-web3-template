import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, fantom, avalanche } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const DefaultConfig = defaultWagmiConfig({
  projectId,
  chains: [mainnet, fantom, avalanche],
  metadata: {
    name: 'NextJS Template',
    description: 'NextJS Template for Web3 Projects',
    url: 'https://*.myapp.com',
    icons: ['https://myapp.com/favicon.ico']
  },
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true
})