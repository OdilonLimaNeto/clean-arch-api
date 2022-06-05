import Content from '../entities/content'
import CreateContentDTO from './dtos/create-content'

type CreateContentUseCase = {
  create(createContentDTO: CreateContentDTO): Promise<Content>
}

export default CreateContentUseCase
