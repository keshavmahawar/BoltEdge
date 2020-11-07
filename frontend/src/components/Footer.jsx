import React from "react";
import { Box, Divider, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
        height: 350,
        backgroundColor: "#333333",
        color: "#E2E2E2",
    },
    mainBox: {
        display: "flex",
    },
    footerHeadings: {
        flex: 1,
        fontSize: 16,
        marginTop: 70,
        marginLeft: 100,
        fontWeight: "bold",
    },
    contentStyle: {
        marginTop: 10,
        fontWeight: "400",
    },
});
export default function Footer() {
    const classes = useStyles();

    return (
        <>
            <div />
            <Box className={classes.root}>
                <Box
                    style={{
                        display: "flex",
                        marginLeft: "25%",
                        padding: "10px",
                    }}
                >
                    <Box style={{ marginRight: "30px" }}>
                        Updated on Nov 6th, 2020
                    </Box>
                    <Box className={classes.head}>
                        Indexing over 7 billion results across 104 million
                        domains
                    </Box>
                </Box>
                <Divider />
                <Box className={classes.mainBox}>
                    <Box className={classes.footerHeadings}>
                        Resources:
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Blog</Box>
                        </Link>
                        <Link
                            href="https://www.masaischool.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>
                                Tutorials
                            </Box>
                        </Link>
                        <Link
                            href="https://www.masaischool.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Glossary</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Videos</Box>
                        </Link>
                    </Box>
                    <Box className={classes.footerHeadings}>
                        About Us:
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Nutnbolt</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Store</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Contact</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Us</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Jobs</Box>
                        </Link>
                    </Box>
                    <Box className={classes.footerHeadings}>
                        Useful Links:
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Member</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Perks</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>
                                Consulting
                            </Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Api</Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>
                                Affiliates
                            </Box>
                        </Link>
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>Feedback</Box>
                        </Link>
                    </Box>
                    <Box className={classes.footerHeadings}>
                        Compare:
                        <Link
                            href="https://www.google.com"
                            color="inherit"
                            underline="none"
                        >
                            <Box className={classes.contentStyle}>SEMRush</Box>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
