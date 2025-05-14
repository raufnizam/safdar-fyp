import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaUsers, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const features = [
        {
            icon: <FaSearch className="text-3xl text-blue-500" />,
            title: "Smart Job Search",
            description: "Find your dream job with our AI-powered search that matches your skills and preferences."
        },
        {
            icon: <FaBriefcase className="text-3xl text-blue-500" />,
            title: "Freelance Projects",
            description: "Access thousands of Upwork projects directly from our platform."
        },
        {
            icon: <FaUsers className="text-3xl text-blue-500" />,
            title: "Professional Network",
            description: "Connect with industry professionals and grow your network."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Your Professional Network <span className="text-blue-600">Reimagined</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10">
                        The simplest way to connect with opportunities and professionals worldwide.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            to="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            Join Now - It's Free
                        </Link>
                        <Link
                            to="/login"
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            Sign In
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center text-gray-900 mb-16"
                    >
                        Why Choose Our Platform
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                            >
                                <div className="flex justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-6"
                    >
                        Ready to Transform Your Career?
                    </motion.h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto">
                        Join thousands of professionals who found their dream jobs through our platform.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            to="/register"
                            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300"
                        >
                            Get Started Today
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold">CareerConnect</h3>
                            <p className="text-gray-400 mt-2">The professional network you deserve</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-blue-400 transition">
                                <FaEnvelope className="text-xl" />
                            </a>
                            {/* Add more social icons as needed */}
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;