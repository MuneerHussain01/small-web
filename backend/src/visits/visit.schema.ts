import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

// how the user arrived at this address
export type Via = 'address-bar' | 'link' | 'history' | 'search';

@Schema()
export class Visit {
  @Prop({ required: true })
  personId: string;

  @Prop({ required: true })
  personName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  // 'address-bar' | 'link' | 'history' | 'search'
  @Prop({ required: true })
  via: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);

// index for fast history lookups per person, sorted by time
VisitSchema.index({ personId: 1, timestamp: -1 });
