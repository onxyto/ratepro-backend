import { ProductDetailsDto } from 'src/products/dtos/product-details.dto';
import { ProductListDto } from 'src/products/dtos/product-list.dto';
import { Product } from 'src/products/entities/product.entities';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { NutritionNatureEnum } from '../enums/nutrition-labels.enum';
import { Nutrition } from 'src/products/entities/nutrition.entities';
import { Ingredient } from 'src/products/entities/ingredient.entities';

export class ProductMapper {
  public static mapToProductDetailsDto(product: Product): ProductDetailsDto {
    let nutritions, ingredients;
    if (product.type === ProductTypeEnum.FOOD) {
      nutritions = product.nutritions.map((nutrition) => ({
        id: nutrition.id,
        name: nutrition.name,
        rating: nutrition.rating,
        quantity: nutrition.quantity,
        symbol: nutrition.symbol,
        rateDescription: nutrition.rating,
      }));
    } else if (product.type === ProductTypeEnum.COSMETIC) {
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

  public static mapToProduct(newProduct: CreateProductDto): Partial<Product> {
    let product: Partial<Product> = {
      ean: newProduct.ean,
      name: newProduct.name,
      title: newProduct.title,
      image_url: newProduct.imageUrl,
      type: newProduct.type,
      description: newProduct.description,
      storage_type: newProduct.storageType,
      rating: newProduct.rating,
      recommended: newProduct.rating < 40 ? false : true,
    };

    if (product.type === ProductTypeEnum.FOOD || product.type === ProductTypeEnum.DRINK) {
      // FOOD || DRINK TYPES
      const nutritions: Partial<Nutrition>[] = newProduct.nutritions.map((n) => ({
        ...n,
        rating: ProductMapper.getRatingDescription(n.name, n.quantity),
      }));
      product = {
        ...product,
        nutritions: [...nutritions] as Nutrition[],
      };
    } else if (product.type === ProductTypeEnum.COSMETIC) {
      // COSMETIC TYPE
      const ingredients: Partial<Ingredient>[] = newProduct.ingredients.map((i) => ({
        risk_rate: i.riskRate,
        health_risk: i.healthRisk,
        scientific_sources: i.scientificResources,
        ...i,
      }));
      product = {
        ...product,
        ingredients: [...ingredients] as Ingredient[],
      };
    }
    return product;
  }

  private static getRatingDescription(name: string, quantity: number): string {
    switch (name) {
      case NutritionNatureEnum.PROTEIN:
        if (quantity < 8) {
          return 'Low amount of protein';
        } else if (quantity < 13) {
          return 'Good amount of protein';
        } else {
          return 'Excellent amount of protein';
        }
      case NutritionNatureEnum.ADDITIVES:
        if (quantity === 0) {
          return 'No hazardous substances';
        } else {
          return 'Contains additives to avoid';
        }
      case NutritionNatureEnum.CALORIES:
        if (quantity >= 280) {
          return 'Too caloric';
        } else if (quantity >= 180) {
          return 'A bit too caloric';
        } else {
          return 'Low impact';
        }
      case NutritionNatureEnum.SALT:
        if (quantity > 1.4) {
          return 'Too much sodium';
        } else if (quantity > 0.9) {
          return 'A bit too much sodium';
        } else {
          return 'Low sodium';
        }
      case NutritionNatureEnum.SATURATED_FAT:
        if (quantity > 6) {
          return 'Too fatty';
        } else if (quantity > 4) {
          return 'A bit too fatty';
        } else {
          return 'Low fat';
        }
      case NutritionNatureEnum.SUGAR:
        if (quantity > 7) {
          return 'Too sweet';
        } else if (quantity > 4) {
          return 'Low impact';
        } else {
          return 'No sugar';
        }
      default:
        return '';
    }
  }
}
