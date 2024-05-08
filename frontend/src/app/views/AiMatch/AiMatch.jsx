import { Fragment } from "react"
import { SimpleCard } from "app/components"
import ReactVirtualizedTable from "./Table"
import React from "react"
import ClientForm from "./clientForm"
const AiMatch = () => {
	const [display, setDisplay] = React.useState(true)
	return(
		<Fragment>
			<SimpleCard title="Ai Match">
				{(display)? <ReactVirtualizedTable setDisplay={setDisplay}/>:<ClientForm/>}
      </SimpleCard>
		</Fragment>
	)
}

export {AiMatch}
