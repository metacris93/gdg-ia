import { Fragment } from "react";
import { SimpleCard } from "app/components";
import SimpleForm from "../material-kit/forms/ConsultantForm";

const ConsultantForm = () => {
	return (
		<Fragment>
			<SimpleCard title="Consultants">
				<SimpleForm />
			</SimpleCard>
		</Fragment>
	);
};

export { ConsultantForm };
