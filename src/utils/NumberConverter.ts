
const NumberConverter = (number: string | undefined) => {
  if(number){
    const decimal = +number;
    if (decimal >= 1) {
      return `${decimal}"`;
    }
    if (decimal > 0 || decimal < 1) {
      const maxDenominator = 10000;
      const numerator = 1;
      let denominator = 1;
      let error = Math.abs(decimal - numerator / denominator);

    for (let i = 2; i <= maxDenominator; i++) {
      const newDenominator = i;
      const newError = Math.abs(decimal - numerator / newDenominator);

      if (newError < error) {
        denominator = newDenominator;
        error = newError;
      }
    }
    return `${numerator}/${denominator}`;
    }
  } 
  return 'empty';
}

export default NumberConverter;
