import { useState } from "react"
import { User, FileText, Bell, Users, HelpCircle, Settings, LogOut } from "lucide-react"

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: "Company Name", icon: <div className="w-6 h-6 rounded-full bg-white"></div>, type: "header" },
    { name: "User Name", icon: <div className="w-6 h-6 rounded-full bg-white"></div>, type: "header" },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Tasks", icon: <FileText size={20} /> },
    { name: "Notifications", icon: <Bell size={20} /> },
    { name: "Claims Summary", icon: <FileText size={20} /> },
    { name: "Community Forum", icon: <Users size={20} /> },
    {
      name: "Help and Support",
      icon: <HelpCircle size={20} />,
      submenu: [{ name: "FAQs" }, { name: "Contact" }, { name: "Feedback" }],
    },
    { name: "Settings", icon: <Settings size={20} /> },
    { name: "Logout", icon: <LogOut size={20} />, type: "footer" },
  ]

  const [expandedMenu, setExpandedMenu] = useState("Help and Support")

  const toggleSubmenu = (menuName) => {
    if (expandedMenu === menuName) {
      setExpandedMenu(null)
    } else {
      setExpandedMenu(menuName)
    }
  }

  const handleNavigation = (pageName) => {
    if (pageName !== "Logout") {
      setActivePage(pageName)
    } else {
      // Handle logout logic here
      console.log("Logging out...")
      // For demo purposes, just navigate to Profile
      setActivePage("Profile")
    }
  }

  return (
    <div className="w-[120px] md:w-[200px] bg-black text-white flex flex-col h-full">
      <div className="flex-1">
        {menuItems
          .filter((item) => item.type !== "footer")
          .map((item, index) => (
            <div key={index}>
              <div
                className={`flex items-center px-4 py-3 cursor-pointer ${
                  activePage === item.name ? "bg-gray-800 text-blue-400" : "hover:bg-gray-900"
                }`}
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.name)
                  } else if (item.type !== "header") {
                    handleNavigation(item.name)
                  }
                }}
              >
                <div className={`mr-3 ${activePage === item.name ? "text-blue-400" : ""}`}>{item.icon}</div>
                <span className="text-sm hidden md:block">{item.name}</span>
                {item.submenu && (
                  <span className="ml-auto hidden md:block">{expandedMenu === item.name ? "▲" : "▼"}</span>
                )}
              </div>

              {item.submenu && expandedMenu === item.name && (
                <div className="bg-gray-800 pl-12 hidden md:block">
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={`py-2 cursor-pointer ${
                        activePage === subItem.name ? "text-blue-400" : "hover:text-blue-300"
                      }`}
                      onClick={() => handleNavigation(subItem.name)}
                    >
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Footer item */}
      {menuItems
        .filter((item) => item.type === "footer")
        .map((item, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-900"
            onClick={() => handleNavigation(item.name)}
          >
            <div className="mr-3">{item.icon}</div>
            <span className="text-sm hidden md:block">{item.name}</span>
          </div>
        ))}
    </div>
  )
}

export default Sidebar
