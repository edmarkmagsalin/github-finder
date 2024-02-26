import React, { useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link, useParams } from 'react-router-dom'
import GithubContext from '../../context/github/githubContext'


const User = () => {
    const { id } = useParams();
    const githubContext = useContext(GithubContext);

    const { loading, getUser, user, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(id);
        getUserRepos(id);
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
    
    return (
        loading ? <Spinner /> : (
            <>
                <Link to='/' className="btn btn-light">Back to Search</Link>
                Hireable: <a href={html_url} target="_blank" rel="noopener noreferrer"><i className={`fas fa-${hireable ? 'check' : 'times'} text-${hireable ? 'success' : 'danger'}`}></i></a>
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className='round-img' alt="" style={{ width: '150px' }}/>
                        <h1>{name}</h1>
                        {location && <> Location: {location} </>}
                    </div>
                    <div>
                        {bio && <>
                            <h3>Bio</h3>
                        <p>{bio}</p>
                        </>}
                        <a href={html_url} target="_blank" rel="noopener noreferrer" className='btn btn-dark my-1'>Visit GitHub Profile</a>
                        <ul>
                            <li>{login && <> Username: {login}</>}</li>
                            <li>{blog && <> Website: {blog}</>}</li>
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
            </>
        )
    )
}

export default User
