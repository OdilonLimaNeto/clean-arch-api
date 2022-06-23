import CreateContentUseCase from "../../../domain/usecases/content/create-content";
import { badRequest, ok } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols";
import Controller from "../../protocols/controller";
import Validation from "../../protocols/validation";
import ErrorHandler from "./../../protocols/error-handler";

export class ContentController implements Controller {
  constructor(
    private createContentUseCase: CreateContentUseCase,
    private validation: Validation,
    private errorHandler: ErrorHandler
  ) {}
  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body);
      if (error) {
        return badRequest(error);
      }
      const content = await this.createContentUseCase.create(body);
      return ok(content);
    } catch (error) {
      return this.errorHandler.handle(error);
    }
  }
}
