const fs = require('fs').promises;

const getItemValue = (char) => {
  const utfCode = char.charCodeAt(0);
  if (utfCode < 97) {
    return utfCode - 38;
  }
  return utfCode - 96;
};

getCommonItem = (backpacks) => {
  const otherBackpacks = backpacks.slice(0, - 1);
  const lastBackpack = backpacks[backpacks.length - 1];
  for (const item of lastBackpack) {
    if (otherBackpacks.every((backpack) => backpack.has(item))) {
      return item;
    }
  }
}

const main = async () => {
  const backpacks = (await fs.readFile('input.txt', 'utf8'))
  .split('\n')
  .map((backpack) => new Set(backpack));
  
  let result = 0;
  for (let i = 0; i < backpacks.length; i += 3) {
    result += getItemValue(getCommonItem(backpacks.slice(i, i + 3)));
  }
  console.log(result);
  process.exit();
};

main();