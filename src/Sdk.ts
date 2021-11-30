import { version as SDK_VERSION } from '../package.json'
import { validateAppDataDocument } from './utils/appData'

export class Sdk {
  static version = SDK_VERSION

  validateAppDataDocument = validateAppDataDocument
}

export default Sdk