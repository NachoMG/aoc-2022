const { open } = require('fs').promises;

const main = async () => {
  const file = await open('input.txt');
  
  const caloriesSumArray = [];
  let currCaloriesSum = 0;
  for await (const line of file.readLines()) {
    if (line !== '') {
      currCaloriesSum += Number.parseInt(line);
    } else {
      caloriesSumArray.push(currCaloriesSum);
      currCaloriesSum = 0;
    }
  }
  
  console.log(
    caloriesSumArray.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b)
  );
  
  process.exit();
};

main();
