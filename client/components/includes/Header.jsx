import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddNewBook from '../admin/pages/AddANewBook';
import { logoutAction, editProfileAction } from '../../actions/AuthActions';
import mailSender from '../../utils/mailSender';

/**
 * 
 * 
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);

		this.state = {
			plan: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	/**
	 * Executes after the component has rendered
	 * 
	 * 
	 * @memberOf Header
	 */
	componentDidMount() {
		$('.button-collapse').sideNav({
			menuWidth: 300, // Default is 300
			edge: 'left', // Choose the horizontal origin
			closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
		});
		$('.modal').modal();
	}

	/**
	 * Logs the user out of the application
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Header
	 */
	logout(event) {
		event.preventDefault();

		this.props.actions.logout();

		this.context.router.push('/');
	}

	/**
	 * 
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Header
	 */
	onChange(event) {
		this.setState({
			plan: event.target.value
		});
	}

	/**
	 * Handles form submit
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Header
	 */
	onSubmit(event) {
		event.preventDefault();
		const data = {
			message: `${this.props.user.username} wants an account
       upgrade to ${this.state.plan}`,
			subject: 'Account upgrade Notification'
		};

		mailSender(data)
			.then((status) => {
				if (status) {
					swal('Response recieved successfully, an Admin will get back to you.');
					$('#plan').modal('close');
				}
			})
			.catch((error) => {});
	}

	/**
	 * 
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf Header
	 */
	render() {
		const style = {
			button: {
				backgroundColor: 'rgb(37, 76, 71)',
				color: '#fff',
				float: 'right'
			}
		};

		return (
			<div id="menu">
				<nav>
					<div className="nav-wrapper">
						<div
							className="left"
							style={{
								fontSize: 'x-large'
							}}
						>
							<Link to="/">HelloBooks</Link>
						</div>
						<a href="#" data-activates="slide-out" 
						className="button-collapse hide-on-large-only right">
							<i
								style={{
									color: '#fff',
									fontSize: 40
								}}
								className="material-icons"
							>
								menu
							</i>
						</a>
						<ul className="right hide-on-med-and-down">
							<li>
								<a data-target="search_book" 
								className="modal-trigger" 
								href="#search_book">
									<i className="material-icons">search</i>
								</a>
							</li>
							<li>
								<a name="logout" onClick={this.props.actions.logoutAction} 
								href="#!">
									<i className="material-icons">exit_to_app</i>
								</a>
							</li>
							<li>
								<a className="dropdown-button" data-activates="dropdown2">
									<i className="material-icons">more_vert</i>
								</a>
							</li>
						</ul>
						<ul id="dropdown2" className="dropdown-content">
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<a name="logout" 
								onClick={this.props.actions.logoutAction} href="#!">
									Logout
								</a>
							</li>
							<li>
								<a className="modal-trigger" href="#plan">
									Upgrade Plan
								</a>
							</li>
						</ul>
					</div>
				</nav>

				{/* Upgrade Form Modal */}
				<div id="plan" className="modal">
					<div className="modal-content">
						<div className="row">
							<h4 className="center-align">Upgrade Your Membership Plan</h4>
							<br />
							<form name="plan" onSubmit={this.onSubmit} className="col s12">
								<div className="row">
									<div className="col s12">
										<select
											name="plan"
											id="plan"
											className="browser-default"
											onChange={this.onChange}
										>
											<option defaultValue>--Select New Plan--</option>
											<option value="Gold">Gold(10,000 Naira monthly)</option>
											<option value="Diamond">Diamond(6,000 Naira monthly)</option>
											<option value="Silver">Silver(Free)</option>
										</select>
									</div>
								</div>
								<button className="btn">Submit</button>
							</form>
						</div>
					</div>
				</div>
				{/* Search Modal */}
				<div id="search_book" className="modal">
					<div className="modal-content">
						<h4
							style={{
								alignContent: 'center'
							}}
						>
							Search for a book
						</h4>
						<div className="row">
							<form
								name="search_book"
								action="/search"
								className="col s12"
								onSubmit={this.handleFormSubmit}
							>
								<div className="add-book">
									<div className="row">
										<div className="input-field col s12">
											<input
												id="name"
												type="text"
												name="text"
												onChange={this.onChange}
												className="validate"
												required
											/>
											<label htmlFor="isbn">What do you want?</label>
										</div>
									</div>
								</div>
								<button
									style={style.button}
									className="btn waves-effect waves-light"
									type="submit"
									name="submit"
								>
									Search
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Header.PropTypes = {
	fullName: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};

/**
 * 
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
	return { user: state.auth.user.currentUser };
}

/**
 * 
 * Maps the state to component Props
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				logoutAction,
				editProfileAction
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
