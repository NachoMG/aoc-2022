const { open } = require('fs').promises;

const main = async () => {
  const file = await open('input.txt');
  let maxCaloriesSum = 0;
  let currCaloriesSum = 0;
  for await (const line of file.readLines()) {
    if (line !== '') {
      currCaloriesSum += Number.parseInt(line);
    } else {
      maxCaloriesSum = Math.max(maxCaloriesSum, currCaloriesSum);
      currCaloriesSum = 0;
    }
  }
  console.log(maxCaloriesSum);
  process.exit();
};

main();
