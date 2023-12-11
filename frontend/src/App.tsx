import Scrollbars from "rc-scrollbars";
import Puzzles from "./components/Puzzles";


const App = () => {
  return (
    <div className={'d-flex vh-100 align-items-center'}>
      <div className='container'>
        <header>
        <h3 className={'title text-center mt-3'}>Advent of Code 2023</h3>
        </header>
        <Scrollbars
						autoHeight
						autoHide
						autoHeightMin={0}
						autoHeightMax={'calc(100vh - 150px)'}
						// Hide delay in ms
						autoHideTimeout={1000}
						// Duration for hide animation in ms.
						autoHideDuration={200}
					>
        <Puzzles />
        </Scrollbars>
      </div>
    </div>
  );
};

export default App;
