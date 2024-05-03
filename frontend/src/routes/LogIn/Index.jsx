import { useState } from "react"
import { Loading } from "../../Components/Loading/Index"
import { useNavigate } from "react-router-dom"

const LogInPage = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [loading, setLoading] = useState(false)
	const sendForm = () => {
		return
	}
	const submit = (event) => {
		event.preventDefault()
		try {
			sendForm()
			navigate('/home')
		} catch (error) {
			throw(console.error(error))
		}
	}
	return (
		<>
			{loading && <Loading/>}
				<div className="absolute w-screen h-screen flex justify-center items-center z-10">
					<form onSubmit={(e) => submit(e)} className="w-[35%] shadow-2xl rounded-3xl flex flex-col h-[40%] items-center gap-7 dark:bg-blue-950/80">
						<h1 className="text-center text-[5rem] font-['Roboto'] dark:text-white">Smart Match</h1>
						<span className="text-2xl dark:text-white">Email:<input className="ml-2 rounded-lg pl-2 bg-transparent shadow-boxShadowInput" type="text" onChange={(e) => setEmail(e.target.value)} /></span>
						<span className="text-2xl dark:text-white">Password:<input className="ml-2 rounded-lg pl-2 bg-transparent shadow-boxShadowInput" type="password" onChange={(e) => setPassword(e.target.value)}/></span>
						<button type="submit" className="rounded-3xl bg-white/80 w-1/3 text-xl h-10 hover:scale-110 ease-in-out duration-300 shadow-md dark:text-white dark:bg-white/40">Log In</button>
					</form>
				</div>
		</>
	)
}
export {LogInPage}
