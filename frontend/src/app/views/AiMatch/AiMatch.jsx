import { Fragment } from "react"
import { SimpleCard } from "app/components"
import React from "react"
import { SwitchAiMatch } from "./switch/SwitchAiMatch"
const AiMatch = () => {
	const [display, setDisplay] = React.useState(1)
	const [client, setClient] = React.useState({})
	return(
		<Fragment>
			<SimpleCard title="Ai Match">
				<SwitchAiMatch display={display} setDisplay={setDisplay} client={client} setClient={setClient}/>
      </SimpleCard>
		</Fragment>
	)
}

export {AiMatch}
