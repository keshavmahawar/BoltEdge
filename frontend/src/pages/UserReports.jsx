import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Button, Grid, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	mainLogin: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: 500,
		minWidth: 400
	},
	loginHeading: {
		textAlign: 'left',
		fontSize: '50px',
		fontWeight: '300',
		color: '#333333',
		marginBottom: '10px'
	},
	root: {
		flexGrow: 2
	},
	nav: {
		marginLeft: 10,
		padding: 5
	}
});
export default function UserDetails() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ background: '#FFFF' }}>
				<Toolbar variant="dense">
					<Typography variant="h5" color="inherit" className={classes.nav}>
						<img src="https://www.nutnbolt.co/assets/img/logo.svg" alt="logo" />
					</Typography>
					<div />
					<Typography variant="h5" color="Secondary" className={classes.nav}>
						Detailed Reports
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
