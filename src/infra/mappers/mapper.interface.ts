import EntityInterface from "../../core/@shared/entity.interface";
import BaseModel from "../model/base.model";

export default interface MapperInterface<
  E extends EntityInterface,
  M extends BaseModel<{}>,
> {
  collectionToEntities(models: M[]): E[];
  toEntity(model: M): E;
  toModelAttributes(entity: E): any;
}
