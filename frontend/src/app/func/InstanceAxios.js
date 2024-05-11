import axios from "axios"
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:8001/api'
})

export const urls = {
	industry: "http://localhost:8001/api/industries",
	stack: "http://localhost:8001/api/stacks",
	seniority: "http://localhost:8001/api/seniorities",
	area: "http://localhost:8001/api/areas",
	teams:"http://localhost:8001/api/teams/"
}
