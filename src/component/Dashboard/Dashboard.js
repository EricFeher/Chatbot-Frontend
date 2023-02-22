import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '../../utils/PrivateRoute';
import Test from '../Test/Test';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import Alert from './Alerts/Alert';
import PageNotFound from '../NotFound';
import Commands from './Commands/Commands';

function Dashboard() {


  return (
    <>
       <Sidebar />
       <div className='w-[calc(100%-128px)] h-[calc(100%-112px)] absolute top-20 left-24 bg-lightGray rounded-xl border-4 shadow-2xl shadow-darkGray border-darkGray overflow-scroll scrollbar'>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path='/' element={<Main />}/>
                <Route path='/dashboard' element={<Test />}/>
                <Route path='/alertbox/*' element={<Alert />}/>
                <Route path='/commands' element={<Commands />}/>
                <Route path='*' element={<PageNotFound />}/>
            </Route>
        </Routes>
       </div>
        
    </>
  );
}

export default Dashboard;
