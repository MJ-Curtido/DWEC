import { getCatalog } from './assets/catalog';
import { showAllCatalog, showByType, showLowStock } from './functions';
import readline from 'readline';

const catalog = getCatalog();

const showTypeSubMenu = () => {
	let option = 0;

	do {
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
				showByType(catalog, 'Platform');
				break;

			case 2:
				showByType(catalog, 'RPG');
				break;

			case 3:
				showByType(catalog, 'Driving');
				break;

			case 4:
				showByType(catalog, 'Open World');
				break;

			case 5:
				console.log('\n\n\n\n\n\n\n');
				break;

			default:
				console.log('Invalid option.');
				break;
		}
	} while (option !== 5);
};

const showCatalogSubmenu = () => {
	let option = 0;

	do {
		option = Number(
			prompt(`
                -- Menu --
                \t1. Show all the catalog.
                \t2. Filtered by type.
                \t3. Only products with low stock.
                \t4. Leave.\n
            `),
		);

		switch (option) {
			case 1:
				showAllCatalog(catalog);
				break;

			case 2:
				showTypeSubMenu();
				break;

			case 3:
				showLowStock(catalog);
				break;

			case 4:
				console.log('\n\n\n\n\n\n\n');
				break;

			default:
				console.log('Invalid option.');
				break;
		}
	} while (option !== 4);
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

		default:
			console.log('Invalid option.');
			break;
	}
} while (option !== 6);
