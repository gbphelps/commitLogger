import React from 'react';
import { f } from './utils';


const forward = (color) => {
  const primary = f(color);
  const shadow = color.map((el,i)=>{
    return i === 3 ? el : el*.8
  });

  return {
    front: {
      transform:'translateZ(25px)',
      background: primary
    },

    left: {
      transform:'rotateY(-90deg)translateZ(25px)',
      background: primary
    },
    right: {
      transform:'rotateY(90deg)translateZ(25px)',
      background: primary
    },
    top: {
      transform:'rotateX(90deg)translateZ(25px)',
      background: primary
    },
    bottom: {
      transform:'rotateX(-90deg)translateZ(25px)',
      background: f(shadow)
    },
    back: {
      transform:'rotateY(180deg)translateZ(25px)',
      background: primary
    },
  }
};


export const Square2 = ({
  color,
  selected,
  display,
  animation,
  onClick,
  content }) => {
  const {front, left, right, bottom, back} = forward(color);
  return (
    <div className={['square',selected,display].join(' ')}
         style={{animationName: animation}}
         onClick={onClick}>
      <div className='face one' style={front}>
        {content}
      </div>
      <div className='face two' style={left}/>
      <div className='face three' style={right}/>
      <div className='face five' style={bottom}/>
      <div className='face six' style={back}>
      </div>
    </div>
  );
}
