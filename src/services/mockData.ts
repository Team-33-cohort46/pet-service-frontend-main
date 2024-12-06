export interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface Booking {
  serviceId: number;
  date: string;
  timeSlot: string;
}

export const mockServices: Service[] = [
  { id: 1, name: 'Boarding', description: 'Overnight care for your pets', category: 'Cats' },
  { id: 2, name: 'Boarding', description: 'Overnight care for your pets', category: 'Dogs' },
  { id: 3, name: 'Pet Sitting', description: 'Temporary care for your pets', category: 'Cats' },
  { id: 4, name: 'Pet Sitting', description: 'Temporary care for your pets', category: 'Dogs' },
  { id: 5, name: 'Walking', description: 'Dog walking services', category: 'Dogs' },
  { id: 6, name: 'Grooming', description: 'Professional grooming for pets', category: 'Cats' },
  { id: 7, name: 'Grooming', description: 'Professional grooming for pets', category: 'Dogs' },
  { id: 8, name: 'In-Home Visits', description: 'Care for pets at home', category: 'Cats' },
  { id: 9, name: 'In-Home Visits', description: 'Care for pets at home', category: 'Dogs' },
  { id: 10, name: 'Training', description: 'Specialized training for dogs', category: 'Dogs' },
  { id: 11, name: 'Behavioral Consultation', description: 'Behavioral advice for pets', category: 'Dogs' },
  { id: 12, name: 'Cage Cleaning', description: 'Specialized cleaning for cages', category: 'Birds' },
  { id: 13, name: 'Dietary Consultation', description: 'Advice on pet diets', category: 'Birds' },
  { id: 14, name: 'Cage Cleaning', description: 'Specialized cleaning for rodent cages', category: 'Rodents' },
  { id: 15, name: 'Dietary Consultation', description: 'Dietary advice for rodents', category: 'Rodents' },
  { id: 16, name: 'Veterinary Visits', description: 'Health check-ups for cats', category: 'Cats' },
  { id: 17, name: 'Veterinary Visits', description: 'Health check-ups for dogs', category: 'Dogs' },
  { id: 18, name: 'Veterinary Visits', description: 'Health check-ups for birds', category: 'Birds' },
  { id: 19, name: 'Veterinary Visits', description: 'Health check-ups for rodents', category: 'Rodents' },
  { id: 20, name: 'Boarding', description: 'Overnight care for your pets', category: 'Birds' },
  { id: 21, name: 'Boarding', description: 'Overnight care for your pets', category: 'Rodents' },
  
];

// Mock bookings to emulate a server response
export const mockBookings: Booking[] = [];

