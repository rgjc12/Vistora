import { useState } from "react"
import PageHeader from "./components/PageHeader.jsx"
import { MessageSquare, User, ThumbsUp, MessageCircle, Send } from "lucide-react"

const CommunityForum = () => {
  const [posts, setPosts] = useState([
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
  ])

  const [activePost, setActivePost] = useState(null)
  const [newComment, setNewComment] = useState("")

  const handleLike = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleAddComment = (postId) => {
    if (newComment.trim() === "") return

    const comment = {
      id: Date.now(),
      author: "You",
      content: newComment,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, comment] } : post)))

    setNewComment("")
  }

  return (
    <div className="p-6">
      <PageHeader title="Community Forum" />

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center">
          <MessageSquare size={20} className="mr-2 text-blue-500" />
          <h2 className="text-lg font-medium">Discussion Board</h2>
        </div>

        <div className="divide-y">
          {posts.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <User size={20} className="text-gray-500" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{post.title}</h3>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>

                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-blue-600">{post.author}</span>
                    <p className="mt-1">{post.content}</p>
                  </div>

                  <div className="mt-3 flex items-center">
                    <button
                      className="flex items-center text-gray-500 hover:text-blue-500 mr-4"
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp size={16} className="mr-1" />
                      <span className="text-xs">{post.likes}</span>
                    </button>

                    <button
                      className="flex items-center text-gray-500 hover:text-blue-500"
                      onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                    >
                      <MessageCircle size={16} className="mr-1" />
                      <span className="text-xs">{post.comments.length} comments</span>
                    </button>
                  </div>

                  {activePost === post.id && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="mb-3">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <User size={16} className="text-gray-500" />
                            </div>

                            <div>
                              <div className="flex items-baseline">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="mt-3 flex">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="flex-1 p-2 border rounded-l text-sm"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddComment(post.id)}
                        />
                        <button
                          className="bg-blue-600 text-white px-3 py-2 rounded-r"
                          onClick={() => handleAddComment(post.id)}
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommunityForum
