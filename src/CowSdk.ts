import log from 'loglevel'
import { version as SDK_VERSION } from '../package.json'
import { CowApi } from './api'
import { SupportedChainId as ChainId } from '/constants/chains'
import { validateAppDataDocument } from '/utils/appData'
import { Context, CowContext } from '/utils/context'
import { signOrder, signOrderCancellation, UnsignedOrder } from '/utils/sign'

export class CowSdk<T extends ChainId> {
  static version = SDK_VERSION
  chainId: T
  context: Context
  cowApi: CowApi<T>

  constructor(chainId: T, cowContext: CowContext) {
    this.chainId = chainId
    this.context = new Context(cowContext)
    this.cowApi = new CowApi(chainId, this.context)
  }

  validateAppDataDocument = validateAppDataDocument

  signOrder(order: UnsignedOrder) {
    const signer = this.context.provider.getSigner()
    return signOrder(order, this.chainId, signer)
  }

  signOrderCancellation(orderId: string) {
    const signer = this.context.provider.getSigner()
    return signOrderCancellation(orderId, this.chainId, signer)
  }
}

export default CowSdk
