import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from './person.schema';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  // return all people - used by the frontend to populate the person-picker
  async findAll(): Promise<Person[]> {
    return this.personModel.find().sort({ name: 1 }).lean();
  }
}
