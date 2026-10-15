const orders = [
	{ id: 1, customer: { name: 'Marta', address: { city: 'Cádiz' } } },
	{ id: 2, customer: { name: 'Luis' } },
	{ id: 3, customer: null },
];

function orderCity(order) {
	console.log(order.customer?.address?.city || 'City not specified.');
}

orderCity(orders[0]);
orderCity(orders[1]);
orderCity(orders[2]);
