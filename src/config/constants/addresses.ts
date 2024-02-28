import { ChainId } from "./chainId";

export const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

// TODO: update to target token addresses.
export const TOKEN_ADDRESS = {
  [ChainId.FANTOM]: "0xF386eB6780a1e875616b5751794f909095283860",
  [ChainId.MANTLE]: "0x7e51ad847cdf8729efc97cfa6e8afa4d658cb85b",
  [ChainId.BASE]: "0x7e51ad847cdf8729efc97cfa6e8afa4d658cb85b",
  [ChainId.ARBITRUM]: "0x7c911fa664ceb8fc2618c6f50507ab126e87de1a",
  [ChainId.AVALANCHE]: "0x67a1fd5f393e9ceee4fb4739d73bf75c1efb9e40",
};

export const WNATIVE_ADDRESS = {
  [ChainId.FANTOM]: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
  [ChainId.MANTLE]: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
  [ChainId.BASE]: "0x4200000000000000000000000000000000000006",
  [ChainId.ARBITRUM]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  [ChainId.AVALANCHE]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
};
