import React from "react";

import "./InterviewerListItem.scss"

let classNames = require('classnames');


export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  const interviewerImage = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected
  })


  return (
    <li className={interviewerClass} onClick={props.onClick} >
      <img
        className={interviewerImage}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}