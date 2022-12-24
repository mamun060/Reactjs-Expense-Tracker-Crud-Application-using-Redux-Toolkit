import axios from "../../utils/axios";

// create get request
export const getTransactions = async () => {
    const response = await axios.get("/transactions");
    return response.data;
};


// create post request api

export const addTransaction = async (data) => {
    const response = await axios.post("/transactions", data);
    return response.data;
};

// create put request api 

export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data;
};

// create delete request api
export const deleteTransaction = async (id) => {
    const response = axios.delete(`/transactions/${id}`);
    return response.data;
};
