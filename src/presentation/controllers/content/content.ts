import CreateContentUseCase from "../../../domain/usecases/create-content";
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
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const content = await this.createContentUseCase.create(httpRequest.body);
      return ok(content);
    } catch (error) {
      return this.errorHandler.handle(error);
    }
  }
}
