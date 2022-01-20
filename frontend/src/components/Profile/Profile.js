import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Profile.scss'

function Profile({ isLoggedIn }) {
    let getArticles = (userName) => {
        // let response = await fetch(`/user/${userName}`)
        return [
            {'date': '14.01.2022', 'text': 'Первый пост', 'id': 2},
            {'date': '02.01.2022', 'text': 'Второй пост', 'id': 1}
        ]
    }

    let params = useParams()
    let userName = params.user

    function deleteArticle(articleId) {
        // let response = await fetch(
        //     `/articles/${articleId}`,
        //     {method: 'DELETE'}
        // )
    }

    function createArticle(event) {
        console.log(event)
        let user = ''
        let date = ''
        let text = ''

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
                            <textarea></textarea>
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