// import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar/sidebar';
import Dashboard from './pages/Dashboard/dashboard';
import Home from './pages/home/home';
import {Routes,Route,useNavigate,} from 'react-router-dom'
import {useState,useEffect} from 'react';
import Member from './pages/Member/member';
import GeneralUser from './pages/GeneralUser/generalUser';
import MemberDetail from './pages/MemberDetail/memberDetail';
import Batch from './pages/batch/batch';
import BatchMembers from './components/BatchMembers/BatchMember';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    let isLogedIn = localStorage.getItem("isLogin");
    if(isLogedIn){
      setIsLogin(true);
       navigate('/dashboard')
      
    }else{
      setIsLogin(false)
      navigate('/');
    }
  },[localStorage.getItem("isLogin")])
  return (
    <div className="flex">
      {
        isLogin &&  <Sidebar/>
      }
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/member' element={<Member/>} />
        <Route path='/specific/:page' element={<GeneralUser/>} />
        <Route path='/member/:id' element={<MemberDetail/>} />
        <Route path='/batch' element={<Batch/>} />
        <Route path='/batch/:id' element={<BatchMembers/>} />
      </Routes>
      
   
    </div>
  );
}

export default App;
