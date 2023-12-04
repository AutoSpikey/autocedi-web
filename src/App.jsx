import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast"

function App() {
	return (
		<AuthProvider>
			<Toaster />
			<Routes />
		</AuthProvider>
	);
}

export default App;
