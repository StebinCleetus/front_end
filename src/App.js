import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import TimeTracker from './components/TimeTracker';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import EmployeePage from './components/EmployeePage';
import Test from './components/Test';
import Footer from './components/Footer';



function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/login' exact element={<LoginPage/>}/>
          <Route path='/admin' exact element={<AdminPage/>}/>
          <Route path='/employee' exact element={<EmployeePage/>}/>
          
          
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
