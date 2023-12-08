// format a date like mm/dd/yyyy
// e.g. 05/12/2020
export const getFormattedDate = (
	date: Date,
	includeTime = false,
	addOffset = true
) => {
	// 8-3-20 added this line to add 5 hours to the incoming date because of the time being off 5 hours because of timezone stuff
	if (addOffset) {
		// we can't add a static 5 because it switches between 5 and 6 depending on DST
		// date.setHours(date.getHours() + 5);
		const offsetHours = date.getTimezoneOffset() / 60;
		date.setHours(date.getHours() + offsetHours);
	}
	const year = date.getFullYear();
	const month = (1 + date.getMonth()).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	let returnStr = month + '/' + day + '/' + year;
	if (includeTime) {
		let hours:string = date.getHours().toString();
		const minutes = date.getUTCMinutes().toString().padStart(2, '0');
		const seconds = date.getUTCSeconds().toString().padStart(2, '0');
		let ampm = 'am';
		if (Number(hours) > 11) {
			hours = hours === '12' ? hours : (Number(hours) - 12).toString();
			ampm = 'pm';
		} else if (hours === '0') {
			hours = '12';
		}
		hours = hours.toString().padStart(2, '0');
		const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;

		returnStr += ' ' + timeStr;
	}
	return returnStr;
};