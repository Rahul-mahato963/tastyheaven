export type MenuItem = {
  id: number | string
  name: string
  description?: string | null
  price: number
  image?: {
    url?: string | null
    alt?: string | null
    sizes?: {
      card?: { url?: string | null } | null
      thumbnail?: { url?: string | null } | null
    } | null
  } | number | null
  category?: { name?: string } | number | null
}

export function menuImage(dish: MenuItem): string | null {
  if (!dish.image || typeof dish.image !== 'object') return null

  return dish.image.sizes?.card?.url
    || dish.image.sizes?.thumbnail?.url
    || dish.image.url
    || null
}

export const fallbackDishes: Array<MenuItem & { group: string }> = [
  { id: 'black-tea', name: 'Black tea', price: 25, group: 'Tea & coffee' },
  { id: 'lemon-tea', name: 'Lemon tea', price: 30, group: 'Tea & coffee' },
  { id: 'masala-tea', name: 'Masala tea', price: 30, group: 'Tea & coffee' },
  { id: 'milk-coffee', name: 'Milk coffee', price: 80, group: 'Tea & coffee' },
  { id: 'black-coffee', name: 'Black coffee', price: 70, group: 'Tea & coffee' },
  { id: 'potato', name: 'Potato', price: 80, group: 'Snacks' },
  { id: 'chana', name: 'Chana', price: 80, group: 'Snacks' },
  { id: 'egg', name: 'Egg', price: 25, group: 'Snacks' },
  { id: 'egg-fry', name: 'Fried egg', price: 50, group: 'Snacks' },
  { id: 'roti-tarkari', name: 'Roti tarkari', price: 120, group: 'Snacks' },
  { id: 'jeeri', name: 'Jeeri', price: 35, group: 'Snacks' },
  { id: 'puri-tarkari', name: 'Puri tarkari', price: 120, group: 'Snacks' },
  { id: 'plain-samosa', name: 'Plain samosa', price: 30, group: 'Snacks' },
  { id: 'samosa-tarkari', name: 'Samosa tarkari (2 pcs)', price: 100, group: 'Snacks' },
  { id: 'french-fries', name: 'French fries', price: 120, group: 'Snacks' },
  { id: 'alu-paratha', name: 'Aloo paratha', price: 120, group: 'Paratha & rolls' },
  { id: 'paneer-paratha', name: 'Paneer paratha', price: 180, group: 'Paratha & rolls' },
  { id: 'chicken-paratha', name: 'Chicken paratha', price: 220, group: 'Paratha & rolls' },
  { id: 'kathi-roll', name: 'Chicken kathi roll', price: 250, group: 'Paratha & rolls' },
  { id: 'egg-roll', name: 'Egg roll / double egg roll', price: 120, group: 'Paratha & rolls' },
  { id: 'chicken-roll', name: 'Chicken roll', price: 220, group: 'Paratha & rolls' },
  { id: 'veg-momo', name: 'Vegetable momo', price: 110, group: 'Momo & chowmein' },
  { id: 'buff-momo', name: 'Buff momo', price: 130, group: 'Momo & chowmein' },
  { id: 'chicken-momo', name: 'Chicken momo', price: 150, group: 'Momo & chowmein' },
  { id: 'veg-chowmein', name: 'Vegetable chowmein', price: 120, group: 'Momo & chowmein' },
  { id: 'buff-chowmein', name: 'Buff chowmein', price: 130, group: 'Momo & chowmein' },
  { id: 'chicken-chowmein', name: 'Chicken chowmein', price: 150, group: 'Momo & chowmein' },
  { id: 'veg-fried-rice', name: 'Vegetable fried rice', price: 150, group: 'Rice & noodles' },
  { id: 'buff-fried-rice', name: 'Buff fried rice', price: 170, group: 'Rice & noodles' },
  { id: 'chicken-fried-rice', name: 'Chicken fried rice', price: 200, group: 'Rice & noodles' },
  { id: 'veg-keema', name: 'Vegetable keema', price: 240, group: 'Rice & noodles' },
  { id: 'buff-keema-noodles', name: 'Buff keema noodles', price: 150, group: 'Rice & noodles' },
  { id: 'chicken-keema-noodles', name: 'Chicken keema noodles', price: 180, group: 'Rice & noodles' },
  { id: 'veg-burger', name: 'Vegetable burger', price: 150, group: 'Burgers & sandwiches' },
  { id: 'chicken-burger', name: 'Chicken burger', price: 190, group: 'Burgers & sandwiches' },
  { id: 'mix-burger', name: 'Mixed burger', price: 220, group: 'Burgers & sandwiches' },
  { id: 'veg-sandwich', name: 'Vegetable sandwich', price: 110, group: 'Burgers & sandwiches' },
  { id: 'chicken-sandwich', name: 'Chicken sandwich', price: 150, group: 'Burgers & sandwiches' },
  { id: 'veg-thukpa', name: 'Vegetable thukpa', price: 140, group: 'Thukpa & specials' },
  { id: 'buff-thukpa', name: 'Buff thukpa', price: 150, group: 'Thukpa & specials' },
  { id: 'chicken-thukpa', name: 'Chicken thukpa', price: 170, group: 'Thukpa & specials' },
  { id: 'chicken-sadheko', name: 'Chicken sadheko', price: 250, group: 'Thukpa & specials' },
  { id: 'badam-sadheko', name: 'Peanut sadheko', price: 180, group: 'Thukpa & specials' },
  { id: 'matmas-sadheko', name: 'Soybean sadheko', price: 120, group: 'Thukpa & specials' },
  { id: 'chicken-fry', name: 'Fried chicken', price: 250, group: 'Thukpa & specials' },
  { id: 'chicken-chilli', name: 'Chicken chilli', price: 280, group: 'Thukpa & specials' },
  { id: 'buff-chilli', name: 'Buff chilli', price: 250, group: 'Thukpa & specials' },
  { id: 'chilli-chips', name: 'Chilli chips', price: 160, group: 'Thukpa & specials' },
  { id: 'plain-lassi', name: 'Plain lassi', price: 120, group: 'Drinks' },
  { id: 'banana-lassi', name: 'Banana lassi', price: 150, group: 'Drinks' },
  { id: 'veg-thakali-set', name: 'Vegetable thakali set', price: 230, group: 'Thakali khana sets' },
  { id: 'chicken-thakali-set', name: 'Chicken thakali set', price: 300, group: 'Thakali khana sets' },
  { id: 'buff-thakali-set', name: 'Buff thakali set', price: 280, group: 'Thakali khana sets' },
]
