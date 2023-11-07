import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SidebarNav from './components/SidebarNav';
import FresherManagement from './components/FresherManagement';
import AddFresher from './components/AddFresher';

function App() {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path='/fresher-management' element={<FresherManagement />} />
          <Route path='/add-fresher' element={<AddFresher />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
