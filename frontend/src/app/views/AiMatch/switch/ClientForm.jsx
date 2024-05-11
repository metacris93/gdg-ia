/* eslint-disable react/prop-types */
import { ArrowBack } from "@mui/icons-material";
import {
	Button,
	Grid,
	Icon,
	styled,
	Box,
	Card,
	Autocomplete,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { urls } from "app/func/InstanceAxios";
import { useEffect } from "react";

const TextField = styled(TextValidator)(() => ({
	width: "100%",
	marginBottom: "16px",
}));
const Container = styled("div")(({ theme }) => ({
	margin: "30px",
	[theme.breakpoints.down("sm")]: { margin: "16px" },
	"& .breadcrumb": {
		marginBottom: "30px",
		[theme.breakpoints.down("sm")]: { marginBottom: "16px" },
	},
}));
const CardRoot = styled(Card)({
	padding: "20px 24px",
});

const CardTitle = styled("div")(({ subtitle }) => ({
	fontSize: "1rem",
	fontWeight: "500",
	textTransform: "capitalize",
	marginBottom: !subtitle && "16px",
}));
// eslint-disable-next-line react/prop-types
function CardSelect({ children, title, subtitle }) {
	return (
		<CardRoot elevation={6}>
			<CardTitle subtitle={subtitle}>{title}</CardTitle>
			{subtitle && <Box mb={2}>{subtitle}</Box>}
			{children}
		</CardRoot>
	);
}
// eslint-disable-next-line react/prop-types
const ClientForm = ({ setDisplay, data, setData }) => {
	const [state, setState] = useState({
		area: null,
		techStack: null,
		developmentLevel: null,
		industry: null,
		description: null,
	});
	const [industryOptions, setindustryOptions] = useState([]);
	const [stackOptions, setStackOptions] = useState([]);
	const [seniorityOptions, setSeniorityOptions] = useState([]);
	const [areasOptions, setAreasOptions] = useState([]);
	useEffect(() => {
		const gets = async () => {
			axios
				.get(urls.industry)
				.then((res) => setindustryOptions(res.data))
				.catch((err) => console.error(err));
			await axios
				.get(urls.stack)
				.then((res) => setStackOptions(res.data))
				.catch((err) => console.error(err));
			axios
				.get(urls.seniority)
				.then((res) =>
					setSeniorityOptions(res.data.map((option) => ({ level: option }))),
				)
				.catch((err) => console.error(err));
			await axios
				.get(urls.area)
				.then((res) => setAreasOptions(res.data))
				.catch((err) => console.error(err));
		};
		gets();
	}, []);

	const handleChangeIndustry = (_, newValue) => {
		const array = newValue.map((app) => app.name);
		setState({ ...state, industry: array });
	};

	const handleChangeAreaInterest = (_, newValue) => {
		const array = newValue.map((app) => app.name);
		setState({ ...state, area: array });
	};

	const handleChangeLevel = (_, newValue) => {
		const array = newValue.map((app) => app.level);
		setState({ ...state, developmentLevel: array });
	};

	const handleChangeTechStack = (_, newValue) => {
		const array = newValue.map((tech) => tech.name);
		setState({ ...state, techStack: array });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(
				`http://localhost:8001/api/clients/${data.client.id}/matches/`,
				state,
			)
			.then((res) => {
				setData({ ...data, project: [state], consultants: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
		setDisplay(3);
	};
	return (
		<Container>
			<Button
				variant="text"
				onClick={() => {
					setDisplay(1);
				}}
			>
				<ArrowBack />
			</Button>
			<ValidatorForm onSubmit={handleSubmit} onError={() => null}>
				<Grid container spacing={6}>
					<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							disabled
							type="text"
							name="names"
							// eslint-disable-next-line react/prop-types
							value={data.client.name}
						/>

						<TextField
							disabled
							type="industry"
							name="industry"
							// eslint-disable-next-line react/prop-types
							value={data.client.industry}
						/>
					</Grid>

					<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
						<TextField
							id="contact-email"
							disabled
							// eslint-disable-next-line react/prop-types
							value={data.client.contact_email}
							name="description"
						/>
					</Grid>
				</Grid>
				<Box py="12px" />
				<Grid container spacing={6}>
					<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
						<Box py="12px" />
						<CardSelect subtitle={"What technology is it implemented with?"}>
							<Autocomplete
								multiple
								id="tech-stack-required"
								options={stackOptions}
								onChange={handleChangeTechStack}
								getOptionLabel={(option) => option.name}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										variant="standard"
										label="Tech stack"
										placeholder="Tech Stack Required"
									/>
								)}
							/>
						</CardSelect>
						<Box py="12px" />
						<CardSelect subtitle={"Project's description"}>
							<TextField
								onChange={(e) =>
									setState({ ...state, description: e.target.value })
								}
								multiline
								placeholder="Project's description"
								rows={5}
							/>
						</CardSelect>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
						<CardSelect
							subtitle={"What level of development are you looking for?"}
						>
							<Autocomplete
								multiple
								id="development-level"
								options={seniorityOptions}
								onChange={handleChangeLevel}
								getOptionLabel={(option) => option.level}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										variant="standard"
										label="Level"
										placeholder="Level"
									/>
								)}
							/>
						</CardSelect>
						<Box py="12px" />
						<CardSelect
							subtitle={
								"Are you seeking specialists focused on specific industries?"
							}
						>
							<Autocomplete
								multiple
								id="industry"
								options={industryOptions}
								onChange={handleChangeIndustry}
								getOptionLabel={(option) => option.name}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										variant="standard"
										label="Industry"
										placeholder="Industry"
									/>
								)}
							/>
						</CardSelect>
						<Box py="12px" />
						<CardSelect subtitle={"Area of Interest"}>
							<Autocomplete
								multiple
								id="area-interest"
								options={areasOptions}
								onChange={handleChangeAreaInterest}
								getOptionLabel={(option) => option.name}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										variant="standard"
										label="Interest Area"
										placeholder="Interest Area"
									/>
								)}
							/>
						</CardSelect>
					</Grid>
				</Grid>
				<Box py="12px" />
				<Box py="12px" />
				<Button color="primary" variant="contained" type="submit">
					<Icon>send</Icon>
					<Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
				</Button>
			</ValidatorForm>
		</Container>
	);
};

export default ClientForm;
