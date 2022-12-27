import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from "./transactionAPI";

// our state create

const initialState = {
    transections: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {}
}

// create fetch request 
export const fetchTransectios = createAsyncThunk('transection/fetchTransectios', async ()=> {
    const transections = await getTransactions();
    return transections;
});

export const addTransections = createAsyncThunk('transection/addTransections', async(data)=>{
    const transections = await addTransaction(data);
    return transections;
})

export const editTransections = createAsyncThunk('transection/editTransections', async({id, data})=>{
    const transections = await editTransaction(id, data);
    return transections;
})

export const deleteTransections = createAsyncThunk('transection/deleteTransections', async (id)=> {
    const transections = await deleteTransaction(id);
    return transections;
})

// create slice 

const transectionSlice = createSlice({
    name: "transection",
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload
        },
        editInActive: (state) => {
            state.editing = {}
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase( fetchTransectios.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchTransectios.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transections = action.payload;
        })
        .addCase(fetchTransectios.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
            state.transections = [];
        })
        .addCase( addTransections.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase( addTransections.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.transections.push(action.payload);
        })
        .addCase( addTransections.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase( editTransections.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase( editTransections.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            const indexToUpdate = state.transections.findIndex(
                (t)=> t.id === action.payload.id
            )
            state.transections[indexToUpdate] = action.payload;
        })
        .addCase( editTransections.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase( deleteTransections.pending, (state)=>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase( deleteTransections.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;

            state.transections = state.transections.filter(
                (t)=> t.id !== action.meta.arg
            );
        })
        .addCase( deleteTransections.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})


// export file
export const { editActive, editInActive } = transectionSlice.actions;
export default transectionSlice.reducer;