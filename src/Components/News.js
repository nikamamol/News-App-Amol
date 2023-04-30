import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticle] = useState([])
  const [lodding, setlodding] = useState(false)
  const [page, setpage] = useState(1)
  const [Totalarticles, setTotalarticles] = useState(0)

  const handaleNext = async () => {
    setpage(page + 1)
    UpdateNews()
  }
  const handlePrevious = async () => {
    setpage(page - 1)
    UpdateNews()
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }



  const UpdateNews = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=addf244f824341fbac0bdffedd604e3d&page=${page}&pageSize=${props.pageSize}`;
    setlodding(true)
    let data = await fetch(url);
    let prasedata = await data.json();
    console.log(prasedata.articles);
    setArticle(prasedata.articles)
    setTotalarticles(prasedata.Totalarticles)
    setlodding(false)
  }

  useEffect(() => {

    document.title = `${capitalizeFirstLetter(props.category)}-ASNews`
    UpdateNews()
    // eslint-disable-next-line
  }, [])

  return (

    <div className="container my-3">
      <h1 className="hedding text-center text-light" style={{ marginTop: '60px', }}>AS News Top - {capitalizeFirstLetter(props.category)} Hedlines</h1>
      <div className="row">
        {!lodding ? articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title.slice(0, 45)}
              description={
                element.description
                  ? element.description.slice(0, 88)
                  : "NOT PROVIDED"
              }
              imageurl={element.urlToImage}
              newsurl={element.url}
              date={element.publishedAt}
              author={element.author}
              source={element.source.name}

            />
          </div>
        }) : <Spinner />}
        <div className="container d-flex justify-content-between my-3">
          <button disabled={page <= 1} type="button" className='btn btn-dark' onClick={handlePrevious}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(Totalarticles / props.pageSize)} type="button" className="btn btn-dark" onClick={handaleNext}>Next &rarr;</button>
        </div>
      </div>
    </div>
  );
}


export default News