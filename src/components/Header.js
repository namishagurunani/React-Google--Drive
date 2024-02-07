import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import { Avatar } from '@mui/material';
import './Header.css';

const Header = ({ photoURL, setSearchTerm }) => {
    // Function to handle search input change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
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
                    <Avatar src={photoURL} />
                </span>
            </div>
        </div>
    );
};

export default Header;
