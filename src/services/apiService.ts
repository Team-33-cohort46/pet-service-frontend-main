// src/services/apiService.ts
import axios from 'axios';

// Получение пользователя по ID
export const getUser = async (userId: number) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data;
};

// Получение списка питомцев
export const getPets = async () => {
  const response = await axios.get(`/api/pets`);
  return response.data;
};

// Получение списка услуг
export const getServices = async () => {
  const response = await axios.get(`/api/services`);
  return response.data;
};

// Получение категорий услуг
export const getServiceCategories = async () => {
  const response = await axios.get(`/api/categories`);
  return response.data;
};

// Получение списка контактов
export const getContacts = async () => {
  const response = await axios.get(`/api/contacts`);
  return response.data;
};

// Получение списка исполнителей
export const getProviders = async () => {
  const response = await axios.get(`/api/providers`);
  return response.data;
};
