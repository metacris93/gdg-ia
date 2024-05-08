import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Grid,
  Icon,
  styled
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

// eslint-disable-next-line react/prop-types
const ClientForm = ({ setDisplay, client }) => {
  const [state, setState] = useState({});
	const navigate = useNavigate()
  // const handleChangeSoftSkills = (_, newValue) => {
	// 	const array = newValue.map((soft) => (soft.name))
	// 	setState({...state, softskills: array})
  // };

	// const handleChangeTechStack = (_, newValue) => {
	// 	const array = newValue.map((tech) => (tech.name))
	// 	setState({...state, techStack: array})
  // };

	// const handleChangeIndustry = (_, newValue) => {
	// 	const array = newValue.map((industry) => (industry.name))
	// 	setState({...state, industries: array})
  // };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    console.log("submitted");
    console.log(event);
  };

  const handleChange = (event) => {
		console.log(event)
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
	console.log(client)
  return (
    <div>
			<Button variant="text" onClick={() => {setDisplay(1); navigate('/AiMatch')}}><ArrowBack/></Button>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
							disabled
              type="text"
              name="names"
							// eslint-disable-next-line react/prop-types
							value={client.name}
            />

            <TextField
							disabled
              type="industry"
              name="industry"
							// eslint-disable-next-line react/prop-types
							value={client.industry}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
					<TextField
						id="description"
						disabled
						// eslint-disable-next-line react/prop-types
						value={client.description}
						name="description"
						multiline
						rows={5}
						onChange={handleChange}
					/>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ClientForm;
