import React from 'react'

function AdminPageLayout({children}) {
  return (
    <div>
      <div>Menu</div>
      <div>Appbar</div>
      <div>{children}</div>
    </div>
  )
}


export default AdminPageLayout

