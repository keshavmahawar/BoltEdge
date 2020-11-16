import React, { useEffect, useState } from 'react'
import axios from '../requests/request'
import { makeStyles } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AdminNavbar from '../components/AdminNavbar'
import CallIcon from '@material-ui/icons/Call';
import Pagination from '@material-ui/lab/Pagination'
import { Link, Redirect } from 'react-router-dom'
import { Paper, Button, Container } from '@material-ui/core'
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(4),
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
        width: '300px',
        margin: '20px auto'
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    },
}));

export default function Admin() {
    const classes = useStyles();
    const [allUsers, setAllUsers] = useState([])
    const [totalCount, setTotalCount] = useState("")
    const { adminAuthToken } = useSelector((state) => state.admin)

    useEffect(() => {
        axios.get('/admin/userDetails?page=1&limit=6')
            .then((res) => {
                console.log(res)
                setAllUsers([...res.data.current, ...allUsers])
                setTotalCount(res.data.totalCount)
            }).catch((err) => console.log(err))
    }, [])

    const handlePageChange = (event, value) => {
        axios.get(`/admin/userDetails?page=${value}&limit=6`)
            .then(res => {
                setAllUsers([...res.data.current])
                setTotalCount(res.data.totalCount)
            }).catch(err => console.log(err))
    }
    console.log(adminAuthToken)
    return (

        <div style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
            {adminAuthToken != null ? (
                <>
                    <AdminNavbar />
                    <Pagination count={Math.ceil(totalCount / 6)} color="secondary" className={classes.pagination} onChange={handlePageChange} />
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

                                                <Button type="button" className={classes.button}>
                                                    <Link to={`/admin/${item._id}`} className={classes.link}>View Details</Link>
                                                </Button>
                                            </div>
                                        </Paper>
                                    )
                                })
                            }
                        </div>
                    </Container>
                </>
            ) : <Redirect to="/adminlogin" />}
        </div>
    )
}

