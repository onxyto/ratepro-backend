// import { CreateCosmeticDto } from './dto/create-cosmetic.dto';

// import { Injectable } from '@nestjs/common';
// import { Cosmetic } from './entities/cosmetic.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CosmeticsService {
//   constructor(
//     @InjectRepository(Cosmetic)
//     private CosmeticsRepository: Repository<Cosmetic>,
//   ) {}
//   async create(createCosmeticDto: CreateCosmeticDto) {
//     const cosmetic = this.CosmeticsRepository.create(CreateCosmeticDto);
//     return await this.CosmeticsRepository.save(cosmetic);
//   }
//   findAll(): Promise<Cosmetic[]> {
//     return this.CosmeticsRepository.find();
//   }
//   findOne(id: number): Promise<Cosmetic | null> {
//     return this.CosmeticsRepository.findOneBy({ id });
//   }
// }
