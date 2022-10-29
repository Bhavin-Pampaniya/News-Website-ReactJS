import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };
  static protoTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `NeuzNow - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parcedData = await data.json();
    this.props.setProgress(70);

    console.log(parcedData);
    this.setState({
      articles: parcedData.articles,
      totalResults: parcedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parcedData = await data.json();
    console.log("articles"+this.state.articles.length,"total"+this.state.totalResults);
    this.setState({
      articles: this.state.articles.concat(parcedData.articles),
      totalResults: parcedData.totalResults
    });
  };
  // handleNext = async()=>{
  //   this.setState({page:this.state.page+1});
  //   this.updateNews();
  // }
  // handlePrev = async()=>{
  //   this.setState({page:this.state.page-1});
  //   this.updateNews();

  // }
  render() {
    return (
      <>
        <h2 className="text-center">
          NeuzNow - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((element) => {
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
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary " onClick={this.handlePrev}>&larr; Pervious</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary " onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
