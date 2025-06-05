import { User2Icon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallerButton from "../../buttons/SmallerButton";
import { useToast } from "../../ui/ToastManager";
import { updateUserProfile } from "../../../firebase/utils/updateUserProfile";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { showToast } = useToast();

  const [editAccDetails, setEditAccDetails] = useState(false);
  const [editAccPassword, setEditAccPassword] = useState(false);
  const [editOrganization, setEditOrganization] = useState(false);

  //acc details variables
  const [userName, setUserName] = useState("");
  const [tempUserName, setTempUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [tempPhone, setTempPhone] = useState("");

  const handleAccDetailsCancel = () => {
    setTempUserName(userName);
    setTempEmail(userEmail);
    setTempPhone(userPhone);

    //
    //showToast({ message: "Changes were discarded!", type: "success" });
    //
    setEditAccDetails(false);
  };

  const handleAccDetailsConfirm = () => {
    setUserName(tempUserName);
    setUserEmail(tempEmail);
    setUserPhone(tempPhone);
    updateUserProfile(
      user.uid,
      {
        name: tempUserName,
        email: tempEmail,
        phone: tempPhone,
        organizationName: orgName,
        organizationEmail: orgEmail,
        organizationAddress: orgAddress,
      },
      dispatch
    );
    //
    showToast({ message: "Changes were saved!", type: "success" });
    setEditAccDetails(false);
  };

  //organization variables
  //acc details variables
  const [orgName, setOrgName] = useState("Vistora");
  const [tempOrgName, setTempOrgName] = useState(orgName);
  const [orgAddress, setOrgAddress] = useState("123 Vistora St.");
  const [tempOrgAddress, setTempOrgAddress] = useState(orgAddress);
  const [orgEmail, setOrgEmail] = useState("test@test.com");
  const [tempOrgEmail, setTempOrgEmail] = useState(orgEmail);

  const handleOrgCancel = () => {
    setTempOrgName(orgName);
    setTempOrgAddress(orgAddress);
    setTempOrgEmail(orgEmail);

    //
    //showToast({ message: "Changes were discarded!", type: "success" });
    //
    setEditOrganization(false);
  };

  const handleOrgConfirm = () => {
    setOrgName(tempOrgName);
    setOrgAddress(tempOrgAddress);
    setOrgEmail(tempOrgEmail);
    updateUserProfile(
      user.uid,
      {
        name: userName,
        email: userEmail,
        phone: userPhone,
        organizationName: tempOrgName,
        organizationAddress: tempOrgAddress,
        organizationEmail: tempOrgEmail,
      },
      dispatch
    );
    //
    showToast({ message: "Changes were saved!", type: "success" });
    setEditOrganization(false);
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      setUserName(user.name);
      setTempUserName(user.name);
      setUserEmail(user.email);
      setTempEmail(user.email);
      setUserPhone(user.phone);
      setTempPhone(user.phone);
      //organization
      setOrgName(user.organizationName);
      setTempOrgName(user.organizationName);
      setOrgAddress(user.organizationAddress);
      setTempOrgAddress(user.organizationAddress);
      setOrgEmail(user.organizationEmail);
      setTempOrgEmail(user.organizationEmail);
    }
  }, [user]);

  if (!user) {
    return <p>Loading User Details ...</p>;
  } else {
  }

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <div className="w-full flex items-center border-b border-neutral-200 py-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Profile
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-12 items-start">
        <div className="w-fit flex flex-col gap-4">
          <div className="flex items-center justify-center w-28 h-28 lg:w-[200px] lg:h-[200px] rounded-full bg-neutral-200 text-neutral-400 p-4"></div>
          <div className="flex flex-col items-center gap-2 w-full">
            <button className="w-fit min-w-[120px] px-4 py-1 rounded-xl border border-neutral-800 text-neutral-800 text-[0.75rem] hover:bg-neutral-200">
              Update
            </button>
            <button className="w-fit min-w-[120px] px-4 py-1 rounded-xl border border-neutral-800 text-neutral-800 text-[0.75rem] hover:bg-neutral-200">
              Remove
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-10 py-4 max-w-[600px]">
          <div className="flex flex-col gap-4">
            <div className="w-full flex items-center gap-6 justify-start">
              <h2 className="text-lg font-bold">Account Details</h2>

            </div>
            <div className="w-full max-w-[800px] flex flex-col gap-4">
              {!editAccDetails ? (
                <>
                  <div className="w-full flex flex-col items-start">
                    <span className="">User Name</span>
                    <span className="font-medium text-lg">{userName}</span>
                  </div>
                  <div className="w-full flex flex-col items-start">
                    <span className="">Account Email</span>
                    <span className="font-medium text-lg">{userEmail}</span>
                  </div>
                  <div className="w-full flex flex-col items-start">
                    <span className="">Contact Number</span>
                    <span className="font-medium text-lg">{userPhone}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full flex flex-wrap items-center justify-end gap-2">
                    <button
                      onClick={handleAccDetailsConfirm}
                      className="w-fit min-w-[120px] h-10 px-4 py-2 rounded-xl bg-primary text-white font-semibold text-[0.75rem] hover:bg-primary-dark"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleAccDetailsCancel}
                      className="w-fit min-w-[120px] h-10 px-4 py-2 rounded-xl bg-black text-white font-semibold text-[0.75rem] hover:bg-neutral-800"
                    >
                      Discard Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-12">
            <div className="w-full flex items-center gap-6 justify-start">
              <h2 className="text-lg font-bold">Organization Details</h2>
            </div>
            <div className="w-full max-w-[800px] flex flex-col gap-4">
              {!editOrganization ? (
                <>
                  <div className="w-full flex flex-col items-start">
                    <span className="">Organization Name</span>
                    <span className="font-medium text-lg">{orgName}</span>
                  </div>
                  <div className="w-full flex flex-col items-start">
                    <span className="">Organization Address</span>
                    <span className="font-medium text-lg">{orgAddress}</span>
                  </div>
                  <div className="w-full flex flex-col items-start">
                    <span className="">Organization Email</span>
                    <span className="font-medium text-lg">{orgEmail}</span>
                  </div>
                </>
              ) : (
                <>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
