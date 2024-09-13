import React, { useState , useEffect}  from 'react';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';
import "../../../App.css"


const DaftarPelayanan = ({
    dataPelayanan = [], 
    countAll,
    countBaru,
    countProses,
    countSelesai,
    countAmbil,
    user
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Edit Profile`;
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin mau di hapus?')) {
            console.log('Delete ID:', id);
        }
    };

    return (
        <div className="flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div className='bodyadmin'>
                            <div className="texttitle">
                        Edit Profile</div>
                        <h3 className='mr-2 ml-2 mt-2'>Edit Your Profile Here !</h3>
                        <div>
                            <form></form>
                        </div>
                </div>
            </div>
            </div>
    );
};

export default DaftarPelayanan;