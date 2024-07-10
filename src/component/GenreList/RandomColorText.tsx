import React, { memo } from 'react'
const colors=[
    'var(--clr-accent)',
    'var(--clr-primary)',
    'var(--clr-orange)',
    'var(--clr-teal)',
    'var(--clr-info)',
    'var(--clr-warning)',
    'var(--clr-pink)',
]
interface RannType{
    title:string
}
const RandomColorText = ({title}:RannType) => {
    const randomColor = colors[Math.floor(Math.random() * 6)];

  return (
    <div className='genre-genre' style={{color:`${randomColor}`}}>{title}</div>
  )
}

export default memo(RandomColorText)