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
        <div className="flex">
            {Array.from({ length: filledStars }).map((_, index) => (
                <img
                    key={`filled-${index}`}
                    src={star}
                    alt="Filled Star"
                    style={{ width: '16px', height: '16px', margin: '0 2px' }}
                />
            ))}
            {halfStar && (
                <img
                    src={halfstar}
                    alt="Half Star"
                    style={{ width: '16px', height: '16px', margin: '0 2px' }}
                />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <img
                    key={`empty-${index}`}
                    src={emptyStar}
                    alt="Empty Star"
                    style={{ width: '16px', height: '16px', margin: '0 2px' }}
                />
            ))}
        </div>
    );
};

const ServicesByCategory: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            setServices(data.content); // Adjust this based on the response structure
        } catch (error) {
            console.error(error);
            alert('Error fetching services.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Services in Category</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="border rounded-lg shadow-md flex flex-col lg:flex-row items-start p-4"
                            style={{
                                minHeight: '280px', //
                                width: '100%',
                            }}
                        >
                            <div className="lg:w-1/4 w-full h-40 lg:h-auto">
                                <img
                                    src={service.user.photo || DEFAULT_PHOTO}
                                    alt={service.title}
                                    className="rounded-lg w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:w-3/4 w-full lg:pl-6 flex flex-col justify-between">

                                <div className="flex items-center mt-2 mb-4">
                                    <span className="text-lg font-semibold mr-3">
                                        {service.user.firstName} {service.user.lastName}
                                    </span>
                                    <div className="flex items-center">
                                        {renderStars(service.user.averageStars)}
                                        <Link
                                            to={`/reviews/${service.user.email}`}
                                            className="text-sm text-blue-600 hover:underline ml-2"
                                        >
                                            (reviews)
                                        </Link>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold">{service.title}</h3>


                                <div className="mt-2">
                                    <p className="font-semibold text-md">Price: {service.price} €</p>
                                    <p className="mt-1 text-gray-700 text-sm">Description: {service.description}</p>
                                </div>
                            </div>

                            <Link
                                to={`/booking/${service.id}`}
                                state={{ service }}
                                className="mt-4 bg-sky-400 hover:bg-sky-500 text-white py-2 px-4 rounded text-center w-full lg:w-auto"
                            >
                                Book this service
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesByCategory;




