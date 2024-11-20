class Block {
  row;
  col;
  collapsed = false;
  probabilities;
  image = null;
  constructor(probabilitiesArray) {
    this.probabilities = new Array(1).fill(probabilitiesArray.length);
    let sum = 0;
    for (let i = 0; i < probabilitiesArray.length; i++) {
      sum += probabilitiesArray[i];
      this.probabilities.push(probabilitiesArray[i]);
    }
  }
}
export default Block;
