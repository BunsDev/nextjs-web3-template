import { ChainId } from './chainId'
// import { useActiveWeb3React } from 'services/web3'
export enum SupportedChainId {
  ETHEREUM = ChainId.ETHEREUM,
//   TELOS = ChainId.TELOS,
  BASE = ChainId.BASE,
  BSC = ChainId.BSC,
  FANTOM = ChainId.FANTOM,
  AVALANCHE = ChainId.AVALANCHE,
  ARBITRUM = ChainId.ARBITRUM,
//   MOONRIVER = ChainId.MOONRIVER,
  MATIC = ChainId.MATIC
}

export enum ChainColor {
    ETHEREUM = '#627EEA',
    FANTOM = '#1969FF',
    BSC = '#F0B90B',
    AVALANCHE = '#E84142',
    ARBITRUM = '#4698FA',
    MATIC = '#8247E5'
}

export enum ChainLogo {
    ETHEREUM = '#627EEA',
    FANTOM = '/images/networks/fantom-white.svg',
    BSC = '/images/networks/binance.svg',
    AVALANCHE = '/images/networks/avalanche.svg',
    ARBITRUM = '/images/networks/arbitrum.svg',
    MATIC = '/images/networks/polygon.svg'
}

export function getChainLogoURL(chainId: number) {
  let logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets'
  chainId == ChainId.FANTOM ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets'
    : chainId == ChainId.AVALANCHE ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/avalanche/assets'
      : chainId == ChainId.ETHEREUM ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/ethereum/assets'
        : chainId == ChainId.BSC ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/binance/assets'
          : chainId == ChainId.MATIC ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/polygon/assets'
            : chainId == ChainId.ARBITRUM ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/arbitrum/assets'
              : chainId == ChainId.MOONRIVER ? logoURL = 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/moonriver/assets'
                : 'https://raw.githubusercontent.com/soulswapfinance/assets/prod/blockchains/fantom/assets'

  return logoURL
}

export function getChainLogo(chainId: number) {
  let logoURL = '/images/networks/fantom-white.svg'
  chainId == ChainId.FANTOM ? logoURL = '/images/networks/fantom-white.svg'
    : chainId == ChainId.AVALANCHE ? logoURL = '/images/networks/avalanche.svg'
      : chainId == ChainId.ETHEREUM ? logoURL = '/images/networks/ethereum-white.svg'
        : chainId == ChainId.BSC ? logoURL = '/images/networks/binance.svg'
          : chainId == ChainId.MATIC ? logoURL = '/images/networks/polygon.svg'
            : chainId == ChainId.ARBITRUM ? logoURL = '/images/networks/arbitrum.svg'
              : chainId == ChainId.MOONRIVER ? logoURL = '/images/networks/moonriver.svg'
                : '/images/networks/fantom-white.svg'

  return logoURL
}

export function getChainInfo(chainId: number, option: string) {
  let output = ''
  if (chainId == ChainId.FANTOM) {
    option == 'NETWORK' ? output = 'Fantom Opera'
      : option == 'NAME' ? output = 'Fantom'
        : option == 'SYMBOL' ? output = 'FTM'
          : output = ''
  } else if (chainId == ChainId.AVALANCHE) {
    option == 'NETWORK' ? output = 'Avalanche Network'
      : option == 'NAME' ? output = 'Avalanche'
        : option == 'SYMBOL' ? output = 'AVAX'
          : output = ''
   } else if (chainId == ChainId.ETHEREUM) {
    option == 'NETWORK' ? output = 'Ethereum Network'
      : option == 'NAME' ? output = 'Ethereum'
        : option == 'SYMBOL' ? output = 'ETH'
          : output = ''
    } else if (chainId == ChainId.BSC) {
    option == 'NETWORK' ? output = 'Binance Smart Chain'
      : option == 'NAME' ? output = 'Binance'
        : option == 'SYMBOL' ? output = 'BSC'
          : output = ''
    } else if (chainId == ChainId.MATIC) {
    option == 'NETWORK' ? output = 'Polygon (Matic)'
      : option == 'NAME' ? output = 'Polygon'
        : option == 'SYMBOL' ? output = 'MATIC'
          : output = '' 
    } else if (chainId == ChainId.BASE) {
    option == 'NETWORK' ? output = 'Base'
      : option == 'NAME' ? output = 'Base'
        : option == 'SYMBOL' ? output = 'BASE'
          : output = ''
    } else if (chainId == ChainId.ARBITRUM) {
    option == 'NETWORK' ? output = 'Arbitrum One'
      : option == 'NAME' ? output = 'Arbitrum'
        : option == 'SYMBOL' ? output = 'ARB'
          : output = ''
    } else if (chainId == ChainId.MOONRIVER) {
    option == 'NETWORK' ? output = 'Moonriver'
      : option == 'NAME' ? output = 'Moonriver'
        : option == 'SYMBOL' ? output = 'MOVR'
          : output = ''
    }

  return output
}
