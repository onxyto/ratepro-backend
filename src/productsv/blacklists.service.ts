import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blacklist } from './entities/blacklist.entity';
import { Product } from './entities/product.entity';
import { AddToBlacklistsDto } from './dto/add-blacklist.dto';
// @Injectable()
// export class BlacklistsService {
//   findAll(): Promise<Blacklist[]> {
//     return this.blacklistsRepository.find();
//   }
//   constructor(
//     @InjectRepository(Blacklist)
//     private blacklistsRepository: Repository<Blacklist>,

//     @InjectRepository(Product)
//     private ProductsRepository: Repository<Product>,
//     private entityManager: EntityManager,
//   ) {}
//   async addToBlacklists(addToBlacklistsDto: AddToBlacklistsDto): Promise<Blacklist> {
//     const { productId } = addToBlacklistsDto;
//     return await this.entityManager.transaction(async (transactionalEntityManager) => {
//       const product = await transactionalEntityManager.findOne(Product, {
//         where: { id: productId },
//       });

//       if (!product) {
//         throw new NotFoundException(`Product with ID ${productId} not found`);
//       }

//       await transactionalEntityManager.delete(Blacklist, { product: product });
//       const blacklist = new Blacklist();
//       blacklist.product = product;
//       await transactionalEntityManager.save(Blacklist, blacklist);
//       await transactionalEntityManager.delete(Product, { id: productId });

//       return blacklist;
//     });
//   }
// }

@Injectable()
export class BlacklistsService {
  findAll(): Promise<Blacklist[]> {
    return this.blacklistRepository.find();
  }
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Blacklist)
    private blacklistRepository: Repository<Blacklist>,
  ) {}

  async addToBlacklists(dto: AddToBlacklistsDto): Promise<void> {
    const { id } = dto;
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const blacklist = new Blacklist();

    blacklist.productame = product.productame;

    blacklist.storageType = product.storageType;

    blacklist.isActive = product.isActive;

    blacklist.calories = product.calories;

    blacklist.protein = product.protein;

    blacklist.fat = product.fat;

    blacklist.sodium = product.sodium;

    blacklist.text = product.text;
    await this.blacklistRepository.save(blacklist);

    // Delete the product from the products table
    await this.productRepository.delete(id);
  }
}
