import React, { useEffect, Fragment, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import GithubContext from '../../context/github/githubContext'


const User = ({ match }) => {

    const githubContext = useContext(GithubContext)

    const { loading, getUser, user, getUserRepos, repos } = githubContext

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if(loading) return <Spinner />;
    
    return (
        <Fragment>
            <Link to='/' className="btn btn-light">Back to Search</Link>
            Hireable: {''}
            {hireable ? (<i className="fas fa-check text-success"></i>) :  (<i className="fas fa-times text-danger"></i>)}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' alt="" style={{ width: '150px' }}/>
                    <h1>{name}</h1>
                    {location && <Fragment> Location: {location} </Fragment>}
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                    <p>{bio}</p>
                    </Fragment>}
                    <a href={html_url} target="_blank" rel="noopener noreferrer" className='btn btn-dark my-1'>Visit GitHub Profile</a>
                    <ul>
                        <li>{login && <Fragment> Username: {login}</Fragment>}</li>
                        <li>{blog && <Fragment> Website: {blog}</Fragment>}</li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-success">
                    Followers: {followers}
                </div>
                <div className="badge badge-light">
                    Following: {following}
                </div>
                <div className="badge badge-danger">
                    Public Repos: {public_repos}
                </div>
                <div className="badge badge-dark">
                    Public Gists: {public_gists}
                </div>
            </div>
        <Repos repos={repos}/>
        </Fragment>
    )
}

export default User
