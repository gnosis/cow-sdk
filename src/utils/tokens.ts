import { SupportedChainId as ChainId } from '/constants/chains'
import { NATIVE, WETH } from '/constants/tokens'

export function toErc20Address(tokenAddress: string, chainId: ChainId): string {
  let checkedAddress = tokenAddress

  if (tokenAddress === NATIVE[chainId]) {
    checkedAddress = WETH[chainId].address
  }

  return checkedAddress
}
