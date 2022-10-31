import React,{ useEffect, useState }  from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40);
    let parcedData = await data.json();
    props.setProgress(70);
    console.log(parcedData);
    setArticles(parcedData.articles);
    setTotalResults(parcedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    document.title = `NeuzNow - ${capitalizeFirstLetter(props.category)}`;
    // eslint-disable-next-line
  },[]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?category=${
      props.category
    }&country=${props.country}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parcedData = await data.json();
    setArticles(articles.concat(parcedData.articles));
    setTotalResults(parcedData.totalResults);
  };


  return (
    <>
      <h2 className="text-center">
        NeuzNow - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {!loading &&
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 65) : ""}
                      desc={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      img={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://img.etimg.com/thumb/msid-95000997,width-1070,height-580/photo.jpg"
                      }
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};
News.protoTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
