import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import { AuthData } from './components/type/interface';
import Max from './components/Max/Max';

function App() {
	const [authData, setAuthData] = useState<AuthData | null>(null);
	const [authDataLS, setAuthDataLS] = useState<AuthData | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const item = localStorage.getItem('key');
		if (item) {
			try {
				setAuthDataLS(JSON.parse(item));
			} catch (error) {
				console.error(error);
			}
		}
	}, []);

	const handleAuthSuccess = (data: AuthData) => {
		setAuthData(data);
		localStorage.setItem('key', JSON.stringify(data));
	};

	const handleLogout = () => {
		localStorage.removeItem('key');
		setAuthData(null);
		navigate('/login');
	};

	const authDataToPass = useMemo(
		() => authData || authDataLS,
		[authData, authDataLS]
	);

	const isAuthenticated = Boolean(authDataToPass);

	return (
		<div className='container'>
			<Routes>
				<Route
					path='/login'
					element={
						isAuthenticated ? (
							<Navigate to='/' replace />
						) : (
							<AuthForm onAuthSuccess={handleAuthSuccess} />
						)
					}
				/>

				<Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
					<Route
						path='/'
						element={
							authDataToPass ? (
								<Max authData={authDataToPass} onLogout={handleLogout} />
							) : (
								<AuthForm onAuthSuccess={handleAuthSuccess} />
							)
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
