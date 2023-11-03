import logo from './logo.svg';
import './App.css';
import BtnNormal from './components/BtnNormal';

function App() {
  function testFunc() {
    console.log("Test");
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          안녕하세요
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <BtnNormal contents="예약하기" onClick={testFunc}/>
      </header>
    </div>
  );
}

export default App;
