import { memo, useState } from 'react';
import { useQuery } from 'react-query';
import { getInputsStats, getPuzzleSolution } from '../utils/APIFunctions';
import { getFormattedDate } from '../utils/dateUtils';

type Solution = {
  id: string;
  solution: string;
};

const numberOfPuzzleDays = 2;
const startDate = new Date(2023, 11, 1);
console.log({ startDate });
const Puzzles = memo(() => {
  const [solutions, setSolutions] = useState([]);
  const {
    data: stats,
    error,
    isLoading,
  } = useQuery('postsData', getInputsStats);

  console.log({ stats });

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const getSolution = async (puzzleID: string) => {
    const solution: string= await getPuzzleSolution(
      puzzleID
    );
    console.log({ solution });
    if (solutions.some((sol:Solution) => sol.id === puzzleID)) {
      setSolutions((prev: Solution[]) => {
        return prev.map((ps) =>
          ps.id === puzzleID ? { id: puzzleID, solution } : ps
        );
      });
    } else {
      setSolutions((prev: Solution[]) => {
        return [...prev, { id: puzzleID, solution }];
      });
    }
  };

  return (
    <div>
      {[...Array(numberOfPuzzleDays)].map((_, index) => {
        const puzzleDate = new Date(startDate.getTime());
        puzzleDate.setDate(puzzleDate.getDate() + index);

        console.log({ puzzleDate, startDate });

        const dayNum = index + 1;
        const puzzleIDOne =
          'day' + dayNum.toString().padStart(2, '0') + 'Part01';
        const puzzleIDTwo =
          'day' + dayNum.toString().padStart(2, '0') + 'Part02';
        return (
          <div className='puzzle' key={index}>
            <h3 className='title'>
              Day #{index + 1} - {getFormattedDate(puzzleDate)}
            </h3>
            <div className='body'>
              <div className={'my-1 pb-2 border-bottom border-light'}>
                <h5>Puzzle #1</h5>
                <div className={'d-flex justify-content-around mb-2'}>
                  <strong>
                    <u>Input stats</u>
                  </strong>
                  <div>Number of Lines: {stats.lines}</div>
                  <div>Number of Chars: {stats.chars}</div>
                </div>
                <div className={'row'}>
                  <div className={'col-5 mx-auto row'}>
                    <div className={'col-6'}>
                      <button
                        className={'btn btn-light'}
                        onClick={() => getSolution(puzzleIDOne)}
                      >
                        Get Answer
                      </button>
                    </div>
                    <div className={'col-6'}>
                      <input
                        type='text'
                        className='form-control'
                        value={
                          solutions.find((s) => s.id === puzzleIDOne)
                            ?.solution || ''
                        }
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={'my-1'}>
                <h5>Puzzle #2</h5>
                <div className={'d-flex justify-content-around mb-2'}>
                  <strong>
                    <u>Input stats</u>
                  </strong>
                  <div>Number of Lines: {stats.lines}</div>
                  <div>Number of Chars: {stats.chars}</div>
                </div>
                <div className={'row'}>
                  <div className={'col-5 mx-auto row'}>
                    <div className={'col-6'}>
                      <button
                        className={'btn btn-light'}
                        onClick={() => getSolution(puzzleIDTwo)}
                      >
                        Get Answer
                      </button>
                    </div>
                    <div className={'col-6'}>
                      <input
                        type='text'
                        className='form-control'
                        value={
                          solutions.find((s) => s.id === puzzleIDTwo)
                            ?.solution || ''
                        }
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    //   <div className='puzzle'>
    //     <h3 className='title'>Day #1 - 12-1-23</h3>
    //     <div className='body'>
    //       <div className={'my-1 pb-1'}>
    //         <h5>Puzzle #1</h5>
    //         <div className={'d-flex justify-content-around mb-2'}>
    //           <strong>
    //             <u>Input stats</u>
    //           </strong>
    //           <div>Number of Lines: {stats.lines}</div>
    //           <div>Number of Chars: {stats.chars}</div>
    //         </div>
    //         <div className={'row'}>
    //           <div className={'col-5 mx-auto row'}>
    //             <div className={'col-6'}>
    //               <button
    //                 className={'btn btn-light'}
    //                 onClick={() => getSolution('day01part01')}
    //               >
    //                 Get Answer
    //               </button>
    //             </div>
    //             <div className={'col-6'}>
    //               <input
    //                 type='text'
    //                 className='form-control'
    //                 value={
    //                   solutions.find((s) => s.id === 'day01part01')?.solution ||
    //                   ''
    //                 }
    //                 readOnly
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={'my-1'}>
    //         <h5>Puzzle #2</h5>
    //         <div className={'d-flex justify-content-around mb-2'}>
    //           <strong>
    //             <u>Input stats</u>
    //           </strong>
    //           <div>Number of Lines: {stats.lines}</div>
    //           <div>Number of Chars: {stats.chars}</div>
    //         </div>
    //         <div className={'row'}>
    //           <div className={'col-5 mx-auto row'}>
    //             <div className={'col-6'}>
    //               <button
    //                 className={'btn btn-light'}
    //                 onClick={() => getSolution('day01part02')}
    //               >
    //                 Get Answer
    //               </button>
    //             </div>
    //             <div className={'col-6'}>
    //               <input
    //                 type='text'
    //                 className='form-control'
    //                 value={
    //                   solutions.find((s) => s.id === 'day01part02')?.solution ||
    //                   ''
    //                 }
    //                 readOnly
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='puzzle'>
    //     <h3 className='title'>Day #1 - 12-1-23</h3>
    //     <div className='body'>body</div>
    //   </div>
    // </div>
  );
});

export default Puzzles;
