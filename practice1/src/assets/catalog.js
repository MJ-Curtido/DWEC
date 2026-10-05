/**
 * @typedef {Object} Game;
 * @property {number} id;
 * @property {string} name;
 * @property {string} platform;
 * @property {string} type;
 * @property {number} basePrice;
 * @property {'new-sealed' | 'used-like-new' | 'used-damaged-packaging' | 'game-only'} status;
 * @property {number} stock;
 */

/**
 * @type {Game[]}
 */

export const INITIAL_CATALOG = [
	{
		id: 0,
		basePrice: 20,
		name: 'Hollow Knight',
		platform: 'PC',
		status: 'used-like-new',
		stock: 17,
		type: 'Platform',
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
		type: 'Platform',
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
		type: 'Open World',
	},
	{
		id: 6,
		basePrice: 40,
		name: 'Grand Theft Auto VI',
		platform: 'Play Station',
		status: 'used-like-new',
		stock: 6,
		type: 'Open World',
	},
	{
		id: 7,
		basePrice: 30,
		name: 'Inazuma Eleven Striker',
		platform: 'Wii',
		status: 'new-sealed',
		stock: 1,
		type: 'Open World',
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
		type: 'Open World',
	},
	{
		id: 10,
		basePrice: 25,
		name: 'Minecraft',
		platform: 'PC',
		status: 'new-sealed',
		stock: 100,
		type: 'Open World',
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
		name: 'Need For Speed',
		platform: 'PC',
		status: 'game-only',
		stock: 3,
		type: 'Driving',
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
	'small-sale': 0.95, //-5% (2-3 units bought)
	'one-unit': 1, //0% (1 unit bought)
	'big-sale': 0.9, //-10% (more than 3 units bought)
};

export function getCatalog() {
	return [...INITIAL_CATALOG];
}

function priceModStatus(id, catalog) {
	const game = catalog?.find((game) => game.id === id);

	return game.basePrice * STATUS_MOD[game.status];
}

export function sellGame(id = null, unit, catalog) {
	if (id !== null && unit > 0) {
		const game = catalog?.find((game) => game.id === id);

		if (game && game.stock >= unit) {
			const sellingPrice =
				unit === 1
					? priceModStatus(id, catalog) * UNITS_DISCOUNT['one-unit']
					: unit <= 3
						? priceModStatus(id, catalog) * UNITS_DISCOUNT['small-sale']
						: priceModStatus(id, catalog) * UNITS_DISCOUNT['big-sale'];

			const updatedCatalog = catalog.map((game) => {
				return game.id === id ? { ...game, stock: game.stock - unit } : game;
			});

			return { updatedCatalog, game: { ...game, sellingPrice, stock: game.stock - unit } };
		}
	}

	return null;
}

export function addStock(id = null, unit, catalog) {
	if (id !== null && unit > 0) {
		const game = catalog?.find((game) => game.id === id);

		if (game) {
			const updatedCatalog = catalog.map((game) => {
				return game.id === id ? { ...game, stock: game.stock + unit } : game;
			});

			return updatedCatalog;
		}
	}

	return null;
}

export const createSalesCounter = () => {
	let count = 0;

	return {
		add: () => count++,
		get: () => count,
	};
};
