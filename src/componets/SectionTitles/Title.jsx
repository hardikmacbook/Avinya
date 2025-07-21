import React from 'react'

const Title = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h1
      className="text-5xl font-bold mb-4 tracking-tight"
      style={{ color: '#8b2727' }}
    >
      {title}
    </h1>
    <p
      className="text-xl"
      style={{ color: '#8b2727', opacity: 0.8 }}
    >
      {subtitle}
    </p>
  </div>
)

export default Title
