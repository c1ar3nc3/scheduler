import React from "react";

import "components/Button.scss";

let classNames = require('classnames');

export default function Button(props) {

   const buttonClass = classNames("button", {
      " button--confirm": props.confirm,
      " button--danger": props.danger,
      " button--disabled": props.disabled && props.onClick
   })

   return <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
   >
      {props.children}
   </button>;
}
