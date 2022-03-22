import React, { useContext } from 'react'
import mainContext from "./Context";
import LibContext from '@aman/lib';

export default function Anchor() {
  const { contextType: libContextVal } = useContext(LibContext);
  const { contextType } = useContext(mainContext);

  return (
    <div>
      <div>main (native)  ::: context ::: <code><i>{ contextType }</i></code></div>
      <div>lib (external) ::: context ::: <code><i>{ libContextVal }</i></code></div>
    </div>
  )
}
