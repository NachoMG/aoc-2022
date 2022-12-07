const { open } = require('fs').promises;

class Directory {

  constructor(name) {
    this.name = name;
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getSize() {
    return this.nodes.reduce((acc, node) => {
      if (node instanceof Directory) {
        return acc + node.getSize();
      }
      return acc + node.size;
    }, 0);
  }
}

class File {

  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

}

const sumNodeSizesLessThan = (root, maxSize) => {
  let total = 0;
  for (const node of root.nodes) {
    if (node instanceof Directory) {
      total += sumNodeSizesLessThan(node, maxSize);
    }
  }

  const size = root.getSize();
  if (size <= maxSize) {
    total += size;
  }

  return total;
};

const main = async () => {
  const root = new Directory('/');
  let currentPath = [root];

  const file = await open('input.txt');
  for await (const line of file.readLines()) {
    if (line === '$ cd /') {
      continue;
    }
  
    const lineArray = line.split(' ');
    if (lineArray[0] === '$') {
      if (lineArray[1] === 'cd') {
        if (lineArray[2] === '..') {
          currentPath.shift();
        } else {
          currentPath.unshift(
            currentPath[0].nodes.find((node) => node instanceof Directory && node.name === lineArray[2])
            || new Directory(lineArray[2])
          );
        }
      }
    } else if (lineArray[0] === 'dir') {
      currentPath[0].addNode(new Directory(lineArray[1]));
    } else {
      currentPath[0].addNode(new File(lineArray[0], Number.parseInt(lineArray[0])));
    }
  }

  console.log(sumNodeSizesLessThan(root, 100000));
};

main();
