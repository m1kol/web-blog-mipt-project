import React from 'react';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import './RecentPosts.scss';

function RecentPosts({ isLoggedIn }) {
    let getRecentPosts = () => {
        return [
            {'author': 'kate', 'date': '14.01.2022', 'text': 'Первый недавний пост', 'id': 2},
            {'author': 'john', 'date': '02.01.2022', 'text': 'Второй недавний пост', 'id': 1}
        ]
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="RecentPosts">
                {getRecentPosts().map((article, index) => (
                    <div className="article" key={`recent-${index}`}>
                        <span>{`@${article.author} `}</span>
                        <span>{article.date}</span>
                        <p>{article.text}</p>
                        {article.text.length > 300 && (
                            <Link to={`/article/${article.id}`}>
                                Посмотреть полностью
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default RecentPosts;