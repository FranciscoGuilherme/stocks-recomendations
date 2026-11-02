import User from "@core/entities/user.entity";
import UserModel from "../../../infra/model/user.model";
import UserRepository from "../../../infra/repositories/user.repository";
import { useTestDatabase } from "../../helpers/database";
import UserMapper from "../../../infra/mappers/user.mapper";
import PortfolioAssetsModel from "../../../infra/model/portfolio-assets.model";
import StockModel from "../../../infra/model/stock.model";

describe("UserRepository Integration Tests", () => {
  let userRepository: UserRepository;
  useTestDatabase([UserModel, StockModel, PortfolioAssetsModel]);

  beforeEach(() => {
    userRepository = new UserRepository(UserModel, UserMapper.Mapper());
  });

  it("should create a user", async () => {
    const user = new User({
      age: 30,
      riskTolerance: "Medium",
      investmentGoal: "Retirement",
      preferredSectors: ["Technology", "Healthcare"],
      vector: [0.1, 0.2, 0.3],
    });
    const createdUser = await userRepository.create(user);

    expect(createdUser).toHaveProperty("id");
    expect(createdUser.age).toBe(30);
    expect(createdUser.investmentGoal).toBe("Retirement");
    expect(createdUser.preferredSectors).toEqual(["Technology", "Healthcare"]);
    expect(createdUser.riskTolerance).toBe("Medium");
  });

  it("should find a user by ID", async () => {
    const user = new User({
      age: 25,
      riskTolerance: "High",
      investmentGoal: "Wealth Accumulation",
      preferredSectors: ["Finance", "Energy"],
      vector: [0.4, 0.5, 0.6],
    });
    const createdUser = await userRepository.create(user);
    const foundUser = await userRepository.findById(createdUser.id);

    expect(foundUser).not.toBeNull();
    expect(foundUser?.id).toBe(createdUser.id);
    expect(foundUser?.age).toBe(25);
    expect(foundUser?.investmentGoal).toBe("Wealth Accumulation");
    //expect(foundUser?.preferredSectors).toEqual(["Finance", "Energy"]);
    expect(foundUser?.riskTolerance).toBe("High");
  });

  it("should update a user", async () => {
    const user = new User({
      age: 40,
      riskTolerance: "Low",
      investmentGoal: "Education",
      preferredSectors: ["Consumer Goods"],
      vector: [0.7, 0.8, 0.9],
    });
    const createdUser = await userRepository.create(user);
    const updatedUser = await userRepository.update(createdUser.id, {
      age: 45,
      riskTolerance: "Moderate",
    });

    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.age).toBe(45);
    expect(updatedUser?.riskTolerance).toBe("Moderate");
  });

  it("should delete a user", async () => {
    const user = new User({
      age: 35,
      riskTolerance: "Moderate",
      investmentGoal: "Travel",
      preferredSectors: ["Tourism"],
      vector: [0.2, 0.3, 0.4],
    });
    const createdUser = await userRepository.create(user);
    const deleteResult = await userRepository.delete(createdUser.id);
    const foundUser = UserModel.findByPk(createdUser.id, { paranoid: false });

    expect(deleteResult).toBe(true);
    expect(foundUser).not.toBeNull();
    expect((await foundUser)?.deletedAt).not.toBeNull();
  });
});
