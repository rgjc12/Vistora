import React from "react";
import { useSelector, useDispatch } from "react-redux";
//import { setActiveTab, toggleHelpSubmenu } from "../store/slices/uiSlice";

/*
const Sidebar = () => {
  const dispatch = useDispatch();
  const { activeTab, helpSubmenuOpen } = useSelector(state => state.ui);
  const unreadCount = useSelector(state => state.notifications.unreadCount);

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'tasks', label: 'Tasks', icon: '📋' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: unreadCount > 0 ? unreadCount : null },
    { id: 'claims-summary', label: 'Claims Summary', icon: '📊' },
    { id: 'community-forum', label: 'Community Forum', icon: '💬' },
    { id: 'help-support', label: 'Help and Support', icon: '❓', hasSubmenu: true },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-gray-900 text-sm font-bold">C</span>
          </div>
          <span className="font-medium">Company Name</span>
        </div>
        
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">U</span>
          </div>
          <span className="text-sm">User Name</span>
        </div>
      </div>

      <nav className="px-4">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.id === 'help-support') {
                  dispatch(toggleHelpSubmenu());
                } else {
                  dispatch(setActiveTab(item.id));
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-sm mb-1 transition-colors ${
                activeTab === item.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
              {item.hasSubmenu && (
                <span className={`transform transition-transform ${helpSubmenuOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              )}
            </button>
            
            {item.id === 'help-support' && helpSubmenuOpen && (
              <div className="ml-6 space-y-1">
                <button
                  onClick={() => dispatch(setActiveTab('faqs'))}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  FAQs
                </button>
                <button
                  onClick={() => dispatch(setActiveTab('contact'))}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  Contact
                </button>
                <button
                  onClick={() => dispatch(setActiveTab('feedback'))}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
                >
                  Feedback
                </button>
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4">
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white text-sm">
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
*/
