import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'




const News = (props) => {

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&category=${props.category}&apiKey=${props.apiKey}&page=${page}`;
        props.setProgress(25);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(60);
        let convData = await data.json();
        props.setProgress(80);

        setArticles(convData.articles);
        setTotalResults(convData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])




    // nextPage = async () => {
    //     setState({ page: page + 1 });
    //     updateNews();
    // }

    // prevPage = async () => {
    //     setState({ page: page - 1 });
    //     updateNews();

    // }


    const fetchMoreData = async () => {
       
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}`;
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url);
        let convData = await data.json();
        setArticles(articles.concat(convData.articles));
        setLoading(false)
        setTotalResults(convData.totalResults)
    };


    return (
        <>
            <h1 className='text-center' style={{marginTop:'65px'}}>Top Headlines - {capitalize(props.category)}</h1>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    isDesc={element.title <= 88 ? true : false}
                                    isTitle={element.title <= 40 ? true : false}
                                    title={element.title ? element.title.slice(0, 40) : " "}
                                    description={element.description ? element.description.slice(0, 88) : " "}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name} />
                            </div>;
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
