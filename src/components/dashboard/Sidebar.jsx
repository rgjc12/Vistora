import { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react"; // or any icon set you prefer
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ tabs, activeTab }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 900);
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // Handle resizing behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    // Add logout logic (Firebase + Redux)
    console.log("Logging out...");
    navigate("/");
  };

  const handleTabClick = (tabLink) => {
    if (tabLink) {
      navigate(tabLink);
    }
  };

  return (
    <>
      {/* Hamburger button (mobile only) */}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full min-h-[700px] z-40 bg-black text-white shadow-md transition-all duration-300 ease-in-out
          ${isOpen ? "w-[275px]" : "w-[48px]"} px-2 lg:px-4 py-6`}
      >
        {isMobile && !isOpen && (
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center  text-white "
          >
            <Menu size={20} />
          </button>
        )}
        {/* Close button (mobile only) */}
        {isMobile && isOpen && (
          <button onClick={toggleSidebar} className="absolute top-4 right-4">
            <X size={20} />
          </button>
        )}

        {/* Header */}
        {isOpen && (
          <div className="mb-2 flex flex-col gap-2">
            <a
              href="/"
              className="flex items-center transition-all ease-out duration-300"
            >
              <img
                src="/images/vistora-logo.png"
                alt="Vistora Tech"
                className="w-auto h-[48px] sm:h-[64px]"
              />
            </a>
            <div
              className={`${
                isMobile ? (isOpen ? "w-full" : "w-0") : ""
              } w-full h-[1px] bg-neutral-400`}
            ></div>
            <div className="flex justify-start gap-2 items-center w-full">
              <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
              <a
                href="/dashboard"
                className="cursor-pointer w-fit hover:text-neutral-400"
              >
                {!user ? (
                  <div className="w-[100px] h-4 rounded bg-neutral-400 animate-loading"></div>
                ) : (
                  <h2 className="text-[0.9rem]">{user && user.name}</h2>
                )}
              </a>
            </div>
          </div>
        )}

        {/* Tab list */}
        <nav className="flex flex-col gap-2 my-10 transition-all duration-500 ease-in-out">
          {tabs &&
            tabs.map((tab, idx) => (
              <div
                onClick={() => handleTabClick(tab.link)}
                tabIndex={0}
                className={`w-full p-2 rounded-xl hover:bg-neutral-800 cursor-pointer text-sm flex gap-4 items-center 
                ${!isOpen && "justify-center"}
                ${activeTab === tab.label ? "bg-neutral-800" : ""}
                `}
              >
                <span className="">{tab.icon}</span>
                {isOpen && (
                  <span
                    className={`${isOpen ? "flex" : "hidden"} text-[0.85rem]`}
                  >
                    {tab.label}
                  </span>
                )}
              </div>
            ))}
        </nav>

        {/* Fixed Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white hover:text-red-400"
          >
            <LogOut size={16} />
            {isOpen && "Log Out"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
