/* eslint-disable new-cap */
/* eslint-disable no-promise-executor-return */
import Content from "../../../domain/entities/content";
import CreateContentUseCase from "../../../domain/usecases/create-content";
import CreateContentDTO from "../../../domain/usecases/dtos/create-content";
import { MissingParamError } from "../../errors/missing-param-errors";
import { ServerError } from "../../errors/server-error";
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
  createContentSTUB: CreateContentUseCase;
};

const makeSUT = (): SUTTypes => {
  const createContentSTUB = makeCreateContent();
  const sut = new ContentController(createContentSTUB);
  return {
    sut,
    createContentSTUB,
  };
};

describe("Content Controller", () => {
  it("should return 400 if no title is provided", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("title"));
  });

  it("should return 400 if no description is provided ", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        title: "valid_title",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("description"));
  });

  it("should return 400 if no thumbnail is provided ", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("thumbnail"));
  });

  it("should return 400 if no published is provided ", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        sourceDuration: 0,
        sourceSize: 0,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("published"));
  });

  it("should return 400 if no sourceDuration is provided ", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceSize: 0,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("sourceDuration"));
  });

  fit("should return 400 if no sourceSize is provided ", async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        title: "valid_title",
        description: "valid_description",
        thumbnail: "valid_thumbnail",
        published: true,
        sourceDuration: 0,
      },
    };
    await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("sourceSize"));
  });

  fit("should call CreateContentUseCase with correct values", async () => {
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

  fit("should return 500 if CreateContentUseCase Throws", async () => {
    const createContentSTUB = makeCreateContent();
    const sut = new ContentController(createContentSTUB);
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
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  fit("should return 200 valid data is provided ", async () => {
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
