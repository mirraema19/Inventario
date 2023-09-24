import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../css/card.css";

const Card = ({ imageSource, title, text, to, buttonText, onClick }) => {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">
          {text
            ? text
            : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam deserunt fuga accusantium excepturi quia, voluptates obcaecati nam in voluptas perferendis velit harum dignissimos quasi ex? Tempore repellat quo doloribus magnam."}
        </p>
        {onClick ? (
          <Button variant="outline-secondary" onClick={onClick}>
            {buttonText ? buttonText : `Go to ${title}`}
          </Button>
        ) : (
          <Link to={to || "/"} className="btn btn-outline-secondary border-0">
            {buttonText ? buttonText : `Go to ${title}`}
          </Link>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  to: PropTypes.string,
  imageSource: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
