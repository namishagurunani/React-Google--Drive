import React, { useState } from 'react';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
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
                <FormatAlignCenterIcon />
            </div>
            <div className='HeaderIcons'>
                <span>
                    <HelpOutlineIcon />
                    <SettingsIcon />
                </span>
                <span>
                    <AppsIcon />
                    <Avatar src={photoURL} />
                </span>
            </div>
        </div>
    );
};

export default Header;
