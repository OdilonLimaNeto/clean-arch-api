import { MissingPathParamError } from "../../presentation/errors/missing-path-param-error";
import Validation from "../../presentation/protocols/validation";

export class RequiredPathParamValidation implements Validation {
  constructor(private readonly paramName: string) {}

  validate(input: any): Error {
    if (!input[this.paramName]) {
      return new MissingPathParamError(this.paramName);
    }
  }
}
