import React, { useState , useEffect}  from 'react';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';
import UpdateProfile from './partials/update-profile';
import UpdatePassword from './partials/update-password';
import DeleteAccount from './partials/delete-account';
import "../../../App.css"


const DaftarPelayanan = ({
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Edit Profile`;
    }, []);


    return (
        <div className="flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div className='bodyadmin'>
                            <div className="texttitle">
                        Profile</div>
                        <div>
                            <form></form>
                        </div>
                        <UpdateProfile/>
                        <UpdatePassword/>
                        <DeleteAccount/>
                </div>
            </div>
            </div>
    );
};

export default DaftarPelayanan;