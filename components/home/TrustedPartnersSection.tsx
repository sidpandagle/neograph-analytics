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
    <section className="bg-white border-y py-14" style={{ borderColor: '#e3e4e8' }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-10">
        <div className="flex items-center gap-6">
          <div className="h-[1px] flex-1" style={{ background: '#e3e4e8' }} />
          <p
            className="text-[10px] font-semibold uppercase whitespace-nowrap"
            style={{ color: '#7c7f88', letterSpacing: '0.18em' }}
          >
            Our research shapes decisions at
          </p>
          <div className="h-[1px] flex-1" style={{ background: '#e3e4e8' }} />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">

        <div className="flex animate-scroll-horizontal gap-5 w-max">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-[152px] h-[72px] flex items-center justify-center px-5 bg-white rounded-xl grayscale opacity-55 transition-all duration-300 hover:grayscale-0 hover:opacity-100 border"
              style={{ borderColor: '#e3e4e8', boxShadow: 'rgba(17, 26, 74, 0.04) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px 0px' }}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={110}
                height={52}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
