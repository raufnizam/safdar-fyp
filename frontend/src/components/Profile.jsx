import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiEdit, FiLogOut, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-2xl font-bold">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{user?.username}</h1>
                                    <p className="text-blue-100">{user?.email}</p>
                                </div>
                            </div>
                            <button className="p-2 rounded-full hover:bg-white/10 transition">
                                <FiSettings className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Account Information */}
                        <div className="md:col-span-2">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <FiUser className="mr-2" /> Account Information
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-500">Username</p>
                                            <p className="font-medium">{user?.username}</p>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 p-1">
                                            <FiEdit />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{user?.email}</p>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 p-1">
                                            <FiEdit />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-500">Password</p>
                                            <p className="font-medium">••••••••</p>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 p-1">
                                            <FiEdit />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                                        <span>Edit Profile</span>
                                        <FiEdit />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                                        <span>Privacy Settings</span>
                                        <FiLock />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                                        <span>Notification Preferences</span>
                                        <FiMail />
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={logout}
                                className="w-full flex items-center justify-center space-x-2 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 transition"
                            >
                                <FiLogOut />
                                <span>Sign Out</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="border-t border-gray-200 p-6">
                        <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">12</p>
                                <p className="text-sm text-gray-600">Connections</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">5</p>
                                <p className="text-sm text-gray-600">Projects</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-purple-600">3</p>
                                <p className="text-sm text-gray-600">Skills</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;