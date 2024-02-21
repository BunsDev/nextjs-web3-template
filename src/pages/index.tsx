import type { NextPage } from "next";
import Head from "next/head";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useEffect } from "react";
import { injected } from "config/constants/wallets";
import { connectorLocalStorageKey } from "config/connectors/index";
import { BLUE, ChainColor, ChainId } from "config";
import formatAddress from "functions/formatAddress";
import { useWeb3Modal } from '@web3modal/ethers/react';

const Home: NextPage = () => {
  const { account, activate, chainId } = useActiveWeb3React();
  // @ts-ignore
  //   const { address } = useWeb3ModalAccount()
  const fontColor = ChainColor[chainId ?? ChainId.FANTOM];
  const { open } = useWeb3Modal()

  useEffect(() => {
    console.log(window.localStorage.getItem(connectorLocalStorageKey));

    activate(injected, undefined, true).catch((error) => {
      activate(injected);
      console.log(error);
    });
  }, [activate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: BLUE,
        color: fontColor,
        fontSize: "1.2rem",
        fontStyle: "bold",
      }}
    >
      <div>
        <Head>
          <title>NextJS Template</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid",
            borderRadius: "5px",
            padding: "8px",
            color: "#FFFFFF",
          }}
          onClick={() => open()}
        >
          {account
            ? `${formatAddress(account ?? "")}`
            : 'Connect Wallet'}
        </div>
      </div>
    </div>
  );
};

export default Home;