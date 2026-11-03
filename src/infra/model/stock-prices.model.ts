import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "../model/base.model";
import StockModel from "../model/stock.model";

export type StockPricesModelProps = {
  stockId: string;
  price: number;
  createdAt: Date;
  deletedAt?: Date;
};

@Table({
  tableName: "stock_prices",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at",
})
export default class StockPricesModel extends BaseModel<StockPricesModelProps> {
  @ForeignKey(() => StockModel)
  @Column({ allowNull: false, type: DataType.UUID, field: "stock_id" })
  declare stockId: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(18, 6) })
  declare price: number;

  @Column({ type: DataType.DATE, field: "created_at" })
  declare createdAt: Date;

  @Column({ type: DataType.DATE, field: "deleted_at" })
  declare deletedAt: Date;
}
