import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Alert, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BatchMember = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBatchMembers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/batches/${id}/members`,
                    { withCredentials: true }
                );
                setMembers(response.data.members);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'Failed to fetch batch members');
                setLoading(false);
            }
        };

        fetchBatchMembers();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <CircularProgress />
        </div>
    );
    
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container className="mt-4">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/batch" className="flex items-center text-black hover:text-gray-600">
                    <ArrowBackIcon/> <span className="ml-1">Back to Batches</span>
                </Link>
                <h2 className="text-2xl font-bold">Batch Members</h2>
            </div>

            {members.length === 0 ? (
                <Alert severity="info">No members found in this batch.</Alert>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member) => (
                        <div key={member._id} className="bg-white rounded-lg shadow-md p-4 relative">
                            {/* Green active indicator */}
                            <div className="absolute top-4 right-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 mb-3">
                                    <img 
                                        src={member.profilePic || "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain"} 
                                        alt={member.name} 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                
                                <h3 className="text-xl font-bold text-center">{member.name}</h3>
                                <p className="text-gray-700 text-center">{member.mobileNo}</p>
                                <p className="text-gray-600 text-center mt-2">
                                    Next Bill Date: {member.nextBillDate ? new Date(member.nextBillDate).toLocaleDateString() : "Not Set"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default BatchMember;