import React, { useContext } from 'react'
import mainContext from "./Context";

export default function Anchor() {
    const { contextType } = useContext(mainContext);
  return (
    <div>Anchor Tag with context "{ contextType }"</div>
  )
}
