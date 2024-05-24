import React from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";


//ticket
import Userpageticketbook from "../ticket/userpageticketbook";
import Adminpageshowticket from "../ticket/adminpageshowticket";
import Usercanseehimticket from "../ticket/usercanseehimticket";


//Event
import Event from "../event/event";
import Cart from "../event/cart";

//services
import Category from "../services/category";
import Details from "../services/details";

//signup
import Register from "../signup/register";
import Login from "../signup/login";

//home
import Aboutus from "../home/aboutus";
import Contactus from "../home/contactus";

import Home from "../home/home";

//user profile
import UserHelp from "../profile/userhelp";
import Eventadd from "../profile/eventadd";
import Profile from "../profile/profile";
import Ownerevents from "../profile/ownerevents";
import Ownerservices from "../profile/ownerservices";
import Servicesadd from "../profile/servicesadd";
import Usereventupdate from "../profile/usereventupdate";

import Sounds from "../profile/Sounds";
import Edituserservice from "../profile/edituserservice";





//admin all

import Adminupdateevent from "../admin/adminupdateevent";
import Adminhelp from "../admin/adminhelp";
import Adminservices from "../admin/adminservices";
import Adminticket from "../admin/adminticket";
import Adminhome from "../admin/adminhome";
import Adminshowevent from "../admin/adminshowevent";
import Adminshowservices from "../admin/adminshowservices";
import Post from "../admin/post";
import Adminpostshow from "../admin/adminpostshow";
import Editpost from "../admin/editpost";




const Pages = () => {
  const location = useLocation();
  const adminPaths = [
    "/adminhome",
    "/adminshowevent",
    "/adminpageshowticket",
    "/adminupdateevent",
    "/adminhelp",
    "/adminservices",
    "/adminticket",
    "/adminshowservices",
    "/post",
    "/adminpostshow",
    "/editpost"
    // add other admin paths here
  ];

  const isAdminPath = adminPaths.some(path => location.pathname.includes(path));

  return (
    <>
      {!isAdminPath && <Header />}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/event' component={Event} />
        <Route exact path='/cart' component={Cart} />

        <Route exact path='/eventadd' component={Eventadd} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/ownerevents' component={Ownerevents} />
        <Route exact path='/userpageticketbook' component={Userpageticketbook} />
        <Route exact path='/adminpageshowticket' component={Adminpageshowticket} />
        <Route exact path='/usercanseehimticket' component={Usercanseehimticket} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/adminhome' component={Adminhome} />
        <Route exact path='/category' component={Category} />
        <Route exact path='/aboutus' component={Aboutus} />
        <Route exact path='/contactus' component={Contactus} />

        
        <Route exact path='/userhelp' component={UserHelp} />
        <Route exact path='/adminshowevent' component={Adminshowevent} />
        <Route path='/adminupdateevent/:id' component={Adminupdateevent} />
        <Route path='/usereventupdate/:id' component={Usereventupdate} />

        <Route path='/Sounds/:serviceID' component={Sounds} />
        <Route exact path="/edituserservice/:serviceId" component={Edituserservice} />

        
        <Route path="/details/:serviceID" component={Details} />



        <Route exact path='/adminhelp' component={Adminhelp} />
        <Route exact path='/adminservices' component={Adminservices} />
        <Route exact path='/adminticket' component={Adminticket} />
        <Route exact path='/adminshowservices' component={Adminshowservices} />
        <Route exact path='/post' component={Post} />
        <Route exact path='/adminpostshow' component={Adminpostshow} />
        <Route exact path='/editpost/:postId' component={Editpost} />

        
        
        <Route exact path='/ownerservices' component={Ownerservices} />
        <Route exact path='/servicesadd' component={Servicesadd} />

      </Switch>
      {!isAdminPath && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <Pages />
  </Router>
);

export default App;
