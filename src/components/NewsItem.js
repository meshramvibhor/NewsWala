import React from 'react';

const NewsItem=(props)=>{
    
        let { title, description, imageUrl, newsUrl, isDesc, isTitle, date, author,source } = props;
        return (
            <div className='my-2'>
                <div className="card">
                    <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}>
                    <span className="badge rounded-pill bg-danger" >
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    </div>
                    <img
                        src={imageUrl ? imageUrl : "https://images.news18.com/ibnlive/uploads/2022/01/titan_eyex-164171739216x9.jpg"}
                        className="card-img-top"
                        alt="not available"
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {isTitle ? title : <span>{title}...</span>}
                        </h5>
                        <p className="card-text">
                            {isDesc ? description : <span>{description}...</span>}
                        </p>
                        <p className="card-text"><small className="text-muted">by {author ? author : "unknown"} - published on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-outline-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
