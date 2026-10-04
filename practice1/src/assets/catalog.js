/**
 * @typedef {Object} Product;
 * @property {number} id;
 * @property {string} name;
 * @property {string} platform;
 * @property {string} type;
 * @property {number} basePrice;
 * @property {'nuevo-precintado' | 'usado-como-nuevo' | 'usado-caja-danada' | 'solo-cartucho'} status;
 * @property {number} stock;
 */

/**
 * @type {Product[]}
 */

export const catalog = [
	{
		id: 0,
		name: 'Hollow Knight',
		platform: 'PC',
		type: 'Metroidvania',
		basePrice: 20,
		status: 'usado-como-nuevo',
		stock: 17,
	},
	{
		id: 1,
		name: 'Pokemon Red',
		platform: 'GAME BOY',
		type: 'RPG',
		basePrice: 150,
		status: 'nuevo-precintado',
		stock: 1,
	},
	{
		id: 2,
		name: 'Celeste',
		platform: 'PC',
		type: 'Platform',
		basePrice: 10,
		status: 'usado-caja-danada',
		stock: 30,
	},
	{
		id: 3,
		name: 'The Binding of Isaac',
		platform: 'PC',
		type: 'Roguelike',
		basePrice: 60,
		status: 'solo-cartucho',
		stock: 7,
	},
	{
		id: 4,
		name: 'Euro Truck Simulator',
		platform: 'PC',
		type: 'Driving',
		basePrice: 20,
		status: 'nuevo-precintado',
		stock: 10,
	},
	{
		id: 5,
		name: 'Detroit Become Human',
		platform: 'PC',
		type: 'Choose',
		basePrice: 40,
		status: 'usado-caja-danada',
		stock: 18,
	},
	{
		id: 6,
		name: 'The Last of Us',
		platform: 'Play Station',
		type: 'Shooter',
		basePrice: 40,
		status: 'usado-como-nuevo',
		stock: 6,
	},
	{
		id: 7,
		name: 'Inazuma Eleven Striker',
		platform: 'Wii',
		type: 'Soccer',
		basePrice: 30,
		status: 'usado-como-nuevo',
		stock: 2,
	},
	{
		id: 8,
		name: 'Pokemon Diamond',
		platform: 'Nintendo DS',
		type: 'RPG',
		basePrice: 60,
		status: 'nuevo-precintado',
		stock: 3,
	},
	{
		id: 9,
		name: 'Raft',
		platform: 'PC',
		type: 'Survival',
		basePrice: 15,
		status: 'usado-como-nuevo',
		stock: 60,
	},
	{
		id: 10,
		name: 'Minecraft',
		platform: 'PC',
		type: 'Survival',
		basePrice: 25,
		status: 'nuevo-precintado',
		stock: 100,
	},
	{
		id: 11,
		name: 'Forza Horizon 6',
		platform: 'Xbox',
		type: 'Driving',
		basePrice: 60,
		status: 'usado-como-nuevo',
		stock: 50,
	},
	{
		id: 12,
		name: 'Wii Play',
		platform: 'Wii',
		type: 'Minigames',
		basePrice: 14,
		status: 'solo-cartucho',
		stock: 40,
	},
	{
		id: 13,
		name: 'Mario Kart',
		platform: 'Nintendo DS',
		type: 'Driving',
		basePrice: 25,
		status: 'solo-cartucho',
		stock: 15,
	},
	{
		id: 14,
		name: 'Red Dead Redeption 2',
		platform: 'Play Station',
		type: 'Open World',
		basePrice: 40,
		status: 'usado-caja-danada',
		stock: 32,
	},
];

const STATUS_MOD = {
	'nuevo-precintado': 1.25, //+25%
	'usado-como-nuevo': 1, //0%
	'usado-caja-danada': 0.85, //-15%
	'solo-cartucho': 0.7, //-30%
};

const STOCK_DISCOUNT = {
	'one-stock': 1, //0%
	'low-stock': 1.05, //+5%
	'plenty-stock': 1.1, //+10%
};

export function priceModStatus(id = null) {
	if (id) {
		const game = catalog.find((game) => game.id === id) || null;

		if (game) game.basePrice = game.basePrice * STATUS_MOD[game.status];

		return game;
	} else {
		return catalog.reduce((acc, game) => {
			acc.push({ ...game, basePrice: game.basePrice * STATUS_MOD[game.status] });
		}, []);
	}
}

export function priceDiscountStock(id = null) {
	if (id) {
		const game = catalog.find((game) => game.id === id) || null;

		if (game) {
			if (game.stock === 1) price = game.basePrice * STOCK_DISCOUNT['one-stock'];
			else if (game.stock >= 2 && game.stock <= 3) price = game.basePrice * STOCK_DISCOUNT['low-stock'];
			else price = game.basePrice * STOCK_DISCOUNT['plenty-stock'];
		}

		return game;
	} else {
		return catalog.reduce((acc, game) => {
			acc.push({
				...game,
				basePrice:
					game.stock === 1
						? game.basePrice * STATUS_MOD[game.status]
						: game.stock >= 2 && game.stock <= 3
							? game.basePrice * STOCK_DISCOUNT['low-stock']
							: game.basePrice * STOCK_DISCOUNT['plenty-stock'],
			});
		}, []);
	}
}
