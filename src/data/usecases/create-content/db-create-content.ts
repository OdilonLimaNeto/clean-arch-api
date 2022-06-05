import Content from '../../../domain/entities/content'
import CreateContentUseCase from '../../../domain/usecases/create-content'
import CreateContentDTO from '../../../domain/usecases/dtos/create-content'
import CreateContentRepository from '../../protocols/create-content-repository'

class DbCreateContentUseCase implements CreateContentUseCase {
  constructor(private createContentRepository: CreateContentRepository) { }

  async create(createContentDTO: CreateContentDTO): Promise<Content> {
    const content = await this.createContentRepository.create(createContentDTO)
    return new Promise((resolve) => resolve(content))
  }
}

export { DbCreateContentUseCase }
