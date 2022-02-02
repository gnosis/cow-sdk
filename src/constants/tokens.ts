import { Token, NativeCurrency, Currency, WETH9 } from '@uniswap/sdk-core'
import { SupportedChainId } from '../constants/chains'
import { SdkError } from '../utils/common'
import { WXDAI, XDAI_NAME, XDAI_SYMBOL } from './xdai'

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.XDAI]: WXDAI,
}

export class GpEther extends NativeCurrency {
  constructor(chainId: number, decimals = 18, symbol = 'ETH', name = 'Ether') {
    super(chainId, decimals, symbol, name)
  }

  public get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]
    throw new SdkError('Unsupported chain ID')
  }

  private static _etherCache: { [chainId: number]: GpEther } = {}

  public static onChain(chainId: number): GpEther {
    if (this._etherCache[chainId]) return this._etherCache[chainId]

    switch (chainId) {
      case SupportedChainId.XDAI:
        this._etherCache[chainId] = new GpEther(chainId, 18, XDAI_SYMBOL, XDAI_NAME)
        break
      default:
        this._etherCache[chainId] = new GpEther(chainId)
    }

    return this._etherCache[chainId]
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
