import { Fragment } from "react"
import { SimpleCard } from "app/components"
import React from "react"
import { SwitchAiMatch } from "./switch/SwitchAiMatch"
const AiMatch = () => {
	const [display, setDisplay] = React.useState(1)
	return(
		<Fragment>
			<SimpleCard title="Ai Match">
				<SwitchAiMatch display={display} setDisplay={setDisplay}/>
      </SimpleCard>
		</Fragment>
	)
}

export {AiMatch}
