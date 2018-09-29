import React from 'react';

export const Bar = (props) => {

  let style = {
    height: '50px',
    position:'absolute',
    top:'0px',
    width:'100%',
    transform: 'translateZ(25px)',
  };

  return(
  <div className='bar' style={{animationName: props.animation}}>
      <div className='side' style={style}>
        {props.content}
      </div>
    </div>);
}
