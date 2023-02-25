import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/HomePage';
import FavPage from './components/favs/FavPage';
import LoginPage from './components/login/LoginPage';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

const Routes = ({AUTH}) => {

  const alertLogin = () => {
    Swal.fire({
      title: '<strong>Tienes que iniciar sesion primero</strong>',
      icon: 'error',
      html: '<strong><a href="/login">Logueate</a></strong>'
    })
  }

    const PrivateRoute = ({path,component,...rest}) => {
        if(AUTH.user && AUTH.user.loggedIn === true){
            return <Route path={path} component={component} {...rest}/>
        }else {
            alertLogin()
            return <Redirect to='/login' {...rest}/>
        }

    }
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        AUTH: state
    }
}

export default connect(mapStateToProps)(Routes);
