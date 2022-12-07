import logo from './logo.svg';
import './App.css';
import Routes from './routes';
import Header from './components/Header/header';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Register from './pages/veterans/registration/register';
import SingIn from './pages/veterans/login/login';
import VHome from './pages/veterans/home/home';
import OnMind from './pages/veterans/onMind/onMind';
import AllVeterans from './pages/veterans/Allveterans/veterans';
import RegisterOrg from './pages/community/registerOrg/organisation';
import OrgSingIn from './pages/community/orgLogin/orglogin';
import HeaderOrg from './pages/community/headers/header';
import CommHome from './pages/community/Home/commHome';
import CommOnMind from './pages/community/commOnMind/commOnM';
import AllOrganizations from './pages/veterans/organizations/organization';
import CreateEvent from './pages/community/createEvent/createevent';
import AllEvents from './pages/veterans/allevents/allevents';
import AllVets from './pages/community/allveterans/allvet';
import InviteVets from './pages/community/inviteVets/invite';
import CreateVEvent from './pages/veterans/createmyevent/createevent';
import MyEvents from './pages/veterans/myEvents/myEvents';
import InviteOVets from './pages/veterans/inviteothervets/inviteovets';
import OVEvents from './pages/veterans/ovEvents/ovevents';
import Profile from './pages/veterans/profile/profile';


function App() {
  return (
    <>
    
   {(!window.location.pathname.includes('community')) ? <BrowserRouter>
           <Header></Header> 
            <Switch>
                <Route exact path="/"  component={VHome}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/login"  component={SingIn} />
                <Route path="/onMind" component={OnMind} />
                <Route path="/allVeterans" component={AllVeterans} />
                <Route path="/allorganizations" component={AllOrganizations} />
                <Route path="/allevents" component={AllEvents} />
                <Route path="/vetevents" component={CreateVEvent} />
                <Route path="/getmyevents" component={MyEvents} />
                <Route path="/inviteovets" component={InviteOVets} />
                <Route path="/ovevents" component={OVEvents} />
                <Route path="/profile" component={Profile} />
            </Switch>
            </BrowserRouter> : 
            <BrowserRouter>
            <HeaderOrg></HeaderOrg> 
            <Switch>
                <Route path="/communityReg" component={RegisterOrg} />
                <Route path="/communitylog" component={OrgSingIn} />
                <Route exact path="/communityHome" component={CommHome} />
                <Route path="/community" component={window.localStorage.getItem('orgEmail') ? CommHome : OrgSingIn} />
                <Route path="/communityOnMind" component={CommOnMind} />
                <Route path="/communityevent" component={CreateEvent} />
                <Route path="/communityvets" component={AllVets} />
                <Route path="/communityinviteVets" component={InviteVets} />
            </Switch>
            </BrowserRouter> }

    </>
  );
}

export default App;
