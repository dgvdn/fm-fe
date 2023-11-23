import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SidebarNav from './components/SidebarNav';
import FresherManagement from './components/FresherManagement';
import AddFresher from './components/AddFresher';
import UpdateFresher from './components/UpdateFresher';
import CenterManagement from './components/CenterManagement';
import AddCenter from './components/AddCenter';
import UpdateCenter from './components/UpdateCenter';
import MarkCalculation from './components/MarkCalculation';
import StatisticsPage from './components/StatisticsPage';
import MarkStatisticPage from './components/MarkStatisticPage';
import CenterStatisticPage from './components/CenterStatisticPage';
import MarkManagement from './components/MarkManagement';
import MarkDetails from './components/MarkDetails';
import StatusStatisticPage from './components/StatusStatisticPage';
import FresherListByStatus from './components/FresherListByStatus';
import LanguageStatisticPage from './components/LanguageStatisticPage';

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
          <Route path='/center-management' element={<CenterManagement />} />
          <Route path='/add-center' element={<AddCenter />} />
          <Route path='/update-center/:id' element={<UpdateCenter />} />
          <Route path='/mark-management' element={<MarkManagement />} />
          <Route path='/mark-management/:id' element={<MarkDetails />} />
          <Route path='/mark-calculation' element={<MarkCalculation />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='/mark-statistic' element={<MarkStatisticPage />} />
          <Route path='/center-statistic' element={<CenterStatisticPage />} />
          <Route path='/status-statistic' element={<StatusStatisticPage />} />
          <Route path='/fresher-list/:status' element={<FresherListByStatus />} />
          <Route path='/language-statistic' element={<LanguageStatisticPage />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
