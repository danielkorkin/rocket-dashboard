import { Suspense } from "react";
import { DataProvider } from "../components/DataProvider";
import Dashboard from "../components/Dashboard";
import DataSetupPage from "../components/DataSetupPage";

export default async function Home(props) {
    const searchParams = await props.searchParams;
    const page = searchParams.page || "dashboard";

    return (
		<DataProvider>
			<Suspense fallback={<div>Loading...</div>}>
				{page === "dashboard" && <Dashboard />}
				{page === "data-setup" && <DataSetupPage />}
			</Suspense>
		</DataProvider>
	);
}
