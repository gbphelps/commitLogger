import React from 'react';
import { f } from './utils';


let forward = (color) => ({
  front: {
    transform:'translateZ(25px)',
    background: f(color)
  },

  left: {
    transform:'rotateY(-90deg)translateZ(25px)',
    background: f(color)
  },
  right: {
    transform:'rotateY(90deg)translateZ(25px)',
    background: f(color)
  },
  top: {
    transform:'rotateX(90deg)translateZ(25px)',
    background: f(color)
  },
  bottom: {
    transform:'rotateX(-90deg)translateZ(25px)',
    background: f(color.map(el => el * .8))
  },
  back: {
    transform:'rotateY(180deg)translateZ(25px)',
    background: f(color)
  },
});


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
