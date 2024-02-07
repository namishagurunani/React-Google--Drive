import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import DevicesIcon from '@material-ui/icons/Devices';
import { Modal } from '@material-ui/core';
import { useState } from 'react';
import { db, storage } from './firebase';
import firebase from "firebase";
import './Sidebar.css'

const Sidebar = () => {
     // State for modal open/close and file upload
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);
    const [file, setFile] = useState(null);

     // Function to handle file selection
    const handleFile = (e)=> {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    // console.log(file);


     // Function to handle file upload-------
    const handleUpload = (e) => {
        e.preventDefault();
        setUpload(true);
        storage.ref(`files/${file.name}`).put(file).then(snapshot => {
            storage.ref("files").child(file.name).getDownloadURL().then(url => {
                db.collection("myfiles").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    filename: file.name,
                    fileURL: url,
                    size: snapshot._delegate.bytesTransferred
                })
                setUpload(false);
                setFile(null);
                setOpen(false);
            })
        })
    }
     // JSX rendering
    return (
        <>
        <div className='main_SidebarContainer'>
            <div className='SidebarButton'>
                <button onClick={() => setOpen(true)}>
                    <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" />
                    <span>New</span>
                </button>
            </div>
            <div className='SidebarOptions'>
            <div className='SidebarOption'>
                    <MobileScreenShareIcon />
                    <span>My Drive</span>
                </div>
                <div className='SidebarOption'>
                    <DevicesIcon />
                    <span>Computers</span>
                </div>
                <div className='SidebarOption'>
                    <PeopleAltOutlinedIcon />
                    <span>Shared with me</span>
                </div>
                <div className='SidebarOption'>
                    <QueryBuilderOutlinedIcon />
                    <span>Recent</span>
                </div>
                <div className='SidebarOption'>
                    <StarBorderOutlinedIcon />
                    <span>Starred</span>
                </div>
                <div className='SidebarOption'>
                    <DeleteOutlineOutlinedIcon />
                    <span>Trash</span>
                </div>
            </div>
            <hr />
            <div className='SidebarOptions'>
                <div className='SidebarOption'>
                    <CloudQueueIcon />
                    <span>Storage</span>
                </div>
                <div className="progress_bar">
                    <progress size="tiny" value="50" max="100" />
                    <span>105 GB  of 200 GB used</span>
                </div>
            </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className='ModalPopup'>
                <form onSubmit={handleUpload}>
                    <div className='ModalHeading'>
                        <h3>Select file you want to upload</h3>
                    </div>
                    <div className='ModalBody'>
                        {upload ? <div className='UploadPara'>Uploading...</div> : (
                            <>
                                <input type="file" className='modal__file' onChange={handleFile} />
                                <input type="submit" className='modal__submit'/>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
        </>
    )
}
export default Sidebar;