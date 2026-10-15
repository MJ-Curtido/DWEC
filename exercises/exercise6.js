function dayWeek(num) {
	switch (num) {
		case 6 || 7:
			console.log('Weekend');
			break;
		case (num) => 1 && num <= 5:
			console.log('Working day');
			break;
		default:
			console.log('Number not valid');
			break;
	}
}

dayWeek(7);
dayWeek(1);
dayWeek(3);
dayWeek(5);
dayWeek(18);
