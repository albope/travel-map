import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import CountryList from './components/CountryList';
import MapComponent from './components/MapComponent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100 overflow-hidden">
      <header className="flex justify-between items-center w-full p-4 bg-white shadow">
        <div className="flex space-x-4">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo h-12" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react h-12" alt="React logo" />
          </a>
        </div>
        <h1 className="text-2xl font-bold text-black text-center flex-grow">Countries visited</h1>
      </header>

      <main className="flex-grow flex w-full overflow-hidden">
        <div className="w-1/4 p-4 flex flex-col justify-between">
          <CountryList />
          <div className="mt-4 p-4 bg-white shadow-md rounded-md">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </button>
            <p className="mt-4">
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
        </div>
        <div className="flex-grow h-full">
          <MapComponent />
        </div>
      </main>
    </div>
  );
}

export default App;