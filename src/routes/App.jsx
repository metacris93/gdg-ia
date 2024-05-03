import { LogInPage } from './LogIn/Index'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './NotFound/Index'
import { Layer } from '../Components/Layer/Index'
import { Home } from './Home/Index'

function App() {
  return (
			<Layer>
				<HashRouter>
					<Routes>
						<Route path='login' element={<LogInPage/>}/>
						<Route path='*' element={<NotFoundPage/>}/>
						<Route path='home' element={<Home/>}/>
					</Routes>
				</HashRouter>
			</Layer>
  )
}

export default App
