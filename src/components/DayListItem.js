import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');


export default function DayListItem(props) {

  const dayList = classNames("day-list__item", {

    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = () => {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`
    }
    if (props.spots === 1) {
      return `${props.spots} spot remaining`
    }
    if (props.spots === 0) {
      return `no spots remaining`
    }
  }
  return (
    <li 
    data-testid="day"
    className={dayList} 
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} </h3>
    </li>
  );
}