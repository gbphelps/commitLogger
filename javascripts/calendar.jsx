import React from 'react';
import * as utils from './utils';
import { DayHeaders } from './dayHeaders';
import { Square2 } from './square';
import { Bar } from './bar'




export class Calendar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      displayDate: new Date(),
      flip:false,
      reverse:true,
      stored: [],
      color: [255,0,0,1]
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
      //TODO store date rather than integer here
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


  randomColor(){
    let color = [0,255,Math.floor(Math.random()*256)]
    for (let i = 0; i < 6; i++){
      const idx1 = Math.floor(Math.random()*3);
      const idx2 = Math.floor(Math.random()*3);
      [color[idx1], color[idx2]] = [color[idx2], color[idx1]]
    }
    color.push(1);
    return color;
  }

  createCal(fwd,eom){
    let holder = [];
    let week = [];

    for(let i = 0;i < 42;i++){
      let type = 'nil';
      let content = '';

      if(i>=fwd && i<fwd+eom){
        type = 'day';
        content=i-fwd+1;
      }

      week.push(
        <Square2
          color={type === 'day' ? this.state.color : [0,0,0,0]}
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
       stored: [],
       color: this.randomColor()}
    );
  }


  monthBar(){
    let month = utils.months[this.state.displayDate.getMonth()];
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
    let fwd = utils.firstWeekday(this.state.displayDate);
    let eom = utils.endofMonth(this.state.displayDate);

    return (
     <div className='backsplash' style={{
         height:'100%',
         width:'100%',
         background: utils.f(this.state.color)}}>
     <div className='calendar'>
       <div className='all'>
        <div className='wrapper'>
          <Bar content={this.monthBar()}/>
          <DayHeaders/>
          {this.createCal(fwd,eom)}
        </div>
       </div>
     </div>
     </div>
    );
  }

}
