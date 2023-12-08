import Puzzles from "./components/Puzzles";


const App = () => {
  return (
    <div className={'d-flex vh-100 align-items-center'}>
      <div className='container'>
        <header>
        <h3 className={'title text-center mt-3'}>Advent of Code 2023</h3>
        </header>
        <Puzzles />
      </div>
    </div>
  );
};

export default App;
