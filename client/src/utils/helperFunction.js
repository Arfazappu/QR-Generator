export function numberToWords(num) {
    if (num === 0) return "zero";
  
    const belowTwenty = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", 
      "seventeen", "eighteen", "nineteen"
    ];
  
    const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ];
  
    const thousands = ["", "thousand", "million", "billion"];
  
    const numberToWordsHelper = (n) => {
      if (n === 0) return "";
      else if (n < 20) return belowTwenty[n] + " ";
      else if (n < 100) return tens[Math.floor(n / 10)] + " " + numberToWordsHelper(n % 10);
      else return belowTwenty[Math.floor(n / 100)] + " hundred " + numberToWordsHelper(n % 100);
    };
  
    let wordRepresentation = "";
    let i = 0;
  
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        wordRepresentation = numberToWordsHelper(chunk) + thousands[i] + " " + wordRepresentation;
      }
      num = Math.floor(num / 1000);
      i++;
    }
  
    return wordRepresentation.trim() + " only";
  }