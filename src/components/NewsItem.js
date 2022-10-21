import React, { Component } from "react";

export class NewsItem extends Component {

  
  render() {
    let {title,desc,img,url}= this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "25rem" }}>
          <img src={img} style={{width:"25rem",height:"15rem"}} className="card-img-top" alt="API problem" />
          <div className="card-body">
            <h5 className="card-title">{title}{title.length<61?"":"..."}</h5>
            <p className="card-text">
             {desc}...
            </p>
            <a rel="noreferrer"  href={url} target="_blank" className="btn btn-sm btn-primary">
              Read More ...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
