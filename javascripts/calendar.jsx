import React from 'react';
import * as date from './utils';
import { DayHeaders } from './dayHeaders'


export class Calendar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      displayDate: new Date(),
      flip:false,
      reverse:true,
      stored: [],
    };
  }

  animation(){
    let suffix = (this.state.flip ? '2' : '');
    let name = (this.state.reverse ? 'rotate-right' : 'rotate-left')
    return name + suffix;
  }

  squareClickEvent(i,range){
    if (this.state.stored.length === 1 && this.state.stored[0] === i){
      this.setState({stored: []});
      return;
    }

    if (i < range[0] || i >= range[1]) return;

    let prev = Array.from(this.state.stored);
    if(prev.length === 1 && i > prev[0]){
      prev.push(i);
      this.setState({stored:prev});
    }else{
      this.setState({stored:[i]});
    }
  }

  selected(i){
    const range = this.state.stored;
    let result = '';
    if (range.length === 1 && range[0] === i){
      result = 'selected';
    }else if(
      range.length === 2 &&
      i >= range[0] &&
      i <= range[1]){
        result = 'selected';
    }
    return result;
  }

  createCal(fwd,eom){
    let holder = [];
    let week = [];

    for(let i=0;i<42;i++){
      let type = 'nil';
      let content = '';

      if(i>=fwd && i<fwd+eom){
        type = 'day';
        content=i-fwd+1;
      }

      week.push(
        <Square2
          display={type}
          key={i}
          content={content}
          animation={this.animation()}
          selected={this.selected(i)}
          onClick={()=>this.squareClickEvent(i,[fwd,fwd+eom])}
          />
      );

      if(week.length === 7){
        holder.push(week);
        week = [];
      }
    }

    return holder.map((week) => {return <div className='week'>{week}</div>});

  }

  changeMonth(inc){
    let display = new Date(this.state.displayDate.valueOf());
    display.setMonth(display.getMonth() + inc);
    let direction = inc > 0 ? true : false;
    let rotation = this.state.rotation;
    let plus = inc < 0 ? -180 : 180;

    this.setState(
      {displayDate: display,
       flip: !this.state.flip,
       reverse: direction,
       rotation: rotation+plus,
       stored: [],}
    );
  }


  monthBar(){
    let month = date.months[this.state.displayDate.getMonth()];
    let year = this.state.displayDate.getFullYear();
    return (
      <div className='monthBar'>
        <div
          className='button'
          onClick={()=>this.changeMonth(-1)}>
          &#9664;&nbsp;
        </div>

        {`${month} ${year}`}

        <div
          className='button'
          onClick={()=>this.changeMonth(1)}>
           &nbsp;&#9654;
        </div>

      </div>
    )

  }



  render(){
    let fwd = date.firstWeekday(this.state.displayDate);
    let eom = date.endofMonth(this.state.displayDate);

    return (
     <div className='calendar'>
       <div className='all'>
        <div className='wrapper'>
          <Bar animation='rotate-down' content={this.monthBar()}/>
          <DayHeaders/>
          {this.createCal(fwd,eom)}
        </div>
       </div>
     </div>
    );
  }

}

let forward = {
  front: {transform:'translateZ(25px)'},
  left: {transform:'rotateY(-90deg)translateZ(25px)'},
  right: {transform:'rotateY(90deg)translateZ(25px)'},
  top: {transform:'rotateX(90deg)translateZ(25px)'},
  bottom: {transform:'rotateX(-90deg)translateZ(25px)'},
  back: {transform:'rotateY(180deg)translateZ(25px)'},
  rot: {transform:''},
};

function Square2(props){

  return (
    <div className={['square',props.selected,props.display].join(' ')}
         style={{animationName: props.animation}}
         onClick={props.onClick}>
      <div className='face one' style={forward.front}>
        {props.content}
      </div>
      <div className='face two' style={forward.left}/>
      <div className='face three' style={forward.right}/>
      <div className='face five' style={forward.bottom}/>
      <div className='face six' style={forward.back}>
      </div>
    </div>
  );
}


function Bar(props){

  let side = {
    height: '50px',
    position:'absolute',
    top:'0px',
    width:'100%'
  };

  let back = {
    transform: 'rotateY(180deg)translateZ(25px)',
  };

  let front = {
    background:'red',
    transform: 'translateZ(25px)',
  };

  let top = {
    transform: 'rotateX(90deg)translateZ(25px)',
  }

  let bottom ={
    transform: 'rotateX(-90deg)translateZ(25px)',
  }


  return(
  <div className='bar' style={{animationName: props.animation}}>
      <div className='side' style={Object.assign(front,side)}>
        {props.content}
      </div>
      <div className='side' style={Object.assign(back,side)}/>
      <div className='side' style={Object.assign(top,side)}/>
      <div className='side' style={Object.assign(bottom,side)}/>
    </div>);
}
