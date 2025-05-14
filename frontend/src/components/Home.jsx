import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setIsLoading(true);
        setError('');
        
        try {
            // This would call your backend scraping endpoint
            const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`);
            setSearchResults(response.data.results || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch results');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            <header className="app-header">
                <h1>Simple LinkedIn Clone</h1>
                <div className="user-info">
                    <span>Welcome, {user?.username}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <main className="main-content">
                <div className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for jobs on Upwork..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button" disabled={isLoading}>
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="results-section">
                    {searchResults.length > 0 ? (
                        <div className="results-list">
                            <h3>Search Results from Upwork</h3>
                            <ul>
                                {searchResults.map((result, index) => (
                                    <li key={index} className="result-item">
                                        <h4>{result.title}</h4>
                                        <p>{result.description}</p>
                                        <div className="result-meta">
                                            <span>Budget: {result.budget}</span>
                                            <span>Posted: {result.postedDate}</span>
                                            <a href={result.url} target="_blank" rel="noopener noreferrer">
                                                View on Upwork
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No results yet. Try searching for jobs!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;