import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Alert from './Components/layout/Alert';
import Search from './Components/users/Search';
import Users from './Components/users/Users';
import User from './Components/users/User';
import About from './Components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component{

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // GET all
  // async componentDidMount() {

  //   this.setState({ loading: true })

  //   const res = await axios
  //   .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false })
  // }

  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios
    .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true })

    const res = await axios
    .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false })
  }

  searchUsers = async query => {
    this.setState({ loading: true })

    const res = await axios
    .get(`https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false })
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type}})
    
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const {users, loading, alert, user, repos} = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert}  /> {/* GET the value of searchUsers from the Search.js and use it in the function searchUsers */}
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about'>
                <About />
              </Route>
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
                )}
              />
              <Route>
                404
              </Route>
            </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
