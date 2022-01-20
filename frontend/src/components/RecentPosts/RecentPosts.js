import React, { useState, useEffect } from 'react';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import './RecentPosts.scss';

function RecentPosts({ isLoggedIn, updateLogin }) {
    const [posts, setPosts] = useState([])

    let getRecentPosts = async () => {
        let response = await fetch('/articles')
        let json = await response.json()
        return json
    }

    useEffect(async () => {
        let articles = await getRecentPosts()
        setPosts(articles)
    }, [])

    let parseDate = (date) => {
        let dateArr = date.slice(0, 10).split('-')
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0].slice(2)}`
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn} updateLogin={updateLogin}/>
            <div className="RecentPosts">
                {posts.map((article, index) => (
                    <div className="article" key={`recent-${index}`}>
                        <Link to={`/profile/${article.author.username}`} className='profile_link'>
                            <span>{`@${article.author.username} `}</span>
                        </Link>
                        <span>{parseDate(article.date)}</span>
                        <p>{article.text}</p>
                        <Link to={`/article/${article.id}`} className='article_link'>
                            Посмотреть полностью
                        </Link>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default RecentPosts;