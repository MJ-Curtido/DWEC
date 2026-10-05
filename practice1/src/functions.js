const showAllCatalog = (catalog) => {
	console.log('\n-- Catalog --');

	catalog.map((game) => {
		console.log(
			`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock < 3 ? '\tLow Stock!!!' : ''}`,
		);
	});
};

const showByType = (catalog, type) => {
	console.log('\n-- Catalog filtered by Type --');

	catalog
		.filter((game) => game.type === type)
		.map((game) => {
			console.log(
				`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€${game.stock < 3 ? '\tLow Stock!!!' : ''}`,
			);
		});
};

const showLowStock = (catalog) => {
	console.log('\n-- Catalog with Low Stock --');

	catalog
		.filter((game) => game.stock < 3)
		.map((game) => {
			console.log(`${game.name} - ${game.platform} - ${game.status} - ${game.type} --> ${game.basePrice}€`);
		});
};

export { showAllCatalog, showByType, showLowStock };
