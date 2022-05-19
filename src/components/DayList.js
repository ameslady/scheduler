import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const days = props.days;

  const dayItems = days.map((day) =>
    <DayListItem
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={(event) => props.setDay(day.name)}  
    />
  );
  
  return (
    <ul>
      {dayItems}
    </ul>
  );
}