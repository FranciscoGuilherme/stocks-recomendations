import User from "@core/entities/user.entity";
import PredictionModelService from "./prediction-model.service";

export default class PredictionManagerService {
  constructor(
    private readonly predictionModelService: PredictionModelService,
  ) {}

  public async recommend(user: User): Promise<void> {
    // TODO: resgatar no banco de dados os dados para treino dos usuarios e ações
    await this.predictionModelService.trainModel([], []);
    this.predictionModelService.recommend(user);
  }
}
