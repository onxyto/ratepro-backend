import { ProductDetailsDto } from 'src/products/dtos/product-details.dto';
import { ProductListDto } from 'src/products/dtos/product-list.dto';
import { Product } from 'src/products/entities/product.entities';
import { ProductType } from '../enums/product-type.enum';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';

export class ProductMapper {
  public static mapToProductDetailsDto(product: Product): ProductDetailsDto {
    let nutritions, ingredients;
    if (product.type === ProductType.FOOD) {
      nutritions = product.nutritions.map((nutrition) => ({
        id: nutrition.id,
        name: nutrition.name,
        rating: nutrition.rating,
        quantity: nutrition.quantity,
        symbol: nutrition.symbol,
        rateDescription: nutrition.rating,
      }));
    } else if (product.type === ProductType.COSMETIC) {
      ingredients = product.ingredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        riskRate: ingredient.risk_rate, // Use the original property name
        healthRisk: ingredient.health_risk,
        description: ingredient.description,
        scientificSources: ingredient.scientific_sources,
        deleted: ingredient.deleted,
        productId: ingredient.product?.id, // Access product ID only if it exists
        createdAt: ingredient.created_at,
        updatedAt: ingredient.updated_at,
      }));
    }

    return { ...product, nutritions, ingredients };
  }

  public static mapToProductListDto(products: Product[]): ProductListDto[] {
    return [...products];
  }

  public static mapToProduct(product: CreateProductDto): Product {
    return {
      ...product,
    } as Product;
  }
}
