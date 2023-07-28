'use client'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

type Props = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  children: string | JSX.Element | JSX.Element[]
}

export default function Drawer({ active, setActive, children }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const closeDrawer = () => {
    setIsVisible(false)
    setTimeout(() => {
      setActive(false)
    }, 300)
  }

  useEffect(() => {
    if (active) {
      setIsVisible(true)
    }
  }, [active])

  if (!active) return null

  return ReactDom.createPortal(
    <div
      style={{
        opacity: isVisible ? '1' : '0',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      onClick={closeDrawer}
      className="fixed left-0 top-0 z-50 flex h-[100svh] w-screen items-start justify-start bg-gray-500/50 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `translateX(${isVisible ? '0' : '-300px'})`,
        }}
        className="z-10 h-full w-[300px] border-2 border-black bg-[#bc95d4] font-bold transition-transform duration-300"
      >
        {children}
      </div>
    </div>,
    document.getElementById('drawer') as HTMLElement,

    // don't forget to add
    // <div id="drawer"></div>
    // to index.html
  )
}
