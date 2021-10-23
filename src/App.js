import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import './App.css';
import Detail from './components/Detail/Detail';
import Loading from './components/Loading/Loading';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AddNewFilms from './pages/Admin/Films/AddNewFilms/AddNewFilms';
import EditFilms from './pages/Admin/Films/EditFilms/EditFilms';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import AddNewUsers from './pages/Admin/Users/AddNewUsers/AddNewUsers';
import Users from './pages/Admin/Users/Users';
import Checkout from './pages/Checkout/Checkout';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import { CheckoutTemplate } from './templates/CheckoutTemplate/CheckoutTemplate';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import EditUsers from './pages/Admin/Users/EditUsers/EditUsers';
import PageNotFound from './pages/PageNotFound/PageNotFound';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNewFilms} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={EditFilms} />
        <AdminTemplate path="/admin/films/showtimes/:id/:tenphim" exact Component={ShowTime} />
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate path="/admin/users/addnew" exact Component={AddNewUsers} />
        <AdminTemplate path="/admin/users/edit/:taikhoan" exact Component={EditUsers} />

        <HomeTemplate path="/" exact Component={Home} />
        <PageNotFound path="*" exact Component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
