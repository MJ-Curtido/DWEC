const product = {
	name: 'Headphones',
	stock: 0,
	discount: false,
};

function checkStock1(product) {
	console.log(product.stock || 'Out of stock.');
}

function checkStock2(product) {
	console.log(product.stock ?? 'Out of stock.');
}

checkStock1(product);
checkStock2(product);

// Los resultados son diferentes porque el '||' comprueba si existe y si el número es 0 o la cadena es '', en cambio '??' solo si es NULL o undefined.

function discountApplied(product) {
	product.discount && console.log('The discount is applied with success!');
}

discountApplied(product);
