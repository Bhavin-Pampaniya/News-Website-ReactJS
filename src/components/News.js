import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category:'general'

  }
  static protoTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
  }

   capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading:false,
      page:1
    };
    document.title = `NeuzNow - ${this.capitalizeFirstLetter(this.props.category)}`;

  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=36b2e20384fa46169880842fb59fb3ac&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});

    let data = await fetch(url);
    let parcedData = await data.json();
    this.setState({ articles: parcedData.articles,totalResults:parcedData.totalResults,loading:false });
  }
  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=36b2e20384fa46169880842fb59fb3ac&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parcedData = await data.json();
    // console.log(parcedData);
    // this.setState({ articles: parcedData.articles,
    //     totalResults:parcedData.totalResults,
    //     loading:false
    //    });
    this.updateNews();  
  }
  handleNext = async()=>{
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=36b2e20384fa46169880842fb59fb3ac&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});

    // let data = await fetch(url);
    // let parcedData = await data.json();
    // this.setState({ articles: parcedData.articles,page:this.state.page+1,loading:false });
    this.setState({page:this.state.page+1});
    this.updateNews();
  }
  handlePrev = async()=>{
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=36b2e20384fa46169880842fb59fb3ac&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});

    // let data = await fetch(url);
    // let parcedData = await data.json();
    // this.setState({ articles: parcedData.articles,page: this.state.page-1,loading:false });
    this.setState({page:this.state.page-1});
    this.updateNews();

  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NeuzNow - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 65) : ""}
                  desc={
                    element.description ? element.description.slice(0, 80) : ""
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
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary " onClick={this.handlePrev}>&larr; Pervious</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary " onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;