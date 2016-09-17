/**
 * value parsers are function which checks string for correct format. IN essence there are 3 states
 * that should be handled by parser
 * - if format is correct returns parsed value.
 * - otherwise if format is not correct returns null. example, if we use floatParser
 * 12,34 would return float 12.34 , but 12.34c would return null.
 * - If value is not defined, function shoud return that exact value (usually empty string "")
 */

let floatCheckRegex = /^[+]?\d*[\.,]?[\d]+$/;
let intCheckRegex = /^[+,-]?[0-9]+$/;
let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

//value returned in case that value to parse is invalid
let nonParsableValue = {
	dummyMember: false
};

function floatParser(value) {
	value = value.trim();
	if (!value) return value; //value is not defined
	let floatnum = value.match(floatCheckRegex); //if there is no match result is null
	if (!floatnum) return nonParsableValue; //value is in wrong format
	value = value.replace(",", ".");
	return parseFloat(value);
}

function intParser(value) {
	value = value.trim();
	if (!value) return value;
	if (!intCheckRegex.test(value)) return nonParsableValue;
	return parseInt(value);
}

function emailParser(value) {
	value = value.trim();
	if (!value) return value;
	if (!emailRegex.test(value)) return nonParsableValue;
	return value;
}

//by default does nothing
function genericParser(value) {
	return value;
}

//trim if value is empty
function trim(value) {
	if (value !== null && value != null && value.trim) {
		return value.trim();
	}
	return value;
}

function haveParsingFailed(value) {
	return (value === nonParsableValue);
};

export default {
	float: floatParser,
	int: intParser,
	email: emailParser,
	generic: genericParser,
	raw: genericParser,
	trim: trim,
	nonParsableValue: nonParsableValue,
	haveParsingFailed: haveParsingFailed
};