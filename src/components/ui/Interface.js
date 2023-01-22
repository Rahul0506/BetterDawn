import { useState } from 'react'
import styles from './Interface.module.scss'

const InterfaceUI = () => {
  const [showInterface, setShowInterface] = useState(false)

  return (
    <>
    <div className={styles.container} style={{height: showInterface ? '100%' : '10%'}}><h1 onClick={() => {setShowInterface(!showInterface)}}>Main Menu</h1></div>
    </>
  )
}

export default InterfaceUI

// ANIMATION COMPONENTS
const animateInterface = () => {

}