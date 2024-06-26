import { lazy } from "react";
import { Navigate } from "react-router-dom";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";
import { ConsultantForm } from "./views/addConsultantForm/ConsultantForm";
import { AiMatch } from "./views/AiMatch/AiMatch";
import ProjectsDashBoard from "./views/dashBoardProjects/ProjectsDashBoard";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
// E-CHART PAGE
// const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// // DASHBOARD PAGE
// const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [
	{
		element: <MatxLayout />,
		children: [
			...materialRoutes,
			{ path: "/AIMatch", element: <AiMatch /> },
			{ path: "/addConsultant", element: <ConsultantForm /> },
			{ path: "/dashboard/projects", element: <ProjectsDashBoard /> },
		],
	},

	// session pages route
	{ path: "/session/404", element: <NotFound /> },

	{ path: "/", element: <Navigate to="AIMatch" /> },
	{ path: "*", element: <NotFound /> },
];

export default routes;
