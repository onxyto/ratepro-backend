import { BlacklistsService } from './blacklists.service';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { AddToBlacklistsDto } from './dto/add-blacklist.dto';

@Controller('Blacklists')
export class BlacklistsController {
  constructor(private readonly blacklistsService: BlacklistsService) {}

  @Post()
  addToBlacklists(@Body() dto: AddToBlacklistsDto): Promise<void> {
    return this.blacklistsService.addToBlacklists(dto);
  }

  @Get()
  findAll() {
    return this.blacklistsService.findAll();
  }
}
