import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	};

	componentDidMount() {
		const { params } = this.props.match;
		// 1. reinstate our localStorage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		});
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = fish => {
		// 1. Take a copy of current state
		const fishes = { ...this.state.fishes };
		// 2. Add our new fish to fishes
		fishes[`fish${Date.now()}`] = fish;
		// 3. Update state
		this.setState({
			fishes: fishes
		});
	};

	updateFish = (key, updatedFish) => {
		// 1, Take a copy of current State
		const fishes = { ...this.state.fishes };
		// 2. Add our updated fish
		fishes[key] = updatedFish;
		// 3. Call setState
		this.setState({ fishes });
	};

	deleteFish = key => {
		// 1. Take a copy of state
		const fishes = { ...this.state.fishes };
		// 2. Delete the fish
		fishes[key] = null;
		// 3. Update state
		this.setState({ fishes });
	};

	removeFromOrder = key => {
		const order = { ...this.state.order };
		delete order[key];
		this.setState({ order });
	};

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = key => {
		// 1. Take a copy of state
		const order = { ...this.state.order };
		// 2. Add or update the number in order
		order[key] = order[key] ? order[key] + 1 : 1;
		// 3. Call setState to update it
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
					deleteFish={this.deleteFish}
					updateFish={this.updateFish}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
