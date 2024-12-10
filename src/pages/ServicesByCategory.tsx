import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import profilePhoto from '../asets/images/user.png';
import star from '../asets/images/star.png';
import emptyStar from '../asets/images/empty-star.png';
import halfstar from '../asets/images/half-star.png';

const DEFAULT_PHOTO = profilePhoto;

interface Service {
    user: {
        photo: string | null;
        firstName: string;
        lastName: string;
        averageStars: number;
        email: string;
    };
    id: number;
    title: string;
    description: string;
    price: number;
}

const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
        <div className="flex justify-center items-center space-x-1">
            {Array.from({ length: filledStars }).map((_, index) => (
                <img
                    key={`filled-${index}`}
                    src={star}
                    alt="Filled Star"
                    className="w-4 h-4 hover:scale-125 hover:brightness-125 cursor-pointer transition-all"
                />
            ))}
            {halfStar && (
                <img
                    src={halfstar}
                    alt="Half Star"
                    className="w-4 h-4 hover:scale-125 hover:brightness-125 cursor-pointer transition-all"
                />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <img
                    key={`empty-${index}`}
                    src={emptyStar}
                    alt="Empty Star"
                    className="w-4 h-4 hover:scale-125 hover:brightness-125 cursor-pointer transition-all"
                />
            ))}
        </div>
    );
};

const ServicesByCategory: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [services, setServices] = useState<Service[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        if (categoryId) {
            fetchServicesByCategory(Number(categoryId));
        }
    }, [categoryId]);

    const fetchServicesByCategory = async (categoryId: number) => {
        try {
            const response = await fetch(`/api/services?categoryId=${categoryId}`);
            if (!response.ok) throw new Error('Failed to fetch services');
            const data = await response.json();
            setServices(data.content);
        } catch (error) {
            console.error(error);
            alert('Error fetching services.');
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);

    const paginatedServices = services.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Services in Category</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div
                    className="rounded-lg shadow-lg p-6  mx-auto"
                >
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        style={{ maxWidth: '1500px', margin: '0 auto' }}
                    >
                        {paginatedServices.map((service) => (
                            <div
                                key={service.id}
                                className="flex flex-col items-center p-4 border-2 "
                            >
                                <img
                                    src={service.user.photo || DEFAULT_PHOTO}
                                    alt={service.title}
                                    className="rounded-lg h-48 object-cover mb-4"
                                />
                                <div className="text-center">
                                    <p className="text-black-500 text-xl font-semibold">
                                        {service.user.firstName} {service.user.lastName}
                                    </p>
                                    <h3 className="text-lg font-semibold">{service.title}</h3>
                                    <div className="mt-2">{renderStars(service.user.averageStars)}</div>
                                    <Link
                                        to={`/reviews/${service.user.email}`}
                                        className="text-sm text-blue-600 hover:underline mt-2 block"
                                    >
                                        See Reviews
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-2">Email: {service.user.email}</p>
                                    <p className="font-semibold text-md mt-2">Price: {service.price} €</p>
                                    <p className="text-sm text-gray-700">{service.description}</p>
                                </div>
                                <Link
                                    to={`/booking/${service.id}`}
                                    state={{ service }}
                                    className="fancy-button mt-4 text-center"
                                >
                                    Book this service
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Пагинация */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-l bg-gray-300 hover:bg-gray-400 ${
                                currentPage === 1 && 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            Prev
                        </button>
                        <span className="px-4 py-2 bg-white border">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-r bg-gray-300 hover:bg-gray-400 ${
                                currentPage === totalPages && 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ServicesByCategory;





