import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { setActiveTab } from "../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";

const SubmitClaim = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Patient Information
    patient: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      ssn: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      phone: "",
      email: "",
    },
    // Insurance Information
    insurance: {
      primary: {
        company: "",
        policyNumber: "",
        groupNumber: "",
        subscriberName: "",
        subscriberDob: "",
        relationship: "self",
      },
      secondary: {
        hasSecondary: false,
        company: "",
        policyNumber: "",
        groupNumber: "",
      },
    },
    // Service Information
    service: {
      dateOfService: "",
      placeOfService: "",
      diagnosis: {
        primary: "",
        secondary: [],
        description: "",
      },
      procedures: [
        {
          code: "",
          description: "",
          modifier: "",
          units: 1,
          charges: "",
        },
      ],
      referringProvider: "",
      authorizationNumber: "",
    },
    // Provider Information
    provider: {
      npi: "",
      name: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      phone: "",
      taxId: "",
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [aiValidation, setAiValidation] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Mock AI validation
  useEffect(() => {
    if (
      formData.service.diagnosis.primary &&
      formData.service.procedures[0].code
    ) {
      setTimeout(() => {
        setAiValidation({
          score: 92,
          suggestions: [
            "Consider adding modifier -25 for the evaluation and management service",
            "Prior authorization may be required for this procedure",
          ],
          warnings: [],
          estimatedApprovalTime: "2-3 business days",
        });
      }, 1000);
    }
  }, [formData.service.diagnosis.primary, formData.service.procedures]);

  const steps = [
    { id: 1, title: "Patient Info", icon: "👤" },
    { id: 2, title: "Insurance", icon: "🏥" },
    { id: 3, title: "Service Details", icon: "⚕️" },
    { id: 4, title: "Provider Info", icon: "🏢" },
    { id: 5, title: "Documents", icon: "📄" },
    { id: 6, title: "Review", icon: "✅" },
  ];

  const handleInputChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][field][index] = {
          ...newData[section][field][index],
          ...value,
        };
      } else if (typeof field === "object") {
        Object.keys(field).forEach((key) => {
          if (newData[section][key] !== undefined) {
            newData[section][key] = field[key];
          }
        });
      } else {
        newData[section][field] = value;
      }
      return newData;
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: "uploaded",
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const addProcedure = () => {
    setFormData((prev) => ({
      ...prev,
      service: {
        ...prev.service,
        procedures: [
          ...prev.service.procedures,
          {
            code: "",
            description: "",
            modifier: "",
            units: 1,
            charges: "",
          },
        ],
      },
    }));
  };

  const removeProcedure = (index) => {
    setFormData((prev) => ({
      ...prev,
      service: {
        ...prev.service,
        procedures: prev.service.procedures.filter((_, i) => i !== index),
      },
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.patient.firstName)
          newErrors.firstName = "First name is required";
        if (!formData.patient.lastName)
          newErrors.lastName = "Last name is required";
        if (!formData.patient.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        break;
      case 2:
        if (!formData.insurance.primary.company)
          newErrors.insuranceCompany = "Insurance company is required";
        if (!formData.insurance.primary.policyNumber)
          newErrors.policyNumber = "Policy number is required";
        break;
      case 3:
        if (!formData.service.dateOfService)
          newErrors.dateOfService = "Date of service is required";
        if (!formData.service.diagnosis.primary)
          newErrors.primaryDiagnosis = "Primary diagnosis is required";
        if (!formData.service.procedures[0].code)
          newErrors.procedureCode = "At least one procedure code is required";
        break;
      case 4:
        if (!formData.provider.npi) newErrors.npi = "NPI is required";
        if (!formData.provider.name)
          newErrors.providerName = "Provider name is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const claimId = `CLM-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`;
      alert(`Claim submitted successfully! Claim ID: ${claimId}`);
      setIsSubmitting(false);
      //dispatch(setActiveTab('claims-summary'));
      navigate("/dashboard/claims-summary");
    }, 2000);
  };

  const handleSaveDraft = () => {
    alert("Claim saved as draft");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Patient Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.patient.firstName}
                  onChange={(e) =>
                    handleInputChange("patient", "firstName", e.target.value)
                  }
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.patient.lastName}
                  onChange={(e) =>
                    handleInputChange("patient", "lastName", e.target.value)
                  }
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfBirth ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.patient.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("patient", "dateOfBirth", e.target.value)
                  }
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.patient.gender}
                  onChange={(e) =>
                    handleInputChange("patient", "gender", e.target.value)
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SSN
                </label>
                <input
                  type="text"
                  placeholder="XXX-XX-XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.patient.ssn}
                  onChange={(e) =>
                    handleInputChange("patient", "ssn", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.patient.address.street}
                  onChange={(e) =>
                    handleInputChange("patient", "address", {
                      ...formData.patient.address,
                      street: e.target.value,
                    })
                  }
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.patient.address.city}
                    onChange={(e) =>
                      handleInputChange("patient", "address", {
                        ...formData.patient.address,
                        city: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.patient.address.state}
                    onChange={(e) =>
                      handleInputChange("patient", "address", {
                        ...formData.patient.address,
                        state: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.patient.address.zipCode}
                    onChange={(e) =>
                      handleInputChange("patient", "address", {
                        ...formData.patient.address,
                        zipCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.patient.phone}
                  onChange={(e) =>
                    handleInputChange("patient", "phone", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.patient.email}
                  onChange={(e) =>
                    handleInputChange("patient", "email", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Insurance Information
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">
                Primary Insurance
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Company *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.insuranceCompany
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    value={formData.insurance.primary.company}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        company: e.target.value,
                      })
                    }
                  />
                  {errors.insuranceCompany && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.insuranceCompany}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.policyNumber ? "border-red-300" : "border-gray-300"
                    }`}
                    value={formData.insurance.primary.policyNumber}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        policyNumber: e.target.value,
                      })
                    }
                  />
                  {errors.policyNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.policyNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.insurance.primary.groupNumber}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        groupNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship to Subscriber
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.insurance.primary.relationship}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        relationship: e.target.value,
                      })
                    }
                  >
                    <option value="self">Self</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {formData.insurance.primary.relationship !== "self" && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subscriber Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.insurance.primary.subscriberName}
                      onChange={(e) =>
                        handleInputChange("insurance", "primary", {
                          ...formData.insurance.primary,
                          subscriberName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subscriber DOB
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.insurance.primary.subscriberDob}
                      onChange={(e) =>
                        handleInputChange("insurance", "primary", {
                          ...formData.insurance.primary,
                          subscriberDob: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.insurance.secondary.hasSecondary}
                  onChange={(e) =>
                    handleInputChange("insurance", "secondary", {
                      ...formData.insurance.secondary,
                      hasSecondary: e.target.checked,
                    })
                  }
                />
                <span className="text-sm font-medium text-gray-700">
                  Patient has secondary insurance
                </span>
              </label>
            </div>

            {formData.insurance.secondary.hasSecondary && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Secondary Insurance
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.insurance.secondary.company}
                      onChange={(e) =>
                        handleInputChange("insurance", "secondary", {
                          ...formData.insurance.secondary,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.insurance.secondary.policyNumber}
                      onChange={(e) =>
                        handleInputChange("insurance", "secondary", {
                          ...formData.insurance.secondary,
                          policyNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Service Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Service *
                </label>
                <input
                  type="date"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfService ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.service.dateOfService}
                  onChange={(e) =>
                    handleInputChange(
                      "service",
                      "dateOfService",
                      e.target.value
                    )
                  }
                />
                {errors.dateOfService && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfService}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Service
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.service.placeOfService}
                  onChange={(e) =>
                    handleInputChange(
                      "service",
                      "placeOfService",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select Place of Service</option>
                  <option value="11">Office</option>
                  <option value="21">Inpatient Hospital</option>
                  <option value="22">Outpatient Hospital</option>
                  <option value="23">Emergency Room</option>
                  <option value="31">Skilled Nursing Facility</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Diagnosis Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Diagnosis Code (ICD-10) *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g., Z00.00"
                      className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.primaryDiagnosis
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      value={formData.service.diagnosis.primary}
                      onChange={(e) =>
                        handleInputChange("service", "diagnosis", {
                          ...formData.service.diagnosis,
                          primary: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      🔍 Lookup
                    </button>
                  </div>
                  {errors.primaryDiagnosis && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.primaryDiagnosis}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diagnosis Description
                  </label>
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.service.diagnosis.description}
                    onChange={(e) =>
                      handleInputChange("service", "diagnosis", {
                        ...formData.service.diagnosis,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">
                  Procedure Information
                </h3>
                <button
                  type="button"
                  onClick={addProcedure}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  + Add Procedure
                </button>
              </div>

              {formData.service.procedures.map((procedure, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">
                      Procedure {index + 1}
                    </span>
                    {formData.service.procedures.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProcedure(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPT Code *
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="e.g., 99213"
                          className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            index === 0 && errors.procedureCode
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          value={procedure.code}
                          onChange={(e) =>
                            handleInputChange(
                              "service",
                              "procedures",
                              { code: e.target.value },
                              index
                            )
                          }
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          🔍
                        </button>
                      </div>
                      {index === 0 && errors.procedureCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.procedureCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Modifier
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={procedure.modifier}
                        onChange={(e) =>
                          handleInputChange(
                            "service",
                            "procedures",
                            { modifier: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Units
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={procedure.units}
                        onChange={(e) =>
                          handleInputChange(
                            "service",
                            "procedures",
                            { units: parseInt(e.target.value) },
                            index
                          )
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Charges
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={procedure.charges}
                        onChange={(e) =>
                          handleInputChange(
                            "service",
                            "procedures",
                            { charges: e.target.value },
                            index
                          )
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={procedure.description}
                        onChange={(e) =>
                          handleInputChange(
                            "service",
                            "procedures",
                            { description: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referring Provider
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.service.referringProvider}
                  onChange={(e) =>
                    handleInputChange(
                      "service",
                      "referringProvider",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorization Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.service.authorizationNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "service",
                      "authorizationNumber",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Provider Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NPI Number *
                </label>
                <input
                  type="text"
                  placeholder="10-digit NPI"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.npi ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.provider.npi}
                  onChange={(e) =>
                    handleInputChange("provider", "npi", e.target.value)
                  }
                />
                {errors.npi && (
                  <p className="text-red-500 text-sm mt-1">{errors.npi}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.providerName ? "border-red-300" : "border-gray-300"
                  }`}
                  value={formData.provider.name}
                  onChange={(e) =>
                    handleInputChange("provider", "name", e.target.value)
                  }
                />
                {errors.providerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.providerName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider Address
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.provider.address.street}
                  onChange={(e) =>
                    handleInputChange("provider", "address", {
                      ...formData.provider.address,
                      street: e.target.value,
                    })
                  }
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.provider.address.city}
                    onChange={(e) =>
                      handleInputChange("provider", "address", {
                        ...formData.provider.address,
                        city: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.provider.address.state}
                    onChange={(e) =>
                      handleInputChange("provider", "address", {
                        ...formData.provider.address,
                        state: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.provider.address.zipCode}
                    onChange={(e) =>
                      handleInputChange("provider", "address", {
                        ...formData.provider.address,
                        zipCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.provider.phone}
                  onChange={(e) =>
                    handleInputChange("provider", "phone", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID
                </label>
                <input
                  type="text"
                  placeholder="XX-XXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.provider.taxId}
                  onChange={(e) =>
                    handleInputChange("provider", "taxId", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Supporting Documents
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-4">📁</div>
                <div className="text-lg font-medium text-gray-900 mb-2">
                  Upload Supporting Documents
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Drag and drop files here, or click to browse
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Choose Files
                </button>
              </label>
            </div>

            <div className="text-sm text-gray-600">
              <p className="mb-2">
                Accepted file types: PDF, JPG, PNG, DOC, DOCX
              </p>
              <p>Maximum file size: 10MB per file</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📄</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {file.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded{" "}
                            {new Date(file.uploadDate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 text-sm">
                          ✓ Uploaded
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">
                📋 Document Checklist
              </h3>
              <div className="space-y-1 text-sm text-yellow-700">
                <div>• Medical records and chart notes</div>
                <div>• Lab results and diagnostic reports</div>
                <div>• Prior authorization (if required)</div>
                <div>• Referral documentation (if applicable)</div>
                <div>• Operative reports (for surgical procedures)</div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Review & Submit
            </h2>

            {/* AI Validation Results */}
            {aiValidation && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-blue-600">🤖</span>
                  <h3 className="font-medium text-blue-900">
                    AI Validation Results
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Validation Score
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${aiValidation.score}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {aiValidation.score}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Estimated Approval Time
                    </div>
                    <div className="text-blue-600 font-medium">
                      {aiValidation.estimatedApprovalTime}
                    </div>
                  </div>
                </div>

                {aiValidation.suggestions.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      AI Suggestions
                    </div>
                    <div className="space-y-1">
                      {aiValidation.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded"
                        >
                          💡 {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Claim Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Claim Summary</h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Patient
                  </div>
                  <div className="text-gray-900">
                    {formData.patient.firstName} {formData.patient.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    DOB: {formData.patient.dateOfBirth}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Primary Insurance
                  </div>
                  <div className="text-gray-900">
                    {formData.insurance.primary.company}
                  </div>
                  <div className="text-sm text-gray-500">
                    Policy: {formData.insurance.primary.policyNumber}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Date of Service
                  </div>
                  <div className="text-gray-900">
                    {formData.service.dateOfService}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Primary Diagnosis
                  </div>
                  <div className="text-gray-900">
                    {formData.service.diagnosis.primary}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Procedures
                  </div>
                  <div className="space-y-1">
                    {formData.service.procedures.map((proc, index) => (
                      <div key={index} className="text-gray-900 text-sm">
                        {proc.code} {proc.modifier && `(${proc.modifier})`} - $
                        {proc.charges ? `$${proc.charges}` : "No charge"}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Total Charges
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    $
                    {formData.service.procedures
                      .reduce(
                        (total, proc) =>
                          total + (parseFloat(proc.charges) || 0),
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Tamper-Proof Verification */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600">🛡️</span>
                <h3 className="font-medium text-green-900">
                  Tamper-Proof Verification
                </h3>
              </div>
              <div className="text-sm text-green-700">
                This claim will be secured using blockchain technology. All data
                will be cryptographically hashed and stored immutably.
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" required />
                <div className="text-sm text-gray-700">
                  <span className="font-medium">I certify that:</span>
                  <ul className="mt-1 space-y-1 ml-4 list-disc">
                    <li>
                      The information provided is true and accurate to the best
                      of my knowledge
                    </li>
                    <li>
                      The services were medically necessary and actually
                      provided
                    </li>
                    <li>
                      I have the right to submit this claim on behalf of the
                      patient
                    </li>
                    <li>
                      I understand that any false claims may result in penalties
                      under applicable law
                    </li>
                  </ul>
                </div>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Submit New Claim</h1>
          <p className="text-gray-600 mt-1">
            Complete all required information to submit your claim
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/claims-summary")}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕ Cancel
        </button>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.id ? "✓" : step.icon}
              </div>
              <div className="ml-3">
                <div
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions Toggle */}
      {(currentStep === 3 || currentStep === 6) && (
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowAiSuggestions(!showAiSuggestions)}
            className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <span>🤖</span>
            <span className="text-sm">AI Suggestions</span>
            <span className="text-xs">{showAiSuggestions ? "▼" : "▶"}</span>
          </button>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </button>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Save Draft
          </button>

          {currentStep < 6 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitClaim;
