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
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 2,
		background: '#F4F4F8'
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
	root5: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0, 3, 1, 3),
			width: theme.spacing(14),
			height: theme.spacing(8)
		}
	},
	root6: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2),
			width: theme.spacing(172),
			height: theme.spacing(90)
		}
	},
	root7: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2),
			width: theme.spacing(70),
			height: theme.spacing(70)
		}
	},
	size: {
		margin: theme.spacing(2),
		width: theme.spacing(4),
		height: theme.spacing(4)
	}
}));
export default function UserReports() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.root1}>
				<Paper elevation={5} style={{ background: '#FFFFFF' }}>
					<div style={{ display: 'flex' }}>
						<ListIcon className={classes.size} />
						<h3>No. of items</h3>
					</div>
					<div style={{ textAlign: 'center' }}>
						<h1 style={{ marginTop: '-1px' }}>5000</h1>
					</div>
				</Paper>
				<Paper elevation={5} style={{ background: '#FFFFFF' }}>
					<div style={{ display: 'flex' }}>
						<StarsIcon className={classes.size} />
						<h3>Rating Comparison</h3>
					</div>
					<div className={classes.root5}>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Yours</strong>
								<h1 style={{ marginTop: '-1px' }}>255</h1>
							</div>
						</Paper>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Competitor</strong>
								<h1 style={{ marginTop: '-1px' }}>255</h1>
							</div>
						</Paper>
					</div>
				</Paper>
				<Paper elevation={5} style={{ background: '#FFFFFF' }}>
					<div style={{ display: 'flex' }}>
						<RateReviewIcon className={classes.size} />
						<h3>Review Comparison</h3>
					</div>
					<div className={classes.root5}>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Yours</strong>
								<h1 style={{ marginTop: '-1px' }}>255</h1>
							</div>
						</Paper>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Competitor</strong>
								<h1 style={{ marginTop: '-1px' }}>255</h1>
							</div>
						</Paper>
					</div>
				</Paper>
				<Paper elevation={5} style={{ background: '#FFFFFF' }}>
					<div style={{ display: 'flex' }}>
						<LocalOfferIcon className={classes.size} />
						<h3>Discount</h3>
					</div>
					<div className={classes.root5}>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Yours</strong>
								<h1 style={{ marginTop: '-1px' }}>25%</h1>
							</div>
						</Paper>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Competitor</strong>
								<h1 style={{ marginTop: '-1px' }}>20%</h1>
							</div>
						</Paper>
					</div>
				</Paper>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<div className={classes.root2}>
					<Paper elevation={5} style={{ background: '#FFFFFF' }}>
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
					<Paper elevation={5} style={{ background: '#FFFFFF' }}>
						<div style={{ display: 'flex' }}>
							<RestaurantIcon className={classes.size} />
							<h3>Resturant Average Comparison</h3>
						</div>
						<div className={classes.root4}>
							<Paper elevation={10} style={{ background: '#F4F4F8' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Average Order Value</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<h1>₹255</h1>
								</div>
							</Paper>
							<Paper elevation={10} style={{ background: '#F4F4F8' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Average Discount Gap</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<h1>₹255</h1>
								</div>
							</Paper>
						</div>
						<div className={classes.root4}>
							<Paper elevation={10} style={{ background: '#F4F4F8' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Average Burn</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<h1>₹255</h1>
								</div>
							</Paper>
							<Paper elevation={10} style={{ background: '#F4F4F8' }}>
								<div style={{ display: 'flex' }}>
									<RestaurantMenuIcon className={classes.size} />
									<h3>Best Selling Comparison</h3>
								</div>
								<div style={{ textAlign: 'center' }}>
									<h1>Chinese</h1>
								</div>
							</Paper>
						</div>
					</Paper>
				</div>
			</div>

			<div className={classes.root6}>
				<Paper elevation={5} style={{ background: '#FFFFFF' }}>
					<div style={{ display: 'flex', textAlign: 'center' }}>
						{/* <TrendingUpIcon className={classes.size}/> */}
						<img
							src="https://www.pngitem.com/pimgs/m/4-40385_logo-best-seller-png-transparent-png.png"
							style={{ height: '60px', width: '60px', margin: '10px' }}
							alt="best seller"
						/>
						<h3>Best Selling Comparison</h3>
					</div>
					<div className={classes.root7}>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Yours</strong>
								<h1 style={{ marginTop: '-1px' }}>255</h1>
							</div>
						</Paper>
						<Paper elevation={5} style={{ background: '#F4F4F8' }}>
							<div style={{ textAlign: 'center' }}>
								<strong>Competitor</strong>
								<h1 style={{ marginTop: '-1px' }}>255</h1>
							</div>
						</Paper>
					</div>
				</Paper>
			</div>
		</div>
	);
}
