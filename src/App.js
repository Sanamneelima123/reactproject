import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import React, { lazy } from 'react';
import Home from "./MyFiles/Home";
import About from "./MyFiles/About";
import Contact from "./MyFiles/Contact";
// import Nopage from "./MyFiles/Nopage";
import Services from './MyFiles/Services';
import Props1 from './MyFiles/Props/Props1';
import Props2 from './MyFiles/Props/Props2';
import Props3 from './MyFiles/Props/Props3';
import Events1 from './MyFiles/Events/Events1';
import { Imports } from './MyFiles/ImportsandExports/Imports';
import Usestate1 from './MyFiles/Hooks/Usestate1';
import Usestate2 from './MyFiles/Hooks/Usestate2';
import Usestatetwo from "./MyFiles/Hooks/Usestatetwo2";
import Usestate3 from './MyFiles/Hooks/Usestate3';
import Usestate4 from './MyFiles/Hooks/Usestate4';
import Usestate5 from './MyFiles/Hooks/Usestate5';
import Usestate6 from './MyFiles/Hooks/Usestate6';
import Usestate7 from './MyFiles/Hooks/Usestate7';
// import Usestate8 from './MyFiles/Hooks/Usestate8';
import Usestate88 from './MyFiles/Hooks/Usestate88';
import Usestate99 from './MyFiles/Hooks/Usestate99';
import Usestate10 from './MyFiles/Hooks/Usestate10';
import Usestate11 from './MyFiles/Hooks/Usestate11';
import Usestate12 from './MyFiles/Hooks/Usestate12';
import Usestate13 from './MyFiles/Hooks/Usestate13';
import Usestate14 from './MyFiles/Hooks/Usestate14';
import Usestate15 from './MyFiles/Hooks/Usestate15';
import Useeffect1 from './MyFiles/Hooks/Useeffect/Useeffect1';
import Useeffect2 from './MyFiles/Hooks/Useeffect/Useeffect2';
import Useeffect3 from './MyFiles/Hooks/Useeffect/Useeffect3';
import Useeffect4 from './MyFiles/Hooks/Useeffect/Useeffect4';
import Useeffect5 from './MyFiles/Hooks/Useeffect/Useeffect5';
import Useeffect6 from './MyFiles/Hooks/Useeffect/Useeffect6';
import Useeffect7 from './MyFiles/Hooks/Useeffect/Useeffect7';
import Useeffect8 from './MyFiles/Hooks/Useeffect/Useeffect8';
import Usereducer from './MyFiles/Hooks/Usereducer/Usereducer';
import Usereducer1 from './MyFiles/Hooks/Usereducer/Usereducer1';
import UseContext1 from './MyFiles/Hooks/Usecontext/Usecontext1';
import Usereducer2 from './MyFiles/Hooks/Usereducer/Usereducer2';
import Usereducer3 from './MyFiles/Hooks/Usereducer/Usereducer3';
import Usereducer5 from './MyFiles/Hooks/Usereducer/Usereducer5';
import Usereducer6 from './MyFiles/Hooks/Usereducer/Usereducer6';
import Usereducer7 from './MyFiles/Hooks/Usereducer/Usereducer7';
import Usereducer8 from './MyFiles/Hooks/Usereducer/Usereducer8';
import Usereducer9 from './MyFiles/Hooks/Usereducer/Usereducer9';
import Usereducer10 from './MyFiles/Hooks/Usereducer/Usereducer10';
import Usereducer11 from './MyFiles/Hooks/Usereducer/Usereducer11';
import Usereducer12 from './MyFiles/Hooks/Usereducer/Usereducer12';
import Usereducer13 from './MyFiles/Hooks/Usereducer/Usereducer13';
import Usecustome1 from './MyFiles/CustomeHooks/Usecustome1';
import Useexp1 from './MyFiles/CustomeHooks/Useexp1';
import Finalapi1 from './MyFiles/CustomeHooks/Finalapi1';
import Finalapi2 from './MyFiles/CustomeHooks/Finalapi2';
// import Usereducer4 from './MyFiles/Hooks/Usereducer/Usereducer4';
import Useref1 from './MyFiles/Hooks/Useref/Useref1';
import Useref2 from './MyFiles/Hooks/Useref/Useref2';
import Usesteexp from './MyFiles/Hooks/Usesteexp';
import PageTitleOne from './MyFiles/CustomeHooks/PageTitleOne';
import UsePageTitle from './MyFiles/CustomeHooks/UsePageTitle';
import NavigationOtherPage from './MyFiles/Props/RouterHooks/NavigationOtherPage';
import Nastedexp1 from './MyFiles/Props/RouterHooks/Nastedexp1';
import Nastedexp2 from './MyFiles/Props/RouterHooks/Nastedexp2';
import Users from './MyFiles/DynamicRoutes/Users';
import Userdetails from './MyFiles/DynamicRoutes/UserDetails';
import Users1 from './MyFiles/DynamicRoutes/Users1';
import UserDetails1 from './MyFiles/DynamicRoutes/UserDetails1';
import About1 from './MyFiles/Props/RouterHooks/About1';
import About2 from './MyFiles/Props/RouterHooks/About2';
import Navigation1 from './MyFiles/Props/RouterHooks/Navigation1';
import NewUser from './MyFiles/DynamicRoutes/Newuser';
import Userdata from './MyFiles/DynamicRoutes/Userdata';
import Usestate77 from './MyFiles/Hooks/Usestate77';
import Alldetails from './MyFiles/DynamicRoutes/Alldetails';
import Mydata from './MyFiles/DynamicRoutes/Mydata';
import Usereducer14 from './MyFiles/Hooks/Usereducer/Usereducer14';
import Mydetails from './MyFiles/DynamicRoutes/Mydetails';
import Use11 from './MyFiles/CustomeHooks/Use11';
import Usereducer15 from './MyFiles/Hooks/Usereducer/Usereducer15';
import User15 from './MyFiles/DynamicRoutes/User15';
import Usestate66 from './MyFiles/Hooks/Usestate66';
import Use66 from './MyFiles/DynamicRoutes/Use66';
import Usereducer16 from './MyFiles/Hooks/Usereducer/Usereducer16';
import User16 from './MyFiles/CustomeHooks/User16';
import Barchart1 from './MyFiles/Hooks/Chats/Barchart1';
import Usereducer17 from './MyFiles/Hooks/Usereducer/Usereducer17';
import User17 from './MyFiles/DynamicRoutes/User17';
import Linechart from './MyFiles/Hooks/Chats/Linechart';
import Userchart from './MyFiles/Hooks/Chats/Userchart';
import Use10 from './MyFiles/DynamicRoutes/Use10';
import Usestate44 from './MyFiles/Hooks/Usestate44';
import Usestate55 from './MyFiles/Hooks/Usestate55';
import Use55 from './MyFiles/DynamicRoutes/Use55';
import Charts from './MyFiles/Hooks/Chats/Charts';
import Use44 from './MyFiles/DynamicRoutes/Use44';
import Usestate33 from './MyFiles/Hooks/Usestate33';
import Use33 from './MyFiles/DynamicRoutes/Use33';
import Usestate22 from './MyFiles/Hooks/Usestate22';
import Use22 from './MyFiles/DynamicRoutes/Use22';
import Usestate21 from './MyFiles/Hooks/Usestate21';
import Use21 from './MyFiles/DynamicRoutes/Use21';
import Usepost from './MyFiles/Hooks/Usepost';
import Usestate20 from './MyFiles/Hooks/Usestate20';
import Use20 from './MyFiles/DynamicRoutes/Use20';
import Usepost1 from './MyFiles/Hooks/Usepost1';
import Usestate104 from './MyFiles/Hooks/Usestate104';
import Use104 from './MyFiles/DynamicRoutes/Use104';
import Usepost2 from './MyFiles/Hooks/Usepost2';
import Usepost3 from './MyFiles/Hooks/Usepost3';
import Usepost104 from './MyFiles/Hooks/Usepost104';
import Employee1 from './MyFiles/CustomeHooks/Employee1';
import Employee2 from './MyFiles/CustomeHooks/Employee2';
import UseEmp from './MyFiles/CustomeHooks/UseEmp';
import Usestate103 from './MyFiles/Hooks/Usestate103';
import Use103 from './MyFiles/DynamicRoutes/Use103';
import Usepost103 from './MyFiles/Hooks/Usepost103';
import Usestate102 from './MyFiles/Hooks/Usestate102';
import Use102 from './MyFiles/DynamicRoutes/Use102';
import Usepost102 from './MyFiles/Hooks/Usepost102';
import Usereducer18 from './MyFiles/Hooks/Usereducer/Usereducer18';
import User18 from './MyFiles/DynamicRoutes/User18';
import Userpost18 from "./MyFiles/Hooks/Usereducer/Userpost18"
import Usereducer19 from './MyFiles/Hooks/Usereducer/Usereducer19';
import User19 from './MyFiles/DynamicRoutes/User19';
import Userpost19 from './MyFiles/Hooks/Usereducer/Userpost19';
import Usereducer20 from './MyFiles/Hooks/Usereducer/Usereducer20';
import AdminUser1 from './MyFiles/CustomeHooks/adminUser1';
import AdminUser2 from './MyFiles/CustomeHooks/adminUser2';
import AdminUser from './MyFiles/CustomeHooks/AdminUser';
import Usestate101 from './MyFiles/Hooks/Usestate101';
import Use101 from './MyFiles/DynamicRoutes/Use101';
import Usepost101 from './MyFiles/Hooks/Usepost101';
import Usestate111 from './MyFiles/Hooks/Usestate111';
import Use111 from './MyFiles/DynamicRoutes/Use111';
import Usepost111 from './MyFiles/Hooks/Usepost111';
import Usereducer21 from './MyFiles/Hooks/Usereducer/Usereducer21';
import User21 from './MyFiles/DynamicRoutes/User21';
import Userpost21 from './MyFiles/Hooks/Usereducer/Userpost21';
import Usestate100 from './MyFiles/Hooks/Usestate100';
import Use100 from './MyFiles/DynamicRoutes/Use100';
import Usepost100 from './MyFiles/Hooks/Usepost100';
import Usereducer22 from './MyFiles/Hooks/Usereducer/Usereducer22';
import User22 from './MyFiles/DynamicRoutes/User22';
import Userpost22 from './MyFiles/Hooks/Usereducer/Userpost22';
import Usestate112 from './MyFiles/Hooks/Usestate112';
import Use112 from './MyFiles/DynamicRoutes/Use112';
import Usepost112 from './MyFiles/Hooks/Usepost112';
import Usereducer23 from './MyFiles/Hooks/Usereducer/Usereducer23';
import User23 from './MyFiles/DynamicRoutes/User23';
import Userpost23 from './MyFiles/Hooks/Usereducer/Userpost23';
import Usestate105 from './MyFiles/Hooks/Usestate105';
import Usestate113 from './MyFiles/Hooks/Usestate113';
import Use113 from './MyFiles/DynamicRoutes/Use113';
import Usepost113 from './MyFiles/Hooks/Usepost113';
import Usereducer24 from './MyFiles/Hooks/Usereducer/Usereducer24';
import User24 from './MyFiles/DynamicRoutes/User24';
import Userpost24 from './MyFiles/Hooks/Usereducer/Userpost24';
import Usestate114 from './MyFiles/Hooks/Usestate114';
import Use114 from './MyFiles/DynamicRoutes/Use114';
import Usepost114 from './MyFiles/Hooks/Usepost114';
import Usereducer25 from './MyFiles/Hooks/Usereducer/Usereducer25';
import User25 from './MyFiles/DynamicRoutes/User25';
import Userpost25 from './MyFiles/Hooks/Usereducer/Userpost25';
import Vendor1 from './MyFiles/CustomeHooks/Vendor1';
import Vendor2 from './MyFiles/CustomeHooks/Vendor2';
import Usereducer26 from './MyFiles/Hooks/Usereducer/Usereducer26';
import User26 from './MyFiles/DynamicRoutes/User26';
import Userpost26 from './MyFiles/Hooks/Usereducer/Userpost26';
import Usestate115 from './MyFiles/Hooks/Usestate115';
import Use115 from './MyFiles/DynamicRoutes/Use115';
import Usepost115 from './MyFiles/Hooks/Usepost115';
import Usestate116 from './MyFiles/Hooks/Usestate116';
import Use116 from './MyFiles/DynamicRoutes/Use116';
import Usepost116 from './MyFiles/Hooks/Usepost116';
import Usereducer27 from './MyFiles/Hooks/Usereducer/Usereducer27';
import User27 from './MyFiles/DynamicRoutes/User27';
import Userpost27 from './MyFiles/Hooks/Usereducer/Userpost27';
import Usestate117 from './MyFiles/Hooks/Usestate117';
import Use117 from './MyFiles/DynamicRoutes/Use117';
import Usepost117 from './MyFiles/Hooks/Usepost117';
import Usestate118 from './MyFiles/Hooks/Usestate118';
import Vendor from './MyFiles/CustomeHooks/Vendor';
import Vendor11 from './MyFiles/CustomeHooks/Vendor11';
import Vendors from './MyFiles/CustomeHooks/Vendors';
import Usestate119 from './MyFiles/Hooks/Usestate119';
import Use119 from './MyFiles/DynamicRoutes/Use119';
import Usepost119 from './MyFiles/Hooks/Usepost119';
import Usestate120 from './MyFiles/Hooks/Usestate120';
import Usestate121 from './MyFiles/Hooks/Usestate121';
import User121 from './MyFiles/DynamicRoutes/User121';
import Usepost121 from './MyFiles/Hooks/Usepost121';
import Usestate122 from './MyFiles/Hooks/Usestate122';
import User122 from './MyFiles/DynamicRoutes/User122';
import Usepost122 from './MyFiles/Hooks/Usepost122';
import Usestate123 from './MyFiles/Hooks/Usestate123';
import Usepost123 from './MyFiles/Hooks/Usepost123';
import User123 from './MyFiles/DynamicRoutes/User123';
import Usereducer28 from './MyFiles/Hooks/Usereducer/Usereducer28';
import Usestate124 from './MyFiles/Hooks/Usestate124';
import Use124 from './MyFiles/DynamicRoutes/Use124';
import Usepost124 from './MyFiles/Hooks/Usepost124';
import Usestate125 from './MyFiles/Hooks/Usestate125';
import Usepost125 from './MyFiles/Hooks/Usepost125';
import Use125 from './MyFiles/DynamicRoutes/Use125';
import Usestate126 from './MyFiles/Hooks/Usestate126';
import Usepost66 from './MyFiles/Hooks/Usepost66';
import Usereducer29 from './MyFiles/Hooks/Usereducer/Usereducer29';
import Usestate127 from './MyFiles/Hooks/Usestate127';
import Usepost127 from './MyFiles/Hooks/Usepost127';
import Use127 from './MyFiles/DynamicRoutes/Use127';
import Usestate128 from './MyFiles/Hooks/Usestate128';
import Usepost128 from './MyFiles/Hooks/Usepost128';
import Use128 from './MyFiles/DynamicRoutes/Use128';
import Usestate129 from './MyFiles/Hooks/Usestate129';
import Use129 from './MyFiles/DynamicRoutes/Use129';
import Usepost129 from './MyFiles/Hooks/Usepost129';
import Usestate130 from './MyFiles/Hooks/Usestate130';
import Use130 from './MyFiles/DynamicRoutes/Use130';
import Usepost130 from './MyFiles/Hooks/Usepost130';
import UserForm from './MyFiles/Hooks/Redux/userForm';
import Usestate131 from './MyFiles/Hooks/Usestate131';
import User131 from './MyFiles/DynamicRoutes/User131';
import Usepost131 from './MyFiles/Hooks/Usepost131';
import Usestate132 from './MyFiles/Hooks/Usestate132';
import Products from './MyFiles/Hooks/Redux/Producs';
import Cartitem from './MyFiles/Hooks/Redux/Cartitem';
import Usestate133 from './MyFiles/Hooks/Usestate133';
import User133 from './MyFiles/Hooks/User133';
import UseDashboard1 from './MyFiles/CustomeHooks/UseDashboard1';
import UseDashboard from './MyFiles/CustomeHooks/UseDashboard';
import UseDashboard2 from './MyFiles/CustomeHooks/UseDashboard2';
import Usestate134 from './MyFiles/Hooks/Usestate134';
import Use134 from './MyFiles/DynamicRoutes/Use134';
import Usepost134 from './MyFiles/Hooks/Usepost134';
import Empost from './MyFiles/Hooks/Empost';
import Usestate135 from './MyFiles/Hooks/Usestate135';
import Use135 from './MyFiles/DynamicRoutes/Use135';
import Usepost135 from './MyFiles/Hooks/Usepost135';
import Usestate136 from './MyFiles/Hooks/Usestate136';
import Use136 from './MyFiles/DynamicRoutes/Use136';
import Usepost136 from './MyFiles/Hooks/Usepost136';
import Usestate137 from './MyFiles/Hooks/Usestate137';
const LazyUsereducer4 = lazy(() => import('./MyFiles/Hooks/Usereducer/Usereducer4'));
const LazyUsestate8 = lazy(() => import('./MyFiles/Hooks/Usestate8'));


const App = () => {
  return (
   
    <Router>
      
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/props1" element={<Props1/>}/>
          <Route path="/props2" element={<Props2/>}/>
          <Route path="/props3" element={<Props3/>}/>
          <Route path='/userForm' element={<UserForm/>} />
          <Route path="/events1" element={<Events1/>}/>
          <Route path="/imports" element={<Imports/>}/>
          <Route path='/usepost' element={<Usepost/>} />
          <Route path='/usepost1' element={<Usepost1/>} />
          <Route path='/usepost2' element={<Usepost2/>} />
          <Route path='/usepost3' element={<Usepost3/>} />
          <Route path='/usepost100' element={<Usepost100/>} />
          <Route path='/usestate100/:userId' element={<Use100/>} />
          <Route path='/usestate100' element={<Usestate100/>} />
          <Route path='/usestate129' element={<Usestate129/>} />
          <Route path='/usestate129/:userId' element={<Use129/>} />
          <Route path='/usepost129' element={<Usepost129/>} />
          <Route path='/usestate128' element={<Usestate128/>} />
          <Route path='/usepost128' element={<Usepost128/>} />
          <Route path="/usestate128/:userId" element={<Use128/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/cartitem' element={<Cartitem/>} />
          <Route path='/Empost' element={<Empost/>} />
          <Route path='/usestate137' element={<Usestate137/>} />
          <Route path='/usestate136' element={<Usestate136/>} />
          <Route path='/usestate136/:userId' element={<Use136/>} />
          <Route path='/usepost136' element={<Usepost136/>} />
          <Route path='/usepost135' element={<Usepost135/>} />
          <Route path='/usestate135/:userId' element={<Use135/>} />
          <Route path='/usestate135' element={<Usestate135/>} />
          <Route path='/usestate134' element={<Usestate134/>} />
          <Route path="/usestate134/:userId" element={<Use134/>} />
          <Route path='/usepost134' element={<Usepost134/>} />
          <Route path='/usestate133' element={<Usestate133/>} />
          <Route path='/usestate133/:userId' element={<User133/>} />
          <Route path='/usestate132' element={<Usestate132/>} />
          <Route path='/usestate131' element={<Usestate131/>} />
          <Route path='/usestate131/:userId' element={<User131/>} />
          <Route path='/usepost131' element={<Usepost131/>} />
          <Route path='usestate130' element={<Usestate130/>} />
          <Route path='usestate130/:userId' element={<Use130/>}/>
          <Route path='usepost130' element={<Usepost130/>} />
          <Route path='/usestate127' element={<Usestate127/>} />
          <Route path='/usestate127/:userId' element={<Use127/>} />
          <Route path='/usepost127' element={<Usepost127/>} />
          <Route path='/usestate126' element={<Usestate126/>} />
          <Route path='/usestate125' element={<Usestate125/>} />
          <Route path='/usestate125/:userId' element={<Use125/>} />
          <Route path='/usepost125' element={<Usepost125/>} />
          <Route path='/usestate124' element={<Usestate124/>} />
          <Route path='/usestate124/:userId' element={<Use124/>} />
          <Route path='/usepost124' element={<Usepost124/>} />
          <Route path='/usestate123' element={<Usestate123/>} />
          <Route path='/usepost123' element={<Usepost123/>} />
          <Route path='/usestate123/:userId' element={<User123/>} />
          <Route path='/usestate122' element={<Usestate122/>} />
          <Route path='/usestate122/:userId' element={<User122/>} />
          <Route path='/usepost122' element={<Usepost122/>} />
          <Route path='/usestate121' element={<Usestate121/>} />
          <Route path='/usestate121/:userId' element={<User121/>} />
          <Route path='/usepost121' element={<Usepost121/>} />
          <Route path='/usestate120' element={<Usestate120/>} />
          <Route path='useState119' element={<Usestate119/>} />
          <Route path='/usestate119/:userId' element={<Use119/>} />
          <Route path='/usepost119' element={<Usepost119/>} />
          <Route path='/usestate118' element={<Usestate118/>} />
          <Route path='/usepost117' element={<Usepost117/>} />
          <Route path='/usestate117/:userId' element={<Use117/>} />
          <Route path='/usestate117' element={<Usestate117/>} />
          <Route path='/usepost116' element={<Usepost116/>} />
          <Route path='/usestate116/:userId' element={<Use116/>} />
          <Route path='/usestate116' element={<Usestate116/>} />
          <Route path='/usestate115' element={<Usestate115/>} />
          <Route path='/usestate115/:userId' element={<Use115/>} />
          <Route path='/usepost115' element={<Usepost115/>} />
          <Route path='/usepost114' element={<Usepost114/>} />
          <Route path='/usestate114/:userId' element={<Use114/>} />
          <Route path='/usestate114' element={<Usestate114/>} />
          <Route path='/usepost113' element={<Usepost113/>} />
          <Route path='/usestate113' element={<Usestate113/>} />
          <Route path='/usestate113/:userId' element={<Use113/>} />
          <Route path='/usestate112' element={<Usestate112/>} />
          <Route path='/usestate112/:userId' element={<Use112/>} />
          <Route path='/usepost112' element={<Usepost112/>} />
          <Route path='/usepost111' element={<Usepost111/>} />
          <Route path='/usestate111' element={<Usestate111/>} />
          <Route path='/usestate111/:userId' element={<Use111/>} />
          <Route path='/usepost101' element={<Usepost101/>} />
          <Route path='/Usestate101' element={<Usestate101/>} />
          <Route path='/Usestate101/:userId' element={<Use101/>} />
          <Route path='/usestate102' element={<Usestate102/>} />
          <Route path='/usestate102/:userId' element={<Use102/>} />
          <Route path='/usepost102' element={<Usepost102/>} />
          <Route path='/usepost103' element={<Usepost103/>} />
          <Route path='/usepost104' element={<Usepost104/>} />
          <Route path='/usestate103/:userId' element={<Use103/>} />
          <Route path='/usestate103' element={<Usestate103/>} />
          <Route path='/usestate104' element={<Usestate104/>} />
          <Route path='/usestate104/:userId' element={<Use104/>} />
          <Route path='/usestate105' element={<Usestate105/>} />
          <Route path="/usestate1" element={<Usestate1/>}/>
          <Route path="/usestate2" element={<Usestate2/>}/>
          <Route path="/Usestatetwo" element={<Usestatetwo/>}/>
          <Route path="/usestate3" element={<Usestate3/>}/>
          <Route path="/usestate4" element={<Usestate4/>}/>
          <Route path="/usestate5" element={<Usestate5/>}/>
          <Route path="/usestate6" element={<Usestate6/>}/>
          <Route path="/usestate7" element={<Usestate7/>}/>
          <Route path="/usestate8" element={<LazyUsestate8/>}/>
          <Route path="/usestate88" element={<Usestate88/>} />
          <Route path="/usestate99" element={<Usestate99/>} />
          <Route path='/usestate77' element={<Usestate77/>} />
          <Route path='/usestate77/:userId' element={<Alldetails/>} />
          <Route path="/usestate10" element={<Usestate10/>} />
          <Route path='/usestate10/:userId' element={<Use10/>} />
          <Route path="/usestate11" element={<Usestate11/>} />
          <Route path='/usestate11/:userId' element={<Use11/>} />
          <Route path="/usestate12" element={<Usestate12/>} />
          <Route path='/usestate20' element={<Usestate20/>} />
          <Route path='/usestate20/:userId' element={<Use20/>} />
          <Route path='/usestate21' element={<Usestate21/>} />
          <Route path='/usestate21/:userId' element={<Use21/>} />
          <Route path='/usestate22' element={<Usestate22/>} />
          <Route path='/usestate22/:userId' element={<Use22/>} />
          <Route path="/usestate13" element={<Usestate13/>} />
          <Route path='/usestate33' element={<Usestate33/>} />
          <Route path='/usestate33/:userId' element={<Use33/>} />
          <Route path="/usestate14" element={<Usestate14/>} />
          <Route path='/usestate44' element={<Usestate44/>} />
          <Route path='/Usestate44/:userId' element={<Use44/>} />
          <Route path="/usestate15" element={<Usestate15/>} />
          <Route path='/Usestate55' element={<Usestate55/>} />
          <Route path='/Usestate55/:userId' element={<Use55/>}/>
          <Route path='/usestate66' element={<Usestate66/>} />
          <Route path='/usestate66/:userId' element={<Use66/>} />
          <Route path='/usepost66' element={<Usepost66/>} />
          <Route path="/useeffect1" element={<Useeffect1/>}/>
          <Route path="/useeffect2" element={<Useeffect2/>}/>
          <Route path="/useeffect3" element={<Useeffect3/>}/>
          <Route path="/useeffect4" element={<Useeffect4/>}/>
          <Route path="/useeffect5" element={<Useeffect5/>}/>
          <Route path="/useeffect6" element={<Useeffect6/>}/>
          <Route path='/useeffect7' element={<Useeffect7/>} />
          <Route path='/useeffect8' element={<Useeffect8/>} />
          <Route path="/useContext1" element={<UseContext1/>}/>
          <Route path="/Usereducer" element={<Usereducer/>}/>
          <Route path="/Usereducer1" element={<Usereducer1/>}/>
          <Route path="/Usereducer2" element={<Usereducer2/>}/>
          <Route path="/Usereducer3" element={<Usereducer3/>}/>
          <Route path="/Usereducer5" element={<Usereducer5/>}/>
          <Route path="/Usereducer6" element={<Usereducer6/>}/>
          <Route path="/Usereducer7" element={<Usereducer7/>}/>
          <Route path="/Usereducer8" element={<Usereducer8/>}/>
          <Route path="/Usereducer9" element={<Usereducer9/>}/>
          <Route path="/Usereducer10" element={<Usereducer10/>}/>
          <Route path='/Usereducer10/:userId' element={<Mydata/>} />
          <Route path='/Usereducer11' element={<Usereducer11/>} />
          <Route path='/Usereducer12' element={<Usereducer12/>} />
          <Route path='/Usereducer12/:userId' element={<NewUser />} />
          <Route path='/Usereducer13' element={<Usereducer13/>} />
          <Route path='/Usereducer13/:userId' element={<Userdata/>} />
          <Route path='/Usereducer14' element={<Usereducer14/>} />
          <Route path='/Usereducer14/:userId' element={<Mydetails/>} />
          <Route path='/Usereducer15' element={<Usereducer15/>} />
          <Route path='/Usereducer15/:userId' element={<User15/>} />
          <Route path='/Usereducer16' element={<Usereducer16/>} />
          <Route path='/Usereducer16/:userId' element={<User16/>} />
          <Route path="/Usecustome1" element={<Usecustome1/>}/>
          <Route path='/Usereducer17' element={<Usereducer17/>} />
          <Route path='/Usereducer17/:userId' element={<User17/>} />
          <Route path='/usereducer18' element={<Usereducer18/>} />
          <Route path='/usereducer18/:userId' element={<User18/>} />
          <Route path='/userpost18' element={<Userpost18/>} />
          <Route path='/usereducer19' element={<Usereducer19/>} />
          <Route path='/usereducer19/:userId' element={<User19/>} />
          <Route path='/userpost19' element={<Userpost19/>} />
          <Route path='/usereducer20' element={<Usereducer20/>} />
          <Route path='/usereducer21' element={<Usereducer21/>} />
          <Route path='/usereducer21/:userId' element={<User21/>} />
          <Route path='/usereducer22' element={<Usereducer22/>} />
          <Route path='/usereducer22/:userId' element={<User22/>} />
          <Route path='/usereducer23' element={<Usereducer23/>} />
          <Route path='/usereducer23/:userId' element={<User23/>} />
          <Route path='/userpost23' element={<Userpost23/>} />
          <Route path='/userpost24' element={<Userpost24/>} />
          <Route path='/usereducer24/:userId' element={<User24/>} />
          <Route path='/usereducer24' element={<Usereducer24/>} />
          <Route path='/userpost25' element={<Userpost25/>} />
          <Route path='/usereducer25' element={<Usereducer25/>} />
          <Route path='/usereducer25/:userId' element={<User25/>} />
          <Route path='/usereducer26' element={<Usereducer26/>} />
          <Route path='/usereducer26/:userId' element={<User26/>} />
          <Route path='/userpost27' element={<Userpost27/>} />
          <Route path='/usereducer27/:userId' element={<User27/>} />
          <Route path='/usereducer27' element={<Usereducer27/>} />
          <Route path='/usereducer28' element={<Usereducer28/>} />
          <Route path='/usereducer29' element={<Usereducer29/>} />
          <Route path='/userpost26' element={<Userpost26/>} />
          <Route path='/userpost22' element={<Userpost22/>} />
          <Route path='/userpost21' element={<Userpost21/>} />
          <Route path="/Useexp1" element={<Useexp1/>}/>
          <Route path="/Finalapi1" element={<Finalapi1/>}/>
          <Route path="/Finalapi2" element={<Finalapi2/>}/>
          <Route path='/Employee1' element={<Employee1/>} />
          <Route path='/Employee2' element={<Employee2/>} />
          <Route path='/usevendor' element={<useVendor/>} />
          <Route path='/vendor1' element={<Vendor1/>} />
          <Route path='/vendor2' element={<Vendor2/>} />
          <Route path='/UseEmp' element={<UseEmp/>} />
          <Route path='/UseDashboard2' element={<UseDashboard2/>} />
          <Route path='/UseDashboard1' element={<UseDashboard1/>} />
          <Route path='/UseDashboard' element={<UseDashboard/>} />
          <Route path='/adminuser1' element={<AdminUser1/>} />
          <Route path='/adminuser2' element={<AdminUser2/>} />
          <Route path='/adminuse' element={<AdminUser/>} />
          <Route path='/vendor' element={<Vendor/>} />
          <Route path='/vendor11' element={<Vendor11/>} />
          <Route path='/vendors' element={<Vendors/>} />
          <Route path="/Usereducer4" element={<LazyUsereducer4/>}/>
          <Route path="/Useref1" element={<Useref1/>}/>
          <Route path="/Useref2" element={<Useref2/>}/>
          <Route path="/Usesteexp" element={<Usesteexp/>}/>
          <Route path="/PageTitleOne" element={<PageTitleOne/>} />
          <Route path="/UsePageTitle" element={<UsePageTitle/>} />
          <Route path='/Navigation1' element={<Navigation1/>}>
            <Route index element={<About1/>} />
            <Route path='About1' element={<About1/>}/>
            <Route path='About2' element={<About2/>} />
          </Route>
          <Route path='/NavigationOtherPage' element={<NavigationOtherPage/>} >
            <Route index element={<Nastedexp1/>} />
            <Route path='Nastedexp1' element={<Nastedexp1/>} />
            <Route path='Nastedexp2' element={<Nastedexp2/>} />
          </Route>
          <Route path='/Users' element={<Users/>} />
          <Route path='/Users/:userId' element={<Userdetails/>} />
          <Route path='/Users1' element={<Users1/>} />
          <Route path='/Users1/:UserId' element={<UserDetails1/>} />
          <Route path='/Barchart1' element={<Barchart1/>} />
          <Route path='/Linechart' element={<Linechart/>} />
          <Route path='/userchart' element={<Userchart/>} />
          <Route path='/Charts' element={<Charts/>} />
          <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  </Router>
  );
};

export default App;
