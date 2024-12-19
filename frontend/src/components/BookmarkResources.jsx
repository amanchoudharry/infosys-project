import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BookmarkResources = () => {
    const userId = sessionStorage.getItem('userId'); // Assuming the userId is stored in sessionStorage
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookmarks', {
                    params: { userId },
                });
                setBookmarkedArticles(response.data);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };

        fetchBookmarks();
    }, [userId]);
    return (
        <div>
            <h1 className="text-4xl font-bold mb-5 text-center">Bookmarked Resources</h1>
            <div className="border-t-2 border-black mt-2 mb-10"></div>
            <div className='flex flex-col gap-5'>
                {bookmarkedArticles.length > 0 ? (
                    bookmarkedArticles.map((article, index) => (
                        <div key={index} className="resource-card flex items-center mx-10">
                            <div className="resource-img w-full">
                                <img src={article.img} alt={article.title} />
                            </div>
                            <div className="resource-content w-full flex flex-col gap-5">
                                <h3 className="text-3xl font-semibold">{article.title}</h3>
                                <p className="font-medium">{article.desc}</p>
                                <a
                                    href={article.link}
                                    className="italic hover:underline font-bold"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl">No bookmarked articles found.</p>
                )}
            </div>
        </div>
    )
}

export default BookmarkResources
