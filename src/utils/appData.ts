import * as appDataSchema from '../schemas/appData.schema.json'
import Ajv from 'ajv'
const ajv = new Ajv()

// let validateDocument 
const validate = ajv.compile(appDataSchema)

interface ValidationResult {
  result: boolean,
  errors?: Ajv.ErrorObject[]
}


export async function validateAppDataDocument(appDataDocument: any): Promise<ValidationResult>{
  const result = !!(await validate(appDataDocument))


  return {
    result,
    errors: result ? ajv.errors ?? undefined : undefined
  }
}