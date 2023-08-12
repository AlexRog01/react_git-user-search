import React, {useState} from 'react';

import { Loader } from 'semantic-ui-react';
import {CSSTransition } from 'react-transition-group';
import { User } from '../../types/User';
import { getUser } from '../../api/user';
import { UserCard } from '../UserCard';

import 'semantic-ui-css/semantic.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Form.css';

export const Form = () => {
  const [userLogin, setUserLogin] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hideError = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handlerSearchUser = () => {
    setLoading(true);
    setUser(null);

    setTimeout(() => { //Delay Simulation
      getUser(userLogin)
        .then((userInfo) => {
          setUser(userInfo);
          setErrorMessage('');
        })
        .catch(() => {
          setErrorMessage('User not found');
          hideError();
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <div className="box box--position">
      <form
        className='form'
        onSubmit={event => {
          event.preventDefault();
          handlerSearchUser();
        }}
      >
        <div className="form__input-element control has-icons-left">
          <input
            className="input is-link"
            type="text"
            placeholder="User login"
            value={userLogin}
            onChange={event => setUserLogin(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>

        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
      </form>

      {loading && (
        <Loader className='loaderStyle' active inline='centered' />
      )}

      {!loading && user && (
        <UserCard user={user}/>
      )}

      <CSSTransition
        in={errorMessage !== ''}
        timeout={300}
        classNames="appearaDisappearAnimation"
        mountOnEnter
        unmountOnExit
      >
        <div className="notification notification--position is-danger">
          {errorMessage}
        </div>
      </CSSTransition>
    </div>
  );
};
