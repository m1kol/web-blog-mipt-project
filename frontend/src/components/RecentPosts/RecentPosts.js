import React from 'react';
import Menu from '../Menu/Menu';

function RecentPosts({ isLoggedIn }) {
    let getRecentPosts = () => {
        return [
            'Первый недавний пост',
            'Второй недавний пост'
        ]
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="RecentPosts">
                {getRecentPosts().map((article, index) => (
                    <p key={`recent-${index}`}>{article}</p>
                ))}
            </div>
        </React.Fragment>
    )
}

export default RecentPosts;