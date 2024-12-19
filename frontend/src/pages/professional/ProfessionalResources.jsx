import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Logo from '../../assets/infosys-main.png';

Modal.setAppElement('#root');

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProfessionalResource = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [referenceLink, setReferenceLink] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const username = sessionStorage.getItem('username'); // Get username from session

    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/dashboard/professional' },
        { name: 'Resources', path: '/professional/resources' },
        { name: 'Appointments', path: '/professional/appointments' },
        { name: 'Sessions', path: '/professional/sessions' },
    ];

    useEffect(() => {
        const fetchArticles = async () => {
            const username = sessionStorage.getItem('username'); // Get username from session

            if (!username) {
                toast.error('User is not logged in.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/articles?username=${username}`);
                if (!response.ok) throw new Error('Failed to fetch articles.');

                const data = await response.json();
                setArticles(data);
            } catch (error) {
                toast.error('Failed to load articles.');
            }
        };

        fetchArticles();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            toast.error('Please log in to create an article.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', content);
        formData.append('username', username);
        if (image) formData.append('image', image);
        if (referenceLink) formData.append('referenceLink', referenceLink);

        try {
            const response = await fetch('http://localhost:8080/api/articles', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Article created successfully!');
                setTitle('');
                setDescription('');
                setContent('');
                setReferenceLink('');
                setImage(null);
                setModalIsOpen(false);
                const newArticle = await response.json();
                setArticles((prev) => [newArticle, ...prev]);
            } else {
                toast.error('Error creating article. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/articles/${id}`, {
                method: "DELETE",
            });
    
            if (!response.ok) throw new Error("Failed to delete article.");
    
            toast.success("Article deleted successfully.");
            setArticles(articles.filter((article) => article.id !== id)); // Update state after deletion
        } catch (error) {
            toast.error("Failed to delete article.");
        }
    };

    return (
        <motion.div
            className="main pb-[330px]"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
        >
            {/* Navbar */}
            <nav className="flex justify-between items-center px-24 sticky bg-[#b7fdd3] top-0 z-50">
                <img src={Logo} alt="Logo" className="w-[7%]" />
                <ul className="flex items-center gap-5 bg-[#8abe9f] px-10 text-white p-3 rounded-full">
                    {navItems.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <li
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="flex items-center gap-5">
                    <button
                        className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Header Section */}
            <div className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Share Valuable Resources</h1>
                <p className="text-xl text-gray-700">
                    Create articles to help others grow and thrive in their journey.
                </p>
                <button
                    className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    onClick={() => setModalIsOpen(true)}
                >
                    Create Your Article
                </button>
            </div>

            {/* Modal for Article Creation */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="max-w-3xl mx-auto my-28 bg-white py-10 p-8 rounded-lg shadow-xl"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-2xl font-bold mb-4">Create an Article</h2>
                <form className="" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Reference Link (Optional)</label>
                        <input
                            type="url"
                            value={referenceLink}
                            onChange={(e) => setReferenceLink(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-2">Image (Optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="button"
                            onClick={() => setPreview(!preview)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            {preview ? 'Hide Preview' : 'Preview'}
                        </button>
                        <div>
                            <button
                                type="button"
                                className="px-4 py-2 mr-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                onClick={() => setModalIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>

                {preview && (
                    <motion.div
                        className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    >
                        <h3 className="text-xl font-semibold mb-2">{title || 'Untitled'}</h3>
                        <p className="text-gray-700 mb-2">{description}</p>
                        <p className="text-gray-500">{content}</p>
                        {referenceLink && (
                            <p>
                                Reference: <a href={referenceLink} target="_blank" rel="noopener noreferrer">{referenceLink}</a>
                            </p>
                        )}
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="mt-4 rounded-lg"
                            />
                        )}
                    </motion.div>
                )}
            </Modal>

            {/* Articles List */}
            <div className="px-24 mt-5">
                <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
                {articles.length === 0 ? (
                    <p className="text-gray-600">No articles available. Create one to get started!</p>
                ) : (
                    <div className="grid grid-cols-3 w-full items-start rounded-xl gap-20">
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                className="p-4 bg-[#71d699] mb-5 shadow-xl shadow-[#4CAB72] rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                                <p className="text-sm text-gray-800 mb-4">{article.description}</p>
                                {article.referenceLink && (
                                    <a
                                        href={article.referenceLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-800 italic hover:underline"
                                    >
                                        Read more
                                    </a>
                                )}
                                <div className='mt-3' onClick={()=>{deleteArticle(article.id)}}>
                                    <button className='bg-red-600 rounded-xl p-2 text-white font-bold'>Remove Article</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProfessionalResource;
