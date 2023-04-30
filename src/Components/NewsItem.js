import React from 'react'

const NewsItem = (props) => {

  let { title, description, imageurl, newsurl, date, author, source } = props
  return (
    <div>
      <div className="card" style={{ margin: "10px 0px" }}>
        <img className="card-img-top" src={!imageurl ? "https://images.indianexpress.com/2023/02/horoscope_2-7.jpg" : imageurl} alt='' />
        <div className="card-body bg-dark text-light px-3">
          <h5 className="card-title">{title}...</h5>
          <h6 class="badge bg-danger">{source}</h6>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted"> By {!author ? 'Unknown' : author} , {new Date(date).toGMTString()}</small></p>
          <a href={newsurl} target='blank' className="btn btn-outline-success my-2">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem