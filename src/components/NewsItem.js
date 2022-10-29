import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, desc, img, url, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "auto" }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '92%', zIndex:'1'}}>
            {source}
          </span>
          <img
            src={img}
            style={{ width: "auto", height: "15rem" }}
            className="card-img-top"
            alt="API problem"
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              {title.length < 61 ? "" : "..."}
            </h5>
            <p className="card-text">{desc}...</p>
            <a
              rel="noreferrer"
              href={url}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More ...
            </a>
            <p className="card-text my-1">
              <small className="text-muted">
                By {author?author:"Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
