/**
 * Seed script - run with: npm run seed
 *
 * Connects directly to MongoDB (no NestJS context needed).
 * Running it twice gives the same result - sites and people are upserted
 * by their natural key, and visits are wiped and re-inserted each time
 * because they have fixed timestamps.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import mongoose, { Schema, model } from 'mongoose';
import { people, sites, visitPlans } from './seed-data';

// load .env from the backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/smallweb';

// --- minimal schemas just for seeding ---

const PersonSchema = new Schema({ name: { type: String, unique: true } });
const SiteSchema = new Schema({
  address: { type: String, unique: true },
  title: String,
  html: String,
  author: String,
});
SiteSchema.index({ title: 'text', html: 'text' });

const VisitSchema = new Schema({
  personId: String,
  personName: String,
  address: String,
  timestamp: Date,
  via: String,
});

const PersonModel = model('Person', PersonSchema);
const SiteModel = model('Site', SiteSchema);
const VisitModel = model('Visit', VisitSchema);

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // --- people ---
  for (const p of people) {
    await PersonModel.updateOne({ name: p.name }, { $set: p }, { upsert: true });
  }
  console.log(`Seeded ${people.length} people`);

  // --- sites ---
  for (const s of sites) {
    await SiteModel.updateOne(
      { address: s.address },
      { $set: s },
      { upsert: true },
    );
  }
  console.log(`Seeded ${sites.length} sites`);

  // --- visits ---
  // delete existing seeded visits and re-insert so they stay deterministic
  await VisitModel.deleteMany({});

  // build a name->id map so visits reference real person documents
  const personDocs = await PersonModel.find({});
  const personByName: Record<string, string> = {};
  for (const doc of personDocs) {
    personByName[doc.name] = String(doc._id);
  }

  const BASE = new Date('2026-11-11T08:00:00Z');

  const visitDocs = visitPlans.map((v) => ({
    personId: personByName[v.personName],
    personName: v.personName,
    address: v.address,
    via: v.via,
    timestamp: new Date(BASE.getTime() + v.minutes * 60 * 1000),
  }));

  await VisitModel.insertMany(visitDocs);
  console.log(`Seeded ${visitDocs.length} visits`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
