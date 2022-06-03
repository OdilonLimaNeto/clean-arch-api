import { HttpResponse } from "presentation/protocols";
import ErrorHandler from "presentation/protocols/error-handler";
import Content from "../../../domain/entities/content";
import CreateContentUseCase from "../../../domain/usecases/create-content";
import CreateContentDTO from "../../../domain/usecases/dtos/create-content";
import { badRequest } from "../../../presentation/helpers/http-helper";
import Validation from "../../../presentation/protocols/validation";
import { ContentController } from "./content";

const makeCreateContent = (): CreateContentUseCase => {
  class createContentSTUB implements CreateContentUseCase {
    async create(createContentDTO: CreateContentDTO): Promise<Content> {
      const fakeContent = {
        id: "valid_id",
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      };
      return new Promise((resolve) => resolve(fakeContent));
    }
  }
  return new createContentSTUB();
};

type SUTTypes = {
  sut: ContentController;
  validationSTUB: Validation;
  errorHandlerSTUB: ErrorHandler;
  createContentSTUB: CreateContentUseCase;
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

export const makeErrorHandler = (): ErrorHandler => {
  class ErrorHandlerStub implements ErrorHandler {
    handle(error: any): HttpResponse {
      if (error) return null;
      else return null;
    }
  }

  return new ErrorHandlerStub();
};

const makeSUT = (): SUTTypes => {
  const createContentSTUB = makeCreateContent();
  const validationSTUB = makeValidation();
  const errorHandlerSTUB = makeErrorHandler();
  const sut = new ContentController(
    createContentSTUB,
    validationSTUB,
    errorHandlerSTUB
  );
  return {
    sut,
    createContentSTUB,
    validationSTUB,
    errorHandlerSTUB,
  };
};

describe("Content Controller", () => {
  it("Should return badRequest if validation returns error", async () => {
    const { sut, validationSTUB } = makeSUT();
    jest.spyOn(validationSTUB, "validate").mockReturnValue(new Error());
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(badRequest(new Error()));
  });

  it("should call CreateContentUseCase with correct values", async () => {
    const { sut, createContentSTUB } = makeSUT();
    const createSpy = jest.spyOn(createContentSTUB, "create");
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    await sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith({
      title: "valid_title",
      description: "valid_description",
      thumbnail: "valid_thumbnail",
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    });
  });

  it("should return 500 if CreateContentUseCase Throws", async () => {
    const { createContentSTUB, validationSTUB, errorHandlerSTUB } = makeSUT();
    const sut = new ContentController(
      createContentSTUB,
      validationSTUB,
      errorHandlerSTUB
    );
    jest.spyOn(createContentSTUB, "create").mockRejectedValue(new Error());
    const handlerSpy = jest.spyOn(errorHandlerSTUB, "handle");
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    await sut.handle(httpRequest);
    expect(handlerSpy).toHaveBeenCalledWith(new Error());
  });

  it("should return 200 valid data is provided ", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      title: "valid_title",
      description: "valid_description",
      thumbnail: "valid_thumbnail",
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    });
  });
});
