import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUserDetails, setToken } from "./app/slices";
import { PrivateRoute } from "./components";
import { AppWrapper } from "./components/AppWrapper/AppWrapper";
import {
	Explore,
	Home,
	Profile,
	Saved,
	Signin,
	Signup,
	SinglePost,
} from "./features";
import { auth } from "./firebase";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch(setToken(user?.accessToken));
			dispatch(getCurrentUserDetails(user?.uid));
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<Routes>
			<Route element={<PrivateRoute switchPath={false} />}>
				<Route path="sign-up" element={<Signup />} />
				<Route path="sign-in" element={<Signin />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route element={<AppWrapper />}>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/singlepost" element={<SinglePost />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
