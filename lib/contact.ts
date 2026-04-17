export interface Office {
  name: string;
  company: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneFormatted: string;
  availability: string;
  region: 'Americas' | 'APAC';
}

export interface ContactInfo {
  email: string;
  whatsapp: {
    number: string;
    formatted: string;
    link: string;
  };
  offices: {
    usa: Office;
    india: Office;
  };
}

export const CONTACT_INFO: ContactInfo = {
  email: 'support@healthcareforesights.com',
  whatsapp: {
    number: '+18016399061',
    formatted: '+1 801-639-9061',
    link: 'https://wa.me/18016399061',
  },
  offices: {
    usa: {
      name: 'USA Corporate Office',
      company: 'CMI Consulting LLC',
      addressLine1: '1333, 701 Tillery Street Unit 12',
      addressLine2: '',
      city: 'Austin',
      state: 'TX',
      postalCode: '78702',
      country: 'United States',
      phone: '+17377342707',
      phoneFormatted: '+1 737-734-2707',
      availability: '24×7 Sales & Support',
      region: 'Americas',
    },
    india: {
      name: 'Asia-Pacific Centre',
      company: 'CMI Market Research Pvt. Ltd.',
      addressLine1: 'B-701, Basileo, MS Kate Chowk',
      addressLine2: 'Pimple Gurav',
      city: 'Pune',
      state: 'Maharashtra',
      postalCode: '411061',
      country: 'India',
      phone: '+912046022736',
      phoneFormatted: '+91 20-4602-2736',
      availability: '24×7 Support',
      region: 'APAC',
    },
  },
};
