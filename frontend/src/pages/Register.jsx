import React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Button, Grid, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { registerAdmin } from '../redux/Admin/action';
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
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name,setName]=useState("")
	const [Phone,setPhone]=useState("")
	const dispatch = useDispatch()
	const {isRegister} = useSelector((state) => state.user)

	const handleClick = () =>{
		dispatch(registerAdmin({name,email,password,phone}))
	}
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
						<TextField label="Name" margin="normal" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
						<TextField label="Email" margin="normal" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
						<TextField label="Phone Number" margin="normal" variant="outlined"  value={Phone} onChange={(e)=>setPhone(e.target.value)}/>
						<TextField label="Password" type="password" margin="normal" variant="outlined" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
						<div style={{ height: 20 }} />
						<Button color="primary" variant="contained" onClick={handleClick}>
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
