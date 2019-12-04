import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [query, setQuery] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if(query === ''){
            alertContext.setAlert('Please enter something', 'light')
        } else{
            githubContext.searchUsers(query) //pass value of 'state query' to searchUsers property
        }
        
    }

    const onChange = e => {
        setQuery(e.target.value) //GET the value of the input, and pass it to the 'state query'
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="query" placeholder="Search users" value={query} onChange={onChange} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
            
        </div>
    )
}

export default Search
