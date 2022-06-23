import { getRepository } from "typeorm";
import CreateContentRepository from "../../../../data/protocols/content/create-content-repository";
import Content from "../../../../domain/entities/content";
import CreateContentDTO from "../../../../domain/usecases/content/dtos/create-content";
import { ContentEntity } from "./entities/content-entity";

export default class CreateContentPostgresRepository
  implements CreateContentRepository
{
  async create(createContentDTO: CreateContentDTO): Promise<Content> {
    const contentEntity = getRepository(ContentEntity);
    const content = contentEntity.create(createContentDTO);
    return await contentEntity.save(content);
  }
}
