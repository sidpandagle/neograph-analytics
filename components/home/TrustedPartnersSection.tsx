import Image from 'next/image';

interface Partner {
  name: string;
  id: string;
  logo: string;
  /* Natural size of the trimmed file, so next/image reserves the right box. */
  width: number;
  height: number;
}

/* The source files in /assets/logos are all 150x120 with the logo floating in
   a baked-in white margin that differs per brand. On a 152px tile that left a
   white rectangle of one size and a dark gutter of another beside every logo,
   and no two tiles matched. /assets/logos/trimmed holds the same artwork
   cropped to its ink, so the only padding on screen is the tile's own. */
const partners: Partner[] = [
  { id: 'agronne',    name: 'Argonne',                 logo: '/assets/logos/trimmed/Agronne.png',             width: 141, height: 42 },
  { id: 'bcg',        name: 'Boston Consulting Group', logo: '/assets/logos/trimmed/BCG.png',                 width: 146, height: 34 },
  { id: 'cdc',        name: 'CDC',                     logo: '/assets/logos/trimmed/CDC.png',                 width: 148, height: 42 },
  { id: 'championx',  name: 'ChampionX',               logo: '/assets/logos/trimmed/ChampionX.png',           width: 146, height: 24 },
  { id: 'kawasaki',   name: 'Kawasaki',                logo: '/assets/logos/trimmed/Kawasaki.png',            width: 146, height: 43 },
  { id: 'meta',       name: 'Meta',                    logo: '/assets/logos/trimmed/Meta.png',                width: 132, height: 30 },
  { id: 'mitsubishi', name: 'Mitsubishi',              logo: '/assets/logos/trimmed/Mitsubishi.png',          width: 79,  height: 84 },
  { id: 'nestle',     name: 'Nestlé Professional',     logo: '/assets/logos/trimmed/Nestle Professional.png', width: 149, height: 68 },
  { id: 'pwc',        name: 'PwC',                     logo: '/assets/logos/trimmed/PWC.png',                 width: 140, height: 70 },
  { id: 'sk',         name: 'SK',                      logo: '/assets/logos/trimmed/SK.png',                  width: 110, height: 88 },
  { id: 'suzuki',     name: 'Suzuki',                  logo: '/assets/logos/trimmed/Suzuki.png',              width: 146, height: 31 },
  { id: 'trivago',    name: 'Trivago',                 logo: '/assets/logos/trimmed/Trivago.png',             width: 144, height: 44 },
];

export default function TrustedPartnersSection() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="overflow-hidden rounded-panel bg-[var(--card)] px-0 py-8 md:py-10">
      <p className="mb-6 px-7 text-center text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--cmi-meta)] md:px-11">
        Our research shapes decisions at
      </p>

      {/* Marquee, faded into the panel edges so it reads as continuous. */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        {/* pr-4 pays for the gap that falls between the two copies: without
            it the -50% keyframe lands half a gap short and the loop visibly
            jumps each cycle. */}
        <div className="flex w-max animate-scroll-horizontal gap-4 pr-4">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              /* The artwork's own background is white, so the tile is white
                 too: the two meet with no seam and the gutter either side of
                 every logo is exactly the tile's padding. */
              className="flex h-[76px] w-[164px] flex-shrink-0 items-center justify-center rounded-tile border border-[var(--cmi-line)] bg-white px-6 py-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                /* Capped on both axes, so a wide wordmark and a tall roundel
                   end up at the same optical weight. */
                className="h-auto w-auto max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
