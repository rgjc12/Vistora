import { useState } from "react"
import Sidebar from "./components/Sidebar.jsx"
import ClaimsSummary from "./components/ClaimsSummary.jsx"
import { Provider } from "react-redux"
import store from "./store/index.jsx"
import "./index.css"

function App() {
  const [activePage, setActivePage] = useState("Claims Summary")

  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 overflow-auto">
          {activePage === "Claims Summary" && <ClaimsSummary />}
          {/* Other pages would be conditionally rendered here */}
        </div>
      </div>
    </Provider>
  )
}

export default App
