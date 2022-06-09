import MockDate from 'mockdate'
import CreateContentRepository from '../../../../data/protocols/create-content-repository'
import { DbCreateContentUseCase } from '../../../../data/usecases/create-content/db-create-content'
import Content from '../../../../domain/entities/content'
import CreateContentUseCase from '../../../../domain/usecases/create-content'
import CreateContentDTO from '../../../../domain/usecases/dtos/create-content'

export const makeContentEntity = (): Content => ({
  id: 'id',
  title: 'title',
  description: 'description',
  thumbnail: 'thumbnail',
  published: true,
  sourceDuration: 0,
  sourceSize: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})

const makeCreateContentRepository = (): CreateContentRepository => {
  class ContentPostgresRepositorySTUB implements CreateContentRepository {
    async create(createContentDTO: CreateContentDTO): Promise<Content> {
      return await new Promise(resolve => resolve(makeContentEntity()))
    }
  }
  return new ContentPostgresRepositorySTUB()
}

type SUTTypes = {
  sut: CreateContentUseCase
  contentPostgresRepositorySTUB: CreateContentRepository
}

const makeSUT = (): SUTTypes => {
  const contentPostgresRepositorySTUB = makeCreateContentRepository()
  const sut = new DbCreateContentUseCase(contentPostgresRepositorySTUB)

  return {
    sut,
    contentPostgresRepositorySTUB,
  }
}

const makeCreateContentDTO = (): CreateContentDTO => ({
  title: 'title',
  description: 'description',
  thumbnail: 'thumbnail',
  published: true,
  sourceDuration: 0,
  sourceSize: 0,
})

describe('Content Postgres Repository', () => {
  beforeAll(() => MockDate.set(new Date()))

  afterAll(() => MockDate.reset())

  it('should return an content on success', async () => {
    const { sut } = makeSUT()
    const response = await sut.create(makeCreateContentDTO())
    expect(response).toEqual(makeContentEntity())
  })

  it('should return 500 if Postgres Repository throws', async () => {
    const { sut, contentPostgresRepositorySTUB } = makeSUT()

    jest
      .spyOn(contentPostgresRepositorySTUB, 'create')
      .mockRejectedValue(new Error())

    const response = sut.create(makeCreateContentDTO())
    await expect(response).rejects.toThrow(new Error())
  })
})