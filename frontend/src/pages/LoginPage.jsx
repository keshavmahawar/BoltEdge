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
	loginPageImage: {
		width: '90%',
		height: '100%',
		objectFit: 'cover',
		margin: 'auto'
	}
});
function LoginPage(props) {
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
						<Box className={classes.loginHeading}>Login to your account</Box>
						<TextField label="Email or Username" margin="normal" variant="outlined" />
						<TextField label="Password" margin="normal" variant="outlined" />
						<FormControlLabel
							value="Remember me"
							control={<Checkbox color="primary" />}
							label="Remember me"
							labelPlacement="end"
						/>
						<div style={{ height: 20 }} />
						<Button color="primary" variant="contained">
							Log in
						</Button>
					</div>
					<div />
				</Grid>
				<Grid item xs={12} sm={6}>
					<img src="undraw_data_xmfy (1).svg" className={classes.loginPageImage} alt="brand" />
				</Grid>
			</Grid>
		</div>
	);
}

export default LoginPage;
