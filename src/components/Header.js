import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import { Avatar, Button, Popover, Typography } from '@mui/material'; // Import Popover and related components from Material UI
import './Header.css';

const Header = ({ photoURL, setSearchTerm }) => {
    const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for popover

    // Function to handle search input change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to handle clicking on the Avatar
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget); // Set anchor element for popover
    };

    // Function to handle closing the popover
    const handleClosePopover = () => {
        setAnchorEl(null); // Close the popover
    };

    // Function to handle logout action
    const handleLogout = () => {
        // Perform logout actions here, such as clearing session, cookies, or redirecting
        // For now, just log out to console and redirect to main page
        console.log('Logging out...');
        window.location.href = "/main_page"; // Redirect to the main page
    };

    const open = Boolean(anchorEl);

    // JSX rendering
    return (
        <div className='main_HeaderContainer'>
            <div className='HeaderLogo'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png" alt="Google Drive" />
                <span>Drive</span>
            </div>
            <div className='HeaderSearch'>
                <SearchIcon />
                <input type="text" placeholder='Search in Drive' onChange={handleSearch} />
                <FormatAlignCenterOutlinedIcon />
            </div>
            <div className='HeaderIcons'>
                <span>
                    <HelpOutlineIcon />
                    <SettingsOutlinedIcon />
                </span>
                <span>
                    <AppsOutlinedIcon />
                    <Avatar src={photoURL} onClick={handleAvatarClick} /> {/* Add onClick handler to the Avatar */}
                    {/* Popover for logout option */}
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>
                            <h3 style={{fontSize:"13px"}}>My Account</h3>
                      <hr style={{opacity:"0.9"}}/>
                            <Button style={{color:"red",fontSize:"13px"}} onClick={handleLogout}>Logout</Button>
                        </Typography>
                    </Popover>
                </span>
            </div>
        </div>
    );
};

export default Header;
