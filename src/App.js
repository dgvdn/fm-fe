import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SidebarNav from './components/SidebarNav';
import FresherManagement from './components/FresherManagement';

function App() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path='/fresher-management' element={<FresherManagement />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
