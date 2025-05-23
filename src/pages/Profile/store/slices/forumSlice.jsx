import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'forum/fetchPosts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        author: "Jane Smith",
        title: "Tips for processing claims faster",
        content:
          "I've found that organizing claims by priority has helped me process them 30% faster. What strategies have worked for you?",
        date: "May 18, 2025",
        likes: 24,
        comments: [
          {
            id: 1,
            author: "Robert Johnson",
            content: "Great tip! I also use color coding for different claim types.",
            date: "May 19, 2025",
          },
          {
            id: 2,
            author: "Maria Garcia",
            content: "I've implemented a similar system. It's been a game changer!",
            date: "May 20, 2025",
          },
        ],
      },
      {
        id: 2,
        author: "David Wilson",
        title: "New healthcare policy changes",
        content:
          "Has anyone reviewed the new policy changes that take effect next month? I'm particularly concerned about Section 3.2 regarding pre-authorizations.",
        date: "May 15, 2025",
        likes: 18,
        comments: [
          {
            id: 1,
            author: "Sarah Lee",
            content: "Yes, I've gone through it. The changes aren't as drastic as they initially seemed.",
            date: "May 16, 2025",
          },
        ],
      },
      {
        id: 3,
        author: "Michael Brown",
        title: "Best practices for customer communication",
        content:
          "I wanted to share some communication templates that have improved our customer satisfaction scores. Happy to share if anyone is interested!",
        date: "May 12, 2025",
        likes: 31,
        comments: [
          {
            id: 1,
            author: "Lisa Chen",
            content: "Would love to see those templates! Our team could really benefit from this.",
            date: "May 13, 2025",
          },
          {
            id: 2,
            author: "James Wilson",
            content: "Please share! We're always looking to improve our communication.",
            date: "May 13, 2025",
          },
          {
            id: 3,
            author: "Anna Rodriguez",
            content: "This sounds very helpful. Thank you for offering to share!",
            date: "May 14, 2025",
          },
        ],
      },
      {
        id: 4,
        author: "Emily Davis",
        title: "Question about claim denial appeals",
        content:
          "I'm dealing with a complex appeal case and wondering if anyone has experience with similar situations. The client is asking about timeline expectations.",
        date: "May 10, 2025",
        likes: 12,
        comments: [
          {
            id: 1,
            author: "Thomas Anderson",
            content: "I've handled several appeals. The typical timeline is 30-45 days, but complex cases can take longer.",
            date: "May 11, 2025",
          },
        ],
      },
    ];
  }
);

const initialState = {
  posts: [],
  activePost: null,
  newComment: '',
  newPost: { title: '', content: '' },
  showNewPostForm: false,
  loading: false,
  error: null,
  searchQuery: '',
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActivePost: (state, action) => {
      state.activePost = state.activePost === action.payload ? null : action.payload;
    },
    setNewComment: (state, action) => {
      state.newComment = action.payload;
    },
    addComment: (state, action) => {
      const postId = action.payload;
      if (state.newComment.trim() === '') return;
      
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push({
          id: Date.now(),
          author: 'You',
          content: state.newComment,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        });
      }
      
      state.newComment = '';
    },
    setNewPostField: (state, action) => {
      const { field, value } = action.payload;
      state.newPost[field] = value;
    },
    toggleNewPostForm: (state) => {
      state.showNewPostForm = !state.showNewPostForm;
      if (!state.showNewPostForm) {
        state.newPost = { title: '', content: '' };
      }
    },
    createPost: (state) => {
      if (state.newPost.title.trim() === '' || state.newPost.content.trim() === '') return;
      
      state.posts.unshift({
        id: Date.now(),
        author: 'You',
        title: state.newPost.title,
        content: state.newPost.content,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: 0,
        comments: [],
      });
      
      state.newPost = { title: '', content: '' };
      state.showNewPostForm = false;
    },
    likePost: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setSearchQuery, 
  setActivePost, 
  setNewComment, 
  addComment, 
  setNewPostField, 
  toggleNewPostForm, 
  createPost, 
  likePost 
} = forumSlice.actions;

export default forumSlice.reducer;