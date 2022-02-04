import { Token } from '@uniswap/sdk-core'
import { SupportedChainId as ChainId } from '/constants/chains'

export const XDAI_SYMBOL = 'XDAI'
export const XDAI_NAME = 'xDai'

export const WXDAI = new Token(
  ChainId.GNOSIS_CHAIN,
  '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  18,
  'WXDAI',
  'Wrapped XDAI'
)
