import Validation from "../../../../../presentation/protocols/validation";
import { RequiredFieldValidation } from "../../../../../validation/validators";
import { ValidationComposite } from "../../../../../validation/validators/validation-composite";

export const makeContentValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of [
    "title",
    "description",
    "thumbnail",
    "published",
    "sourceDuration",
    "sourceSize",
  ]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
