import React from "react";
import "./Card.css";

const Card = ({
    name,
    image,
    angle = Math.random() * 90 - 45,
    randomX = Math.random() * 40 - 20,
    randomY = Math.random() * 40 - 20
}) => {
    return (
        <img 
            className="Card"
            src={image}
            alt={name}
            style={ { transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` } }
        />
    );
}


export default Card;