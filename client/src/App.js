import './App.css';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import EditBook from './components/EditBook';
import AddBook from './components/AddBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/books' element={<AddBook />} exact />
          <Route path='/books/:id' element={<EditBook />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
