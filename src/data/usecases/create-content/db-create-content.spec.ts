import Content from '../../../domain/entities/content'
import CreateContentDTO from '../../../domain/usecases/dtos/create-content'
import CreateContentRepository from '../../protocols/create-content-repository'
import { DbCreateContentUseCase } from './db-create-content'

const makeCreateContentRepository = (): CreateContentRepository => {
  class CreateContentRepositorySTUB implements CreateContentRepository {
    async create(createContentDTO: CreateContentDTO): Promise<Content> {
      const fakeContent = {
        id: 'valid_id',
        title: 'valid_title',
        description: 'description',
        thumbnail: 'thumbnail',
        published: true,
        sourceDuration: 0,
        sourceSize: 0,
      }
      return new Promise((resolve) => resolve(fakeContent))
    }
  }
  return new CreateContentRepositorySTUB()
}

interface SUTTypes {
  sut: DbCreateContentUseCase
  createContentRepositorySTUB: CreateContentRepository
}

const makeSUT = (): SUTTypes => {
  const createContentRepositorySTUB = makeCreateContentRepository()
  const sut = new DbCreateContentUseCase(createContentRepositorySTUB)
  return {
    sut,
    createContentRepositorySTUB,
  }
}

describe('CreateContent Usecase', () => {
  it('Should call CreateContentRepository with correct values', async () => {
    const { sut, createContentRepositorySTUB } = makeSUT()
    const addSpy = jest.spyOn(createContentRepositorySTUB, 'create')
    const createContentData = {
      title: 'valid_title',
      description: 'description',
      thumbnail: 'thumbnail',
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    }
    await sut.create(createContentData)
    expect(addSpy).toHaveBeenCalledWith({
      title: 'valid_title',
      description: 'description',
      thumbnail: 'thumbnail',
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    })
  })

  it('Should throw if CreateContentRepository with throws', async () => {
    const { sut, createContentRepositorySTUB } = makeSUT()
    jest
      .spyOn(createContentRepositorySTUB, 'create')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const creatContentData = {
      title: "valid_title",
      description: "description",
      thumbnail: "thumbnail",
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    }
    const promise = sut.create(creatContentData)
    await expect(promise).rejects.toThrow()
  })

  it("Should return an account on success", async () => {
    const { sut } = makeSUT()
    const contentData = {
      title: "valid_title",
      description: "description",
      thumbnail: "thumbnail",
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    }
    const account = await sut.create(contentData)
    expect(account).toEqual({
      id: "valid_id",
      title: "valid_title",
      description: "description",
      thumbnail: "thumbnail",
      published: true,
      sourceDuration: 0,
      sourceSize: 0,
    })
  })
})
