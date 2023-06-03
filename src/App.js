import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Adduser from './Component/Adduser';
import Edituser from './Component/Edituser';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/adduser' element={<Adduser/>}></Route>
      <Route path='/edituser' element={<Edituser/>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
