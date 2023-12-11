import nReadlines from 'n-readlines';
import { containsNumbers, lineCountFromFile } from './utils';
import { isNumber } from './utils';

export const day01Part01 = async () => {
  const filename = './inputs/day01-input-1.txt';

  const inputFile = new nReadlines(filename);

  let runningTotal = 0;
  let line;
  while ((line = inputFile.next())) {
    const lineText = line.toString('ascii');
    console.log({ lineText });
    let bothDigits = '';
    console.log(`Line from file: ${lineText}`);
    const numbers = lineText.match(/\d+/g);
    console.log(numbers);
    if (numbers) {
      // first, get the first digit
      bothDigits = numbers[0][0];

      // second, get the second digit
      const numbersCount = numbers.length;
      const lastNumbers = numbers[numbersCount - 1];
      bothDigits += lastNumbers[lastNumbers.length - 1];
      console.log({ bothDigits });
      runningTotal += Number(bothDigits);
    }
  }

  console.log({ runningTotal });

  return runningTotal;
};

export const day01Part02 = async () => {
  const numberNames = [
    { name: 'one', value: '1' },
    { name: 'two', value: '2' },
    { name: 'three', value: '3' },
    { name: 'four', value: '4' },
    { name: 'five', value: '5' },
    { name: 'six', value: '6' },
    { name: 'seven', value: '7' },
    { name: 'eight', value: '8' },
    { name: 'nine', value: '9' },
    { name: 'ten', value: '10' },
  ];

  const filename = './inputs/day01-input-1.txt';

  const inputFile = new nReadlines(filename);

  let runningTotal = 0;
  let line;
  while ((line = inputFile.next())) {
    const lineText = line.toString('ascii');
    let bothDigits = '';
    console.log(`Line from file: ${lineText}`);
    // first look for the first number by number or string
    let i = 0;
    let foundDigit = false;
    let lettersString = '';
    while (!foundDigit && i < lineText.length) {
      const character = lineText[i];
      if (character.match(/\d+/g)) {
        // it is a number, we are done!
        bothDigits = character;
        foundDigit = true;
      } else {
        // keep track of letters and see if they are a named number
        lettersString += character.toLowerCase();
        console.log({ lettersString });
        if (
          numberNames.some((nn) =>
            lettersString.includes(nn.name.toLowerCase())
          )
        ) {
          // it is a word, add the value to bothDigits
          bothDigits =
            numberNames.find((nn) =>
              lettersString.includes(nn.name.toLowerCase())
            )?.value || '';
          foundDigit = true;
        }
      }
      i++;
    }

    // now we have to do the same thing in reverse to find the last digit
    const reverseLine = lineText.split('').reverse().join('');
    i = 0;
    foundDigit = false;
    lettersString = '';
    while (!foundDigit && i < lineText.length) {
      const character = reverseLine[i];
      if (character.match(/\d+/g)) {
        // it is a number, we are done!
        bothDigits += character;
        foundDigit = true;
      } else {
        // keep track of letters and see if they are a named number,
        // except we have to add the letters in the opposite order
        lettersString = character.toLowerCase() + lettersString;
        console.log({ lettersString });
        if (
          numberNames.some((nn) =>
            lettersString.includes(nn.name.toLowerCase())
          )
        ) {
          // it is a word, add the value to bothDigits
          bothDigits +=
            numberNames.find((nn) =>
              lettersString.includes(nn.name.toLowerCase())
            )?.value || '';
          foundDigit = true;
        }
      }
      i++;
    }

    runningTotal += Number(bothDigits);
  }

  console.log({ runningTotal });

  return runningTotal;
};

export const day02Part01 = async () => {
  const maxColorCubes = [
    { color: 'red', number: 12 },
    { color: 'green', number: 13 },
    { color: 'blue', number: 14 },
  ];
  const filename = './inputs/day02-input-1.txt';

  const inputFile = new nReadlines(filename);

  let runningTotal = 0;
  let line;
  while ((line = inputFile.next())) {
    const lineText = line.toString('ascii');
    const gameID = Number(lineText.slice(5, lineText.indexOf(':')));
    console.log({ gameID });

    let gameResults = lineText
      .slice(lineText.indexOf(':') + 1)
      .replace(/(\r\n|\n|\r)/gm, '');

    let validGame = true;
    while (gameResults.includes(';') && validGame) {
      gameResults = gameResults.slice(1);
      console.log({ gameResults });

      let nextGame = '';
      if (gameResults.includes(';')) {
        nextGame = gameResults.slice(0, gameResults.indexOf(';', 2));
      } else {
        nextGame = gameResults;
      }

      console.log({ nextGame });
      const roles = nextGame.split(',').map((item) => item.trim());
      for (const role of roles) {
        // console.log({ role });
        const parts = role.split(' ');
        const roleNum = Number(parts[0]);
        const color = parts[1];
        if (maxColorCubes.some((cube) => cube.color === color)) {
          const max =
            maxColorCubes.find((cube) => cube.color === color)?.number || 0;
          //   console.log({ max });
          if (roleNum > max) {
            validGame = false;
          }
        }
      }
      gameResults = gameResults.slice(gameResults.indexOf(';', 2));
      //   console.log({ gameResults });
    }
    if (validGame) {
      runningTotal += gameID;
      console.log(`Game ${gameID} is valid!!`);
      //   console.log({ runningTotal });
      console.log('\n');
    }
  }

  console.log({ runningTotal });

  return runningTotal;
};

export const day02Part02 = async () => {
  const filename = './inputs/day02-input-1.txt';

  const inputFile = new nReadlines(filename);

  let powerSum = 0;
  let line;
  while ((line = inputFile.next())) {
    let maxRed = 0,
      maxGreen = 0,
      maxBlue = 0;
    const lineText = line.toString('ascii');
    const gameID = Number(lineText.slice(5, lineText.indexOf(':')));
    console.log({ gameID });

    let gameResults = lineText
      .slice(lineText.indexOf(':') + 1)
      .replace(/(\r\n|\n|\r)/gm, '');
    // console.log({ gameResults });

    while (gameResults.includes(';')) {
      gameResults = gameResults.slice(1);
      console.log({ gameResults });

      let nextGame = '';
      if (gameResults.includes(';')) {
        nextGame = gameResults.slice(0, gameResults.indexOf(';', 2));
      } else {
        nextGame = gameResults;
      }

      console.log({ nextGame });
      const roles = nextGame.split(',').map((item) => item.trim());
      for (const role of roles) {
        // console.log({ role });
        const parts = role.split(' ');
        const roleNum = Number(parts[0]);
        const color = parts[1];
        if (color === 'red' && maxRed < roleNum) {
          maxRed = roleNum;
        } else if (color === 'green' && maxGreen < roleNum) {
          maxGreen = roleNum;
        } else if (color === 'blue' && maxBlue < roleNum) {
          maxBlue = roleNum;
        }
      }
      gameResults = gameResults.slice(gameResults.indexOf(';', 2));
      //   console.log({ gameResults });
    }
    powerSum = powerSum + maxRed * maxGreen * maxBlue;
  }

  console.log({ powerSum });

  return powerSum;
};

export const day03Part01 = async () => {
  const filename = './inputs/day03-input-1.txt';

  const inputFile = new nReadlines(filename);

  const lineCount = 3; //Number(await lineCountFromFile(filename));
  console.log({ lineCount });

  let runningTotal = 0;
  let lineNum = 1;
  let secondLineFromPrevRun;

  // const lineText = line.toString('ascii');
  //
  // const currentChar = lineText[firstNonPeriodIndex];
  // if(isNumber(currentChar)) {

  // }
  let line = inputFile.next();
  let lineText = line.toString('ascii').replace('\r', '');
  console.log({ lineText });

  let nextLine = inputFile.next();
  let nextLineText = nextLine.toString('ascii').replace('\r', '');
  console.log({ nextLineText });

  let previousLineText = '';

  while (lineNum < lineCount) {
    if (lineText.length === nextLineText.length) {
      console.log('Lines are equal length!');
    }

    let subLineText = lineText;
    while (subLineText.length) {
      if (containsNumbers(subLineText)) {
        const firstNonPeriodIndex = subLineText.search(/[^.\n]/g);
        const charBeforeNumber =
          firstNonPeriodIndex === 0
            ? '.'
            : subLineText[firstNonPeriodIndex - 1];
        subLineText = subLineText.slice(firstNonPeriodIndex);
        // console.log({ 1: subLineText });
        if (isNumber(Number(subLineText[0]))) {
          // found a number!  search until not a number found
          const numberEndsIndex = subLineText.search(/[^0-9\n]/g);
          const theNumber = Number(subLineText.slice(0, numberEndsIndex));
          console.log({ theNumber });
          // find the diff between lineText length and subLineText length to add
          const linesDiff = lineText.length - subLineText.length;
          let numberStartIndex = linesDiff;
          let numberEndIndex = numberStartIndex + theNumber.toString().length;
          // console.log({ numberStartIndex, numberEndIndex });
          subLineText = subLineText.slice(numberEndsIndex);
          const charAfterNumber = subLineText[0];
          // console.log({ 2: subLineText });

          // ******* now we run checks on the number ******* //

          let alreadyAddedPartNo = false;

          // first check the character before for a non-period non-number

          const notPeriodOrNumberRegex = /[^.0-9]/;
          if (notPeriodOrNumberRegex.test(charBeforeNumber)) {
            console.log(
              `${theNumber} has a special char before and so its a part number!!!`
            );
            runningTotal += theNumber;
            alreadyAddedPartNo = true;
          }

          // second check the character after for a non-period non-number
          if (
            notPeriodOrNumberRegex.test(charAfterNumber) &&
            !alreadyAddedPartNo
          ) {
            console.log(
              `${theNumber} has a special char after and so its a part number!!!`
            );
            runningTotal += theNumber;
            alreadyAddedPartNo = true;
          }

          // third we need to check the next line if it has a special character touching this number
          // first get the characters in the range that could touch this number
          const rangeStart = numberStartIndex === 0 ? 0 : numberStartIndex - 1;
          const rangeEnd =
            numberEndIndex < nextLineText.length - 2
              ? numberEndIndex + 1
              : nextLineText.length - 1;
          const nextLineTouchingRange = nextLineText.slice(
            rangeStart,
            rangeEnd
          );
          // console.log({ nextLineTouchingRange });
          if (
            notPeriodOrNumberRegex.test(nextLineTouchingRange) &&
            !alreadyAddedPartNo
          ) {
            console.log(
              `${theNumber} is touching a special char below it and so its a part number!!!`
            );
            runningTotal += theNumber;
          }
        } else {
          // console.log(subLineText[0] + ' is not a number!');
          // console.log({ subLineText });
        }
      } else {
        subLineText = '';
      }
      previousLineText = lineText;
      lineText = nextLineText;
      nextLine = inputFile.next();
      nextLineText = nextLine.toString('ascii').replace('\r', '');
      console.log({runningTotal});
    }

    lineNum++;
  }

  //   // first find all part numbers that are in this line only
  //   let sub = lineText;
  //   while(sub.length) {
  //     sub = sub.slice()

  //   }
  // }

  console.log({ runningTotal });

  return runningTotal;
};
