import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';

import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null,
	};

	searchUsers = async text => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${
				process.env.GITHUB_CLIENT_SECRET
			}`
		);
		this.setState({ users: res.data.items, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
	};

	render() {
		const { users, loading, alert } = this.state;

		return (
			<div className='App'>
				<Navbar icon='fab fa-github' title='LookHub' />
				<div className='container'>
					<Alert alert={alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0}
						setAlert={this.setAlert}
					/>
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;
