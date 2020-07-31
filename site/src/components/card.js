import React from "react";
import cardCss from "./card.module.css";

const Card = (props) => {
  return (
    <div className={cardCss.container} id={props.id} onClick={props.onClick}>
      <div className={cardCss.vertical_center} id={props.id + "/"}>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
