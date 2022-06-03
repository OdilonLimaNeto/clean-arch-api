/* eslint-disable no-restricted-syntax */
import CreateContentUseCase from "../../../domain/usecases/create-content";
import { MissingParamError } from "../../errors/missing-param-errors";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols";
import Controller from "../../protocols/controller";

export class ContentController implements Controller {
  constructor(private createContentUseCase: CreateContentUseCase) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        "title",
        "description",
        "thumbnail",
        "published",
        "sourceDuration",
        "sourceSize",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const {
        title,
        description,
        thumbnail,
        published,
        sourceDuration,
        sourceSize,
      } = httpRequest.body;
      const content = await this.createContentUseCase.create({
        title,
        description,
        thumbnail,
        published,
        sourceDuration,
        sourceSize,
      });
      console.log("🚀 ~ file: content", JSON.stringify(content, null, 2));

      return ok(content);
    } catch (error) {
      return serverError();
    }
  }
}
