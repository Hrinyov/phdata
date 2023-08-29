
const NumberConverter= (number: number) => {
 const epsilon = 1.0e-8; // Adjust epsilon value as needed
 let numerator = number;
 let denominator = 1.0;
 let error = Math.abs(number - numerator / denominator);

 while (error > epsilon) {
   if (number > numerator / denominator) {
     denominator++;
   } else if (number < numerator / denominator) {
     numerator--;
   }
   error = Math.abs(number - numerator / denominator);
 }

 const fraction = numerator + "/" + denominator;

 return fraction
};

export default NumberConverter;
