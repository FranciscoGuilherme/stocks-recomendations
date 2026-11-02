import UniqueEntityId from "../../core/@shared/value-objects/unique-entity-id.vo";
import Stock from "../../core/entities/stock.entity";
import StockModel, { StockModelAttributes } from "../model/stock.model";
import MapperInterface from "./mapper.interface";

export default class StockMapper implements MapperInterface<Stock, StockModel> {
  static Mapper(): StockMapper {
    return new StockMapper();
  }

  collectionToEntities(stocks: StockModel[]): Stock[] {
    return [];
  }

  toEntity(stock: StockModel): Stock {
    return new Stock(
      {
        price: stock.closePrice,
        sector: stock.sector,
        exchange: stock.exchange,
        riskLevel: stock.riskLevel,
        revenue: stock.revenue,
        vector: stock.vector,
      },
      new UniqueEntityId(stock.id),
    );
  }

  toModelAttributes(stock: Stock): StockModelAttributes {
    return {
      id: stock.id,
      closePrice: stock.price,
      sector: stock.sector,
      exchange: stock.exchange,
      riskLevel: stock.riskLevel,
      revenue: stock.revenue,
      vector: stock.vector,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
