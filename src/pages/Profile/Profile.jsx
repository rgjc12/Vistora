import PageHeader from "./components/PageHeader.jsx"

const Profile = () => {
  return (
    <div className="p-6">
      <PageHeader title="Profile" />

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <span className="text-4xl">👤</span>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-2 border rounded" defaultValue="Alexander Smith" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-2 border rounded" defaultValue="alexander.smith@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full p-2 border rounded" defaultValue="(555) 123-4567" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input type="date" className="w-full p-2 border rounded" defaultValue="1985-07-15" />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                defaultValue="123 Main Street, Apt 4B, New York, NY 10001"
              ></textarea>
            </div>

            <div className="mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save Changes</button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
