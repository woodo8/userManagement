
import { Grid } from '@mui/material'
import React, { useState } from 'react'

import "./auth.css"
import Signup from './signup/signup'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Signin from './signin/signin';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Auth() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid className='authContainer' container justifyContent="center">
            <Grid className='authWrapper' item xs={11} sm={6} md={4}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Sign in" {...a11yProps(0)} />
                <Tab label="Sign up" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Signin />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Signup />
            </TabPanel>
        </Grid>

        </Grid >
    )
}
