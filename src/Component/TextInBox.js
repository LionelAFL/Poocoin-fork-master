import React from 'react';

export default function TextInBox (props) {
  return (
      <p style={{backgroundColor:props.bgColor, color:props.fgColor, margin: '3px', display: 'inline-block', lineHeight:1.5}}>
          {props.text}
      </p>
  )
}