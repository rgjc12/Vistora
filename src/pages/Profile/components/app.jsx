import { useState } from "react"
import Sidebar from "./Sidebar.jsx"
import Claims from "./Claims.jsx"
import Profile from "../Profile.jsx"
import Tasks from "./Tasks.jsx"
import Notifications from "./Notifications.jsx"
import CommunityForum from "./CommunityForum.jsx"
import FAQs from "./FAQs.jsx"
import Contact from "./Contact.jsx"
import Feedback from "./Feedback.jsx"
import Settings from "./Settings.jsx"
import { Provider } from "react-redux"
import store from "./store/index.js"
import "./index.css"

function App() {
  const [activePage, setActivePage] = useState("Claims Summary")

  // Function to render the active page
  const renderPage = () => {
    switch (activePage) {
      case "Profile":
        return <Profile />
      case "Tasks":
        return <Tasks />
      case "Notifications":
        return <Notifications />
      case "Claims Summary":
        return <Claims />
      case "Community Forum":
        return <CommunityForum />
      case "FAQs":
        return <FAQs />
      case "Contact":
        return <Contact />
      case "Feedback":
        return <Feedback />
      case "Settings":
        return <Settings />
      default:
        return <Claims />
    }
  }

  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </div>
    </Provider>
  )
}

export default App
