import StickyHeadTable from "./TableClients";
import ClientForm from "./ClientForm";
import React from "react";
import TableConsultants from "./TableConsultants";
// eslint-disable-next-line react/prop-types
const SwitchAiMatch = ({display, setDisplay}) => {
	const [data, setData] = React.useState({})
	switch (display) {
		case 1:
			return <StickyHeadTable setDisplay={setDisplay} setData={setData}/>;
		case 2:
			return <ClientForm setDisplay={setDisplay} data={data} setData={setData}/>
		case 3:
			return <TableConsultants data={data} setData={setData}/>
		default:
			break;
	}
}

export { SwitchAiMatch }
