// All the data that gets loaded when you run the seed command.
// Timestamps are fixed so the seed is deterministic - running it twice gives
// the same result.

export const people = [
  { name: 'Alice' },
  { name: 'Ben' },
  { name: 'Clara' },
  { name: 'David' },
  { name: 'Eve' },
];

export const sites = [
  {
    address: 'tidepool.zz',
    title: 'Tidal Pools',
    author: 'Alice',
    html: `<h1>Tidal Pools</h1>
<p>Twice a day the ocean pulls back, and for a few hours the rocks are yours to walk on. The pools left behind hold a small world. I have been going to the same stretch of coastline for three years now, always at low tide, always with the same notebook.</p>
<p>The anemones are the most honest creatures there. They make no attempt to look like anything other than what they are. When the water is in, they open and feed. When it retreats, they close up and wait. No drama, no urgency. Just the tide and the response to it.</p>
<p>Hermit crabs carry their history with them. Each shell they wear was someone else's first. I watched one spend forty minutes trying on abandoned shells before finding one that fit. It held each one up for a moment, turned it over, then set it down. I did not expect to find patience in a crab.</p>
<p>There is a pool I call the deep one, though it is only knee height at its deepest. It holds a small octopus that I have seen three times. Each time I am not sure if it is the same animal. Each time it changes colour before I have a chance to decide.</p>
<p>For land-based observations near water, I read <a href="fieldnotes.zz">Field Notes</a> regularly. After dark, the same coastline reads completely differently — worth checking <a href="nightsky.zz">Night Sky</a>. I once found a link to <a href="lost.zz">something that is no longer here</a>.</p>`,
  },
  {
    address: 'nightsky.zz',
    title: 'Night Sky',
    author: 'Alice',
    html: `<h1>Night Sky</h1>
<p>I do not own a telescope. I keep meaning to buy one and then I step outside on a clear night with just my eyes and I think, not yet. The sky you can see without help is already more than a person can hold.</p>
<p>Orion is the constellation I return to because it is the one that got me started. I was eleven and camping with relatives in the mountains and someone pointed at three stars in a row and said that was a belt. I did not understand why a person would name three stars after clothing but I understood that the sky had names in it, and that felt important.</p>
<p>Magnitude is a confusing scale because it runs backwards. A star of magnitude 1 is brighter than a star of magnitude 6. This is a relic of Greek astronomy that nobody has bothered to fix. I find it oddly comforting that something so old and so wrong is still the system we use.</p>
<p>Jupiter is the best planet for naked-eye watching. On a clear night you can see it outshine almost everything else. I watched it for three hours last October and it did not move in any way I could detect. That is the thing about planets — their motion is real but requires patience longer than one night to witness.</p>
<p>The <a href="signal.zz">Signal</a> log has interesting notes on radio telescopy and what amateurs can receive. For daytime companion reading, the shore holds its own wonders, as <a href="tidepool.zz">Tidal Pools</a> shows.</p>`,
  },
  {
    address: 'quietroads.zz',
    title: 'Quiet Roads',
    author: 'Ben',
    html: `<h1>Quiet Roads</h1>
<p>The best roads are the ones that go somewhere specific for someone else. The road to a quarry, the road to a reservoir, the road that once went to a mill that is not there anymore. These roads were built for a purpose and that purpose has either been completed or abandoned, so the road remains, purposeless and quiet.</p>
<p>I have a map I bought at a petrol station in 2019 that I mark every time I drive somewhere I did not expect. It is covered in small circles now. I do not write what the place was. The circle is enough to remind me.</p>
<p>There is a kind of driving that is not about destination and not about scenery. It is about the rhythm of a road through a landscape that has nothing to prove. Fields, hedgerows, a junction with a rusted sign, another field. The car doing what cars do. The mind doing what minds do when they are not asked to do anything in particular.</p>
<p>I stopped once at a layby on a stretch of B-road in the middle of a weekday afternoon. There was no reason to stop, so I stopped. Sat for twenty minutes. No cars passed. When I drove on, the road felt more mine than it had before.</p>
<p>For still landscapes from a different angle, <a href="saltflats.zz">Salt Flats</a> covers ground I have not been to but want to go. And <a href="overgrown.zz">Overgrown</a> finds the same kind of purposeful purposelessness in cities instead of roads.</p>`,
  },
  {
    address: 'saltflats.zz',
    title: 'Salt Flats',
    author: 'Ben',
    html: `<h1>Salt Flats</h1>
<p>The first thing that is wrong about salt flats is the name. They are not flat. They are almost flat, which is a different thing. Almost flat means you can see a slight curve in the horizon, and that slight curve is the actual curvature of the earth. It is the only place I have seen that.</p>
<p>The ground makes a sound when you walk on it. A dry crunch, like walking on very thin ice. Underneath the crust the salt is wet and grey. You learn to test before you step, not because you will fall through — you will not — but because the crust holds differently depending on how wet it is below, and if it gives too much you are ankle-deep in grey mud and an hour's walk from the car.</p>
<p>Colour at noon is impossible to look at directly. The white reflects everything the sun sends down and sends it straight back. I wear two pairs of sunglasses, which is not something I do anywhere else. Photographs at noon look overexposed even when they are correct.</p>
<p>The good hours are early morning and late afternoon. In early morning the flats hold a thin film of water left from the night, and that water holds a reflection of the sky so perfect that you can walk on the sky without looking like you are doing anything unusual.</p>
<p><a href="quietroads.zz">Quiet Roads</a> is how I got here, in the sense that I drove roads I had not driven before and they led me to this. The same empty-but-not-empty feeling that I find in both places, different surface.</p>`,
  },
  {
    address: 'brewlog.zz',
    title: 'Brew Log',
    author: 'Clara',
    html: `<h1>Brew Log</h1>
<p>I have been keeping notes on what I brew since 2021. Not recipes exactly, more like records. The water temperature, the grind, the time, the result. The result is always subjective but I try to be specific about it. "Tastes like a morning in winter" is not useful. "Slight bitterness at the back of the throat, more body than expected, needs thirty seconds less brew time" is useful.</p>
<p>The variable that took me longest to understand was water temperature. I was treating it as a single number, like a switch you either get right or wrong. It is not. Different temperatures extract different things from the same grounds. Lower temperatures pull out the acids, which read as brightness. Higher temperatures pull out the compounds that read as bitterness. Most good cups live in a narrow window between them, but that window is not the same for every coffee.</p>
<p>I bought a kettle with a temperature control in January and it changed how I make tea more than coffee. Tea is more sensitive. Black tea at eighty-five degrees is a different drink than black tea at ninety-five. Green tea at seventy is a different category from green tea at eighty. I keep a small laminated card next to the kettle with temperatures for each type.</p>
<p>There is an older form of this same attention — the kind of notes someone takes when they are learning something by hand over a long time. I found a version of it in <a href="inkwell.zz">Inkwell</a>. And <a href="fieldnotes.zz">Field Notes</a> takes the same approach to the natural world.</p>`,
  },
  {
    address: 'inkwell.zz',
    title: 'Inkwell',
    author: 'Clara',
    html: `<h1>Inkwell</h1>
<p>Writing badly on purpose is harder than it sounds. When you try to write badly, you usually end up writing carefully, which is the opposite of bad. The only way to write badly is to write without thinking, and that is exactly what most writing advice is trying to stop you from doing.</p>
<p>I keep two notebooks. One is for thinking, one is for keeping. The thinking notebook is cheap and ugly and I write in it fast with whatever pen is closest. The keeping notebook is nicer and I write in it slowly and I cross things out and rewrite them. The thinking notebook is usually more interesting to read later.</p>
<p>Handwriting changes by time of day, by tiredness, by what you are writing about. I have a handwriting I use for shopping lists and a handwriting I use for letters and they do not look like they come from the same person. I am not sure they do.</p>
<p>Reading something you wrote a long time ago is like getting a letter from someone you used to know well. All the same words, all the same habits of thought, but reassembled by someone who was not quite you yet. I find this more interesting than finding old photographs.</p>
<p>For more methodical record-keeping of a different kind, <a href="brewlog.zz">Brew Log</a> is worth reading. The same care applied to a different domain. And <a href="clockwork.zz">Clockwork</a> does something similar with mechanical things.</p>`,
  },
  {
    address: 'fieldnotes.zz',
    title: 'Field Notes',
    author: 'David',
    html: `<h1>Field Notes</h1>
<p>Identifying plants correctly takes longer than most guides suggest. The guides make it look like a matter of matching features: leaf shape, stem colour, number of petals. In practice, the same plant varies enough between specimens that the features you are matching against are averages, and the plant you are looking at is a specific individual with its own variations. You are always doing probability, not identification.</p>
<p>I have been walking the same stretch of towpath for four years. The first year I photographed everything and tried to identify it at home. The second year I started learning to identify in the field, which is slower but results in actually knowing what I am looking at. The third year I stopped photographing and started drawing instead. This year I draw less and look more.</p>
<p>Bramble is the plant I know best, which is an odd thing to specialize in because bramble is everywhere and most people treat it as background. It has eight hundred described species in Britain alone, and botanists argue about where one species ends and another begins. It is the kind of problem that suits a person who does not need to be finished.</p>
<p>The plants that grow in disturbed ground — railway embankments, demolished buildings, roadsides — are worth more attention than they usually get. They are the first things back after something has gone. What comes back, and in what order, tells you something about what the ground remembers.</p>
<p><a href="tidepool.zz">Tidal Pools</a> takes the same observational approach to intertidal zones. And <a href="overgrown.zz">Overgrown</a> specifically covers the disturbed-ground plants I find most interesting — urban rewilding by neglect.</p>`,
  },
  {
    address: 'overgrown.zz',
    title: 'Overgrown',
    author: 'David',
    html: `<h1>Overgrown</h1>
<p>Cities do not stay still when you stop looking at them. Leave a plot of land alone for a year and something will come back. Five years and it will be unrecognizable. Twenty years and you have a small wood. The city is always in the process of returning to something, and the question is only how fast you let it go.</p>
<p>I walk into buildings when I should not. I know this. I am careful and I am quiet and I try not to leave things different from how I found them. The ones that interest me most are not the obviously dramatic ones — the grand hotels, the asylums — but the ordinary ones. A warehouse that cleared out in a weekend in 1987 and nobody has had a reason to clear out since. An office where the calendars still read 2003.</p>
<p>Pigeons have excellent taste in architecture. They move into buildings early, before any other animals, and they know something about structural integrity that I have not learned to read yet. If the pigeons have left a building, I leave it too.</p>
<p>Graffiti in abandoned buildings is usually not about the building. It is about the fact of a surface with nobody to object to it. The best graffiti I have found in these places is never on the most obvious walls. It is on a wall at the back of a room, facing the wrong way, like it was made for the building and not for anyone who came after.</p>
<p><a href="fieldnotes.zz">Field Notes</a> covers the plants that are doing the actual reclaiming. <a href="quietroads.zz">Quiet Roads</a> finds the same abandoned-purpose quality in roads. I tried to find <a href="darkroom.zz">the darkroom site</a> that someone linked me to but it does not seem to exist anymore.</p>`,
  },
  {
    address: 'clockwork.zz',
    title: 'Clockwork',
    author: 'Eve',
    html: `<h1>Clockwork</h1>
<p>The first watch I took apart did not go back together. I want to say that clearly, before anything else, so that if you are thinking about starting this, you know that the first one is a sacrifice. It is cheaper to admit this in advance and buy something old and cheap and not particularly good before you try anything you care about.</p>
<p>A mechanical watch has between one hundred and four hundred components, depending on the complication. The simplest movement you can still buy — a basic time-only hand-wound watch — has around one hundred and thirty parts. Some of those parts are springs with no width you can see, only measure. Some are wheels with teeth you need a loupe to count.</p>
<p>The mainspring is where the energy lives. It is a long, very thin strip of steel coiled inside a barrel, and it stores energy by being wound and releases it slowly through the gear train as it unwinds. A fully wound mainspring in an everyday watch holds roughly forty-eight hours of energy. When you think about how small it is, forty-eight hours is a lot to ask of a strip of steel.</p>
<p>Regulating a watch — adjusting it to run more or less accurately — is done by changing the effective length of the balance spring. This is an adjustment measured in fractions of a millimetre. A good result is plus or minus ten seconds per day. I am not yet at a good result, but I am at a consistent result, which is the step before.</p>
<p><a href="signal.zz">Signal</a> works with a different kind of precision instrument. The note-keeping approach in <a href="inkwell.zz">Inkwell</a> is similar to what I do here — you are always learning from what you wrote last time. I have been meaning to look at <a href="antique.zz">an antique tools site</a> but cannot find it now.</p>`,
  },
  {
    address: 'signal.zz',
    title: 'Signal',
    author: 'Eve',
    html: `<h1>Signal</h1>
<p>Amateur radio is not about communication the way a phone is about communication. A phone connects you to a specific person. A radio connects you to whoever is there, which turns out to be a different category of experience entirely. You do not know who will be there. Sometimes nobody is there and you transmit into silence. That is also something.</p>
<p>I have a license that allows me to transmit on certain frequencies with a maximum power of fifty watts. Fifty watts is not much — roughly half a household light bulb. With a good antenna and the right atmospheric conditions, fifty watts can reach Japan or South America. With a bad antenna and poor conditions, fifty watts will not reach the next town. The antenna is usually the more important variable.</p>
<p>Propagation — the way radio waves travel — depends on the ionosphere, which is a layer of the upper atmosphere that reflects certain frequencies back toward the earth. The ionosphere changes by time of day, by season, by sunspot activity. Amateur radio operators watch solar forecasts like farmers watch weather. A period of high solar activity opens frequencies that are silent in quieter times.</p>
<p>CW — Morse code — is still the mode of choice for long-distance working because a CW signal can be read when a voice signal is completely buried in noise. The human brain is very good at pulling a pattern out of sound, better than almost any algorithm I am aware of. I passed my Morse test at twelve words per minute and I am now comfortable at twenty, which is enough for most contacts.</p>
<p><a href="nightsky.zz">Night Sky</a> overlaps in the sense that both hobbies require you to pay attention to the same sun in different ways. The same precision-mindedness shows up in <a href="clockwork.zz">Clockwork</a> — different tools, same habit of mind.</p>`,
  },
];

// base time for all seed visits - fixed so the seed is deterministic
const BASE = new Date('2026-11-11T08:00:00Z');

// helper: add minutes to the base time
function at(minutesFromBase: number): Date {
  return new Date(BASE.getTime() + minutesFromBase * 60 * 1000);
}

// each visit references a person by name; the seed script resolves that to an _id
export const visitPlans: { personName: string; address: string; via: string; minutes: number }[] = [
  // Alice - starts at tidepool, follows links, builds a long trail
  { personName: 'Alice', address: 'tidepool.zz',   via: 'address-bar', minutes: 0 },
  { personName: 'Alice', address: 'fieldnotes.zz',  via: 'link',        minutes: 3 },
  { personName: 'Alice', address: 'overgrown.zz',   via: 'link',        minutes: 8 },
  { personName: 'Alice', address: 'quietroads.zz',  via: 'link',        minutes: 15 },
  { personName: 'Alice', address: 'tidepool.zz',    via: 'history',     minutes: 22 },
  { personName: 'Alice', address: 'nightsky.zz',    via: 'link',        minutes: 25 },
  { personName: 'Alice', address: 'signal.zz',      via: 'link',        minutes: 30 },

  // Ben - road-focused, revisits quietroads
  { personName: 'Ben',   address: 'quietroads.zz',  via: 'address-bar', minutes: 5 },
  { personName: 'Ben',   address: 'saltflats.zz',   via: 'link',        minutes: 10 },
  { personName: 'Ben',   address: 'overgrown.zz',   via: 'link',        minutes: 17 },
  { personName: 'Ben',   address: 'quietroads.zz',  via: 'history',     minutes: 24 },
  { personName: 'Ben',   address: 'tidepool.zz',    via: 'search',      minutes: 35 },

  // Clara - starts with brewing, explores writing and craft
  { personName: 'Clara', address: 'brewlog.zz',     via: 'address-bar', minutes: 2 },
  { personName: 'Clara', address: 'inkwell.zz',     via: 'link',        minutes: 7 },
  { personName: 'Clara', address: 'clockwork.zz',   via: 'link',        minutes: 13 },
  { personName: 'Clara', address: 'fieldnotes.zz',  via: 'link',        minutes: 20 },
  { personName: 'Clara', address: 'brewlog.zz',     via: 'history',     minutes: 28 },
  { personName: 'Clara', address: 'nightsky.zz',    via: 'search',      minutes: 40 },

  // David - has been nearly everywhere
  { personName: 'David', address: 'fieldnotes.zz',  via: 'address-bar', minutes: 1 },
  { personName: 'David', address: 'tidepool.zz',    via: 'link',        minutes: 6 },
  { personName: 'David', address: 'nightsky.zz',    via: 'link',        minutes: 11 },
  { personName: 'David', address: 'signal.zz',      via: 'link',        minutes: 16 },
  { personName: 'David', address: 'clockwork.zz',   via: 'link',        minutes: 21 },
  { personName: 'David', address: 'inkwell.zz',     via: 'link',        minutes: 26 },
  { personName: 'David', address: 'brewlog.zz',     via: 'link',        minutes: 31 },
  { personName: 'David', address: 'overgrown.zz',   via: 'link',        minutes: 36 },
  { personName: 'David', address: 'quietroads.zz',  via: 'link',        minutes: 41 },
  { personName: 'David', address: 'saltflats.zz',   via: 'link',        minutes: 46 },
  { personName: 'David', address: 'fieldnotes.zz',  via: 'history',     minutes: 52 },

  // Eve - precision/craft focus, also explores coast
  { personName: 'Eve',   address: 'clockwork.zz',   via: 'address-bar', minutes: 4 },
  { personName: 'Eve',   address: 'signal.zz',      via: 'link',        minutes: 9 },
  { personName: 'Eve',   address: 'nightsky.zz',    via: 'link',        minutes: 14 },
  { personName: 'Eve',   address: 'tidepool.zz',    via: 'search',      minutes: 19 },
  { personName: 'Eve',   address: 'saltflats.zz',   via: 'search',      minutes: 27 },
  { personName: 'Eve',   address: 'clockwork.zz',   via: 'history',     minutes: 55 },
];
