import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Profile.scss'

function Profile({ isLoggedIn }) {
    const [posts, setPosts] = useState([])

    let params = useParams()
    let userName = params.user

    let getArticles = (userName) => {
        // let response = await fetch(`/user/${userName}`)
        // let json = await response.json()
        // return json
        return [
            {'date': '14.01.2022', 'text': 'Первый пост', 'id': 2},
            {'date': '02.01.2022', 'text': 'Второй пост', 'id': 1}
        ]
    }

    useEffect(async () => {
        let articles = getArticles(userName)
        setPosts(articles)
    }, [posts])

    let parseDate = (date) => {
        let dateArr = date.slice(0, 10).split('-')
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0].slice(2)}`
    }

    let deleteArticle = (articleId) => {
        // let response = await fetch(
        //     `/articles/${articleId}`,
        //     {method: 'DELETE'}
        // )
        setPosts(posts.filter(post => true))
    }

    let createArticle = (event) => {
        event.preventDefault()
        let user = isLoggedIn
        let text = event.target['text'].value

        // let response = await fetch(
        //     '/articles/add',
        //     {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //         body: `user=${user}&date=${date}&date=${text}`
        //     }
        // )
        event.target['text'].value = ''
        setPosts(posts.concat())
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="Profile">
                <div className="Profile_info">
                    <h3>{`@${userName}`}</h3>
                </div>
                <div className="Profile_main">
                    <div className="Profile_add_article">
                        <form onSubmit={createArticle}>
                            <span>Создать пост</span>
                            <textarea name='text'></textarea>
                            <button type='submit'>Создать</button>
                        </form>
                    </div>
                    <div className="Profile_articles">
                        {getArticles(userName).map((article, index) => (
                            <div className="article" key={`article-${index}`}>
                                <span>{`${article.date}`}</span>
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