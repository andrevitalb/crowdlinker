import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouteController from './util/RouteController';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Components
import Navbar from './components/Navbar/';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { getUserData, logoutUser } from './redux/actions/userActions';

// Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeValues from './util/theme';
const theme = createTheme(themeValues);

axios.defaults.baseURL =
	'https://us-central-crowdlinker-fe6ee.cloudfunctions.net/api';

const token = localStorage.AuthToken;
if (token) {
	const { exp } = jwtDecode(token);
	if (exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Navbar />
					<section className="mainApp">
						<Switch>
							<RouteController
								exact
								path="/"
								component={home}
								routeType={'protected'}
							/>
							<RouteController
								exact
								path="/login"
								component={login}
								routeType={'auth'}
							/>
							<RouteController
								exact
								path="/signup"
								component={signup}
								routeType={'auth'}
							/>
						</Switch>
					</section>
				</Router>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
