import { DbCreateContentUseCase } from "../../../../data/usecases/create-content/db-create-content";
import CreateContentPostgresRepository from "../../../../infra/db/postgres/content/create-content-repository";
import { ContentController } from "../../../../presentation/controllers/content/content";
import { ErroHandlerFactory } from "../../errors/error-handler-factory";
import { makeContentValidation } from "./content-validation/account-validation-factory";

export const makeContentController = (): ContentController => {
  const errorHandler = new ErroHandlerFactory()
  const createContentPostgresRepository = new CreateContentPostgresRepository()
  const dbCreateContentUseCase = new DbCreateContentUseCase(createContentPostgresRepository);
  return new ContentController(dbCreateContentUseCase, makeContentValidation(), errorHandler);
}