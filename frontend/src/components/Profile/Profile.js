import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Profile.scss'

function Profile({ isLoggedIn, updateLogin }) {
    const [posts, setPosts] = useState([])

    let params = useParams()
    let userName = params.user

    let getArticles = async (userName) => {
        let response = await fetch(`/user/${userName}`)
        let json = await response.json()
        return json
    }

    useEffect(async () => {
        let articles = await getArticles(userName)
        setPosts(articles)
    }, [])

    let parseDate = (date) => {
        let dateArr = date.slice(0, 10).split('-')
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0].slice(2)}`
    }

    let deleteArticle = async (articleId) => {
        let response = await fetch(
            `/articles/${articleId}`,
            {method: 'DELETE'}
        )

        if (response.ok) setPosts(posts.filter(post => post.id != articleId))
    }

    let createArticle = async (event) => {
        event.preventDefault()
        let user = isLoggedIn
        let text = event.target['text'].value

        let response = await fetch(
            '/articles/add',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `user=${user}&title=''&text=${text}`
            }
        )

        if (response.ok) {
            let articles = await getArticles(userName)
            setPosts(articles)
        }
        event.target['text'].value = ''
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn} updateLogin={updateLogin}/>
            <div className="Profile">
                <div className="Profile_info">
                    <h3>{`@${userName}`}</h3>
                </div>
                <div className="Profile_main">
                    {isLoggedIn && isLoggedIn == userName && (
                        <div className="Profile_add_article">
                            <form onSubmit={createArticle}>
                                <span>Создать пост</span>
                                <textarea name='text'></textarea>
                                <button type='submit'>Создать</button>
                            </form>
                        </div>
                    )}
                    <div className="Profile_articles">
                        {posts.map((article, index) => (
                            <div className="article" key={`article-${index}`}>
                                <span>{`${parseDate(article.date)}`}</span>
                                {isLoggedIn && isLoggedIn == userName && (
                                    <span className='delete_article' 
                                        onClick={(event) => deleteArticle(article.id)}>
                                        Удалить пост
                                    </span>
                                )}
                                <p>{article.text}</p>
                                <Link to={`/article/${article.id}`} className='article_link'>
                                    Посмотреть полностью
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;