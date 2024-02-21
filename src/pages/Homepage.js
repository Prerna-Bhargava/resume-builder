import React from 'react'
import Nav from '../components/navbar/Nav';
import Body from '../components/template/Body';
export default function Homepage() {

  return (
    <div style={{ "backgroundColor": "rgb(238, 252, 255)" }}>
      <Nav />
      <div style={{ justifyContent: "center", "alignItems": "center", "display": "flex" }}>
        <Body />
      </div>
    </div>
  )
}
