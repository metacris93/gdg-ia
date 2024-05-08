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

const ClientForm = () => {
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
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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

export default ClientForm;
