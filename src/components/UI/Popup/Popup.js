import React from "react";
import Popup from "reactjs-popup";

import Button from '../Button'

import classes from './Popup.module.css';



const PopupCustom = (props) => (
    <Popup open={true} >
	    {close => (
	      	<div className={classes.modal}>

		        <div className={classes.content}>
		          	{props.label}
		        </div>
		        <div className={classes.actions}>

		          	<Button
						primary
		            	onClick={() => { close()}}
		          	>
		            	Continue
		          	</Button>
		        </div>
	      	</div>
	    )}
  	</Popup>
);

export default PopupCustom
