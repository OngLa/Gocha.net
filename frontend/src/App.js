import './App.css';
import AppHeader from './components/AppHeader';
import AppRoute from './AppRoute';
import AppNav from './components/AppNav';

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
    </div>
  );
}

export default App;
