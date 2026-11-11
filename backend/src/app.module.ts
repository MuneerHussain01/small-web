import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SitesModule } from './sites/sites.module';
import { VisitsModule } from './visits/visits.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/smallweb',
    ),
    SitesModule,
    VisitsModule,
    PeopleModule,
  ],
})
export class AppModule {}
