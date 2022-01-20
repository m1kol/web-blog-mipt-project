import React, { useState, useEffect } from "react";
import Menu from '../Menu/Menu'
import { useParams, Link } from 'react-router-dom'
import './Article.scss'

function Article({ isLoggedIn, updateLogin }) {
    const [article, setArticle] = useState({})

    let params = useParams()
    let articleId = params.id

    let getArticle = async (id) => {
        let response = await fetch(`/articles/${id}`)
        let json = await response.json()
        return json
    }

    useEffect(async () => {
        let post = await getArticle(articleId)
        setArticle(post)
    }, [])

    let parseDate = (date) => {
        let dateArr = date.slice(0, 10).split('-')
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0].slice(2)}`
    }
    
    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn} updateLogin={updateLogin}/>
            <div className="Article">
                {Object.keys(article).length && (
                    <div>
                        <Link to={`/profile/${article.author.username}`} className='profile_link'>
                            <span>{`@${article.author.username} `}</span>
                        </Link>
                        <span>{parseDate(article.date)}</span>
                        <article>{article.text}</article>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default Article