import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
				<Navbar />
				<section className="mainApp">
					<Switch>
						<Route exact path="/" component={home} />
						<AuthRoute exact path="/login" component={login} />
						<AuthRoute exact path="/signup" component={signup} />
					</Switch>
				</section>
			</Router>
		</Provider>
	);
};

export default App;
