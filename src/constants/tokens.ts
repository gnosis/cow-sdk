import { Token, NativeCurrency, Currency, WETH9 } from '@uniswap/sdk-core'
import { SupportedChainId } from '../constants/chains'
import { CowError } from '../utils/common'
import { WXDAI, XDAI_NAME, XDAI_SYMBOL } from './xdai'

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.GNOSIS_CHAIN]: WXDAI,
}

export class GpEther extends NativeCurrency {
  constructor(chainId: number, decimals = 18, symbol = 'ETH', name = 'Ether') {
    super(chainId, decimals, symbol, name)
  }

  public get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]
    throw new CowError('Unsupported chain ID')
  }

  private static _etherCache: { [chainId: number]: GpEther } = {}

  public static onChain(chainId: number): GpEther {
    if (this._etherCache[chainId]) return this._etherCache[chainId]

    switch (chainId) {
      case SupportedChainId.GNOSIS_CHAIN:
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
