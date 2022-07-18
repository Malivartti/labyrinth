import React, { useEffect } from 'react'

function SideBar({size, setSize, numberОfMoves, setNumberОfMoves}) {
  useEffect(() => {
    const root = document.getElementById("root")
    root.style.setProperty("--grid-cell", size)
  })

  return (
    <div className='sidebar'>
      <label htmlFor='size'>
        <input id="size" type="number" min="3" max="10" value={size} onChange={(e) => setSize(Number(e.target.value))} />
      </label>
      <label htmlFor='size'>
        <input id="size" type="number" min="10" max="30" value={numberОfMoves} onChange={(e) => setNumberОfMoves(Number(e.target.value))} />
      </label>
    </div>
  )
}

export default SideBar