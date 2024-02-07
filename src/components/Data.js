import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Data.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Data = ({ searchTerm }) => {
    const [files, setFiles] = useState([]);

    // Fetch files from Firestore on component mount
    useEffect(() => {
        const unsubscribe = db.collection("myfiles").onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });

        return () => unsubscribe();      // Unsubscribe from Firestore listener on component unmount
    }, []);             

      // Function to convert file sizes into human-readable format
    const convertingToBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
     // Filter files based on search term
    const filteredFiles = files.filter(file =>
        file.data.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

     // JSX rendering
    return (
        <div className='main_DataContainer'>
            <div className='DataHeader'>
                <div className="headerLeft">
                    <p>My Drive</p>
                </div>
            </div>
            <div className='DataList'>
                <div className='DataListRow'>
                    <p><b>Name <ArrowDownwardIcon /></b></p>
                    <p><b>Owner</b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                </div>
                {filteredFiles.map(file => (
                    <div className='DataListRow' key={file.id}>
                        <a href={file.data.fileURL} target='_blank' rel="noreferrer">
                            <p><InsertDriveFileIcon /> {file.data.filename.slice(0,22)}</p>
                        </a>
                        <p><AccountCircleIcon style={{ color: 'gray' }}/> me</p> 
                        <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
                        <p>{convertingToBytes(file.data.size)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data;
