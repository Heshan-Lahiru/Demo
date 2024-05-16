import React from "react"
import "./Featured.css"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
      <div className='container'>
  
  <div className='search-bar'>
    <input
      type='text'
      placeholder='Search location...'
      style={{
        width: '80%',
        borderRadius: '30px',
        
        
        padding: '10px',
        boxSizing: 'border-box' // Ensures padding is included in the width
      }}
    />
  </div>
</div>
      </section>
    </>
  )
}

export default Featured
