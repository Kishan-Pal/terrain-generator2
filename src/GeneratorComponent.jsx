import { useEffect, useState, useRef } from "react";
import Block from "./Block";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.png";

// * tree 1
// * grass 2
// * sand 3
// * water 4

const probabilities = [0.25, 0.25, 0.25, 0.25];
const grid = 40;
const viewPort = 500;
const images = 4;
const delay = 0;
const radius = 5;
var end = false;
var timeInterval = 0;

const GeneratorComponent = () => {
  const [gridArray, setGridArray] = useState();
  const [imageArray, setImageArray] = useState();
  const inputRef = useRef();

  useEffect(() => {
    // let a = new Block(probabilities);
    // console.log(a.probabilities);

    const tempImageArray = new Array(1).fill(images);
    tempImageArray.push(image1);
    tempImageArray.push(image2);
    tempImageArray.push(image3);
    tempImageArray.push(image4);
    setImageArray(tempImageArray);
    //console.log(tempImageArray);

    setGridArray(createGridArray(grid));
    //console.log(gridArray);
    window.addEventListener("keypress", handleKeyPress);

    //createMyInterval();
  }, []);

  const createMyInterval = () => {
    const time = setInterval(() => {
      if (end) clearInterval(time);
      inputRef.current.click();
    }, delay);
    timeInterval = time;
  };

  //   useEffect(() => {
  //     console.log(gridArray);
  //   }, [gridArray]);

  const handleKeyPress = (e) => {
    console.log(e);
    if (e.key == "c") {
      // do a step
      inputRef.current.click();
    }
  };

  const createGridArray = (num) => {
    const array = new Array(num)
      .fill()
      .map(() => new Array(num).fill(null).map(() => new Block(probabilities)));
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        array[i][j].row = i;
        array[i][j].col = j;
      }
    }
    return array;
  };

  const collapseBlock = (block, imageNo) => {
    //console.log(block);

    block.collapsed = true;
    block.image = imageArray[imageNo];
    let startRow = Math.max(block.row - radius, 0);
    let endRow = Math.min(block.row + radius, grid - 1);
    let startCol = Math.max(block.col - radius, 0);
    let endCol = Math.min(block.col + radius, grid - 1);

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        reduceProbability(gridArray[i][j], imageNo);
      }
    }

    // console.log("start row: " + startRow);
    // console.log("end row: " + endRow);
    // console.log("start col: " + startCol);
    // console.log("end col: " + endCol);

    // if (block.row > 0) {
    //   reduceProbability(gridArray[block.row - 1][block.col], imageNo);
    // }
    // if (block.row < grid - 1) {
    //   reduceProbability(gridArray[block.row + 1][block.col], imageNo);
    // }
    // if (block.col > 0) {
    //   reduceProbability(gridArray[block.row][block.col - 1], imageNo);
    // }
    // if (block.col < grid - 1) {
    //   reduceProbability(gridArray[block.row][block.col + 1], imageNo);
    // }

    setGridArray([...gridArray]);
  };

  const reduceProbability = (block, imageNo) => {
    let rem = 0;
    let reducingFactor = 5;
    switch (imageNo) {
      case 1:
        rem = 0;
        rem += block.probabilities[2] / reducingFactor;
        block.probabilities[2] -= block.probabilities[2] / reducingFactor;
        rem += block.probabilities[3] / reducingFactor;
        block.probabilities[3] -= block.probabilities[3] / reducingFactor;
        rem += block.probabilities[4] / reducingFactor;
        block.probabilities[4] -= block.probabilities[4] / reducingFactor;
        block.probabilities[1] += rem;
        break;
      case 2:
        rem = 0;
        rem += block.probabilities[1] / reducingFactor;
        block.probabilities[1] -= block.probabilities[1] / reducingFactor;
        rem += block.probabilities[3] / reducingFactor;
        block.probabilities[3] -= block.probabilities[3] / reducingFactor;
        rem += block.probabilities[4] / reducingFactor;
        block.probabilities[4] -= block.probabilities[4] / reducingFactor;

        block.probabilities[2] += rem;
        break;
      case 3:
        rem = 0;

        rem += block.probabilities[1] / reducingFactor;
        block.probabilities[1] -= block.probabilities[1] / reducingFactor;
        rem += block.probabilities[2] / reducingFactor;
        block.probabilities[2] -= block.probabilities[3] / reducingFactor;
        rem += block.probabilities[4] / reducingFactor;
        block.probabilities[4] -= block.probabilities[4] / reducingFactor;

        block.probabilities[3] += rem;

        // rem += block.probabilities[1] / reducingFactor;
        // block.probabilities[1] -= block.probabilities[1] / reducingFactor;
        // rem += block.probabilities[3] / reducingFactor;
        // block.probabilities[3] -= block.probabilities[3] / reducingFactor;
        // block.probabilities[2] += rem / 3;
        // block.probabilities[3] += rem / 3;
        // block.probabilities[4] += rem / 3;
        break;
      case 4:
        rem = 0;
        rem += block.probabilities[1] / reducingFactor;
        block.probabilities[1] -= block.probabilities[1] / reducingFactor;
        rem += block.probabilities[2] / reducingFactor;
        block.probabilities[2] -= block.probabilities[2] / reducingFactor;
        rem += block.probabilities[3] / reducingFactor;
        block.probabilities[3] -= block.probabilities[3] / reducingFactor;

        block.probabilities[4] += rem;
        break;
    }
  };

  const linearSearch = (probArray, num) => {
    let index = 0;
    while (index < probArray.length - 1) {
      if (probArray[index] >= num) break;
      index++;
    }
    // console.log(index);
    return index;
  };

  const binarySearch = (probArray, num) => {
    let left = 0,
      right = probArray.length - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (num > probArray[mid]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    // console.log("left = " + left);
    return left;
  };

  const startCollapse = () => {
    if (gridArray) {
      let flatArray = gridArray.flat().filter((block) => !block.collapsed);
      if (flatArray.length == 0) {
        console.log("end");
        end = true;
        return;
      }
      let randNo = Math.floor(Math.random() * flatArray.length);
      // console.log(randNo);

      let block = flatArray[randNo];
      // console.log(block.probabilities);
      let probabilitiesSumArray = [];
      let sum = 0;
      for (let i = 1; i < block.probabilities.length; i++) {
        sum += block.probabilities[i];
        probabilitiesSumArray.push(sum);
      }
      // console.log(probabilitiesSumArray);
      randNo = Math.random();
      // console.log(randNo);
      let imageNo = linearSearch(probabilitiesSumArray, randNo) + 1;

      collapseBlock(block, imageNo);

      //console.log(flatArray);
    }
  };

  const restartGenerator = () => {
    setGridArray(createGridArray(grid));
    clearInterval(timeInterval);
    end = false;
    createMyInterval();
  };

  const startGenerator = () => {
    createMyInterval();
  };

  const stopGenerator = () => {
    clearInterval(timeInterval);
  };

  return (
    <div className="flex flex-row gap-1">
      <div
        className={`h-[${viewPort}px] w-[${viewPort}px] `}
        ref={inputRef}
        onClick={startCollapse}
      >
        {gridArray?.map((row, rowNum) => (
          <div
            className={`flex  h-[${viewPort / grid}px] w-full`}
            style={{ height: `${viewPort / grid}px` }}
            key={rowNum}
          >
            {row?.map((block, colNum) => (
              <div
                className={`flex bg-black text-white justify-center content-center`}
                style={{
                  height: `${viewPort / grid}px`,
                  width: `${viewPort / grid}px`,
                }}
                key={colNum}
              >
                {block.image ? (
                  <img className="text-center align-middle" src={block.image} />
                ) : // <img className="text-center align-middle" src={block.image} />
                // <p className="size-fit m-auto">{`${block.row}-${block.col}`}</p>
                null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <input
          className="bg-red-300  px-2 py-1"
          type="button"
          value={"Restart"}
          onClick={() => restartGenerator()}
        />
        <input
          className="bg-green-300  px-2 py-1"
          type="button"
          value={"Start"}
          onClick={() => startGenerator()}
        />
        <input
          className="bg-yellow-300  px-2 py-1"
          type="button"
          value={"Stop"}
          onClick={() => stopGenerator()}
        />
      </div>
    </div>
  );
};
export default GeneratorComponent;
