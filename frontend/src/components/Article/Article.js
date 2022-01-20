import React, { useState, useEffect } from "react";
import Menu from '../Menu/Menu'
import { useParams } from 'react-router-dom'
import './Article.scss'

function Article({ isLoggedIn }) {
    const [article, setArticle] = useState({})

    let params = useParams()
    let articleId = params.id

    let getArticle = async (id) => {
        // let response = await fetch(`/article/${id}`)
        return {'author': 'kate', 'date': '14.01.2022', 'text': 'Пост'}
    }

    useEffect(async () => {
        let article = await getArticle()
        setArticle(article)
    }, [])

    let parseDate = (date) => {
        let dateArr = date.slice(0, 10).split('-')
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0].slice(2)}`
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