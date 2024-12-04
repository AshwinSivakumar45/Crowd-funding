import './App.css';
import ForgetPassword from './Components/ForgetPassword';
import Navbar from './Components/Navbar';
import Otp from './Components/Otp';
import Recovery from './Components/Recovery';
import SignIn from './Components/Sigin';
import SignUp from './Components/Signup';
import Home from './Components/Home'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Campaigns from './Components/Campaigns';
import AllCategory from './Components/AllCategories';
import Education from './Components/Education';
import Animal from './Components/Animal';
import Business from './Components/Business';
import Medical from './Components/Medical';
import Dynamic from './Components/Dynammic route';
import FundraiserForm from './Components/Fundraiser';
import FundraiserMaintain from './Components/CampaignMaintain';
import Accountverify from './Components/Account verify';
import Details from './Components/Details';
import Quries from './Components/Quries';
import Dashboard from './Components/Dashboard/Dashboard';
import MyFundraise from './Components/Dashboard/Myfundraise';
import Profile from './Components/Dashboard/Profile';
import Feedback from './Components/Dashboard/Feedback';
import ProtectedRoute from '../src/Protectedroute'
import SearchBar from './Components/search';
import DonationCard from './Components/Donation';
import FundraiserLiveBanner from './Components/FundraiserLiveBanner';
import FundEdit from './Components/FunderaiserEdit';
import Success from './Components/Success';
import AdminDashboard from './Components/Admin';
import Sidebar from './Components/Admin/sidebar';
import ContentArea from './Components/Admin/component';
import Admin from './Components/Admin';

function App() {
  const token = localStorage.getItem('authToken');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
             {/*   <Route path='/' element={token ? <Home /> : <SignIn />} /> */}

        <Route path='/' element={<Home />} />  
        <Route path='/SignIn' element={<SignIn/>}  />  
        <Route path='/register' element={<SignUp />} />
        <Route path='/recovery' element={<Recovery />} />
        <Route path='/otpverify' element={<Otp />} />
        <Route path='/reset' element={<ForgetPassword />} />
        <Route path='/Home' element={<Home />} />

        <Route path='/Campaigns' element={<Campaigns />}>
          <Route path='AllCategory' index element={<AllCategory />} />
          <Route path='Education' element={<Education />} />
          <Route path='Animal' element={<Animal />} />
          <Route path='Business' element={<Business />} />
          <Route path='Medical' element={<Medical />} />
        </Route>

        <Route path='/fundraiser' element={<ProtectedRoute element={<FundraiserForm />} />} />
        <Route path='/CampainMaintain/:_id' element={<ProtectedRoute element={<FundraiserMaintain />} />} />
        <Route path='/verify' element={<ProtectedRoute element={<Accountverify />} />} />
        <Route path='/Details/:id' element={<ProtectedRoute element={<Details />} />} />
        <Route path='/quries' element={<ProtectedRoute element={<Quries />} />} />

        <Route path='/Dashboard' element={<Dashboard />}>
          <Route path='MyFunds' element={<MyFundraise />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='Feedback' element={<Feedback />} />
        </Route>

        <Route path="/search" element={<ProtectedRoute element={<SearchBar/>}/>}/>
        <Route path='/donation' element={<ProtectedRoute element={<DonationCard/>}/>}/>
        <Route path='/liveBanner' element={<ProtectedRoute element={<FundraiserLiveBanner/>}/>}/>
        <Route path='/EditFund/:_id' element={<ProtectedRoute element={<FundEdit/>}/>}/>
        <Route path='/Success' element={<Success/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/AdminSidebar' element={<Sidebar/>}/>
        <Route path='/Admincontent' element={<ContentArea/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
