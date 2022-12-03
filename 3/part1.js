const fs = require('fs').promises;

const getItemValue = (item) => {
  const utfCode = item.charCodeAt(0);
  if (utfCode < 97) {
    return utfCode - 38;
  }
  return utfCode - 96;
};

getCommonItem = (backpackHalves) => {
  const [backpackHalveA, backpackHalveB] = backpackHalves;
  for (const item of backpackHalveB) {
    if (backpackHalveA.has(item)) {
      return item;
    }
  }
}

const main = async () => {
  const result = (await fs.readFile('input.txt', 'utf8'))
  .split('\n')
  .map((backpack) => [
    new Set(backpack.slice(0, backpack.length / 2)),
    new Set(backpack.slice(backpack.length / 2)),
  ])
  .reduce((acc, backpackHalves) => acc + getItemValue(getCommonItem(backpackHalves)), 0);
  console.log(result);
  process.exit();
};

main();
