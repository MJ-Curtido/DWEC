const allCatalog = (catalog) => {
	console.log('\n-- Catalog --');

	catalog.map((game) => {
		console.log(
			`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
		);
	});
};

const catalogByType = (catalog, type) => {
	console.log('\n-- Catalog filtered by Type --');

	catalog
		.filter((game) => game.type === type)
		.map((game) => {
			console.log(
				`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
			);
		});
};

const catalogLowStock = (catalog) => {
	console.log('\n-- Catalog with Low Stock --');

	catalog
		.filter((game) => game.stock < 3)
		.map((game) => {
			console.log(`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€`);
		});
};

const searchGame = (catalog, search) => {
	const game = catalog.find((game) => game.id === Number(search) || game.name.toLowerCase().includes(search.toLowerCase()));

	if (game) {
		console.log(
			`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
		);
	} else {
		console.log('Game not found.');
	}
};

const salesReport = (catalog, sales) => {
	const totalAmount = sales.reduce((acc, sale) => {
		return acc + sale.sellingPrice;
	}, 0);

	const stockValue = catalog.reduce((acc, game) => {
		return acc + game.basePrice * game.stock;
	}, 0);

	const lowStock = catalog.some((game) => game.stock <= 3);

	console.log('\n-- Sales Report --\n');
	console.log(`Total amount billed: ${totalAmount}€`);
	console.log(`Stock value: ${stockValue}€`);

	if (lowStock) {
		console.log('There are some articles with low stock!');
	}
};

export { allCatalog, catalogByType, catalogLowStock, searchGame, salesReport };
