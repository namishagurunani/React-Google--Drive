import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Data.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { EmailShareButton } from 'react-share'; // Import the necessary component
import ShareButton from './ShareButton';

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

    // Function to delete a file
    const handleDeleteFile = (fileId) => {
        db.collection("myfiles").doc(fileId).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch(error => {
                console.error("Error removing document: ", error);
            });
    };

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
                    <p></p>
                    <p></p>
                </div>
                {files.map(file => (
                    <div className='DataListRow' key={file.id}>
                        <a href={file.data.fileURL} target='_blank' rel="noreferrer">
                            <p><InsertDriveFileIcon /> {file.data.filename.slice(0,22)}</p>
                        </a>
                        <p><AccountCircleIcon style={{ color: 'gray' }}/> me</p> 
                        <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
                        <p>{convertingToBytes(file.data.size)}</p>
                        <EmailShareButton // Add EmailShareButton component
                            subject="Check out this file"
                            body={`File Name: ${file.data.filename}\nFile Size: ${convertingToBytes(file.data.size)}`}
                            url={file.data.fileURL}
                            className='share-icon'
                        >
                            <ShareButton /> {/* This is your share icon */}
                        </EmailShareButton>
                        <button class="button" type="button" onClick={() => handleDeleteFile(file.id)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 39 7"
    class="bin-top"
  >
    <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
    <line
      stroke-width="3"
      stroke="white"
      y2="1.5"
      x2="26.0357"
      y1="1.5"
      x1="12"
    ></line>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 33 39"
    class="bin-bottom"
  >
    <mask fill="white" id="path-1-inside-1_8_19">
      <path
        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
      ></path>
    </mask>
    <path
      mask="url(#path-1-inside-1_8_19)"
      fill="white"
      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
    ></path>
    <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
    <path stroke-width="4" stroke="white" d="M21 6V29"></path>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 89 80"
    class="garbage"
  >
    <path
      fill="white"
      d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
    ></path>
  </svg>
</button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data;
