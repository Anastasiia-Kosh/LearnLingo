import Header from '../components/Header/Header'
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import HomePage from '../pages/HomePage/HomePage'
import TeachersPage from '../pages/TeachersPage/TeachersPage';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
 return (
    <BrowserRouter>
<Header />
      <Routes>
        <Route path="/" element={<HomePage /> } />
       <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
