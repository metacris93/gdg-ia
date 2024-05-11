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
import { techs } from "fake-db/fakeData";
import { industries } from "fake-db/fakeData";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));
const CardRoot = styled(Card)({
  padding: "20px 24px"
});

const CardTitle = styled("div")(({ subtitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: !subtitle && "16px"
}));
// eslint-disable-next-line react/prop-types
function CardSelect ({ children, title, subtitle }) {
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
		hasPlatform: null,
		applicationType: null,
		techStack: null,
		developmentLevel: null,
		industry: null,
		description: null
	});
  const handleChangeApp = (_, newValue) => {
		const array = newValue.map((app) => (app.name))
		setState({...state, applicationType: array})
  };
	const handleChangeIndustry = (_, newValue) => {
		const array = newValue.map((app) => (app.name))
		setState({...state, industry: array})
  };

	const handleChangeLevel = (_, newValue) => {
		const array = newValue.map((app) => (app.level))
		setState({...state, applicationType: array})
  };

	const handleChangeTechStack = (_, newValue) => {
		const array = newValue.map((tech) => (tech.name))
		setState({...state, techStack:array})
  };

	const handleChangePlatform = (_, newValue) => {
		if(newValue === null) {
			setState({...state, hasPlatform: null, applicationType: null, techStack: null})
		}else{
			const toBoolean = (newValue.option === "Yes")? true:false
		setState({...state, hasPlatform: toBoolean})
		}
  };
  const handleSubmit = (e) => {
    e.preventDefault()
		setData({...data, project: {...state}})
		setDisplay(3)
  };
	console.log({...data, project: {...state}})
  return (
    <Container>
			<Button variant="text" onClick={() => {setDisplay(1)}}><ArrowBack/></Button>
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
						id="description"
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
						<CardSelect subtitle={"Do you currently have a platform?"}>
							<Autocomplete
										disablePortal
										id="currently-platform"
										options={yesNoOptions}
										onChange={handleChangePlatform}
										getOptionLabel={(option) => option.option}
										renderInput={(params) => (
											<TextField
												{...params}
												fullWidth
												variant="standard"
											/>
										)}
								/>
					</CardSelect>
					<Box py="12px" />
					{(state.hasPlatform != true)?
					<CardSelect subtitle={"What type of application do you need?"}>
							<Autocomplete
									multiple
									id="application-type"
									options={applicationTypes}
									onChange={handleChangeApp}
									getOptionLabel={(option) => option.name}
									renderInput={(params) => (
										<TextField
											{...params}
											fullWidth
											variant="standard"
											label="Application Type"
											placeholder="Application Type"
										/>
									)}
								/>
						</CardSelect>: ""}
						{(state.hasPlatform === true)?
							<CardSelect subtitle={"What technology is it implemented with?"}>
							<Autocomplete
							multiple
							id="tech-stack-required"
							options={techs}
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
						</CardSelect>: ""}
						<Box py="12px" />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
					<CardSelect subtitle={"What level of development are you looking for?"}>
							<Autocomplete
									multiple
									id="development-level"
									options={developmentLevels}
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
						<CardSelect subtitle={"Are you seeking specialists focused on specific industries?"}>
							<Autocomplete
									multiple
									id="industry"
									options={industries}
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
          </Grid>
        </Grid>
				<Box py="12px" />
				<CardSelect subtitle={"Project's description"}>
					<TextField onChange={(e) => setState({...state, description: e.target.value})} multiline placeholder="Project's description" rows={5}/>
				</CardSelect>
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

const yesNoOptions = [
	{ option: "Yes"},
	{ option: "No" }
]
const applicationTypes = [
  {
    name: "Web Application",
  },
  {
    name: "Mobile Application",
  },
  {
    name: "Desktop Application",
  },
  {
    name: "Cross-platform Application",
  },
  {
    name: "Embedded Application",
  }
];
const developmentLevels = [
	{level: "Junior"},
	{level: "Mid-Senior"},
	{level: "Senior"}
]
