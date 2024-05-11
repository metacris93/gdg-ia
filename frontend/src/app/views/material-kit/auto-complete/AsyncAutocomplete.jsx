import { useState, useEffect, Fragment } from "react";
import { Autocomplete, CircularProgress, styled, TextField } from "@mui/material";
import axios from "axios";

const AutoComplete = styled(Autocomplete)(() => ({ width: 300 }));


// eslint-disable-next-line react/prop-types
export default function AsyncAutocomplete({url, label}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) return;
		if(active){
			axios.get(url)
			.then(res => setOptions(res.data))
			.catch(err => console.error(err))
		}

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <AutoComplete
      open={open}
      options={options}
      loading={loading}
      id="asynchronous-demo"
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  );
}
