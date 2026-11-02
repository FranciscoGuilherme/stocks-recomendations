import EntityInterface from "../../core/@shared/entity.interface";
import RepositoryInterface from "../../core/@shared/repository.interface";
import BaseModel from "../model/base.model";
import MapperInterface from "../mappers/mapper.interface";
import { ModelCtor } from "sequelize-typescript";

export default abstract class BaseRepository<
  E extends EntityInterface,
  M extends BaseModel<{}>,
> implements RepositoryInterface<E> {
  constructor(
    protected model: ModelCtor<M>,
    protected mapper: MapperInterface<E, M>,
  ) {}

  async findAll(): Promise<E[]> {
    const results = await this.model.findAll();
    return this.mapper.collectionToEntities(results);
  }

  async findById(id: string): Promise<E | null> {
    const result = await this.model.findByPk(id);
    return result ? this.mapper.toEntity(result) : null;
  }

  async create(item: E): Promise<E> {
    const attributes = this.mapper.toModelAttributes(item);
    const model = await this.model.create(attributes);
    return this.mapper.toEntity(model);
  }

  async update(id: string, item: Partial<E>): Promise<E | null> {
    const result = await this.model.findByPk(id);
    if (!result) return null;
    await result.update(item);
    return this.mapper.toEntity(result);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByPk(id);
    if (!result) return false;
    await result.destroy();
    return true;
  }
}
