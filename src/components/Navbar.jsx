import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { BsChatLeft } from 'react-icons/bs'
import { FiShoppingCart } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiNotification3Line } from 'react-icons/ri'
import avatar from '../data/avatar.jpg'
import {Cart, Char, Chat, Notification, UserProfile} from '.'
import { useStateContext } from '../contexts/ContextProvider' 

const NavButton = ({title, customFunc, icon, color, datColor}) =>(
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{color}} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{background: datColor}} 
      className='absolute inline-flex
      rounded-full h-2 w-2 right-2 top-2'/>
      
        { icon}

    </button>

  </TooltipComponent>
)

const Navbar = () => {
  const {activeMenu, setActiveMenu, isClicked, currentColor, handleClick, screenSize, setScreenSize} = useStateContext();
  
  useEffect(() => {
       const handleResize = () => setScreenSize(window.innerWidth)
       window.addEventListener('resize', handleResize)

       handleResize()

       return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
   if(screenSize <= 900){
    setActiveMenu(false);
   } else {
    setActiveMenu(true);
   }

}, [])
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
    <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor}  icon={activeMenu ? <MdOutlineCancel /> : <AiOutlineMenu />}/>
    <div className='flex'>
    <NavButton title="Cart" customFunc={() => handleClick('cart', true)} color={currentColor} icon={< FiShoppingCart/>}/>
    <NavButton title="Chat" datColor="#03C9D7" customFunc={() => handleClick('chat',true)} color={currentColor}  icon={< BsChatLeft/>}/>
    <NavButton title="Notification" datColor="#03C9D7" customFunc={() => handleClick('notification',true)} color={currentColor}  icon={< RiNotification3Line/>}/>
    <TooltipComponent content="Profile" position='BottomCenter'>
    <div className='flex items-center gap-2 cursor-pointer pt-1 hover:bg-light-gray rounded-lg' onClick={()=> handleClick('userProfile', true)}>
     <img src={avatar} alt="avatar" className='rounded-full w-8 h-8'/>
    <p>
      <span className='text-gray-400 text-14'>Hi</span>{' '}
      <span className='text-gray-400 font-bold text-14'>John Doe</span>
    </p>
    <MdKeyboardArrowDown className='text-gray-400 text-14'/>
    </div>
    </TooltipComponent>
    {isClicked.cart && <Cart />}
    {isClicked.chat && <Chat /> }
    {isClicked.notification && < Notification/>}
    {isClicked.userProfile && <UserProfile />}

    </div>
    </div>
  )
}

export default Navbar