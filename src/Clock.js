import React from 'react'

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {time: new Date()};
	}

	tick() {
		this.setState({time: new Date()});
	}

	componentDidMount() {
		this.timer = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<h2>Jest {this.state.time.toLocaleTimeString()}</h2>
		);
	}
}

export default Clock
