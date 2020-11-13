import React, { useEffect, useState } from 'react'
import axios from '../requests/request'
import { Paper, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
        '& > *': {
            // margin: theme.spacing(2),
            width: theme.spacing(56),
            height: theme.spacing(22),
        },
    },
    content: {
        display: 'flex',
        margin: '15px auto 10px auto'
    }
}))
export default function EachUserDetails(props) {
    const classes = useStyles();
    const [user, setUser] = useState([])
    useEffect(() => {
        let id = props.match.params.id
        axios.post('/admin/viewDetails', {
            id: id
        }).then(res => {
            setUser(res.data)
        })
            .catch(err => console.log(err))
    }, [])
    console.log(user)
    console.log(user.restaurant)
    return (
        <>
            <Container>
                <h1>User Details</h1>
                <div>
                    <h2>Basic Info</h2>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>{user.phoneNo}</div>

                    <h2>Business Details</h2>
                    <div>GST No. {user.gstNo}</div>
                    <div>FSSAI No. {user.fssaiNo}</div>
                    <div>{user.isPaid ? 'Paid' : 'Not Paid'}</div>
                    <div>{user.isVerified ? 'Verified' : 'Not Verified'}</div>
                    {/* <div>Name: {user.restaurant.name}</div> */}
                    {/* <div>Cuisines: {user.restaurant.cuisines}</div> */}
                    {/* <div>Address: {user.restaurant.address}</div> */}
                    <h2 >Competitors</h2>
                    <div className={classes.root}>
                        {user.competitor && user.competitor.map((item) => {
                            return (
                                <Paper elevation={5} className={classes.content}>
                                    <div key={item.id}>
                                        <div>{item.name}</div>
                                        <div>{item.cuisines}</div>
                                        <div>{item.address}</div>
                                        <div><a href={item.url}>View More</a></div>
                                    </div>
                                </Paper>
                            )
                        })}
                    </div>


                </div>
            </Container>
        </>
    )
}