import React from 'react';
import { Button, Grid, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	mainLogin: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: 500,
		minWidth: 300
	},
	loginHeading: {
		textAlign: 'left',
		fontSize: '50px',
		fontWeight: '300',
		color: '#333333',
		marginBottom: '20px'
	},
	signUpImage: {
		width: '80%',
		height: '100%',
		objectFit: 'cover',
		margin: 'auto'
	}
});
function Register(props) {
	const classes = useStyles(props);
	return (
		<div>
			<Grid container style={{ minHeight: '100vh' }}>
				<Grid
					container
					item
					xs={12}
					sm={6}
					alignItems="center"
					direction="column"
					justify="space-between"
					style={{ padding: 10 }}
				>
					<div />
					<div className={classes.mainLogin}>
						<Box className={classes.loginHeading}>Register as new user</Box>
						<TextField label="Name" margin="normal" variant="outlined" />
						<TextField label="Email" margin="normal" variant="outlined" />
						<TextField label="Phone Number" margin="normal" variant="outlined" />
						<TextField label="Password" type="password" margin="normal" variant="outlined" />
						<div style={{ height: 20 }} />
						<Button color="primary" variant="contained">
							Register
						</Button>
					</div>
					<div />
				</Grid>
				<Grid item xs={12} sm={6}>
					<img src="signup-page.png" className={classes.signUpImage} alt="brand" />
				</Grid>
			</Grid>
		</div>
	);
}

export default Register;
