import { useState } from "react"
import PageHeader from "./components/PageHeader.jsx"
import { Save, Bell, Lock, User, Monitor } from "lucide-react"

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true,
    },
    appearance: {
      theme: "light",
      fontSize: "medium",
      compactView: false,
    },
    privacy: {
      showProfile: true,
      shareData: false,
      twoFactorAuth: true,
    },
  })

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    })
  }

  const handleAppearanceChange = (key, value) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    })
  }

  const handlePrivacyChange = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    })
  }

  const saveSettings = () => {
    // In a real app, you would save these settings to your backend
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="p-6">
      <PageHeader title="Settings" />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            <button className="px-4 py-3 border-b-2 border-blue-600 text-blue-600 font-medium flex items-center">
              <User size={16} className="mr-2" />
              Account Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bell size={20} className="mr-2 text-blue-600" />
              <h3 className="text-lg font-medium">Notification Preferences</h3>
            </div>

            <div className="space-y-3 pl-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onChange={() => handleNotificationChange("email")}
                  className="mr-2"
                />
                <label htmlFor="email-notifications">Email Notifications</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onChange={() => handleNotificationChange("push")}
                  className="mr-2"
                />
                <label htmlFor="push-notifications">Push Notifications</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onChange={() => handleNotificationChange("sms")}
                  className="mr-2"
                />
                <label htmlFor="sms-notifications">SMS Notifications</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={settings.notifications.newsletter}
                  onChange={() => handleNotificationChange("newsletter")}
                  className="mr-2"
                />
                <label htmlFor="newsletter">Weekly Newsletter</label>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Monitor size={20} className="mr-2 text-blue-600" />
              <h3 className="text-lg font-medium">Appearance</h3>
            </div>

            <div className="space-y-4 pl-8">
              <div>
                <label className="block mb-2">Theme</label>
                <div className="flex space-x-4">
                  <div
                    className={`border p-3 rounded cursor-pointer ${
                      settings.appearance.theme === "light" ? "border-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    <div className="w-16 h-16 bg-white border"></div>
                    <div className="text-center mt-2">Light</div>
                  </div>

                  <div
                    className={`border p-3 rounded cursor-pointer ${
                      settings.appearance.theme === "dark" ? "border-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    <div className="w-16 h-16 bg-gray-800 border"></div>
                    <div className="text-center mt-2">Dark</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2">Font Size</label>
                <select
                  className="border p-2 rounded w-full md:w-1/3"
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleAppearanceChange("fontSize", e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="compact-view"
                  checked={settings.appearance.compactView}
                  onChange={() => handleAppearanceChange("compactView", !settings.appearance.compactView)}
                  className="mr-2"
                />
                <label htmlFor="compact-view">Use Compact View</label>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Lock size={20} className="mr-2 text-blue-600" />
              <h3 className="text-lg font-medium">Privacy & Security</h3>
            </div>

            <div className="space-y-3 pl-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="show-profile"
                  checked={settings.privacy.showProfile}
                  onChange={() => handlePrivacyChange("showProfile")}
                  className="mr-2"
                />
                <label htmlFor="show-profile">Show my profile to other users</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="share-data"
                  checked={settings.privacy.shareData}
                  onChange={() => handlePrivacyChange("shareData")}
                  className="mr-2"
                />
                <label htmlFor="share-data">Share usage data to improve services</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="two-factor"
                  checked={settings.privacy.twoFactorAuth}
                  onChange={() => handlePrivacyChange("twoFactorAuth")}
                  className="mr-2"
                />
                <label htmlFor="two-factor">Enable Two-Factor Authentication</label>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" onClick={saveSettings}>
              <Save size={16} className="mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
