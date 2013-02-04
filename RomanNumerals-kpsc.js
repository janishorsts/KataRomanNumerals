var RomanNumerals = function(roman) {
	this.roman = roman;
	this.nominals = {
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000
	};

	this.toArabian = function() {
		var result = 0;
		for (var i = 0; i < this.roman.length; i++) {
			if (i == this.roman.length - 1) {
				// the last letter of the string --
				//		we should not care about the rest of the string
				result += this.nominals[this.roman[i]];
				break;
			}
			if (this.isSubstractive(this.roman[i], this.roman[i + 1])) {
				result -= this.nominals[this.roman[i]];
			} else {
				result += this.nominals[this.roman[i]];
			}
		};
		return result;
	};

	this.isAdditive = function(char1, char2) {
		return (this.nominals[char1] >= this.nominals[char2]);
	};

	this.isSubstractive = function(char1, char2) {
		return !this.isAdditive(char1, char2);
	};

	return this;
}

describe('RomanNumerals', function() {
	var roman = RomanNumerals('I');
	describe('Single letter', function() {
		it('should return 1 if roman I', function() {
			roman.toArabian().should.equal(1);
		});
		it('should return 5 if roman V', function() {
			roman = RomanNumerals('V');
			roman.toArabian().should.equal(5);
		});
		it('should return 10 if roman X', function() {
			roman = RomanNumerals('X');
			roman.toArabian().should.equal(10);
		});
	});
	describe('Double letters', function () {
		it('should return 2 if roman II', function() {
			roman = RomanNumerals('II');
			roman.toArabian().should.equal(2);
		});
		it('should return 20 if roman XX', function() {
			roman = RomanNumerals('XX');
			roman.toArabian().should.equal(20);
		});
	});
	describe('Combined', function() {
		it('should return 6 if roman VI', function() {
			roman = RomanNumerals('VI');
			roman.toArabian().should.equal(6);
		});
		it('should return 1667 if roman MDCLXVII', function() {
			roman = RomanNumerals('MDCLXVII');
			roman.toArabian().should.equal(1667);
		});
	});
	describe('Substractive', function() {
		it('should return 4 if roman IV', function() {
			roman = RomanNumerals('IV');
			roman.toArabian().should.equal(4);
		});
		it('should wrongly return 999 if roman IM', function() {
			// common rules allow to substract I only from V and X
			// 	for more info see http://en.wikipedia.org/wiki/Roman_numerals
			roman = RomanNumerals('IM');
			roman.toArabian().should.equal(999);
		});
		it('should return 1999 if roman MCMXCIX', function() {
			roman = RomanNumerals('MCMXCIX');
			roman.toArabian().should.equal(1999);
		});
	});
});