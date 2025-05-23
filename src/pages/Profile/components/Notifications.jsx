import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchNotifications, 
  setSearchQuery, 
  dismissNotification 
} from '../store/slices/notificationsSlice';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error, searchQuery } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Filter notifications based on search query
  const filteredNotifications = searchQuery 
    ? notifications.filter(notification => 
        notification.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notifications;

  if (loading) {
    return <div className="text-center py-12">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          🔔
        </button>
      </div>

      <SearchBar searchAction={setSearchQuery} placeholder="Search notifications..." />

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{notification.text}</p>
              {notification.date && (
                <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
              )}
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => dispatch(dismissNotification(notification.id))}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <Pagination totalItems={filteredNotifications.length} itemsLabel="Messages" />
    </div>
  );
};

export default Notifications;