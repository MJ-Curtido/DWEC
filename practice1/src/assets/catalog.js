/**
 * @typedef {Object} Product;
 * @property {number} id;
 * @property {string} name;
 * @property {string} platform;
 * @property {string} type;
 * @property {number} basePrice;
 * @property {'new-sealed' | 'used-like-new' | 'used-damaged-packaging' | 'game-only'} status;
 * @property {number} stock;
 */

/**
 * @type {Product[]}
 */

export const INITIAL_CATALOG = [
	{
		id: 0,
		basePrice: 20,
		name: 'Hollow Knight',
		platform: 'PC',
		status: 'used-like-new',
		stock: 17,
		type: 'Metroidvania',
	},
	{
		id: 1,
		basePrice: 150,
		name: 'Pokemon Red',
		platform: 'GAME BOY',
		status: 'new-sealed',
		stock: 0,
		type: 'RPG',
	},
	{
		id: 2,
		basePrice: 10,
		name: 'Celeste',
		platform: 'PC',
		status: 'used-damaged-packaging',
		stock: 30,
		type: 'Platform',
	},
	{
		id: 3,
		basePrice: 60,
		name: 'The Binding of Isaac',
		platform: 'PC',
		status: 'game-only',
		stock: 7,
		type: 'Roguelike',
	},
	{
		id: 4,
		basePrice: 20,
		name: 'Euro Truck Simulator',
		platform: 'PC',
		status: 'new-sealed',
		stock: 10,
		type: 'Driving',
	},
	{
		id: 5,
		basePrice: 40,
		name: 'Detroit Become Human',
		platform: 'PC',
		status: 'used-damaged-packaging',
		stock: 18,
		type: 'Choose',
	},
	{
		id: 6,
		basePrice: 40,
		name: 'The Last of Us',
		platform: 'Play Station',
		status: 'used-like-new',
		stock: 6,
		type: 'Shooter',
	},
	{
		id: 7,
		basePrice: 30,
		name: 'Inazuma Eleven Striker',
		platform: 'Wii',
		status: 'used-like-new',
		stock: 1,
		type: 'Soccer',
	},
	{
		id: 8,
		basePrice: 60,
		name: 'Pokemon Diamond',
		platform: 'Nintendo DS',
		status: 'new-sealed',
		stock: 2,
		type: 'RPG',
	},
	{
		id: 9,
		basePrice: 15,
		name: 'Raft',
		platform: 'PC',
		status: 'used-like-new',
		stock: 60,
		type: 'Survival',
	},
	{
		id: 10,
		basePrice: 25,
		name: 'Minecraft',
		platform: 'PC',
		status: 'new-sealed',
		stock: 100,
		type: 'Survival',
	},
	{
		id: 11,
		basePrice: 60,
		name: 'Forza Horizon 6',
		platform: 'Xbox',
		status: 'used-like-new',
		stock: 50,
		type: 'Driving',
	},
	{
		id: 12,
		basePrice: 14,
		name: 'Wii Play',
		platform: 'Wii',
		status: 'game-only',
		stock: 3,
		type: 'Minigames',
	},
	{
		id: 13,
		basePrice: 25,
		name: 'Mario Kart',
		platform: 'Nintendo DS',
		status: 'game-only',
		stock: 0,
		type: 'Driving',
	},
	{
		id: 14,
		basePrice: 40,
		name: 'Red Dead Redeption 2',
		platform: 'Play Station',
		status: 'used-damaged-packaging',
		stock: 32,
		type: 'Open World',
	},
];

const STATUS_MOD = {
	'game-only': 0.7, //-30%
	'new-sealed': 1.25, //+25%
	'used-damaged-packaging': 0.85, //-15%
	'used-like-new': 1, //0%
};

const UNITS_DISCOUNT = {
	'small-purchase': 1.05, //+5% (2-3 units bought)
	'one-unit': 1, //0% (1 unit bought)
	'big-purchase': 1.1, //+10% (more than 3 units bought)
};

export function getCatalog() {
	return [...INITIAL_CATALOG];
}

export function priceModStatus(id) {
	const game = catalog.find((game) => game.id === id);

	return game.basePrice * STATUS_MOD[game.status];
}

export function sellProduct(id, unit, catalog) {
	if (id && unit > 0) {
		const game = catalog.find((game) => game.id === id);

		if (game && game.stock >= unit) {
			const sellingPrice =
				unit === 1
					? priceModStatus(id) * UNITS_DISCOUNT['one-unit']
					: unit <= 3
						? priceModStatus(id) * UNITS_DISCOUNT['small-purchase']
						: priceModStatus(id) * UNITS_DISCOUNT['big-purchase'];

			game.stock = game.stock - unit;

			return { ...game, sellingPrice };
		}
	}

	return null;
}
