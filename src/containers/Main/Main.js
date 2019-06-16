import React, {Component} from 'react';

import Input from '../../components/UI/Input'
import Label from '../../components/UI/Label'
import CardForm from '../CardForm/CardForm'

import './Main.css';

class Main extends Component {

	state={
		haveCard: false,
		isChecked: false
	}

	isHaveCardHandler(){
		this.setState((prevState) => ({
			haveCard: !prevState.haveCard,
			isChecked: !prevState.isChecked
		}))
	}

	render() {

		return (
		    <div className="main">

		      	<h1>
		        	Gift Cards
		      	</h1>

		      	<Input
		      		type='checkbox'
					id='main__check'
		      		valid='true'
		      		onChange={() => this.isHaveCardHandler()}
		      	/>

				<Label
					htmlFor='main__check'
					toShow
					toChecked={this.state.isChecked}
				>
					Do you have a gift card?
				</Label>

		      	{
		      		this.state.haveCard
			      		? <CardForm />
			      		: null
		      	}
		    </div>
  		);
	}
}

export default Main;
