import { getRepository } from 'typeorm';
import CreateContentRepository from "../../../../data/protocols/create-content-repository";
import Content from "../../../../domain/entities/content";
import CreateContentDTO from "../../../../domain/usecases/dtos/create-content";
import ContentEntity from "./content-entity";

export default class ContentPostgresRepository implements CreateContentRepository {
  async create(createContentDTO: CreateContentDTO): Promise<Content> {
    const contentEntity = getRepository<ContentEntity>(ContentEntity);
    return await contentEntity.save(contentEntity.create(createContentDTO));
  }
}