import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchPosts, 
  setSearchQuery, 
  setActivePost, 
  setNewComment, 
  addComment, 
  setNewPostField, 
  toggleNewPostForm, 
  createPost, 
  likePost 
} from '../store/slices/forumSlice';
import SearchBar from '../components/SearchBar';

const CommunityForum = () => {
  const dispatch = useDispatch();
  const { 
    posts, 
    activePost, 
    newComment, 
    newPost, 
    showNewPostForm, 
    loading, 
    error, 
    searchQuery 
  } = useSelector(state => state.forum);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Filter posts based on search query
  const filteredPosts = searchQuery 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  if (loading) {
    return <div className="text-center py-12">Loading forum posts...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          🔔
        </button>
      </div>

      <SearchBar searchAction={setSearchQuery} placeholder="Search discussions..." />

      {/* Create New Post Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">💬</span>
          <h2 className="text-lg font-medium">Discussion Board</h2>
        </div>
        <button
          onClick={() => dispatch(toggleNewPostForm())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Discussion
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4">Start a New Discussion</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter discussion title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPost.title}
                onChange={(e) => dispatch(setNewPostField({ field: 'title', value: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                placeholder="Share your thoughts, questions, or insights..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={newPost.content}
                onChange={(e) => dispatch(setNewPostField({ field: 'content', value: e.target.value }))}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(createPost())}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Post Discussion
              </button>
              <button
                onClick={() => dispatch(toggleNewPostForm())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forum Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-500">👤</span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg text-gray-900">{post.title}</h3>
                    <span className="text-xs text-gray-500 ml-4">{post.date}</span>
                  </div>

                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-blue-600">{post.author}</span>
                    <p className="mt-2 text-gray-700">{post.content}</p>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <button
                      className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => dispatch(likePost(post.id))}
                    >
                      <span className="mr-1">👍</span>
                      <span className="text-sm">{post.likes}</span>
                    </button>

                    <button
                      className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => dispatch(setActivePost(post.id))}
                    >
                      <span className="mr-1">💬</span>
                      <span className="text-sm">{post.comments.length} comments</span>
                    </button>

                    <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                      <span className="mr-1">🔗</span>
                      <span className="text-sm">Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {activePost === post.id && (
                    <div className="mt-6 pl-4 border-l-2 border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-4">Comments</h4>
                      
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="mb-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="text-gray-500 text-sm">👤</span>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-baseline">
                                <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                                <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Comment Form */}
                      <div className="mt-4 flex">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-gray-500 text-sm">👤</span>
                        </div>
                        <div className="flex-1 flex">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={newComment}
                            onChange={(e) => dispatch(setNewComment(e.target.value))}
                            onKeyPress={(e) => e.key === "Enter" && dispatch(addComment(post.id))}
                          />
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                            onClick={() => dispatch(addComment(post.id))}
                          >
                            <span>📤</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
          <div className="text-sm text-gray-600">Total Discussions</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {posts.reduce((total, post) => total + post.comments.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Comments</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {posts.reduce((total, post) => total + post.likes, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;