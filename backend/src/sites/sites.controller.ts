import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { SitesService } from './sites.service';

class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}

@Controller()
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  // GET /sites/:address  - load a site by its address
  @Get('sites/:address')
  findOne(@Param('address') address: string) {
    return this.sitesService.findByAddress(address);
  }

  // POST /sites  - publish a new site
  @Post('sites')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateSiteDto) {
    return this.sitesService.create(body);
  }

  // GET /search?q=keyword  - full-text search across all sites
  @Get('search')
  search(@Query('q') q: string) {
    return this.sitesService.search(q);
  }
}
