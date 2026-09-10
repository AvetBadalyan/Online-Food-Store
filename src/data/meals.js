// Meal images use Cloudinary (Armenian dishes) and Unsplash Source API (others)
// Armenian dishes: authentic images from Wikimedia Commons, hosted on Cloudinary
// Cloudinary format: https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/[name]

export const CATEGORIES = [
	'All',
	'Armenian',
	'Burgers',
	'Pizza',
	'Sushi',
	'Pasta',
	'Salads',
	'Soups',
	'Desserts',
	'Drinks'
]

export const MEALS = [
	// ─── ARMENIAN ──────────────────────────────────────────────────────────────
	// Authentic Armenian food images from Wikimedia Commons, hosted on Cloudinary
	{
		id: 'arm1',
		name: 'Khorovats Platter',
		description:
			'Traditional Armenian BBQ — tender pork and lamb skewers grilled over grapevine embers. Served with grilled tomatoes, peppers, and fresh lavash.',
		price: 18.99,
		category: 'Armenian',
		rating: 4.9,
		numReviews: 287,
		countInStock: 15,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/khorovats',
		tags: ['bestseller']
	},
	{
		id: 'arm2',
		name: 'Tolma (Dolma)',
		description:
			'Grape leaves stuffed with seasoned lamb, beef, rice, and fresh herbs. Served with creamy matzoon (Armenian yogurt) sauce.',
		price: 14.99,
		category: 'Armenian',
		rating: 4.8,
		numReviews: 198,
		countInStock: 20,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/dolma',
		tags: ['bestseller']
	},
	{
		id: 'arm3',
		name: 'Lahmajun',
		description:
			'Armenian thin-crust pizza topped with spiced minced lamb, tomatoes, peppers, and fresh herbs. Rolled with lemon juice and parsley.',
		price: 11.99,
		category: 'Armenian',
		rating: 4.7,
		numReviews: 167,
		countInStock: 25,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/lahmajun',
		tags: ['spicy']
	},
	{
		id: 'arm4',
		name: 'Khash',
		description:
			'Traditional winter delicacy — slow-cooked cow feet in a rich, gelatinous broth. Served with crushed garlic, dried lavash, and pickles.',
		price: 12.99,
		category: 'Armenian',
		rating: 4.6,
		numReviews: 89,
		countInStock: 10,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/khash',
		tags: []
	},
	{
		id: 'arm5',
		name: 'Harissa',
		description:
			'Hearty Armenian porridge made from korkot (hulled wheat) and slow-cooked chicken, simmered for hours until silky smooth. Topped with melted butter.',
		price: 13.99,
		category: 'Armenian',
		rating: 4.8,
		numReviews: 134,
		countInStock: 15,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/harissa',
		tags: []
	},
	{
		id: 'arm6',
		name: 'Ghapama',
		description:
			'Festive stuffed pumpkin filled with honey-glazed rice, dried fruits, nuts, and aromatic spices. A traditional Armenian New Year dish.',
		price: 16.99,
		category: 'Armenian',
		rating: 4.9,
		numReviews: 112,
		countInStock: 8,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/ghapama',
		tags: ['vegetarian', 'bestseller']
	},
	{
		id: 'arm7',
		name: 'Jingalov Hats',
		description:
			'Artsakh flatbread stuffed with a mix of 20+ wild mountain herbs and greens. Crispy on the outside, fragrant and fresh inside.',
		price: 10.99,
		category: 'Armenian',
		rating: 4.6,
		numReviews: 76,
		countInStock: 20,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/jingalov-hats',
		tags: ['vegan', 'vegetarian']
	},
	{
		id: 'arm8',
		name: 'Spas',
		description:
			'Refreshing Armenian yogurt soup with hulled wheat, fresh herbs, and a hint of mint. Served warm in winter or chilled in summer.',
		price: 8.99,
		category: 'Armenian',
		rating: 4.5,
		numReviews: 67,
		countInStock: 25,
		image:
			'https://res.cloudinary.com/dkaknfwcl/image/upload/f_auto,q_auto,w_600/foodstore/armenian/spas',
		tags: ['vegetarian']
	},

	// ─── BURGERS ───────────────────────────────────────────────────────────────
	{
		id: 'm1',
		name: 'Classic Smash Burger',
		description:
			'Two smashed beef patties, American cheese, pickles, onion, and our house sauce on a toasted brioche bun.',
		price: 12.99,
		category: 'Burgers',
		rating: 4.8,
		numReviews: 214,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&fit=crop',
		tags: ['bestseller', 'spicy']
	},
	{
		id: 'm2',
		name: 'BBQ Bacon Burger',
		description:
			'Juicy beef patty topped with crispy bacon, cheddar, smoky BBQ sauce, and caramelised onions.',
		price: 14.99,
		category: 'Burgers',
		rating: 4.7,
		numReviews: 178,
		countInStock: 15,
		image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm3',
		name: 'Crispy Chicken Burger',
		description:
			'Buttermilk-fried chicken thigh, coleslaw, pickled jalapeños, and sriracha mayo on a sesame bun.',
		price: 13.49,
		category: 'Burgers',
		rating: 4.6,
		numReviews: 132,
		countInStock: 18,
		image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80&fit=crop',
		tags: ['spicy']
	},
	{
		id: 'm4',
		name: 'Mushroom Swiss Burger',
		description:
			'Beef patty loaded with sautéed cremini mushrooms, Swiss cheese, garlic aioli, and baby spinach.',
		price: 13.99,
		category: 'Burgers',
		rating: 4.5,
		numReviews: 97,
		countInStock: 12,
		image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80&fit=crop',
		tags: []
	},

	// ─── PIZZA ─────────────────────────────────────────────────────────────────
	{
		id: 'm5',
		name: 'Margherita Pizza',
		description:
			'San Marzano tomato, fresh mozzarella, basil, and a drizzle of extra-virgin olive oil on hand-stretched dough.',
		price: 11.99,
		category: 'Pizza',
		rating: 4.9,
		numReviews: 305,
		countInStock: 25,
		image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop',
		tags: ['vegetarian', 'bestseller']
	},
	{
		id: 'm6',
		name: 'Pepperoni Feast',
		description:
			'Double layer of premium pepperoni, mozzarella, and oregano on a crispy thin base.',
		price: 13.99,
		category: 'Pizza',
		rating: 4.8,
		numReviews: 267,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm7',
		name: 'BBQ Chicken Pizza',
		description: 'Smoky BBQ base, grilled chicken, red onion, mozzarella, and fresh coriander.',
		price: 14.49,
		category: 'Pizza',
		rating: 4.7,
		numReviews: 189,
		countInStock: 18,
		image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&fit=crop',
		tags: []
	},
	{
		id: 'm8',
		name: 'Four Cheese Pizza',
		description:
			"Mozzarella, gorgonzola, pecorino, and parmesan on a white cream base. A cheese lover's dream.",
		price: 14.99,
		category: 'Pizza',
		rating: 4.6,
		numReviews: 143,
		countInStock: 15,
		image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},

	// ─── SUSHI ─────────────────────────────────────────────────────────────────
	{
		id: 'm9',
		name: 'Salmon Nigiri (6 pcs)',
		description:
			'Hand-pressed sushi rice topped with fresh Atlantic salmon. Served with pickled ginger and wasabi.',
		price: 13.99,
		category: 'Sushi',
		rating: 4.9,
		numReviews: 221,
		countInStock: 30,
		image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm10',
		name: 'Spicy Tuna Roll (8 pcs)',
		description: 'Tuna, cucumber, and avocado inside, topped with spicy mayo and togarashi.',
		price: 14.99,
		category: 'Sushi',
		rating: 4.8,
		numReviews: 198,
		countInStock: 25,
		image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&q=80&fit=crop',
		tags: ['spicy']
	},
	{
		id: 'm11',
		name: 'Dragon Roll (8 pcs)',
		description: 'Prawn tempura inside, topped with avocado, tobiko, and eel sauce.',
		price: 16.99,
		category: 'Sushi',
		rating: 4.9,
		numReviews: 176,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm12',
		name: 'Rainbow Roll (8 pcs)',
		description:
			'California roll base topped with alternating slices of tuna, salmon, shrimp, and avocado.',
		price: 17.99,
		category: 'Sushi',
		rating: 4.8,
		numReviews: 154,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80&fit=crop',
		tags: []
	},

	// ─── PASTA ─────────────────────────────────────────────────────────────────
	{
		id: 'm13',
		name: 'Spaghetti Carbonara',
		description:
			'Al dente spaghetti, guanciale, egg yolk, Pecorino Romano, and black pepper. Classic Roman.',
		price: 12.99,
		category: 'Pasta',
		rating: 4.8,
		numReviews: 189,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm14',
		name: 'Penne Arrabbiata',
		description:
			'Penne in a fiery tomato sauce with garlic, chilli flakes, and fresh basil. Simple and bold.',
		price: 10.99,
		category: 'Pasta',
		rating: 4.6,
		numReviews: 134,
		countInStock: 18,
		image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80&fit=crop',
		tags: ['vegan', 'spicy']
	},
	{
		id: 'm15',
		name: 'Truffle Mushroom Tagliatelle',
		description: 'Egg tagliatelle, wild mushrooms, black truffle oil, parmesan, and thyme.',
		price: 16.99,
		category: 'Pasta',
		rating: 4.9,
		numReviews: 112,
		countInStock: 15,
		image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},

	// ─── SALADS ────────────────────────────────────────────────────────────────
	{
		id: 'm16',
		name: 'Caesar Salad',
		description:
			'Crisp romaine, shaved parmesan, house-made Caesar dressing, and sourdough croutons.',
		price: 9.99,
		category: 'Salads',
		rating: 4.7,
		numReviews: 167,
		countInStock: 25,
		image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},
	{
		id: 'm17',
		name: 'Greek Salad',
		description:
			'Tomato, cucumber, Kalamata olives, red onion, and creamy feta with oregano-lemon dressing.',
		price: 9.49,
		category: 'Salads',
		rating: 4.6,
		numReviews: 143,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80&fit=crop',
		tags: ['vegetarian', 'vegan']
	},
	{
		id: 'm18',
		name: 'Grilled Chicken Salad',
		description:
			'Mixed greens, grilled chicken breast, cherry tomatoes, avocado, and honey-mustard vinaigrette.',
		price: 12.99,
		category: 'Salads',
		rating: 4.7,
		numReviews: 98,
		countInStock: 18,
		image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&fit=crop',
		tags: []
	},

	// ─── SOUPS ─────────────────────────────────────────────────────────────────
	{
		id: 'm19',
		name: 'French Onion Soup',
		description:
			'Slow-cooked caramelised onions in rich beef broth, topped with a crouton and gratinéed Gruyère.',
		price: 8.99,
		category: 'Soups',
		rating: 4.8,
		numReviews: 124,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},
	{
		id: 'm20',
		name: 'Spicy Thai Pumpkin Soup',
		description: 'Roasted pumpkin blended with coconut milk, lemongrass, galangal, and red chilli.',
		price: 8.49,
		category: 'Soups',
		rating: 4.7,
		numReviews: 89,
		countInStock: 18,
		image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=80&fit=crop',
		tags: ['vegan', 'spicy']
	},
	{
		id: 'm21',
		name: 'Lobster Bisque',
		description:
			'Velvety bisque made from whole lobster, sherry, cream, and fresh tarragon. A luxury starter.',
		price: 12.99,
		category: 'Soups',
		rating: 4.9,
		numReviews: 76,
		countInStock: 10,
		image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=600&q=80&fit=crop',
		tags: []
	},

	// ─── DESSERTS ──────────────────────────────────────────────────────────────
	{
		id: 'm22',
		name: 'Chocolate Lava Cake',
		description:
			'Warm dark chocolate fondant with a molten centre, served with vanilla bean ice cream.',
		price: 7.99,
		category: 'Desserts',
		rating: 4.9,
		numReviews: 287,
		countInStock: 30,
		image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80&fit=crop',
		tags: ['bestseller', 'vegetarian']
	},
	{
		id: 'm23',
		name: 'New York Cheesecake',
		description:
			'Dense, creamy cheesecake on a graham cracker crust, served with fresh berry compote.',
		price: 6.99,
		category: 'Desserts',
		rating: 4.8,
		numReviews: 211,
		countInStock: 25,
		image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&q=80&fit=crop',
		tags: ['vegetarian', 'bestseller']
	},
	{
		id: 'm24',
		name: 'Tiramisu',
		description:
			'Classic Italian dessert of espresso-soaked ladyfingers and mascarpone cream dusted with cocoa.',
		price: 6.49,
		category: 'Desserts',
		rating: 4.8,
		numReviews: 178,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},
	{
		id: 'm25',
		name: 'Crème Brûlée',
		description:
			'Silky vanilla custard beneath a perfectly caramelised sugar crust. A timeless French classic.',
		price: 7.49,
		category: 'Desserts',
		rating: 4.7,
		numReviews: 134,
		countInStock: 15,
		image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},
	{
		id: 'm26',
		name: 'Baklava (3 pcs)',
		description:
			'Layers of crispy filo pastry, chopped walnuts and pistachios, soaked in rose-water honey syrup.',
		price: 5.99,
		category: 'Desserts',
		rating: 4.8,
		numReviews: 102,
		countInStock: 20,
		image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},

	// ─── DRINKS ────────────────────────────────────────────────────────────────
	{
		id: 'm27',
		name: 'Fresh Lemonade',
		description:
			'Hand-squeezed lemon juice, cane sugar, sparkling water, and fresh mint. Refreshingly simple.',
		price: 3.99,
		category: 'Drinks',
		rating: 4.7,
		numReviews: 198,
		countInStock: 50,
		image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80&fit=crop',
		tags: ['vegan', 'vegetarian']
	},
	{
		id: 'm28',
		name: 'Mango Lassi',
		description:
			'Alphonso mango, full-fat yoghurt, cardamom, and a pinch of saffron. Chilled and creamy.',
		price: 4.49,
		category: 'Drinks',
		rating: 4.8,
		numReviews: 156,
		countInStock: 40,
		image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80&fit=crop',
		tags: ['vegetarian']
	},
	{
		id: 'm29',
		name: 'Iced Matcha Latte',
		description:
			'Ceremonial grade matcha whisked with oat milk and poured over ice. Earthy, smooth, and energising.',
		price: 4.99,
		category: 'Drinks',
		rating: 4.6,
		numReviews: 134,
		countInStock: 40,
		image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&fit=crop',
		tags: ['vegan', 'vegetarian']
	},
	{
		id: 'm30',
		name: 'Classic Mojito',
		description:
			'White rum, fresh lime juice, sugar syrup, muddled mint, and soda water over crushed ice.',
		price: 7.99,
		category: 'Drinks',
		rating: 4.7,
		numReviews: 189,
		countInStock: 35,
		image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm31',
		name: 'Espresso Martini',
		description:
			'Vodka, Kahlúa, and a double shot of freshly pulled espresso. Shaken hard, served cold.',
		price: 8.99,
		category: 'Drinks',
		rating: 4.8,
		numReviews: 167,
		countInStock: 30,
		image: 'https://images.unsplash.com/photo-1607446045875-a54df24d5a63?w=600&q=80&fit=crop',
		tags: ['bestseller']
	},
	{
		id: 'm32',
		name: 'Watermelon Cooler',
		description:
			'Blended fresh watermelon, lime, basil, and coconut water. Light, hydrating, and delicious.',
		price: 4.49,
		category: 'Drinks',
		rating: 4.6,
		numReviews: 98,
		countInStock: 40,
		image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=80&fit=crop',
		tags: ['vegan', 'vegetarian']
	}
]

// Pre-built lookup map for O(1) access by id
export const MEALS_MAP = Object.fromEntries(MEALS.map(m => [m.id, m]))
