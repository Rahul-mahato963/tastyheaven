export type MenuItem = {
  id: number | string
  name: string
  description?: string | null
  price: number
  image?: { url?: string | null; alt?: string | null } | number | null
  category?: { name?: string } | number | null
}

const photos = {
  tea: 'photo-1571934811356-5cc061b6821f',
  coffee: 'photo-1509042239860-f550ce710b93',
  dumplings: 'photo-1601050690597-df0568f70950',
  noodles: 'photo-1585032226651-759b368d7246',
  rice: 'photo-1512058564366-18510be2db19',
  burger: 'photo-1568901346375-23c9450c58cd',
  sandwich: 'photo-1528735602780-2552fd46c7af',
  fries: 'photo-1573080496219-bb080dd4f877',
  egg: 'photo-1525351484163-7529414344d8',
  flatbread: 'photo-1565557623262-b51c2513a641',
  curry: 'photo-1547592180-85f173990554',
  lassi: 'photo-1553530666-ba11a7da3888',
  thakali: 'https://nepaltraveller.com/images/main/1606479273.sidetrackimagethakali-khana.jpg',
  thukpa: 'https://media.mountainrocktreks.com/uploads/media/blog/local-foods-and-resturants-nepal/thukpa.jpg',
  chickenSadheko: 'https://premsekuwa.com/storage/app/public/admin-assets/images/item/item-695290de8451f.JPG',
  chickenChilli: 'https://kathmandukitchenandbar.com/uploads/products/45cb1cc313cd31b3c9284a4540ba7e6e.png',
}

export function menuImage(dish: MenuItem) {
  if (dish.image && typeof dish.image === 'object' && dish.image.url) return dish.image.url

  const name = dish.name.toLowerCase()
  const image = /tea/.test(name) ? photos.tea
    : /coffee/.test(name) ? photos.coffee
      : /momo|samosa/.test(name) ? photos.dumplings
        : /chowmein|noodle/.test(name) ? photos.noodles
          : /fried rice|keema/.test(name) ? photos.rice
            : /burger/.test(name) ? photos.burger
              : /sandwich/.test(name) ? photos.sandwich
                : /fries|potato/.test(name) ? photos.fries
                  : /egg/.test(name) ? photos.egg
                    : /paratha|roti|puri/.test(name) ? photos.flatbread
                        : /lassi/.test(name) ? photos.lassi
                          : /thakali|khana set/.test(name) ? photos.thakali
                            : /thukpa/.test(name) ? photos.thukpa
                              : /chicken sadheko|chicken sandheko/.test(name) ? photos.chickenSadheko
                                : /chicken chilli|chilli chicken/.test(name) ? photos.chickenChilli
                                  : photos.curry

  return image.startsWith('http') ? image : `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=82`
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
