import React from "react";
import * as Bootstrap from "react-bootstrap";
import "./styles.css";

const NewsCard = ({ data, key, reference }) => {
  return (
    <div ref={reference} className="container">
      <Bootstrap.Card className="custom-card">
        <Bootstrap.Card.Img variant="top" src={data?.urlToImage} />
        <Bootstrap.Card.Body>
          <Bootstrap.Card.Title>{data?.title}</Bootstrap.Card.Title>
          <Bootstrap.Card.Text>{data?.description}</Bootstrap.Card.Text>
          <Bootstrap.Button variant="primary">Go somewhere</Bootstrap.Button>
        </Bootstrap.Card.Body>
      </Bootstrap.Card>
    </div>
  );
};

export default NewsCard;
