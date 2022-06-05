import { InvalidParamError } from '../../presentation/errors/invalid-param-error'
import Validation from '../../presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareToName: string
  ) { }

  validate(input: any): any {
    if (input[ this.fieldName ] !== input[ this.fieldToCompareToName ]) {
      return new InvalidParamError(this.fieldToCompareToName)
    }
  }
}
