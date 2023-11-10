import './App.css';
import AppHeader from './components/HeaderNav/AppHeader';
import AppRoute from './AppRoute';
import AppNav from './components/HeaderNav/AppNav';
import AppNavHome2 from './components/HeaderNav/AppNavHome2';

function App() {
  return (
    <div className="App">
      <div>
        <AppHeader />
      </div>
      <div className='AppRouteWrap'>
        <AppRoute />
      </div>
      <div>
        <AppNav />
      </div>
      {/* 정비소Home의 Nav */}
      {/* <div>
        <AppNavHome2 />
      </div> */}
    </div>
  );
}

export default App;
