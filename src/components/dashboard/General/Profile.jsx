// import { User2Icon, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import SmallerButton from "../../buttons/SmallerButton";
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
    <div className="w-full relative">
      <div className="header absolute -z-0 top-0 left-0 right-0 w-full h-[275px] md:h-[325px] lg:h-[350px] bg-neutral-100 overflow-hidden">
        <img
          src="/images/flower-wet-hero.jpg"
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="w-full relative p-4 flex flex-col gap-2 z-10 pt-[180px] md:pt-[200px] lg:pt-[200px]">
        <div className="flex border-[6px] border-white overflow-hidden items-center justify-center w-52 h-52  md:w-64 md:h-64 lg:w-[300px] lg:h-[300px] rounded-full bg-neutral-200 text-neutral-400">
          <img
            src="/images/testimonial.jpg"
            alt="testimonial"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full max-w-[800px] mx-auto xl:max-w-none xl:ml-[300px] mr-0 flex flex-col xl:flex-row xl:gap-12">
          <div className="flex flex-col lg:p-4 gap-2 items-start">
            <h2 className="text-4xl font-medium leading-tight">{userName}</h2>
            <span className="flex items-center gap-2">
              <p className="text-neutral-400 text-[0.95rem] md:text-[1rem]">
                {userEmail}
              </p>
              <p className="text-neutral-400 text-[0.95rem] md:text-[1rem]">
                |
              </p>
              <p className="text-neutral-400 text-[0.95rem] md:text-[1rem]">
                {userPhone}
              </p>
            </span>
          </div>
          <div className="w-full flex flex-col gap-10 py-4 lg:pl-4 max-w-[600px] xl:border-l xl:border-neutral-200">
            <div className="flex flex-col gap-4 mb-12">
              <div className="w-full flex items-center gap-2 justify-start">
                <h2 className="text-lg font-medium text-primary">
                  Organization Details
                </h2>
              </div>
              <div className="w-full max-w-[800px] flex flex-col gap-4 pl-4">
                {!editOrganization ? (
                  <>
                    <div className="w-full flex flex-col items-start">
                      <span className="text-neutral-400">Name</span>
                      <span className="font-medium text-lg">{orgName}</span>
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <span className="text-neutral-400">Address</span>
                      <span className="font-medium text-lg">{orgAddress}</span>
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <span className="text-neutral-400">Email</span>
                      <span className="font-medium text-lg">{orgEmail}</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
