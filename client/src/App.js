import './App.css';
import { HomePage } from './homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div className="App">
            <h1 className='headertitle'>Simple CRUD with MariaDB</h1>
            <HomePage />
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
