import React from "react";
import * as Bootstrap from "react-bootstrap";
import "./styles.css";

const NewsCard = ({ data, index, reference, loading }) => {
  return (
    <div ref={reference} className="news-card-container" key={index}>
      <Bootstrap.Card
        className="custom-card"
        onClick={() => {
          data?.url && !loading && window.open(data?.url);
        }}
      >
        <Bootstrap.Card.Img variant="top" src={data?.urlToImage} />
        <Bootstrap.Card.Body>
          <Bootstrap.Card.Title>{data?.title}</Bootstrap.Card.Title>
          <Bootstrap.Card.Text>{data?.description}</Bootstrap.Card.Text>
        </Bootstrap.Card.Body>
      </Bootstrap.Card>
    </div>
  );
};

export default NewsCard;
