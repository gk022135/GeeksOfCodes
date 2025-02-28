import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    tasks: [],
    completedTasks: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};


// //createAsyncThunk('sliceName/actionName', async (arg, thunkAPI) => {) )
export const fetchTasks = createAsyncThunk("todo/fetchTasks", async (API_URL) => {
    const response = await fetch(API_URL); 
    const data = await response.json();
    console.log("data from backend is here ",data)
    return data;  // Thunks automatically use returned data to update the state
});

// // Async action to post a new task to backend
export const addTaskToBackend = createAsyncThunk("todo/addTaskToBackend", async (newTask) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });
    return await response.json();  // Return added task from backend
});

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        // Local state update for adding task
        addTask: (state, action) => {
            const newTask = action.payload;
            console.log("new task in redux", newTask)
            state.tasks.push(newTask);
        },
        deletetask: (state, action) => {
            const { index, percentage } = action.payload;
            if (index >= 0 && index < state.tasks.length) {
                const completedTask = { ...state.tasks[index], percentage };
                state.completedTasks.push(completedTask);
                state.tasks.splice(index, 1);
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTasks.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchTasks.fulfilled, (state, action) => {
    //             state.status = 'succeeded';
    //             state.tasks = action.payload;  // Populate tasks with fetched data
    //         })
    //         .addCase(fetchTasks.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message;
    //         })
    //         .addCase(addTaskToBackend.fulfilled, (state, action) => {
    //             state.tasks.push(action.payload);  // Add task from backend response
    //         });
    // }
});

export const { addTask, deletetask } = todoSlice.actions;
export default todoSlice.reducer;
