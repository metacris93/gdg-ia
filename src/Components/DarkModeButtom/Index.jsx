import { useEffect, useState } from "react"
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const DarkModeButtom = () => {
	const [theme, setTheme] = useState()
	useEffect(() => {
		if(theme === true) {
			document.querySelector('html').classList.add('dark')
			document.querySelector('html').classList.remove('light')
		} else{
			document.querySelector('html').classList.add('light')
			document.querySelector('html').classList.remove('dark')
		}
	},[theme])
	return(
		<button type="buttom" onClick={() => setTheme(!theme)}>{(theme)? <IoMdSunny className="w-7 h-7 text-white"/>: <IoMdMoon className="w-7 h-7"/>}</button>
	)
}

export { DarkModeButtom}
