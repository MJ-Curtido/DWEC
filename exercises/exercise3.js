function message(age) {
	console.log(age >= 18 ? 'Legal age' : 'Minor');
}

message(13);
message(24);

function category(age) {
	console.log(age < 2 ? 'Baby' : age < 12 ? 'Boy' : age < 18 ? 'Teenager' : 'Adult');
}

category(24);
category(13);
category(7);
category(1);
