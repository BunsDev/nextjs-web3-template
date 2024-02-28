import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { BLACK, BLUE, ChainId, GREEN, RED, WHITE } from "config";
import useActiveWeb3React from "@/hooks/useActiveWeb3React";
import { WNATIVE_ADDRESS } from "config/constants/addresses"
import { RouteData, Squid } from "@0xsquid/sdk";
import BigNumber from "bignumber.js";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

export function Exchange() {
  const { library } = useActiveWeb3React()
  const { open } = useWeb3Modal()
  const { address, isConnected } = useWeb3ModalAccount()

  const signer = library.getSigner()

  // amounts //
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('')
  const [fromAmount, setFromAmount] = useState('');

  const [route, setRoute] = useState<RouteData>(null)

  // squid details //
  const baseUrl = 'https://api.0xsquid.com'
  const integratorId = 'example-swap-widget' // process.env.NEXT_PUBLIC_SQUID_INTEGRATOR_ID

  type Chains = {
    chainId: string;
    name: string;
    logoURI: string;
  }

  const fromAmountWithDecimals = (_fromAmount) => {
    return new BigNumber(_fromAmount.toString())
      .times(10 ** 18)
      .toString()
  }


  // GETS: ROUTE //
  const getRoute = async () => { // _fromAmount
    // [√] SQUID ROUTE //

    // initializes: SDK
    const squid = new Squid({
      // TODO: update to v2 upon integratorId.
      baseUrl: baseUrl,
      integratorId: integratorId
    });

    await squid.init();
    console.log('squid initialized')
    console.log('inputAmount: %s', inputAmount)

    // todo: update params to align with desired assests to swap.
    const params = {
      fromAddress: isConnected ? address : "0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8", // signer.address,
      toAddress: isConnected ? address : "0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8", // signer.address,
      fromChain: (ChainId.AVALANCHE).toString(),
      fromToken: WNATIVE_ADDRESS[ChainId.AVALANCHE], // NATIVE_ADDRESS,
      fromAmount: (Number(inputAmount) * 1E18).toString(), // fromAmountWithDecimals(inputAmount ?? '0'), // "10000000000000000000", // fromAmountWithDecimals(_fromAmount ?? '0'), // "10000000",
      toChain: (ChainId.FANTOM).toString(),
      toToken: WNATIVE_ADDRESS[ChainId.FANTOM], // 
      slippage: 1,
    }

    const { route } = await squid.getRoute(params)
    setRoute(route)
    setOutputAmount((Number(route.estimate.toAmount) / 1E18).toFixed(2).toString() + ' TOKEN')
    console.log(params)
    console.log('route: %s', await route?.estimate.toAmount)
  }

  // HANDLES: SWAP //
  const handleSwap = async () => { // _fromAmount

    // [√] SQUID SWAP //

    // initialize: SDK
    const squid = new Squid({
      // TODO: update to v2 upon integratorId.
      baseUrl: baseUrl,
      integratorId: integratorId
    });

    await squid.init();
    console.log('squid initialized')

    const params = {
      fromAddress: isConnected ? address : "0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8", // signer.address,
      toAddress: isConnected ? address : "0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8", // signer.address,
      // todo: assumes fromChain is current chain
      fromChain: (ChainId.AVALANCHE).toString(),
      fromToken: WNATIVE_ADDRESS[ChainId.AVALANCHE], // NATIVE_ADDRESS,
      fromAmount: (Number(inputAmount) * 1E18).toString(), // fromAmountWithDecimals(inputAmount ?? '0'), // "10000000000000000000", // fromAmountWithDecimals(_fromAmount ?? '0'), // "10000000",
      toChain: (ChainId.FANTOM).toString(),
      toToken: WNATIVE_ADDRESS[ChainId.FANTOM], // TOKEN_ADDRESS[ChainId.FANTOM],
      slippage: 1,
    }

    const { route } = await squid.getRoute(params)

    console.log('inputAmount: %s', route.estimate.fromAmount)
    console.log('outputAmount: %s', route.estimate.toAmount)

    await setOutputAmount(
      new BigNumber(route.estimate?.toAmount.toString() ?? '1')
        .div(10 ** 18)
        .toString()
    )

    await setRoute(route)

    const tx = await squid.executeRoute({
      // @ts-ignore
      signer,
      route
    })
    // @ts-ignore
    const txReceipt = await tx.wait()

    console.log(txReceipt)
  }


  return (
    <div
      style={{
        // display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BLACK,
        color: BLUE,
        fontSize: "1.2rem",
        fontStyle: "bold",
        height: window.innerHeight + "px",
        fontWeight: "bold",
      }}
    >
      <Head>
        <title>Token Swap</title>
        <meta name="description" content="Swap for TOKEN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BLACK,
          fontSize: "1.2rem",
          fontStyle: "bold",
          height: 96,
          // width: "100%",
          gap: 12,
          border: '4px solid',
          borderColor: BLUE,
          borderRadius: 12,
        }}
      >
        <p
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 32,
          }}
        >
          {`Purchase Tokens`}
        </p>
      </div>
      {/* INPUT DATA */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BLACK,
          color: WHITE,
          fontSize: "1.2rem",
          fontStyle: "bold",
          // height: 48,
          width: "100%",
          gap: 12,
          marginTop: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BLACK,
            color: BLUE,
            fontSize: "1.2rem",
            fontStyle: "bold",
            height: 48,
            width: "100%",
            marginBottom: 24,
            border: '2px solid',
            borderRadius: 12,
          }}
        >
          {'WAVAX'}
        </div>
        <input
          value={inputAmount}
          placeholder="Enter Amount"
          onChange={(e) => setInputAmount(e.target.value)}
          style={{
            display: "flex",
            width: "100%",
            height: 48,
            border: "2px solid",
            borderColor: !inputAmount ? RED : BLUE,
            borderRadius: 12,
            marginBottom: 24,
            backgroundColor: BLACK,
            color: WHITE,
            fontSize: "1.2rem",
            paddingLeft: 12,
            fontStyle: "bold",
          }}
        />
      </div>

      {/* OUTPUT DATA */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BLACK,
          color: WHITE,
          fontSize: "1.2rem",
          fontStyle: "bold",
          // height: 48,
          width: "100%",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BLACK,
            color: BLUE,
            fontSize: "1.2rem",
            fontStyle: "bold",
            height: 48,
            width: "100%",
            border: '2px solid',
            borderRadius: 12,
          }}
        >
          {'WFTM'}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BLACK,
            borderColor: BLUE,
            color: BLUE,
            fontSize: "1.2rem",
            fontStyle: "bold",
            height: 48,
            width: "100%",
            border: '2px solid',
            borderRadius: 12,
          }}
        >
          {outputAmount ?? 0}
        </div>
      </div>

      {inputAmount &&
        <button onClick={getRoute}
          style={{
            display: "flex",
            width: "100%",
            border: "2px solid",
            borderColor: !inputAmount ? RED : BLUE,
            borderRadius: 12,
            marginTop: 72,
            backgroundColor: !inputAmount ? RED : BLUE,
            color: BLACK,
            fontSize: "1.2rem",
            fontStyle: "bold",
            justifyContent: "center",
            padding: "1rem",
            fontWeight: "bold",
          }}
        // disabled={!inputAmount}
        >
          {
            // !inputAmount ? 'Input Amount' : 
            'Calculate Output'
          }
        </button>
      }
      {inputAmount && outputAmount &&
        <button
          onClick={
            address ? handleSwap
              : () => open({ view: 'Connect' })
          }
          style={{
            display: "flex",
            width: "100%",
            border: "2px solid",
            borderColor: !isConnected ? RED : WHITE,
            borderRadius: 12,
            marginTop: 72,
            backgroundColor: isConnected ? GREEN : RED,
            color: BLACK,
            fontSize: "1.2rem",
            fontStyle: "bold",
            justifyContent: "center",
            padding: "1rem",
            fontWeight: "bold",
          }}
        >
          {address ? `Spend ${inputAmount} WAVAX` : 'Wallet Disconnected'}
        </button>
      }

    </div>
  );
};

export default Exchange;


// API VERSION //
// const result = await fetch("https://v2.api.squidrouter.com/v2/route", {
//   method: "POST",
//   body: JSON.stringify({
//     fromChain: 43114, // Avalanche
//     toChain: 137, // Polygon
//     fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
//     toToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
//     fromAmount: "100000000000000000", // 0.1 AVAX
//     fromAddress: account,
//     toAddress: account,
//     slippageConfig: {
//       autoMode: 1
//     }
//   }),
//   headers: {
//     // "x-integrator-id": integratorId,
//     "Content-Type": "application/json"
//   }
// })
// console.log('result: %s', await result?.json())


// const result = await squid.route(
//     0.183,
//     "eth",
//     "ethereum",
//     "glmr",
//     "moonbeam",
//     multicall
// );
// const { route } = result;

// const tx = squid.executeRoute(signer, route)
// await tx.wait();

// const status = await squid.getStatus(tx.hash);