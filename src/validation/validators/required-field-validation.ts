import { MissingParamError } from '../../presentation/errors/missing-param-errors'
import Validation from '../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) { }

  validate(input: any): Error {
    if (input[ this.fieldName ] === undefined) {
      return new MissingParamError(this.fieldName)
    }
  }
}
