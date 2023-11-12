import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SidebarNav from './components/SidebarNav';
import FresherManagement from './components/FresherManagement';
import AddFresher from './components/AddFresher';
import UpdateFresher from './components/UpdateFresher';

function App() {
  return (
    <div className="flex h-screen">
      <SidebarNav />
      <div className="flex-1 p-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path='/fresher-management' element={<FresherManagement />} />
          <Route path='/add-fresher' element={<AddFresher />} />
          <Route path="/fresher-management/update/:id" element={<UpdateFresher />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
