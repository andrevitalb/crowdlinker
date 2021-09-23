import { BrowserRouter as Router, Switch } from 'react-router-dom';
import RouteController from './util/RouteController';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// Util
import AuthRoute from './util/AuthRoute';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
	return (
			<Provider store={store}>
				<Router>
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
	);
};

export default App;
