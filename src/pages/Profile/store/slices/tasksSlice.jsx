import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      recentTasks: [
        { id: 1, name: 'TASK 1', status: 'Urgent', progress: 20, dueDate: 'Due Today' },
        { id: 2, name: 'TASK 2', status: 'In Progress', progress: 60, dueDate: 'Due Today' }
      ],
      activeProjects: [
        { id: 3, name: 'TASK 3', status: 'In Progress', progress: 75, color: 'blue', due: 'Due Mar 25, 2025' },
        { id: 4, name: 'TASK 4', status: 'On Track', progress: 60, color: 'green', due: 'Due Apr 15, 2025' },
        { id: 5, name: 'TASK 5', status: 'Review', progress: 90, color: 'yellow', due: 'Due Mar 30, 2025' }
      ]
    };
  }
);

export const fetchTaskDetails = createAsyncThunk(
  'tasks/fetchTaskDetails',
  async (taskId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: taskId,
      title: 'Implement New Homepage Design',
      status: 'In Progress',
      progress: 75,
      deadline: 'March 25, 2025',
      priority: 'High Priority',
      description: 'We need to implement the new homepage design according to the approved mockups. This includes:\n- Header section with navigation\n- Hero section with animation\n- Features and layout\n- Testimonials carousel\n- Footer with newsletter signup',
      attachments: [
        { id: 1, name: 'Homepage_Design_V2.pdf', type: 'pdf', size: '2.4 MB' },
        { id: 2, name: 'Content_Structure.xlsx', type: 'xlsx', size: '1.2 MB' }
      ],
      comments: []
    };
  }
);

const initialState = {
  recentTasks: [],
  activeProjects: [],
  currentTask: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    priority: 'all',
    status: 'all',
    date: 'all'
  },
  newComment: ''
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action) => {
      state.filters[action.payload.filterType] = action.payload.value;
    },
    setNewComment: (state, action) => {
      state.newComment = action.payload;
    },
    addComment: (state) => {
      if (state.newComment.trim() === '' || !state.currentTask) return;
      
      state.currentTask.comments.push({
        id: Date.now(),
        author: 'You',
        content: state.newComment,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      
      state.newComment = '';
    },
    updateTaskProgress: (state, action) => {
      const { taskId, progress } = action.payload;
      
      // Update in recentTasks
      const recentTask = state.recentTasks.find(task => task.id === taskId);
      if (recentTask) {
        recentTask.progress = progress;
      }
      
      // Update in activeProjects
      const activeProject = state.activeProjects.find(task => task.id === taskId);
      if (activeProject) {
        activeProject.progress = progress;
      }
      
      // Update current task if it's the same
      if (state.currentTask && state.currentTask.id === taskId) {
        state.currentTask.progress = progress;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.recentTasks = action.payload.recentTasks;
        state.activeProjects = action.payload.activeProjects;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setSearchQuery, 
  setFilter, 
  setNewComment, 
  addComment, 
  updateTaskProgress 
} = tasksSlice.actions;

export default tasksSlice.reducer;