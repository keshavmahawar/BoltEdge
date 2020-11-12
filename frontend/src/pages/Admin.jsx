import React, { useEffect, useState } from 'react'
import axios from '../requests/request'
import { makeStyles } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AdminNavbar from '../components/AdminNavbar'

import { Card, Paper, Box, Button, Typography, Modal, Backdrop, Fade } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#F2F2F2',
        '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(70),
            height: theme.spacing(20),
        },
        margin: 'auto'
    },
    button: {
        backgroundColor: '#BA4055',
        color: 'white',
        margin: '10px'
    },
    heading: {
        margin: '10px',
        textTransform: 'uppercase',
        fontWeight: 500,
        letterSpacing: 1
    },
    content: {
        display: 'flex',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
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
                setAllUsers([...res.data, ...allUsers])
            }).catch((err) => console.log(err))
    }, [])

    const handleDetails = (id) => {
        axios.post('/admin/viewDetails', {
            id: id
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (

        <>
            <AdminNavbar />
            <h1 style={{ textAlign: "center" }}>All User Details</h1>
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
                                    <h5>{item.email}</h5>
                                    <h5>{item.phoneNo}</h5>
                                    <Button type="button" onClick={handleOpen} className={classes.button} onClick={() => handleDetails(item._id)}>
                                        View Details
                    </Button>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <div className={classes.paper}>
                                                <h2 id="transition-modal-title">Transition modal</h2>
                                                <p id="transition-modal-description">react-transition-group animates me.</p>
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                            </Paper>
                        )
                    })
                }
            </div>
        </>
    )
}

