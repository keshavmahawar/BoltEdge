import React from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DetailsTwoToneIcon from "@material-ui/icons/DetailsTwoTone";
import InsertChartTwoToneIcon from "@material-ui/icons/InsertChartTwoTone";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";
import PlayCircleOutlineTwoToneIcon from "@material-ui/icons/PlayCircleOutlineTwoTone";
import PaidRoute from "../route/PaidRoute";
import UserDetails from "./UserDetails";
import PaidAndVerifiedRoute from "../route/PaidAndVerifiedRoute";
import { Route, Switch, Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { loginLogout } from "../redux/User/action";
import SetRestaurant from "../components/SetRestaurant";
import GetCompetitor from "../components/GetCompetitor";
import Payment from "../components/Payment";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 15),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    logo: {
        flexGrow: 1,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color="white"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.logo}>
                        <img
                            src="https://www.nutnbolt.co/assets/img/logo.svg"
                            alt="logo"
                        />
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => dispatch(loginLogout())}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {["Insight"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <DetailsTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <Link to="/dashboard/details">
                        {["User Details"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <InsertChartTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </Link>
                </List>
                <Divider />
                <List>
                    {["Report"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <AssignmentTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["Demo"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <PlayCircleOutlineTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route
                        path="/dashboard/"
                        exact
                        component={() => <div>demo</div>}
                    />
                    <Route path="/dashboard/pay" component={Payment} />
                    <Route path="/dashboard/details" component={UserDetails} />
                    <PaidAndVerifiedRoute
                        path="/dashboard/restaurant/add"
                        component={SetRestaurant}
                    />
                    <PaidAndVerifiedRoute
                        path="/dashboard/restaurant/competitors"
                        component={GetCompetitor}
                    />
                    <PaidAndVerifiedRoute
                        path="/dashboard/insight"
                        component={() => <div>insights </div>}
                    />
                    <PaidAndVerifiedRoute
                        path="/dashboard/report"
                        component={() => <div>report </div>}
                    />
                </Switch>
            </main>
        </div>
    );
}
