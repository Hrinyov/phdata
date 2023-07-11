import React from "react";

interface NumberFormatConverterProps {
  number: number;
}

const NumberFormatConverter: React.FC<NumberFormatConverterProps> = ({
  number,
}) => {
  const convertToFraction = (number: number): string => {
    const roundedNumber = (Math.round(number * 100) / 100).toFixed(2); // Round to 2 decimal places
    const numerator = parseFloat(roundedNumber) * 100;
    const denominator = 100;

    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };

    const commonDivisor = gcd(numerator, denominator);

    return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
  };

  const fraction = convertToFraction(number);

  return (
    <div>
      {number} = {fraction}
    </div>
  );
};

export default NumberFormatConverter;
