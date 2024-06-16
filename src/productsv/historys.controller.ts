import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HistorysService } from './historys.service';
import { CreateHistoryDto } from './dto/create-history.dto';
@Controller('historys')
export class HistorysController {
  constructor(private readonly historysService: HistorysService) {}
  @Post()
  create(@Body() createProductDto: CreateHistoryDto) {
    return this.historysService.create(createProductDto);
  }
  @Get()
  findAll() {
    return this.historysService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historysService.findOne(+id);
  }
  // @Get('search')
  // async search(@Query('title') title: string) {
  //   return this.historysService.searchByName(title);
  // }
}
