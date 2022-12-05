const fs = require('fs').promises;

const cleanRawSupplyStacks = (rawSupplyStacks) => {
  rawSupplyStacks.pop();
  return rawSupplyStacks.reduce((acc, line) => {
    const splittedLine = line.match(/.{1,4}/g);
    for (let i = splittedLine.length - 1; i >= 0; i--) {
      acc[i] = acc[i] || [];
      const crate = splittedLine[i][1];
      if (crate !== ' ') {
        acc[i].push(splittedLine[i][1]);
      }
    }
    return acc;
  }, []);
} ;

const main = async () => {
  const input = await fs.readFile('input.txt', 'utf-8');
  const [rawSupplyStacks, procedures] = input.split('\n\n')
    .map((value) => value.split('\n'));

  const supplyStacks = cleanRawSupplyStacks(rawSupplyStacks);
  for (const procedure of procedures) {
    const [quantity, from, to] = procedure.match(/\d+/g);
    const movedBoxes = supplyStacks[from - 1].splice(0, quantity);
    supplyStacks[to - 1].unshift(...movedBoxes.reverse());
  }

  console.log(supplyStacks.reduce((acc, supplyStack) => acc + supplyStack.shift(), ''));
};

main();
