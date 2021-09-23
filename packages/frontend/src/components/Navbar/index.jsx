import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.styles.scss';

// Assets
import Logo from '../../assets/images/logo.png';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// Dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, logoutUser }) => {
	const { credentials, isAuth } = user;
	return (
		<header>
			<nav className="navbar">
				<div className="navbar__container">
					<div className="navbar__logo">
						<Link
							to="/"
							title="CrowdLinker"
							className="navbar__logo__link"
						>
							<img
								src={Logo}
								alt="CrowdLinker"
								className="navbar__logo__icon"
							/>
						</Link>
					</div>
					<div className="navbar__link-container"></div>
					<div className="navbar__action-container">
						{isAuth ? (
							<>
								<p className="navbar__action__text">
									Welcome, {credentials.name}
								</p>
								<button
									className="navbar__action navbar__action--button"
									title="Log Out"
									onClick={logoutUser}
								>
									<FontAwesomeIcon
										icon={faSignOutAlt}
										className="text-primary"
										size="2x"
									/>
								</button>
							</>
						) : (
							<>
								<Link
									className="navbar__action navbar__action--link"
									to="/login"
								>
									Log In
								</Link>
								<Link
									className="navbar__action navbar__action--link"
									to="/signup"
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
