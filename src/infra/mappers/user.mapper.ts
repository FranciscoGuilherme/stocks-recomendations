import UniqueEntityId from "../../core/@shared/value-objects/unique-entity-id.vo";
import User from "../../core/entities/user.entity";
import UserModel, { UserModelAttributes } from "../model/user.model";
import MapperInterface from "./mapper.interface";
import StockMapper from "./stock.mapper";

export default class UserMapper implements MapperInterface<User, UserModel> {
  static Mapper() {
    return new UserMapper();
  }

  collectionToEntities(users: UserModel[]): User[] {
    return [];
  }

  toEntity(user: UserModel): User {
    return new User(
      {
        age: user.age,
        investmentGoal: user.investmentGoal,
        preferredSectors: user.preferredSectors,
        riskTolerance: user.riskTolerance,
        stocks: StockMapper.Mapper().collectionToEntities(user.stocks),
        vector: user.vector,
      },
      new UniqueEntityId(user.id),
    );
  }

  toModelAttributes(user: User): UserModelAttributes {
    return {
      id: user.id,
      age: user.age,
      riskTolerance: user.riskTolerance,
      investmentGoal: user.investmentGoal,
      preferredSectors: user.preferredSectors,
      vector: user.vector,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
