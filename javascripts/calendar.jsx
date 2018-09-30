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
      color: [255,0,0,1],
      colorPrincipal: 1,
    };

    this.data = {}
  }


  assignData(data){
    data.items.forEach(item => {
      const date = item.commit.author.date.slice(0,10);
      if (!this.data[date]){
        this.data[date] = [];
      }
      this.data[date].push({
        date: item.commit.author.date,
        msg: item.commit.message,
        repo: item.repository.name
      })
    })
  }


  paginate(url){
    const gitData = new XMLHttpRequest();
    gitData.onreadystatechange = () => {
      if (gitData.readyState === 4 && gitData.status === 200){
        let data = JSON.parse(gitData.responseText);
        this.assignData(data);
        const links = gitData.getResponseHeader('Link').split(', ');

        for (let i = 0; i < links.length; i++){
          const [url, rel] = links[i].split('; ');
          if (rel === 'rel="next"'){
            this.paginate(url.slice(1,-1));
            return;
          }
        }

        console.log(this.data);
      }
    }
    gitData.open('get',url);
    gitData.setRequestHeader('Accept', 'application/vnd.github.cloak-preview');
    gitData.send();
  }

  componentDidMount(){
    this.paginate('https://api.github.com/search/commits?q=author-date:2018-05-01..2018-06-01+author:gbphelps+user:gbphelps&sort=committer-date&per_page=100')
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
    const idx = this.state.colorPrincipal;
    let indices = [0,1,2].filter(index => index !== idx);
    const otherVals = [0,Math.floor(Math.random()*256)];
    if (Math.random() > .5) [indices[0], indices[1]] = [indices[1], indices[0]];
    const color = [];
    color[idx] = 255;
    color[indices[0]] = otherVals[0];
    color[indices[1]] = otherVals[1];
    color[3] = 1;
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
      {
        displayDate: display,
        flip: !this.state.flip,
        reverse: direction,
        rotation: rotation+plus,
        stored: [],
        color: this.randomColor(),
        colorPrincipal: (this.state.colorPrincipal + 1) % 3
     });
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
