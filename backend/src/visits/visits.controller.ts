import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { VisitsService } from './visits.service';

class CreateVisitDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsString()
  @IsNotEmpty()
  personName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  // how they got here: 'address-bar' | 'link' | 'history' | 'search'
  @IsString()
  @IsNotEmpty()
  via: string;
}

@Controller()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  // POST /visits  - record a new visit
  @Post('visits')
  @HttpCode(HttpStatus.CREATED)
  record(@Body() body: CreateVisitDto) {
    return this.visitsService.record(body);
  }

  // GET /history/:personId  - get all visits for a person
  @Get('history/:personId')
  getHistory(@Param('personId') personId: string) {
    return this.visitsService.getHistory(personId);
  }
}
