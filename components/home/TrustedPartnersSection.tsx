import Image from 'next/image';

interface Partner {
  name: string;
  id: string;
  logo: string;
}

const partners: Partner[] = [
  { id: 'agronne',   name: 'Argonne',                 logo: '/assets/logos/Agronne.png' },
  { id: 'bcg',       name: 'Boston Consulting Group', logo: '/assets/logos/BCG.png' },
  { id: 'cdc',       name: 'CDC',                     logo: '/assets/logos/CDC.png' },
  { id: 'championx', name: 'ChampionX',               logo: '/assets/logos/ChampionX.png' },
  { id: 'kawasaki',  name: 'Kawasaki',                logo: '/assets/logos/Kawasaki.png' },
  { id: 'meta',      name: 'Meta',                    logo: '/assets/logos/Meta.png' },
  { id: 'mitsubishi',name: 'Mitsubishi',              logo: '/assets/logos/Mitsubishi.png' },
  { id: 'nestle',    name: 'Nestlé Professional',     logo: '/assets/logos/Nestle Professional.png' },
  { id: 'pwc',       name: 'PwC',                     logo: '/assets/logos/PWC.png' },
  { id: 'sk',        name: 'SK',                      logo: '/assets/logos/SK.png' },
  { id: 'suzuki',    name: 'Suzuki',                  logo: '/assets/logos/Suzuki.png' },
  { id: 'trivago',   name: 'Trivago',                 logo: '/assets/logos/Trivago.png' },
];

export default function TrustedPartnersSection() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="overflow-hidden rounded-panel bg-white px-0 py-8 md:py-10">
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
        <div className="flex w-max animate-scroll-horizontal gap-3">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex h-[72px] w-[152px] flex-shrink-0 items-center justify-center rounded-tile bg-[var(--cmi-surface)] px-5 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={110}
                height={52}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
