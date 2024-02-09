import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Data.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { EmailShareButton } from 'react-share'; // Import the necessary component
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Data = ({ searchTerm }) => {
    const [files, setFiles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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
        closeModal(); // Close the modal after deleting the file
    };

    // Function to open modal
    const openModal = (file) => {
        setSelectedFile(file);
        setModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setSelectedFile(null);
        setModalOpen(false);
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
                </div>
                {files.map(file => (
                    <div 
                        className='DataListRow' 
                        key={file.id} 
                        onContextMenu={(e) => {
                            e.preventDefault();
                            openModal(file);
                        }}
                    >
                        <a href={file.data.fileURL} target='_blank' rel="noreferrer">
                            <p><InsertDriveFileIcon /> {file.data.filename.slice(0,28)}</p>
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
                          <PersonAddAltIcon></PersonAddAltIcon> {/* This is your share icon */}
                        </EmailShareButton>
                    </div>
                ))}
            </div>
            {/* Modal */}
            <Modal
                open={modalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 200 }}>
                    {selectedFile && (
                        <div>
                           <span onClick={() => handleDeleteFile(selectedFile.id)}>Move to trash</span>
                            <br/>
                            <EmailShareButton
                                subject="Check out this file"
                                body={`File Name: ${selectedFile.data.filename}\nFile Size: ${convertingToBytes(selectedFile.data.size)}`}
                                url={selectedFile.data.fileURL} style={{cursor:"pointer"}}
                            >
                                <span>Share</span>
                            </EmailShareButton>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Data;
