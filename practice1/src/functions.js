const allCatalog = function (catalog) {
	console.log('\n-- Catalog --');

	catalog.map((game) => {
		console.log(
			`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
		);
	});
};

const catalogByType = function (catalog, type) {
	console.log('\n-- Catalog filtered by Type --');

	catalog
		.filter((game) => game.type === type)
		.map((game) => {
			console.log(
				`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
			);
		});
};

const catalogLowStock = function (catalog) {
	console.log('\n-- Catalog with Low Stock --');

	catalog
		.filter((game) => game.stock < 3)
		.map((game) => {
			console.log(`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€`);
		});
};

const searchGame = function (catalog, search, callback) {
	const game = callback(catalog, search);

	if (game) {
		console.log(
			`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
		);
	} else {
		console.log('Game not found.');
	}
};

const salesReport = function (catalog, sales) {
	const totalAmount = sales.reduce((acc, sale) => {
		return acc + sale.sellingPrice;
	}, 0);

	const stockValue = catalog.reduce((acc, game) => {
		return acc + game.basePrice * game.stock;
	}, 0);

	console.log('\n-- Sales Report --\n');
	console.log(`Total amount billed: ${totalAmount}€`);
	console.log(`Stock value: ${stockValue}€`);

	catalog.some((game) => game.stock <= 3) && console.log('There are some articles with low stock!');
};

export { allCatalog, catalogByType, catalogLowStock, searchGame, salesReport };
