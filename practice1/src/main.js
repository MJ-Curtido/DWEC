import { addStock, createSalesCounter, getCatalog, sellGame } from './assets/catalog';
import { searchGame, allCatalog, catalogByType, catalogLowStock, salesReport } from './functions';

let catalog = getCatalog();
let sales = [];
const salesCounter = createSalesCounter();

const showTypeSubMenu = () => {
	let option = 0;

	option = Number(
		prompt(`
                -- Type --
                \t1. Platform.
                \t2. RPG.
                \t3. Driving.
                \t4. Open World.
                \t5. Leave.\n
            `),
	);

	switch (option) {
		case 1:
			catalogByType(catalog, 'Platform');
			break;

		case 2:
			catalogByType(catalog, 'RPG');
			break;

		case 3:
			catalogByType(catalog, 'Driving');
			break;

		case 4:
			catalogByType(catalog, 'Open World');
			break;

		case 5:
			console.log('\n\n\n\n\n\n\n');
			break;

		default:
			console.log('Invalid option.');
			break;
	}
};

const showCatalogSubmenu = () => {
	let option = 0;

	option = Number(
		prompt(`
                -- Menu --
                \t1. Show all the catalog.
                \t2. Filtered by type.
                \t3. Only games with low stock.
                \t4. Leave.\n
            `),
	);

	switch (option) {
		case 1:
			allCatalog(catalog);
			break;

		case 2:
			showTypeSubMenu();
			break;

		case 3:
			catalogLowStock(catalog);
			break;

		case 4:
			console.log('\n\n\n\n\n\n\n');
			break;

		default:
			console.log('Invalid option.');
			break;
	}
};

const showSearchGame = () => {
	const search = prompt('Introduce ID or name of a game:');

	searchGame(catalog, search, (catalog, search) => {
		return catalog.find((game) => game.id === Number(search) || game.name.toLowerCase().includes(search.toLowerCase()));
	});

	console.log('\n\n\n\n\n\n\n');
};

const showGamesStock = (action) => {
	console.log('\n-- Games --');

	catalog.forEach((game) => {
		console.log(
			`${game.id}. ${game.name} - Stock: ${game.stock} --> ${game.basePrice}€${game.stock === 0 ? '\tNo Stock!!!' : game.stock < 3 ? '\tLow Stock!!!' : ''}`,
		);
	});

	const id = Number(prompt('\nEnter the game ID:'));
	const unit = Number(prompt('\nEnter the quantity:')) ?? 0;

	if (action === 'sale') {
		const sale = sellGame(id, unit, catalog);

		if (sale) {
			const { updatedCatalog, game } = sale;

			catalog = updatedCatalog;
			sales.push(game);

			console.log('Sale successfully recorded.');

			salesCounter.add();
		} else {
			console.log('Invalid sale.');
		}
	} else {
		const updatedCatalog = addStock(id, unit, catalog);

		if (updatedCatalog) {
			catalog = updatedCatalog;
		} else {
			console.log('Invalid stock.');
		}
	}
};

let option = 0;

do {
	option = Number(
		prompt(`
            -- Menu --
            \t1. Show catalog.
            \t2. Search game.
            \t3. Record a sale.
            \t4. Add stock.
            \t5. Sales report.
            \t6. Leave.\n
        `),
	);

	switch (option) {
		case 1:
			showCatalogSubmenu();
			break;

		case 2:
			showSearchGame();
			break;

		case 3:
			showGamesStock('sale');
			break;

		case 4:
			showGamesStock('add-stock');
			break;

		case 5:
			salesReport(catalog, sales);
			console.log(`Total sales: ${salesCounter.get()}`);
			break;

		default:
			console.log('Invalid option.');
			break;
	}
} while (option !== 6);
