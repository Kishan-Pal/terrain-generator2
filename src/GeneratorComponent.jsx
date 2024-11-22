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
var radius = 5;
var strictness = 5;
var end = false;
var timeInterval = 0;

const GeneratorComponent = () => {
  // const [probabilities, setProbabilities] = useState([0.25, 0.25, 0.25, 0.25]);
  const [gridArray, setGridArray] = useState();
  const [imageArray, setImageArray] = useState();
  const inputRef = useRef();
  const formInputRefs = useRef(new Array(6));

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
    verifyForm();
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
    //console.log(e);
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
        if (gridArray[i][j].collapsed) continue;
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
    // let strictness = 5;
    let temp = 0;
    switch (imageNo) {
      case 1:
        rem = 0;
        temp = block.probabilities[2] / strictness;
        block.probabilities[2] -= temp;
        rem += temp;
        temp = block.probabilities[3] / strictness;
        block.probabilities[3] -= temp;
        rem += temp;
        temp = block.probabilities[4] / strictness;
        block.probabilities[4] -= temp;
        rem += temp;
        block.probabilities[1] += rem;
        //console.log(block.probabilities[1]);
        break;
      case 2:
        rem = 0;
        temp = block.probabilities[1] / strictness;
        block.probabilities[1] -= temp;
        rem += temp;
        temp = block.probabilities[3] / strictness;
        block.probabilities[3] -= temp;
        rem += temp;
        temp = block.probabilities[4] / strictness;
        block.probabilities[4] -= temp;
        rem += temp;
        block.probabilities[2] += rem;
        //console.log(block.probabilities[2]);
        break;
      case 3:
        rem = 0;
        temp = block.probabilities[1] / strictness;
        block.probabilities[1] -= temp;
        rem += temp;
        temp = block.probabilities[2] / strictness;
        block.probabilities[2] -= temp;
        rem += temp;
        temp = block.probabilities[4] / strictness;
        block.probabilities[4] -= temp;
        rem += temp;
        block.probabilities[3] += rem;
        //console.log(block.probabilities[3]);

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
        temp = block.probabilities[1] / strictness;
        block.probabilities[1] -= temp;
        rem += temp;
        temp = block.probabilities[2] / strictness;
        block.probabilities[2] -= temp;
        rem += temp;
        temp = block.probabilities[3] / strictness;
        block.probabilities[3] -= temp;
        rem += temp;
        block.probabilities[4] += rem;
        //console.log(block.probabilities[4]);
        break;
    }
    if (rem >= 1) {
      console.log(rem, imageNo);
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
    if (!verifyForm()) {
      console.log("invalid probabilities.");
      return;
    }
    setGridArray(createGridArray(grid));
    clearInterval(timeInterval);
    end = false;
    createMyInterval();
  };

  const verifyForm = () => {
    let sum = 0.0;
    for (let i = 0; i < 4; i++) {
      sum += parseFloat(formInputRefs.current[i].value);
    }
    let lastProbability = parseFloat(formInputRefs.current[3].value);
    if (sum !== 1) {
      lastProbability = 1 - sum + parseFloat(formInputRefs.current[3].value);
    }
    if (lastProbability >= 0) {
      formInputRefs.current[3].value = lastProbability;
    } else {
      return false;
    }
    if (parseInt(formInputRefs.current[4].value) < 1) {
      formInputRefs.current[4].value = 1;
    } else {
      formInputRefs.current[4].value = parseInt(formInputRefs.current[4].value);
    }
    if (parseInt(formInputRefs.current[5].value) < 1) {
      formInputRefs.current[5].value = 1;
    } else {
      formInputRefs.current[5].value = parseInt(formInputRefs.current[5].value);
    }
    useFormValues();
    return true;
  };

  const useFormValues = () => {
    // let tempProbabilityArray = [];
    // for (let i = 0; i < 4; i++) {
    //   tempProbabilityArray.push(parseFloat(formInputRefs.current[i].value));
    // }
    // setProbabilities(tempProbabilityArray);
    for (let i = 0; i < 4; i++) {
      probabilities[i] = parseFloat(formInputRefs.current[i].value);
    }
    console.log(probabilities);
    strictness = parseInt(formInputRefs.current[4].value);
    radius = parseInt(formInputRefs.current[5].value);
  };

  const startGenerator = () => {
    createMyInterval();
  };

  const stopGenerator = () => {
    clearInterval(timeInterval);
  };

  return (
    <div className="flex flex-row m-2 gap-2">
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
      <div>
        <div className="">
          <div className="flex flex-col gap-2 w-[200px]">
            <div className="flex gap-2">
              <img className="size-[70px]" src={image1} />
              <label className="hidden" htmlFor="tree-probability">
                Tree probability
              </label>
              <input
                name="tree-probability"
                className="px-2 py-1 w-full border-black border-[1px] outline-none rounded-lg"
                type="text"
                ref={(el) => (formInputRefs.current[0] = el)}
                defaultValue={0.25}
              />
            </div>
            <div className="flex gap-2 ">
              <img className="size-[70px]" src={image2} />
              <label className="hidden" htmlFor="grass-probability">
                Grass probability
              </label>
              <input
                name="grass-probability"
                className="px-2 py-1 w-full border-black border-[1px] outline-none rounded-lg"
                type="text"
                ref={(el) => (formInputRefs.current[1] = el)}
                defaultValue={0.25}
              />
            </div>
            <div className="flex gap-2">
              <img className="size-[70px]" src={image3} />
              <label className="hidden" htmlFor="sand-probability">
                Sand probability
              </label>
              <input
                name="sand-probability"
                className="px-2 py-1 w-full border-black border-[1px] outline-none rounded-lg"
                type="text"
                ref={(el) => (formInputRefs.current[2] = el)}
                defaultValue={0.25}
              />
            </div>
            <div className="flex gap-2">
              <img className="size-[70px]" src={image4} onClick={verifyForm} />
              <label className="hidden" htmlFor="water-probability">
                Water probability
              </label>
              <input
                name="water-probability"
                className="px-2 py-1 w-full border-black border-[1px] outline-none rounded-lg"
                type="text"
                ref={(el) => (formInputRefs.current[3] = el)}
                defaultValue={0.25}
              />
            </div>

            <div className="flex gap-2">
              <label htmlFor="strictness" className="w-[70px] flex-shrink-0">
                Strictness
              </label>
              <input
                name="strictness"
                className="px-2 py-1 w-full border-black border-[1px] outline-none rounded-lg"
                defaultValue={5}
                ref={(el) => (formInputRefs.current[4] = el)}
                type="text"
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="radius" className="w-[70px] flex-shrink-0">
                Radius
              </label>
              <input
                name="radius"
                className="px-2 py-1 w-full border-black border-[1px] outline-none rounded-lg"
                defaultValue={5}
                ref={(el) => (formInputRefs.current[5] = el)}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-1 w-[200px]">
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
    </div>
  );
};
export default GeneratorComponent;
