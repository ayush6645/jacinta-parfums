export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Oud' | 'Floral' | 'Woody' | 'Fresh' | 'Spicy';
  description: string;
  image: string;
  images?: string;
  notes: {

    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 'noir-libre',
    name: 'Noir Libre',
    brand: 'JΛCINTΛ',
    price: 4499,
    category: 'Woody',
    description: 'An elegant expression of freedom. A sophisticated blend that balances dark intensity with refined grace.',
    image: '/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg',
    images: '/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg, /Images/WhatsApp Image 2026-04-22 at 10.18.57 AM.jpeg, /Images/WhatsApp Image 2026-04-22 at 10.19.07 AM.jpeg',

    notes: {
      top: ['Bergamot', 'Lavender'],
      heart: ['Vetiver', 'Patchouli'],
      base: ['Leather', 'Oakmoss']
    },
    sizes: ['30ml', '50ml']
  },
  {
    id: 'red-desire',
    name: 'Red Desire',
    brand: 'JΛCINTΛ',
    price: 4499,
    category: 'Spicy',
    description: 'Confidence. Power. Attraction. A bold fragrance crafted for deep impressions and long-lasting allure.',
    image: '/Images/WhatsApp Image 2026-04-22 at 10.18.12 AM.jpeg',
    images: '/Images/WhatsApp Image 2026-04-22 at 10.18.12 AM.jpeg, /Images/WhatsApp Image 2026-04-22 at 10.20.18 AM.jpeg, /Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg',

    notes: {
      top: ['Pink Pepper', 'Cinnamon'],
      heart: ['Damask Rose', 'Saffron'],
      base: ['Amber', 'Vanilla Bean']
    },
    sizes: ['30ml', '50ml']
  },
  {
    id: 'summer-ice',
    name: 'Summer Ice',
    brand: 'JΛCINTΛ',
    price: 4499,
    category: 'Fresh',
    description: 'A crisp, cooling sanctuary. Blending aquatic notes with a sharp frozen citrus edge for ultimate freshness.',
    image: '/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg',
    images: '/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg, /Images/WhatsApp Image 2026-04-22 at 10.19.07 AM.jpeg, /Images/WhatsApp Image 2026-04-22 at 10.18.12 AM.jpeg',

    notes: {
      top: ['Frozen Lemon', 'Mint'],
      heart: ['Sea Salt', 'Juniper'],
      base: ['White Musk', 'Cedar']
    },
    sizes: ['30ml', '50ml']
  },
  {
    id: 'purple-oud',
    name: 'Purple Oud',
    brand: 'JΛCINTΛ',
    price: 4499,
    category: 'Oud',
    description: 'Rich, Mysterious, Addictive. A unisex masterpiece that explores the dark depths of rare agarwood.',
    image: 'input_file_5.png',
    notes: {
      top: ['Oud Silk', 'Plum'],
      heart: ['Agarwood', 'Violet'],
      base: ['Sandalwood', 'Incense']
    },
    sizes: ['50ml']
  },
  {
    id: 'bloom-aura',
    name: 'Bloom Aura',
    brand: 'JΛCINTΛ',
    price: 4499,
    category: 'Floral',
    description: 'Elegant, Radiant, Alluring. A blossoming aura of feminine grace captured in a delicate floral bouquet.',
    image: 'input_file_4.png',
    notes: {
      top: ['Peony', 'Citrus'],
      heart: ['Jasmine', 'Rose'],
      base: ['Sandalwood', 'Patchouli']
    },
    sizes: ['50ml']
  },
  {
    id: 'alpha-men',
    name: 'Alpha Men',
    brand: 'JΛCINTΛ',
    price: 499,
    category: 'Woody',
    description: 'Bold. Confident. Unforgettable. A fragrance crafted for excellence, class, and lasting impressions.',
    image: 'input_file_6.png',
    notes: {
      top: ['Cardamom', 'Lemon'],
      heart: ['Geranium', 'Black Pepper'],
      base: ['Cedarwood', 'Vetiver']
    },
    sizes: ['30ml', '50ml']
  }
];
