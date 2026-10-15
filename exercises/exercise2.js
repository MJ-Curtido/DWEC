function validateAccess(age, entry) {
	if (age < 12) return 'Free access.';
	else if (age >= 12 && age <= 17 && entry) return 'Discount access.';
	else if (age >= 18 && entry) return 'Regular access.';
	else return 'Denied access.';
}

validateAccess(13, false);
validateAccess(18, true);
validateAccess(17, true);
validateAccess(7, true);
