// used to mark unsupported tokens, these are hosted lists of unsupported tokens
import { SupportedChainId as ChainId } from './chains'

export type NetworkLists = {
  [chain in ChainId]: string[]
}

// Set what we want as the default list when no chain id available: default = MAINNET
export const DEFAULT_NETWORK_FOR_LISTS = ChainId.MAINNET
