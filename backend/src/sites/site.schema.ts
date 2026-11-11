import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SiteDocument = Site & Document;

@Schema({ timestamps: true })
export class Site {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  address: string;

  @Prop({ required: true })
  title: string;

  // the raw HTML the author submitted
  @Prop({ required: true })
  html: string;

  @Prop({ required: true })
  author: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);

// text index on title + html so search works across full page content
SiteSchema.index({ title: 'text', html: 'text' }, { weights: { title: 3, html: 1 } });
