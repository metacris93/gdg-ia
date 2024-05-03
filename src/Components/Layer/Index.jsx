import { DarkModeButtom } from "../DarkModeButtom/Index"

const Layer = ({children}) => {
	return(
		<>
			<div className='absolute z-0 inset-0 bg-white bg-gradient-radial dark:bg-gradient-radial-dark'/>
			<nav className="absolute bg-white/70 w-full h-14 flex justify-between items-center rounded-b-xl px-10 z-20 dark:bg-blue-950/80">
				<h1 className="w-[55%] text-end text-3xl dark:text-white">Smart Match</h1>
				<DarkModeButtom/>
			</nav>
			{children}
		</>
	)
}
export{Layer}
