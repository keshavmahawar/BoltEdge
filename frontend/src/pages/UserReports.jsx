import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
	},
	cardroot1: {
		minWidth: 25,
		display: 'flex',
		flexWrap: 'wrap',
		margin: 30,
		width: 430,
		height: 200,
		background: '#F2F3F4'
	},
	cardroot2: {
		minWidth: 25,
		display: 'flex',
		flexWrap: 'wrap',
		margin: 30,
		width: 480,
		height: 460,
		background: '#F2F3F4'
	},
	cardroot3: {
		minWidth: 25,
		display: 'flex',
		flexWrap: 'wrap',
		margin: 30,
		width: 185,
		height: 200,
		background: '#F2F3F4'
	},
	cardroot4: {
		minWidth: 25,
		display: 'flex',
		flexWrap: 'wrap',
		margin: 30,
		marginLeft: 165,
		width: 1200,
		height: 200,
		background: '#F2F3F4'
	},
	title: {
		fontSize: 14
	},
	container: {
		display: 'flex'
	},
	mainContainer: {
		display: 'flex'
	},
	xyz: {
		display: 'flex',
		flexDirection: 'column'
	},
	pqr: {
		display: 'flex',
		flexDirection: 'row'
	}
});
export default function UserReports() {
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
			<div className={classes.mainContainer}>
				<div className={classes.xyz}>
					<Card className={classes.cardroot1}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Word of the Day
							</Typography>
						</CardContent>
					</Card>
					<div className={classes.pqr}>
						<Card className={classes.cardroot3}>
							<CardContent>
								<Typography className={classes.title} color="textSecondary" gutterBottom>
									Word of the Day
								</Typography>
							</CardContent>
						</Card>

						<Card className={classes.cardroot3}>
							<CardContent>
								<Typography className={classes.title} color="textSecondary" gutterBottom>
									Word of the Day
								</Typography>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className={classes.container}>
					<Card className={classes.cardroot2}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Word of the Day
							</Typography>
						</CardContent>
					</Card>
				</div>
				<div className={classes.xyz}>
					<Card className={classes.cardroot1}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Word of the Day
							</Typography>
						</CardContent>
					</Card>
					<div className={classes.pqr}>
						<Card className={classes.cardroot3}>
							<CardContent>
								<Typography className={classes.title} color="textSecondary" gutterBottom>
									Word of the Day
								</Typography>
							</CardContent>
						</Card>

						<Card className={classes.cardroot3}>
							<CardContent>
								<Typography className={classes.title} color="textSecondary" gutterBottom>
									Word of the Day
								</Typography>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<div className={classes.container}>
				<Card className={classes.cardroot4}>
					<CardContent>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							Word of the Day
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
