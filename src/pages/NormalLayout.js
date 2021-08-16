import Header from 'components/Header'
import React from 'react'

function NormalLayout({children}) {
  return (
    <div>
      <Header/>
      <div>{children}</div>
      <div>Footer</div>
    </div>
  )
}

export default NormalLayout

