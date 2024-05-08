import {
	Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const SimpleForm = () => {
  const [state, setState] = useState({});

  const handleChangeSoftSkills = (_, newValue) => {
		const array = newValue.map((soft) => (soft.name))
		setState({...state, softskills: array})
  };

	const handleChangeTechStack = (_, newValue) => {
		const array = newValue.map((tech) => (tech.name))
		setState({...state, techStack: array})
  };

	const handleChangeIndustry = (_, newValue) => {
		const array = newValue.map((industry) => (industry.name))
		setState({...state, industries: array})
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
		console.log(event)
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="names"
              label="names"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="email"
              name="email"
              label="email"
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
						<Autocomplete
							multiple
							id="tech-stack"
							options={techs}
							onChange={handleChangeTechStack}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => (
								<TextField
									{...params}
									fullWidth
									variant="standard"
									label="Tech-stack"
									placeholder="Tech stack"
								/>
							)}
						/>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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
						<Autocomplete
							multiple
							id="soft-skills"
							options={softSkillsData}
							name='softSkills'
							onChange={handleChangeSoftSkills}
							getOptionLabel={(option) => option.name}
							renderInput={(params) => (
								<TextField
									{...params}
									fullWidth
									variant="standard"
									label="Soft-skills"
									placeholder="Soft skills"
								/>
							)}
						/>
          </Grid>
        </Grid>
				<TextField
						id="description"
						placeholder="Description"
						name="description"
						multiline
						rows={5}
						onChange={handleChange}
				/>
				<RadioGroup
					row
					name="gender"
					sx={{ mb: 2 }}
					onChange={handleChange}>
					<FormControlLabel
						value="Male"
						label="Male"
						labelPlacement="end"
						control={<Radio color="secondary" />}
					/>

					<FormControlLabel
						value="Female"
						label="Female"
						labelPlacement="end"
						control={<Radio color="secondary" />}
					/>

					<FormControlLabel
						value="Others"
						label="Others"
						labelPlacement="end"
						control={<Radio color="secondary" />}
					/>
				</RadioGroup>
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;

const softSkillsData = [
	{ name: "Effective Communication" },
	{ name: "Problem Solving" },
	{ name: "Teamwork" },
	{ name: "Critical Thinking" },
	{ name: "Time Management" },
	{ name: "Adaptability" },
	{ name: "Creativity" },
	{ name: "Empathy" },
	{ name: "Continuous Learning" },
	{ name: "Leadership" },
	{ name: "Collaboration" },
	{ name: "Analytical Thinking" },
	{ name: "Organization" },
	{ name: "Decision Making" },
	{ name: "Active Listening" },
	{ name: "Resilience" },
	{ name: "Innovation" },
	{ name: "Presentation Skills" },
	{ name: "Self-Discipline" },
	{ name: "Receiving and Giving Feedback" }
];


const techs = [
	{ name: "JavaScript" },
	{ name: "Python" },
	{ name: "Java" },
	{ name: "C#" },
	{ name: "C++" },
	{ name: "Swift" },
	{ name: "Kotlin" },
	{ name: "Go" },
	{ name: "Ruby" },
	{ name: "PHP" },
	{ name: "TypeScript" },
	{ name: "SQL" },
	{ name: "HTML" },
	{ name: "CSS" },
	{ name: "React" },
	{ name: "Angular" },
	{ name: "Vue.js" },
	{ name: "Node.js" },
	{ name: "Express.js" },
	{ name: "Django" },
	{ name: "Spring" },
	{ name: "ASP.NET" },
	{ name: "Ruby on Rails" },
	{ name: "Laravel" },
	{ name: "Flask" },
	{ name: "TensorFlow" },
	{ name: "PyTorch" },
	{ name: "Keras" },
	{ name: "Scikit-learn" },
	{ name: "Pandas" },
	{ name: "NumPy" },
	{ name: "Bootstrap" },
	{ name: "Tailwind CSS" },
	{ name: "Sass" },
	{ name: "jQuery" },
	{ name: "Redux" },
	{ name: "Next.js" },
	{ name: "Gatsby" },
	{ name: "Electron" },
	{ name: "Unity" },
	{ name: "OpenGL" },
	{ name: "OpenCV" },
	{ name: "Docker" },
	{ name: "Kubernetes" },
	{ name: "Amazon Web Services (AWS)" },
	{ name: "Google Cloud Platform (GCP)" },
	{ name: "Microsoft Azure" },
	{ name: "Firebase" },
	{ name: "MongoDB" },
	{ name: "MySQL" },
	{ name: "PostgreSQL" }
];

const industries = [
	{ name: "Information Technology" },
	{ name: "Finance" },
	{ name: "Healthcare" },
	{ name: "Manufacturing" },
	{ name: "Retail" },
	{ name: "Automotive" },
	{ name: "Telecommunications" },
	{ name: "Hospitality" },
	{ name: "Education" },
	{ name: "Entertainment" },
	{ name: "Agriculture" },
	{ name: "Construction" },
	{ name: "Energy" },
	{ name: "Transportation" },
	{ name: "Media" },
	{ name: "Real Estate" },
	{ name: "Biotechnology" },
	{ name: "Pharmaceuticals" },
	{ name: "Aerospace" },
	{ name: "Government" },
	{ name: "Non-profit" },
	{ name: "Consulting" },
	{ name: "Legal" },
	{ name: "Insurance" },
	{ name: "Marketing" },
	{ name: "Advertising" },
	{ name: "Logistics" },
	{ name: "E-commerce" },
	{ name: "Environmental Services" },
	{ name: "Human Resources" }
];
