export const navigations = [
	{
		name: "Dashboard",
		path: "/dashboard/default",
		icon: "dashboard",
		children: [
			{ name: "Projects", path: "/dashboard/projects" },
			{ name: "Consultans", path: "/dashboard/consultants" },
		],
	},
	{ name: "AI Match", path: "/AIMatch", icon: "blur_on" },
	{ name: "Consultants", path: "/addConsultant", icon: "code" },
];
