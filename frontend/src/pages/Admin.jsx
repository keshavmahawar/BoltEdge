import React, { useEffect, useState } from 'react'
import axios from '../requests/request'
import { makeStyles } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AdminNavbar from '../components/AdminNavbar'
import CallIcon from '@material-ui/icons/Call';
import Pagination from '@material-ui/lab/Pagination'
import { Link } from 'react-router-dom'
import { Paper, Button, Container } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#F2F2F2',
        '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(70),
            height: theme.spacing(22),
        },
    },
    button: {
        backgroundColor: '#BA4055',
        color: 'white',
        margin: '10px 15px'
    },
    heading: {
        margin: '10px',
        textTransform: 'uppercase',
        fontWeight: 500,
        letterSpacing: 1
    },
    content: {
        display: 'flex',
        margin: '15px auto 10px auto'
    },
    pagination: {
        width: '400px',
        margin: '25px auto'
    }
}));

export default function Admin() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [allUsers, setAllUsers] = useState([])
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('/admin/userDetails')
            .then((res) => {
                console.log(res)
                setAllUsers([...res.data.user, ...allUsers])
            }).catch((err) => console.log(err))
    }, [])

    const handleDetails = (id) => {

    }
    return (

        <>
            <AdminNavbar />
            <Pagination count={10} color="secondary" className={classes.pagination} />
            <Container>
                <div className={classes.root}>
                    {
                        allUsers.map((item) => {
                            return (

                                <Paper elevation={5} className={classes.content}>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ margin: '15px 10px 15px 15px' }}><RestaurantIcon></RestaurantIcon></div>
                                            <h2 className={classes.heading} >{item.name}</h2>
                                        </div>

                                        <div style={{ display: 'flex', margin: '5px 5px 0 15px' }}>
                                            <MailOutlineIcon></MailOutlineIcon>
                                            <h5 style={{ marginLeft: '15px' }}>{item.email}</h5>
                                        </div>
                                        <div style={{ display: 'flex', margin: '5px 5px 0 15px' }}>
                                            <CallIcon></CallIcon>
                                            <h5 style={{ marginLeft: '15px' }}>{item.phoneNo}</h5>
                                        </div>

                                        <Button type="button" className={classes.button} onClick={() => handleDetails(item._id)}>
                                            <Link to={`/admin/${item._id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </Paper>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}

