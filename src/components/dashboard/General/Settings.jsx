import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  updateNotificationSetting,
  updateNotificationFrequency,
  updateIntegration,
  updateSecurityField,
  updateTimezone,
  resetPasswordFields,
} from "../../../pages/Profile/store/slices/settingsSlice";
import SearchBar from "./SearchBar";

const Settings = () => {
  //const dispatch = useDispatch();
  //const settings = useSelector((state) => state.settings);

  const handleSaveChanges = () => {
    // In a real app, you would dispatch an action to save settings to the backend
    //alert("Settings saved successfully!");
    //dispatch(resetPasswordFields());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <button className="p-2 text-gray-400 hover:text-gray-600">🔔</button>
      </div>

      <SearchBar placeholder="Search settings..." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  //value={settings.profile.organization}
                  /*onChange={(e) =>
                    dispatch(updateProfile({ organization: e.target.value }))
                  }*/
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Settings
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  /*value={settings.profile.settings}
                  onChange={(e) =>
                    dispatch(updateProfile({ settings: e.target.value }))
                  }*/
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notifications are on
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      /*
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        dispatch(
                          updateNotificationSetting({
                            setting: "email",
                            value: e.target.checked,
                          })
                        )
                      }*/
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      /*
                      checked={settings.notifications.sms}
                      onChange={(e) =>
                        dispatch(
                          updateNotificationSetting({
                            setting: "sms",
                            value: e.target.checked,
                          })
                        )
                      }*/
                    />
                    <span className="text-sm">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      /*
                      checked={settings.notifications.pushOnly}
                      onChange={(e) =>
                        dispatch(
                          updateNotificationSetting({
                            setting: "pushOnly",
                            value: e.target.checked,
                          })
                        )
                      }*/
                    />
                    <span className="text-sm">Push Only</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Frequency
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      className="mr-2"
                      /*
                      checked={
                        settings.notifications.frequency === "immediately"
                      }
                      onChange={() =>
                        dispatch(updateNotificationFrequency("immediately"))
                      }*/
                    />
                    <span className="text-sm">Immediately</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      className="mr-2"
                      /*
                      checked={settings.notifications.frequency === "daily"}
                      onChange={() =>
                        dispatch(updateNotificationFrequency("daily"))
                      }*/
                    />
                    <span className="text-sm">Daily</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      className="mr-2"
                      /*
                      checked={settings.notifications.frequency === "hourly"}
                      onChange={() =>
                        dispatch(updateNotificationFrequency("hourly"))
                      }*/
                    />
                    <span className="text-sm">Hourly</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Integration Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Connected External
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /*value={settings.integration.connectedExternal}
                    onChange={(e) =>
                      dispatch(
                        updateIntegration({ connectedExternal: e.target.value })
                      )
                    }*/
                  />
                  <button className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800">
                    Manage API Access
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  /*value={settings.security.newPassword}
                  onChange={(e) =>
                    dispatch(
                      updateSecurityField({
                        field: "newPassword",
                        value: e.target.value,
                      })
                    )
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={settings.security.confirmPassword}
                  onChange={(e) =>
                    dispatch(
                      updateSecurityField({
                        field: "confirmPassword",
                        value: e.target.value,
                      })
                    )
                  }*/
                />
                <button
                  className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                  /*onClick={() => {
                    if (
                      settings.security.newPassword ===
                      settings.security.confirmPassword
                    ) {
                      alert("Password changed successfully!");
                      dispatch(resetPasswordFields());
                    } else {
                      alert("Passwords do not match!");
                    }
                  }}*/
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Zone
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              /*value={settings.timezone}
              onChange={(e) => dispatch(updateTimezone(e.target.value))}*/
            >
              <option value="Central Time - US & Canada">
                Central Time - US & Canada
              </option>
              <option value="Eastern Time - US & Canada">
                Eastern Time - US & Canada
              </option>
              <option value="Pacific Time - US & Canada">
                Pacific Time - US & Canada
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 pt-6 border-t">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;
