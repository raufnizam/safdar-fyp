    import { useEffect } from 'react';
    import { useAuth } from '../context/AuthContext';
    import { useNavigate } from 'react-router-dom';

    const Profile = () => {
        const { user, isAuthenticated, logout } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);

        if (!isAuthenticated) {
            return null; // Or a loading spinner
        }

        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="p-8">
                        <div className="text-center">
                            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-blue-600">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <div className="mt-1 text-sm text-gray-900">{user?.username}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="mt-1 text-sm text-gray-900">{user?.email}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={logout}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Profile;