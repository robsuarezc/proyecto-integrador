import React from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import { doLoginGoogle, logOutSesion } from '../../redux/userDuck.js';
import { connect } from 'react-redux';
import loading from '../../assets/images/spinner.gif'

const LoginPage = ({ LOGGED,doLoginGoogle, logOutSesion }) => {

  const history = useHistory();

  const googleSesion = () => {
    doLoginGoogle()
  }

  const logOutGoogleSesion = () => {
    logOutSesion()
  }

    return (
      <>
      {LOGGED && LOGGED.fetching ?(
        <div>
          <img src={loading} alt='loading...'/>
        </div>
      ):(
        <>
        {LOGGED.loggedIn ?(
          <div className={styles.container}>
            <h1>
                Para ver a los personajes dirigete al inicio
            </h1>
            <button onClick={() => history.push("/")}>
                Ir
            </button>
            <h1>
                Finaliza sesión
            </h1>
            <button onClick={logOutGoogleSesion}>
                Salir
            </button>
          </div>
        ) : (
          <div className={styles.container}>
            <h1>
                Inicia Sesión con Google para comenzar
            </h1>
            <button onClick={googleSesion}>
                ir Google Auth
            </button>
          </div>
        )}
        </>
      )}
      </>
    )
}

const mapStateToProps = (state) => {
  return {
    LOGGED: state.user
  }
}

export default connect(mapStateToProps,{ doLoginGoogle, logOutSesion })(LoginPage)
