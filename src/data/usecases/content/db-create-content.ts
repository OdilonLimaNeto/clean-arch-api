import Content from "../../../domain/entities/content";
import CreateContentUseCase from "../../../domain/usecases/content/create-content";
import CreateContentDTO from "../../../domain/usecases/content/dtos/create-content";
import CreateContentRepository from "../../protocols/content/create-content-repository";

class DbCreateContentUseCase implements CreateContentUseCase {
  constructor(private createContentRepository: CreateContentRepository) {}

  async create(createContentDTO: CreateContentDTO): Promise<Content> {
    const content = await this.createContentRepository.create(createContentDTO);
    return new Promise((resolve) => resolve(content));
  }
}

export { DbCreateContentUseCase };
