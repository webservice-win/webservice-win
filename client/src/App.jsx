import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Details from './pages/Details'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard';
import Addcategory from './pages/admin/Addcategory'
import Addwebsite from './pages/admin/Addwebsite'
import Addtechnology from './pages/admin/Addtechnology'
import Websitelist from './pages/admin/Websitelist'
import Addfeedback from './pages/admin/Addfeedback'
import Addvideoreview from './pages/admin/Addvideoreview'
import Feedbacklist from './pages/admin/Feedbacklist'
import Videoreviewlist from './pages/admin/Videoreviewlist'
import Addvideo from './pages/admin/Addvideo'
import Videolist from './pages/admin/Videolist'
import Addcourse from './pages/admin/Addcourse'
import Courselist from './pages/admin/Courselist'
import Admissionlist from './pages/admin/Admissionlist'
import Feedback from './pages/Feedback'
import Videoreview from './pages/Videoreview'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Addbrand from './pages/admin/Addbrand'
import About from './pages/About'
import Addpayment from './pages/admin/Addpayment'
import Addsite from './pages/admin/Addsite'
import Accordion from './pages/admin/Accordion'
import Accordionlist from './pages/admin/Accordionlist'
import Websiteedit from './pages/admin/Websiteedit'
import Editaccordion from './pages/admin/Editaccordion'
import Editcourse from './pages/admin/Editcourse'
import Allpayment from './pages/Allpayment'
import Apiprovider from './pages/Apiprovider'
import Ourcustomer from './pages/Ourcustomer'
import Adminlogin from './pages/Adminlogin'
import Addmember from './pages/admin/Addmember'
import Memberlist from './pages/admin/Memberlist'
import Whoareyou from './pages/Whoareyou'
import Ourachievement from './pages/Ourachievement'
import Addacievement from './pages/admin/Addacievement'
import Achievementlist from './pages/admin/Achievementlist'
import AffiliatesHome from './pages/affiliates-dashboard/AffiliatesHome'
import Userdashboard from './pages/affiliates-dashboard/Userdashboard'
import Userprofile from './pages/user/Userprofile'
import Myorder from './pages/user/Myorder'
import Myinvoice from './pages/user/Myinvoice'
import Deposit from './pages/user/Deposit'
import Trackingorder from './pages/user/Trackingorder'
import Transiction from './pages/user/Transiction'
import Wallet from './pages/user/Wallet'
import Allcourse from './pages/user/Allcourse'
import Allproduct from './pages/user/Allproduct'
import Tutorial from './pages/user/Tutorial'
import Checkout from './pages/Checkout'
import Confirmorder from './pages/Confirmorder'
import Paymentsetting from './pages/admin/Paymentsetting'
import Addpaymentmethod from './pages/admin/Addpaymentmethod'
import Addtutorial from './pages/admin/Addtutorial'
import Tutoriallist from './pages/admin/Tutoriallist'
import Orders from './pages/admin/Orders'
import Invoice from './pages/admin/Invoice'
import Depositinvoice from './pages/user/Depositinvoice'
import Deposits from './pages/admin/Deposits'
import Addads from './pages/admin/Addads'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/"element={<Home/>}/>
        <Route exact path="/product"element={<Product/>}/>
        <Route exact path="/feedback"element={<Feedback/>}/>
        <Route exact path="/video-reviews"element={<Videoreview/>}/>
        <Route exact path="/all-payment"element={<Allpayment/>}/>
        <Route exact path="/contact"element={<Contact/>}/>
        <Route exact path="/about-us"element={<About/>}/>
        <Route exact path="/who-are-you"element={<Whoareyou/>}/>
        <Route exact path="/our-achievement"element={<Ourachievement/>}/>
        <Route exact path="/single-website-details/:id"element={<Details/>}/>
        <Route exact path="/registration"element={<Register/>}/>
        <Route exact path="/login"element={<Login/>}/>
        <Route exact path="/admin-login"element={<Adminlogin/>}/>
        {/* -----------------about us--------------- */}
        <Route exact path="/api-provider"element={<Apiprovider/>}/>
        <Route exact path="/our-customer"element={<Ourcustomer/>}/>
        <Route exact path="/orders"element={<Orders/>}/>
        <Route exact path="/deposits"element={<Deposits/>}/>
        <Route exact path="/ads"element={<Addads/>}/>
        <Route exact path="/order-invoice/:id"element={<Invoice/>}/>

        {/* ----------------admin pages------------------- */}
        <Route exact path="/dashboard"element={<Dashboard/>}/>
        <Route exact path="/websites/add-category"element={<Addcategory/>}/>
        <Route exact path="/websites/add-technology"element={<Addtechnology/>}/>
        <Route exact path="/websites/add-website"element={<Addwebsite/>}/>
        <Route exact path="/websites/edit-website/:id"element={<Websiteedit/>}/>
        <Route exact path="/websites/websites-list"element={<Websitelist/>}/>
        <Route exact path="/websites/add-brand"element={<Addbrand/>}/>
        <Route exact path="/websites/payment"element={<Addpayment/>}/>
        <Route exact path="/websites/our-site"element={<Addsite/>}/>
        <Route exact path="/websites/add-member"element={<Addmember/>}/>
        <Route exact path="/websites/member-list"element={<Memberlist/>}/>
        <Route exact path="/websites/add-achievement"element={<Addacievement/>}/>
        <Route exact path="/websites/achievement-list"element={<Achievementlist/>}/>
        <Route exact path="/websites/add-tutorial"element={<Addtutorial/>}/>
        <Route exact path="/websites/tutorial-list"element={<Tutoriallist/>}/>
      
        {/* -------------------course------------------ */}
        <Route exact path="/courses/add-course"element={<Addcourse/>}/>
        <Route exact path="/courses/courses-list"element={<Courselist/>}/>
        <Route exact path="/courses/edit-course/:id"element={<Editcourse/>}/>
        <Route exact path="/courses/admissions-list"element={<Admissionlist/>}/>
        {/* ------------------acoordion--------------- */}
        <Route exact path="/accordion/add-accordion"element={<Accordion/>}/>
        <Route exact path="/accordion/accordion-list"element={<Accordionlist/>}/>
        <Route exact path="/accordion/edit-accordion/:id"element={<Editaccordion/>}/>
      {/* -------------------video----------------- */}
        <Route exact path="/videos/add-video"element={<Addvideo/>}/>
        <Route exact path="/videos/videos-list"element={<Videolist/>}/>
        {/* ------------------review----------------- */}
        <Route exact path="/reviews/add-feedback"element={<Addfeedback/>}/>
        <Route exact path="/reviews/add-video-review"element={<Addvideoreview/>}/>
        <Route exact path="/reviews/feedback-list"element={<Feedbacklist/>}/>
        <Route exact path="/reviews/video-reviews-list"element={<Videoreviewlist/>}/>
        <Route exact path="/payment-setting"element={<Paymentsetting/>}/>
        <Route exact path="/add-payment-method"element={<Addpaymentmethod/>}/>
        
        {/* ----------------admin pages------------------- */}
        {/* ------------------user dashboard-------------------------------- */}
        <Route exact path="/user-dashboard"element={<Userdashboard/>}/>
        <Route exact path="/user-profile"element={<Userprofile/>}/>
        <Route exact path="/my-order"element={<Myorder/>}/>
        <Route exact path="/my-invoice"element={<Myinvoice/>}/>
        <Route exact path="/deposit"element={<Deposit/>}/>
        <Route exact path="/tracking-order"element={<Trackingorder/>}/>
        <Route exact path="/transictions"element={<Transiction/>}/>
        <Route exact path="/wallet"element={<Wallet/>}/>
        <Route exact path="/all-course"element={<Allcourse/>}/>
        <Route exact path="/all-product"element={<Allproduct/>}/>
        <Route exact path="/tutorial"element={<Tutorial/>}/>
        <Route exact path="/deposit-invoice/:id"element={<Depositinvoice/>}/>

        <Route exact path="/checkout/:id"element={<Checkout/>}/>
        <Route exact path="/confirm-order/:provider"element={<Confirmorder/>}/>


        {/* ------------------user dashboard-------------------------------- */}
      </Routes>
    </BrowserRouter>
  )
}

export default App