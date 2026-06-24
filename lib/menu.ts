import type { Lang } from './translations';
import { IMAGES } from './images';

export type MenuItem = { name: string; desc?: string; price: string };
export type MenuSection = { title: string; img: string; items: MenuItem[] };

export const isVeg = (desc?: string) =>
  !!desc && /wega|wege|vegan|vegetarian|roślin/i.test(desc);

export function getMenuSections(lang: Lang): MenuSection[] {
  const pl = lang === 'pl';
  return [
    {
      title: pl ? 'Kebaby' : 'Kebabs',
      img: IMAGES.categories.kebabs,
      items: [
        { name: 'Kebab w picie', price: '22 zł' },
        { name: 'Kebab w tortilli (durum)', price: '25 zł' },
        { name: 'Kebab na talerzu', desc: pl ? 'z frytkami i surówką' : 'with fries and salad', price: '30 zł' },
        { name: 'Kebab box', desc: pl ? 'frytki z mięsem i sosem' : 'fries with meat and sauce', price: '28 zł' },
        { name: 'Kebab XL', price: '30 zł' },
        { name: 'Adana kebab', desc: pl ? 'grillowana mielona jagnięcina' : 'grilled minced lamb', price: '34 zł' },
        { name: 'Shawarma z kurczaka', price: '25 zł' },
        { name: 'Falafel wrap', desc: pl ? 'wegański' : 'vegan', price: '22 zł' },
        { name: 'Półmisek mix grill', price: '55 zł' },
      ],
    },
    {
      title: pl ? 'Dania Indyjskie' : 'Indian Dishes',
      img: IMAGES.categories.indian,
      items: [
        { name: 'Kurczak Tikka Masala', price: '42 zł' },
        { name: 'Butter Chicken', price: '44 zł' },
        { name: 'Jagnięcina Rogan Josh', price: '48 zł' },
        { name: 'Kacchi Biryani', desc: pl ? 'bangladeska biryani z jagnięciną' : 'Bangladeshi lamb biryani', price: '46 zł' },
        { name: 'Biryani z kurczakiem', price: '40 zł' },
        { name: 'Kurczak Tandoori (pół)', price: '39 zł' },
        { name: 'Paneer Tikka Masala', desc: pl ? 'wegetariańskie' : 'vegetarian', price: '38 zł' },
        { name: 'Curry warzywne', desc: pl ? 'wegańskie' : 'vegan', price: '34 zł' },
        { name: 'Dal Tadka', desc: pl ? 'soczewica, wegańskie' : 'lentils, vegan', price: '32 zł' },
      ],
    },
    {
      title: pl ? 'Przystawki' : 'Starters',
      img: IMAGES.categories.starters,
      items: [
        { name: 'Samosa warzywna (2 szt.)', price: '18 zł' },
        { name: 'Onion Bhaji', desc: pl ? 'placki cebulowe' : 'onion fritters', price: '16 zł' },
        { name: 'Pakora z kurczaka', price: '24 zł' },
        { name: 'Hummus z pitą', price: '19 zł' },
        { name: 'Falafel (5 szt.)', price: '20 zł' },
      ],
    },
    {
      title: pl ? 'Pieczywo i Dodatki' : 'Breads & Sides',
      img: IMAGES.categories.breads,
      items: [
        { name: 'Naan', price: '8 zł' },
        { name: 'Naan czosnkowy', price: '11 zł' },
        { name: 'Roti', price: '7 zł' },
        { name: 'Ryż basmati', price: '10 zł' },
        { name: 'Frytki', price: '10 zł' },
        { name: 'Surówka', price: '12 zł' },
        { name: 'Raita', price: '9 zł' },
      ],
    },
    {
      title: pl ? 'Desery i Napoje' : 'Desserts & Drinks',
      img: IMAGES.categories.desserts,
      items: [
        { name: 'Baklava (2 szt.)', price: '18 zł' },
        { name: 'Gulab Jamun', price: '16 zł' },
        { name: 'Ayran', price: '8 zł' },
        { name: 'Lassi mango', price: '14 zł' },
        { name: 'Masala Chai', price: '10 zł' },
      ],
    },
  ];
}
