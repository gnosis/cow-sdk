import { GetQuoteResponse } from '@gnosis.pm/gp-v2-contracts'
import { GpPriceStrategy, OrderMetaData } from '../api/types'
import { SupportedChainId as ChainId } from '../constants/chains'

export interface QuoteParams {
  quoteParams: FeeQuoteParams
  strategy: GpPriceStrategy
  fetchFee: boolean
  previousFee?: FeeInformation
  isPriceRefresh: boolean
}

export interface FeeInformation {
  expirationDate: string
  amount: string
}

export interface PriceInformation {
  token: string
  amount: string | null
}

// GetQuoteResponse from @gnosis.pm/gp-v2-contracts types Timestamp and BigNumberish
// do not play well with our existing methods, using string instead
export type SimpleGetQuoteResponse = Pick<GetQuoteResponse, 'from'> & {
  // We need to map BigNumberIsh and Timestamp to what we use: string
  quote: Omit<GetQuoteResponse['quote'], 'sellAmount' | 'buyAmount' | 'feeAmount' | 'validTo'> & {
    sellAmount: string
    buyAmount: string
    validTo: string
    feeAmount: string
  }
  expiration: string
}

export type FeeQuoteParams = Pick<OrderMetaData, 'sellToken' | 'buyToken' | 'kind'> & {
  amount: string
  fromDecimals: number
  toDecimals: number
  chainId: ChainId
  userAddress?: string | null
  receiver?: string | null
  validTo: number
}

export type PriceQuoteParams = Omit<FeeQuoteParams, 'sellToken' | 'buyToken'> & {
  baseToken: string
  quoteToken: string
}