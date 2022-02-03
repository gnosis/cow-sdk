import { GPv2Settlement } from '@gnosis.pm/gp-v2-contracts/networks.json'
import { SupportedChainId as ChainId } from './chains'

export const GP_SETTLEMENT_CONTRACT_ADDRESS: Partial<Record<number, string>> = {
  [ChainId.MAINNET]: GPv2Settlement[ChainId.MAINNET].address,
  [ChainId.RINKEBY]: GPv2Settlement[ChainId.RINKEBY].address,
  [ChainId.GNOSIS_CHAIN]: GPv2Settlement[ChainId.GNOSIS_CHAIN].address,
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const GAS_FEE_ENDPOINTS = {
  [ChainId.MAINNET]: 'https://safe-relay.gnosis.io/api/v1/gas-station/',
  [ChainId.RINKEBY]: 'https://safe-relay.rinkeby.gnosis.io/api/v1/gas-station/',
  [ChainId.GNOSIS_CHAIN]: 'https://safe-relay.gnosis.io/api/v1/gas-station/',
}

export const DEFAULT_APP_DATA_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'
