import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 2,
		background: '#63C986'
	},
	nav: {
		marginLeft: 10,
		padding: 5
	},
	root1: {
		flexGrow: 1,
		margin: 30
	},
	paper1: {
		height: theme.spacing(15),
		width: theme.spacing(45),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		background: '##7E5109',
		borderRadius: '10%',
		fontWeight: 'bold'
	},
	paper2: {
		height: theme.spacing(40),
		width: theme.spacing(32.5),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		background: '##7E5109',
		borderRadius: '30%',
		fontWeight: 'bold'
	},
	paper3: {
		height: theme.spacing(40),
		width: theme.spacing(70),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		background: '##7E5109',
		fontWeight: 'bold'
	}
}));
export default function UserReport() {
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
			<Container>
				<div className={classes.root1}>
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.paper1}>No. Of Items</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper1}>Rating Comparison</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper1}>Review Comparison</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.paper2}>Discount</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper3}>Sales Trend Chart</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper2}>Selling Comparison</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<Paper className={classes.paper1}>Average Order Value</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper1}>Average Discount Gap</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper1}>Average Burn</Paper>
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
}
