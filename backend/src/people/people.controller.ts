import { Controller, Get } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  // GET /people  - list everyone who can browse
  @Get()
  findAll() {
    return this.peopleService.findAll();
  }
}
