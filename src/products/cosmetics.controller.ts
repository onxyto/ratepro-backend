// import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// import { CosmeticsService } from './cosmetics.service';
// import { CreateCosmeticDto } from './dto/create-cosmetic.dto';
// @controller('cosmetics')
// export class CosmeticsController {
//   constructor(private readonly cosmeticsService: CosmeticsService) {}
//   @Post()
//   create(@Body() createCosmeticDto: CreateCosmeticDto) {
//     return this.cosmeticsService.create(createCosmeticDto);
//   }
//   @Get()
//   findAll() {
//     return this.cosmeticsService.findAll();
//   }
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.cosmeticsService.findOne(+id);
//   }
// }
