'use client'

import { DefaultConfig } from '@/config/connectors/DefaultConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import React, { ReactNode } from 'react'
import { State, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()
// Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? ''

if (!projectId) throw new Error('Project ID Undefined')

createWeb3Modal({
  wagmiConfig: DefaultConfig,
  projectId
})

function ContextProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState: State | undefined
}) {
  return (
    // @ts-ignore
    <WagmiProvider config={DefaultConfig} initialState={initialState}>
        {/* @ts-ignore  */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider