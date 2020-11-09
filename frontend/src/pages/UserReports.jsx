import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ListIcon from '@material-ui/icons/List';
import StarsIcon from '@material-ui/icons/Stars';
import RateReviewIcon from '@material-ui/icons/RateReview';
import EuroIcon from '@material-ui/icons/Euro';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 2
	},
	nav: {
		marginLeft: 10,
		padding: 5
	},
	root1: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2),
			width: theme.spacing(40),
			height: theme.spacing(18)
		}
	},
	root2: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2),
			width: theme.spacing(84),
			height: theme.spacing(58)
		}
	},
	root3: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2),
			width: theme.spacing(84),
			height: theme.spacing(58)
		}
	},
	root4: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2),
			width: theme.spacing(38),
			height: theme.spacing(20)
		}
	},
	size: {
		margin: theme.spacing(2),
		width: theme.spacing(4),
		height: theme.spacing(4)
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
			<div className={classes.root1}>
				<Paper elevation={5} style={{ background: '#F1F1F1' }}>
					<div style={{ display: 'flex' }}>
						<ListIcon className={classes.size} />
						<h3>No. of items</h3>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h1>5000</h1>
					</div>
				</Paper>
				<Paper elevation={5} style={{ background: '#F1F1F1' }}>
					<div style={{ display: 'flex' }}>
						<StarsIcon className={classes.size} />
						<h3>Rating Comparison</h3>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h1>5000</h1>
					</div>
				</Paper>
				<Paper elevation={5} style={{ background: '#F1F1F1' }}>
					<div style={{ display: 'flex' }}>
						<RateReviewIcon className={classes.size} />
						<h3>Review Comparison</h3>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h1>5000</h1>
					</div>
				</Paper>
				<Paper elevation={5} style={{ background: '#F1F1F1' }}>
					<div style={{ display: 'flex' }}>
						<EuroIcon className={classes.size} />
						<h3>Discounts</h3>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h1>5000</h1>
					</div>
				</Paper>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<div className={classes.root2}>
					<Paper elevation={5} style={{ background: '#F1F1F1' }}>
						<div style={{ display: 'flex' }}>
							<TrendingUpIcon className={classes.size} />
							<h3>Sales Trend Chart</h3>
						</div>
						<div>
							<img
								style={{ width: 670 }}
								src="https://pbs.twimg.com/media/DlDgB8BU4AAXoGq.jpg"
								alt="Charts"
							/>
						</div>
					</Paper>
				</div>
				<div className={classes.root3}>
					<Paper elevation={5} style={{ background: 'white smoke' }}>
						<div style={{ display: 'flex' }}>
							<RestaurantIcon className={classes.size} />
							<h3>Resturant Average Comparison</h3>
						</div>
						<div className={classes.root4}>
							<Paper elevation={5} style={{ background: '#F1F1F1' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Average Order Value</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<AttachMoneyIcon />
									<h1>255</h1>
								</div>
							</Paper>
							<Paper elevation={5} style={{ background: '#F1F1F1' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Average Discount Gap</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<AttachMoneyIcon />
									<h1>25</h1>
								</div>
							</Paper>
						</div>
						<div className={classes.root4}>
							<Paper elevation={5} style={{ background: '#F1F1F1' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Average Burn</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<AttachMoneyIcon />
									<h1>50</h1>
								</div>
							</Paper>
							<Paper elevation={5} style={{ background: '#F1F1F1' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Selling Comparison</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<h1>Chinese</h1>
								</div>
							</Paper>
						</div>
					</Paper>
				</div>
			</div>
		</div>
	);
}
