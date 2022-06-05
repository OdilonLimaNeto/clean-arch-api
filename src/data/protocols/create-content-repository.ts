import Content from '../../domain/entities/content';
import CreateContentDTO from '../../domain/usecases/dtos/create-content';

type CreateContentRepository = {
  create(createContentDTO: CreateContentDTO): Promise<Content>
}

export default CreateContentRepository
