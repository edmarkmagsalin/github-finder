import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Alert from './Components/layout/Alert';
import Search from './Components/users/Search';
import Users from './Components/users/Users';
import User from './Components/users/User';
import About from './Components/pages/About';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {

  const [alert, setAlert] = useState(null);

  // GET all
  // useEffect(() => {
  //   setLoading(true)

  //   const res = await axios
  //   .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
  //   setUsers(res.data)
  //   setLoading(false)
  // }, [])
  
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }
  
  return (
    <GithubState>
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search setAlert={showAlert}  /> {/* GET the value of searchUsers from the Search.js and use it in the function searchUsers */}
                <Users />
              </Fragment>
            )} />
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/user/:login'>
              <User />
            </Route>
            <Route>
              404
            </Route>
          </Switch>
          
        </div>
      </div>
    </Router>
    </GithubState>
  )
}

export default App
