const Loading = () => {
	return(
		<div className="fixed w-screen h-screen backdrop-blur-sm flex justify-center items-center z-20">
			<div className="w-[25%] h-[45%] bg-white/75 rounded-full flex justify-center items-center">
				<div className="flex animate-bounce">
					<div className="bg-sky-500 w-20 h-20 rounded-full animate-[loading_infinite_3s_ease-in-out] dark:bg-black"></div>
					<div className="bg-sky-300 w-20 h-20 rounded-full animate-[loading_infinite_2s_ease-in-out]"></div>
					<div className="bg-sky-400 w-20 h-20 rounded-full animate-[loading_infinite_4s_ease-in-out]"></div>
				</div>
			</div>
		</div>
	)
}
export {Loading}
