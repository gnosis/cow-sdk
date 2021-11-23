import * as appDataSchema from '../schemas/appData.schema.json'
import Ajv from 'ajv'


let validate: Ajv.ValidateFunction | undefined
let ajv: Ajv.Ajv

interface ValidationResult {
  result: boolean,
  errors?: Ajv.ErrorObject[]
}

function getValidator(): { ajv: Ajv.Ajv, validate: Ajv.ValidateFunction } {
  if (!ajv) {
    ajv = new Ajv()  
  }

  if (!validate) {
    validate = ajv.compile(appDataSchema)
  }
  

  return { ajv, validate }
}

export async function validateAppDataDocument(appDataDocument: any): Promise<ValidationResult>{
  const { ajv, validate } = getValidator()
  const result = !!(await validate(appDataDocument))


  return {
    result,
    errors: result ? ajv.errors ?? undefined : undefined
  }
}