import React from "react";
import Menu from '../Menu/Menu'
import { useParams } from 'react-router-dom'
import './Article.scss'

function Article({ isLoggedIn }) {
    let params = useParams()
    let articleId = params.id

    function getArticle(id) {
        return {'author': 'kate', 'date': '14.01.2022', 'text': 'Пост'}
    }

    let article = getArticle(articleId)
    
    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="Article">
                <div>
                    <span>{`@${article.author} `}</span>
                    <span>{article.date}</span>
                    <article>{article.text}</article>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Article