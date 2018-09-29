import React from 'react'

const Hcal = ({ content }) => (
  <div className='hcal'>
    {content}
  </div>
)

export const DayHeaders = () => (
  <div className='dayHeaders'>
    <Hcal content='SUN'/>
    <Hcal content='MON'/>
    <Hcal content='TUE'/>
    <Hcal content='WED'/>
    <Hcal content='THU'/>
    <Hcal content='FRI'/>
    <Hcal content='SAT'/>
  </div>
)
