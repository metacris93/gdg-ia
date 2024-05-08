import StickyHeadTable from "./Table";
import ClientForm from "./ClientForm";
// eslint-disable-next-line react/prop-types
const SwitchAiMatch = ({display, setDisplay, client, setClient}) => {
	switch (display) {
		case 1:
			return <StickyHeadTable setDisplay={setDisplay} setClient={setClient}/>;
		case 2:
			return <ClientForm setDisplay={setDisplay} client={client}/>
		case 3:
		default:
			break;
	}
}

export { SwitchAiMatch }
