import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './visit.schema';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
  ) {}

  // record that someone arrived at an address
  async record(data: {
    personId: string;
    personName: string;
    address: string;
    via: string;
  }): Promise<Visit> {
    const visit = new this.visitModel({ ...data, timestamp: new Date() });
    return visit.save();
  }

  // get the full history for a person, newest first
  async getHistory(personId: string): Promise<Visit[]> {
    return this.visitModel
      .find({ personId })
      .sort({ timestamp: -1 })
      .lean();
  }
}
