import React from "react";
import Menu from '../Menu/Menu'
import { useParams } from 'react-router-dom'

function Article({ isLoggedIn }) {
    let params = useParams()
    let articleId = params.id
    
    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="Article">
            </div>
        </React.Fragment>
    )
}

export default Article