import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Profile.scss'

function Profile({ isLoggedIn }) {
    let getArticles = (userName) => {
        return [
            {'date': '14.01.2022', 'text': 'Первый пост', 'id': 2},
            {'date': '02.01.2022', 'text': 'Второй пост', 'id': 1}
        ]
    }

    let params = useParams()
    let userName = params.user
    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="Profile">
                <div className="Profile_info">
                    <h3>{`@${userName}`}</h3>
                </div>
                <div className="Profile_articles">
                    {getArticles(userName).map((article, index) => (
                        <div className="article" key={`article-${index}`}>
                            <span>{article.date}</span>
                            <p>{article.text}</p>
                            <Link to={`/article/${article.id}`} className='article_link'>
                                Посмотреть полностью
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;