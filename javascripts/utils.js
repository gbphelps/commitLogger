import React from 'react';


export const endofMonth = (date0) => {
  let date = new Date(date0.valueOf());
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
}

export const firstWeekday = (date0) => {
  let date = new Date(date0.valueOf());
  date.setDate(1);
  return date.getDay();
}

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const f = color => `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
