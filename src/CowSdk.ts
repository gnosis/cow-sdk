import { JsonRpcProvider } from '@ethersproject/providers'
import { version as SDK_VERSION } from '../package.json'
import { CowApi } from './api'
import { DEFAULT_APP_DATA_HASH } from './constants'
import { SupportedChainId as ChainId } from './constants/chains'
import { validateAppDataDocument } from './utils/appData'
import { CowError } from './utils/common'
import { signOrder, signOrderCancellation, UnsignedOrder } from './utils/sign'

export interface SdkContext {
  appDataHash?: string
  isDevEnvironment?: boolean
  provider?: JsonRpcProvider
}

export class CowSdk<T extends ChainId> {
  static version = SDK_VERSION
  chainId: T
  appDataHash: string
  provider?: JsonRpcProvider
  api: CowApi<T>

  constructor(
    chainId: T,
    { appDataHash, isDevEnvironment, provider }: SdkContext = {
      appDataHash: DEFAULT_APP_DATA_HASH,
      isDevEnvironment: false,
    }
  ) {
    this.chainId = chainId
    this.appDataHash = appDataHash
    this.provider = provider

    this.api = new CowApi(chainId, appDataHash, isDevEnvironment)
  }

  validateAppDataDocument = validateAppDataDocument

  signOrder(order: UnsignedOrder) {
    const signer = this.provider?.getSigner()

    if (!signer) {
      throw new CowError('To sign an order a provider must be passed to the constructor')
    }

    return signOrder(order, this.chainId, signer)
  }

  signOrderCancellation(orderId: string) {
    const signer = this.provider?.getSigner()

    if (!signer) {
      throw new CowError('To sign a cancellation order a provider must be passed to the constructor')
    }
    return signOrderCancellation(orderId, this.chainId, signer)
  }
}

export default CowSdk
