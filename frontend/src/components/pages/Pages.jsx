import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Event from "../event/event";
import Eventadd from "../profile/eventadd";
import Profile from "../profile/profile";
import Ownerevents from "../profile/ownerevents";
import Userpageticketbook from "../ticket/userpageticketbook";
import Adminpageshowticket from "../ticket/adminpageshowticket";
import Usercanseehimticket from "../ticket/usercanseehimticket";
import Home from "../home/home";
import Register from "../signup/register";
import Login from "../signup/login";
import Adminhome from "../admin/adminhome";
import Adminshowevent from "../admin/adminshowevent";
import Category from "../services/category";
import Aboutus from "../home/aboutus";
import Help from "../profile/help";
import Adminupdateevent from "../admin/adminupdateevent";



const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/event' component={Event} />
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
          <Route exact path='/help' component={Help} />
          <Route exact path='/adminshowevent' component={Adminshowevent} />
          <Route path="/adminupdateevent/:id" component={Adminupdateevent} />

       



        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
