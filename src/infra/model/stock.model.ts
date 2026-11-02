import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from "sequelize-typescript";
import BaseModel from "./base.model";
import { RiskLevel } from "../../core/entities/stock.entity";
import PortfolioAssetsModel from "./portfolio-assets.model";
import UserModel from "./user.model";

export type StockModelAttributes = {
  id: string;
  closePrice: number;
  sector: string;
  exchange: string;
  riskLevel: RiskLevel;
  revenue: number;
  vector: number[];
  createdAt: Date;
  updatedAt: Date;
};

@Table({
  tableName: "stock",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class StockModel extends BaseModel<StockModelAttributes> {
  @Column({
    allowNull: false,
    type: DataType.DECIMAL(18, 6),
    field: "close_price",
  })
  declare closePrice: number;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare sector: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare exchange: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM("low", "moderate", "high"),
    field: "risk_level",
  })
  declare riskLevel: RiskLevel;

  @Column({ allowNull: false, type: DataType.DECIMAL(18, 6) })
  declare revenue: number;

  @Column({ allowNull: false, type: DataType.TSVECTOR })
  declare vector: number[];

  @HasMany(() => PortfolioAssetsModel, { foreignKey: "stockId" })
  declare portfolioAssets: PortfolioAssetsModel[];

  @BelongsToMany(() => UserModel, () => PortfolioAssetsModel)
  declare stocks: UserModel[];

  @Column({ allowNull: false, type: DataType.DATE, field: "created_at" })
  declare createdAt: Date;

  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: Date;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
