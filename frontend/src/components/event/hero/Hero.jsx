import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
        <section className='hero'>
      <div className='container'>
        <Heading style={{fontFamily: 'Courier, monospace'}} title='Let’s Book Your Event! ' subtitle='Book live events and discover concerts, events, theater and more.' />
      </div>
    </section>
    </>
  )
}

export default Hero
