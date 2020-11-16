import React, { useEffect, useState } from 'react'
import '../admin.module.css'
import axios from '../requests/request'
import { Paper, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import BusinessIcon from '@material-ui/icons/Business';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AdminNavbar from './AdminNavbar'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        // backgroundColor: '#F2F2F2',
        '& > *': {
            width: theme.spacing(56),
            height: theme.spacing('auto'),
        },
    },
    root1: {
        diplay: 'flex',
        flexWrap: 'wrap',
        // backgroundColor: ' #F2F2F2',
    },
    root2: {
        flexDirection: 'column',
        margin: '10px',
        flex: 1,
        flexWrap: 'wrap',
        fontSize: '17px'

    },
    content: {
        display: 'flex',
        margin: '15px auto 10px auto'
    },
    detailsContent: {
        display: 'flex'
    },
    contentHeading: {
        margin: '15px',
        color: '#BA4055',
        fontWeight: 100
    },
    icons: {
        margin: '6px',
        color: '#BA4055'
    },
    details: {
        margin: '6px',
        letterSpacing: '0.5px'

    },
    verify: {
        float: 'right',
        margin: '10px',
        padding: '10px',
        letterSpacing: '0.1rem',
        cursor: 'pointer',
        border: '1px solid #BA4055',
        backgroundColor: 'white',
        color: '#BA4055',

    },
    mainHeading: {
        // color: '#BA4055',
        textAlign: 'center',
        margin: '20px',
        fontWeight: 100
    },
    urlContent: {
        textDecoration: 'none',
        color: '#BA4055',
        float: 'right',
        padding: '10px',
        border: '1px solid #BA4055',
        margin: '10px',
    },
    heading: {
        fontWeight: 'bold',
        margin: '6px',
        letterSpacing: '0.5px'
    }
}))
export default function EachUserDetails(props) {
    const classes = useStyles();
    const [user, setUser] = useState([])
    useEffect(() => {
        getDetails()
    }, [])
    console.log(user)
    console.log(user.restaurant)
    const getDetails = () => {
        let id = props.match.params.id
        axios.post('/admin/viewDetails', {
            id: id
        }).then(res => {
            setUser(res.data)
        })
            .catch(err => console.log(err))
    }
    const handleVerification = () => {
        axios.put('/admin/editIsVerified', {
            id: user._id,
            isVerified: !user.isVerified
        }).then((res) => {
            console.log(res)
            getDetails()
        })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <AdminNavbar />
            <div>
                <Container>
                    <h1 className={classes.mainHeading}>User Details</h1>
                    <div>

                        <div className={classes.root}>

                            <Paper elevation={5} className={classes.root2}>
                                <h2 className={classes.contentHeading}>Basic Info</h2>
                                <div className={classes.detailsContent}>
                                    <PersonIcon className={classes.icons}></PersonIcon>
                                    <div className={classes.details}>{user.name}</div>
                                </div>
                                <div className={classes.detailsContent}>
                                    <EmailIcon className={classes.icons}></EmailIcon>
                                    <div className={classes.details}>{user.email}</div>
                                </div>
                                <div className={classes.detailsContent}>
                                    <CallIcon className={classes.icons}></CallIcon>
                                    <div className={classes.details}>{user.phoneNo}</div>
                                </div>
                            </Paper>

                            <Paper elevation={5} className={classes.root2}>
                                <div>
                                    <button className={classes.verify} onClick={handleVerification}>{user.isVerified ? 'Verified' : 'Verify'}</button>
                                </div>
                                <h2 className={classes.contentHeading}>Business Details</h2>
                                <div className={classes.details}>GST No:- {user.gstNo ? user.gstNo : '------'}</div>
                                <div className={classes.details}>FSSAI No:- {user.fssaiNo ? user.fssaiNo : '-----'}</div>
                                <div className={classes.details}>Paid Till:- {user.isPaidTill ? `${new Date(user.isPaidTill).toLocaleDateString()}` : '-----'}</div>
                            </Paper>

                            <Paper elevation={5} className={classes.root2}>

                                <h2 className={classes.contentHeading}>Restaurant Details</h2>
                                {user.restaurant != null ?
                                    <>
                                        <div className={classes.detailsContent}>
                                            <PersonIcon className={classes.icons}></PersonIcon>
                                            <div className={classes.details}>{user.restaurant.name}</div>
                                        </div>
                                        <div className={classes.detailsContent}>
                                            <RestaurantMenuIcon className={classes.icons}></RestaurantMenuIcon>
                                            <div className={classes.details}>{user.restaurant.cuisines}</div>
                                        </div>
                                        <div className={classes.detailsContent}>
                                            <BusinessIcon className={classes.icons}></BusinessIcon>
                                            <div className={classes.details}>{user.restaurant.address}</div>
                                        </div>
                                    </>
                                    : <div style={{ margin: '10px' }}>Restaurant Details not yet provided!</div>}
                            </Paper>
                        </div>

                        {user.competitor == null ?
                            (
                                <>
                                    <h1>Competitors</h1>
                                    <h3>Not yet verified</h3>
                                </>
                            ) :
                            (
                                <>
                                    <h1 className={classes.mainHeading}>Competitors</h1>
                                    <div className={classes.root1}>
                                        {user.competitor && user.competitor.map((item) => {
                                            return (
                                                <Paper elevation={5} className={classes.root2}>
                                                    <div key={item.id} style={{ margin: '25px' }}>
                                                        <div ><a className={classes.urlContent} href={item.url}>View More</a></div>
                                                        <div className={classes.detailsContent}>
                                                            <PersonIcon className={classes.icons}></PersonIcon>
                                                            <div className={classes.heading}> {item.name}</div>
                                                        </div>
                                                        <div className={classes.detailsContent}>
                                                            <RestaurantMenuIcon className={classes.icons}></RestaurantMenuIcon>
                                                            <div className={classes.details}>{item.cuisines}</div>
                                                        </div>
                                                        <div className={classes.detailsContent}>
                                                            <BusinessIcon className={classes.icons}></BusinessIcon>
                                                            <div className={classes.details}>{item.address}</div>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            )
                                        })}
                                    </div>
                                </>
                            )}


                    </div>
                </Container>
            </div>
        </>
    )
}