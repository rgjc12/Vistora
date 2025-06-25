import { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOutModal from "../ui/SignOutModal";
import { setActiveTab } from "../../store/slices/uiSlice";

const Sidebar = ({ tabs, activeTab }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 900);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  //const activeTab = useSelector((state) => state.ui.activeTab);

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
      //setActiveTab(tabLink);
    }
  };

  return (
    <>
      {/* Hamburger button (mobile only) */}

      {/* Sidebar */}
      <aside
        className={`fixed font-['Aktiv_Grotesk',_'Manrope',_sans-serif] top-0 left-0 h-full min-h-[700px] z-40 bg-primary-dark text-white shadow-md transition-all duration-300 ease-in-out
          ${isOpen ? "w-[225px] lg:w-[275px]" : "w-[48px]"} px-2 lg:px-4 py-6`}
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
          <div className=" flex flex-col gap-2">
            <a
              href="/"
              className="flex items-center transition-all ease-out duration-300"
            >
              <img
                src="/images/vistora-logo.png"
                alt="Vistora Tech"
                className="w-auto h-[64px] sm:h-[80px]"
              />
            </a>

            <div className="flex justify-start gap-2 items-center w-full truncate p-4 px-3 bg-neutral-900/35 rounded-2xl hover:bg-neutral-900/50 cursor-pointer">
              <div className="w-12 h-12 rounded-full  overflow-hidden">
                <img
                  src="/images/flower-wet-hero.jpg"
                  alt="hero img"
                  className="object-cover h-full"
                />
              </div>
              <a
                href="/dashboard/provider/profile"
                className="cursor-pointer w-fit "
              >
                {isLoading ? (
                  <div className="w-[100px] h-4 rounded bg-neutral-400 animate-loading"></div>
                ) : user ? (
                  <div className="flex flex-col items-start gap-0 overflow-x-hidden w-full truncate">
                    <h2 className="text-[0.9rem]">{user.organizationName}</h2>
                    <p className="text-[0.75rem] text-neutral-200 truncate">
                      {user.userType}
                    </p>
                  </div>
                ) : (
                  <div className="w-[100px] h-4 rounded bg-neutral-400 animate-loading"></div>
                )}
              </a>
            </div>
          </div>
        )}

        {/* Tab list */}
        <nav className="flex mt-16 flex-col h-fit gap-2 my-4 transition-all duration-500 ease-in-out">
          <span className="text-[0.75rem] text-neutral-200 mb-2 hidden min-[900px]:block">
            Navigation
          </span>
          {tabs &&
            tabs.map((tab, idx) => (
              <div
                onClick={() => handleTabClick(tab.link)}
                tabIndex={0}
                className={`w-full p-2 rounded-xl hover:bg-neutral-900/35 cursor-pointer text-xs flex gap-4 items-center 
                ${!isOpen && "justify-center"}
                ${activeTab === tab.label ? "bg-neutral-900/35" : ""}
                `}
              >
                <span className="">{tab.icon}</span>
                {isOpen && (
                  <span
                    className={`${
                      isOpen ? "flex" : "hidden"
                    } text-[0.8rem] font-medium`}
                  >
                    {tab.label}
                  </span>
                )}
              </div>
            ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-sm text-white hover:text-red-400"
          >
            <LogOut size={16} />
            {isOpen && "Log Out"}
          </button>
          <SignOutModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
