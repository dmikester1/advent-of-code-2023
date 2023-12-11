import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import { day01Part01, day01Part02, day02Part01, day02Part02, day03Part01 } from './solutions';
import { lineCount } from './utils';
// import axios from "axios";

const router = express.Router();



const funcs: { [K: string]: Function } = {
  day01Part01, day01Part02, day02Part01, day02Part02, day03Part01
};

router.get('/getInputsStats', async (req, res) => {
  try {
    const data = await fs.readFile('./inputs/day01-input-1.txt', {
      encoding: 'utf8',
    });
    const lines = lineCount(data);
    console.log({ lines });
    res.send({ lines, chars: data.length });
  } catch (err) {
    console.log({ err });
  }
});

router.get('/getPuzzleSolution', async (req, res) => {
  const puzzleID:string = req.query.puzzleID;
  console.log({puzzleID})
  const solution = (await funcs[puzzleID]()).toString();
  console.log({solution})

  // switch (puzzleID) {
  //   case 'day01part01':
  //     solution = (await day01Part01()).toString();
  //     break;
  //     case 'day01part02':
  //     solution = (await day01Part02()).toString();
  //     break;
  //     case 'day02part01':
  //     solution = (await day02Part01()).toString();
  //     break;
  //   default:
  //     solution = 'Invalid puzzle id provided.';
  // }
  res.send(solution);
});

export default router;
