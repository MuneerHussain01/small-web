import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './site.schema';

@Injectable()
export class SitesService {
  constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

  // fetch a single site by its address; throws 404 if nothing is there
  async findByAddress(address: string): Promise<Site> {
    const site = await this.siteModel
      .findOne({ address: address.toLowerCase().trim() })
      .lean();
    if (!site) {
      throw new NotFoundException(`Nothing at ${address}`);
    }
    return site;
  }

  // create a new site; rejects if the address is already taken
  async create(data: {
    address: string;
    title: string;
    html: string;
    author: string;
  }): Promise<Site> {
    const existing = await this.siteModel.findOne({
      address: data.address.toLowerCase().trim(),
    });
    if (existing) {
      throw new ConflictException(`${data.address} is already taken`);
    }
    const site = new this.siteModel(data);
    return site.save();
  }

  // full-text search across title and html of all sites
  async search(query: string): Promise<Site[]> {
    if (!query || query.trim() === '') return [];
    return this.siteModel
      .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .lean();
  }
}
