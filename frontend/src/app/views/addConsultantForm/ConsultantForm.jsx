import { Fragment } from "react"
import { SimpleCard } from "app/components"
import SimpleForm from "../material-kit/forms/ConsultantForm"

const ConsultantForm = () => {
	return(
		<Fragment>
			<SimpleCard title="Consultant Form">
        <SimpleForm />
      </SimpleCard>
		</Fragment>
	)
}

export {ConsultantForm}
