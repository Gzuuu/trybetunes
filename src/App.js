import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './pages/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      length: 0,
      loading: false,
      redirect: false,
    };
  }

  inputChange = ({ target }) => {
    const name = target.value;
    this.setState(() => ({
      name,
      length: name.length,
    }));
  };

  handleChange = async () => {
    const { name } = this.state;
    this.setState(() => ({
      loading: true,
    }));
    await createUser({ name });
    this.setState(() => ({
      loading: false,
      redirect: true,
    }));
  };

  render() {
    const { length, loading, redirect } = this.state;
    const login = loading ? <Loading />
      : (
        <Login
          handleChange={ this.inputChange }
          length={ length }
          loadingChange={ this.handleChange }
        />);
    return (
      <BrowserRouter>
        <Route exact path="/">
          { redirect ? <Redirect to="/search" /> : login }
        </Route>
        <Route exact path="/search">
          <Search handleChange={ this.inputChange } length={ length } />
        </Route>
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
