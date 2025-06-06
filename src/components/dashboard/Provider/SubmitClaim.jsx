import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { setActiveTab } from "../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  )
}

const SubmitClaim = () => {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccessPage, setShowSuccessPage] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
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
  })

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [aiValidation, setAiValidation] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)
  const [ssnMasked, setSsnMasked] = useState(false)
  const [savedClaims, setSavedClaims] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingClaimId, setEditingClaimId] = useState(null)

  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
  }

  const addNotification = (type, title, message, claimId = null) => {
    const notification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      type,
      priority: type === "claim" ? "medium" : "low",
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      actionText: type === "claim" ? "View Claim" : "View Details",
      actionUrl: type === "claim" ? "/dashboard/claims" : "/dashboard",
      claimId,
    }

    const existingNotifications = JSON.parse(localStorage.getItem("vistora_notifications") || "[]")
    existingNotifications.unshift(notification)
    localStorage.setItem("vistora_notifications", JSON.stringify(existingNotifications))
  }

  // Mock AI validation
  useEffect(() => {
    if (formData.service.diagnosis.primary && formData.service.procedures[0].code) {
      setTimeout(() => {
        setAiValidation({
          score: 92,
          suggestions: [
            "Consider adding modifier -25 for the evaluation and management service",
            "Prior authorization may be required for this procedure",
          ],
          warnings: [],
          estimatedApprovalTime: "2-3 business days",
          confidence: 94,
          riskFlags: ["Missing discharge summary"],
        })
      }, 1000)
    }
  }, [formData.service.diagnosis.primary, formData.service.procedures])

  // FIXED: Only load draft data when explicitly editing
  useEffect(() => {
    console.log("SubmitClaim component mounted")

    // Check if we're explicitly in editing mode
    const editingMode = localStorage.getItem("editing_mode")
    const editDraftData = localStorage.getItem("edit_claim_draft")

    console.log("Editing mode:", editingMode)
    console.log("Has edit draft data:", !!editDraftData)

    // ONLY load draft if we're explicitly editing AND have draft data
    if (editingMode === "true" && editDraftData) {
      try {
        const draftData = JSON.parse(editDraftData)
        console.log("Loading draft data for editing:", draftData)

        setIsEditing(true)
        setEditingClaimId(draftData.id || draftData.originalId || draftData.editingClaimId)

        // Set the form data with the draft data
        setFormData({
          patient: {
            firstName: draftData.patient?.firstName || "",
            lastName: draftData.patient?.lastName || "",
            dateOfBirth: draftData.patient?.dateOfBirth || "",
            gender: draftData.patient?.gender || "",
            ssn: draftData.patient?.ssn || "",
            address: {
              street: draftData.patient?.address?.street || "",
              city: draftData.patient?.address?.city || "",
              state: draftData.patient?.address?.state || "",
              zipCode: draftData.patient?.address?.zipCode || "",
            },
            phone: draftData.patient?.phone || "",
            email: draftData.patient?.email || "",
          },
          insurance: {
            primary: {
              company: draftData.insurance?.primary?.company || "",
              policyNumber: draftData.insurance?.primary?.policyNumber || "",
              groupNumber: draftData.insurance?.primary?.groupNumber || "",
              subscriberName: draftData.insurance?.primary?.subscriberName || "",
              subscriberDob: draftData.insurance?.primary?.subscriberDob || "",
              relationship: draftData.insurance?.primary?.relationship || "self",
            },
            secondary: {
              hasSecondary: draftData.insurance?.secondary?.hasSecondary || false,
              company: draftData.insurance?.secondary?.company || "",
              policyNumber: draftData.insurance?.secondary?.policyNumber || "",
              groupNumber: draftData.insurance?.secondary?.groupNumber || "",
            },
          },
          service: {
            dateOfService: draftData.service?.dateOfService || "",
            placeOfService: draftData.service?.placeOfService || "",
            diagnosis: {
              primary: draftData.service?.diagnosis?.primary || "",
              secondary: draftData.service?.diagnosis?.secondary || [],
              description: draftData.service?.diagnosis?.description || "",
            },
            procedures:
              draftData.service?.procedures?.length > 0
                ? draftData.service.procedures
                : [
                    {
                      code: "",
                      description: "",
                      modifier: "",
                      units: 1,
                      charges: "",
                    },
                  ],
            referringProvider: draftData.service?.referringProvider || "",
            authorizationNumber: draftData.service?.authorizationNumber || "",
          },
          provider: {
            npi: draftData.provider?.npi || "",
            name: draftData.provider?.name || "",
            address: {
              street: draftData.provider?.address?.street || "",
              city: draftData.provider?.address?.city || "",
              state: draftData.provider?.address?.state || "",
              zipCode: draftData.provider?.address?.zipCode || "",
            },
            phone: draftData.provider?.phone || "",
            taxId: draftData.provider?.taxId || "",
          },
        })

        // Set uploaded files if they exist
        if (draftData.uploadedFiles) {
          setUploadedFiles(draftData.uploadedFiles)
        }

        // Clear the editing flags after loading
        localStorage.removeItem("edit_claim_draft")
        localStorage.removeItem("editing_mode")

        // Show notification
        setTimeout(() => {
          alert("Draft loaded successfully! You can continue editing your claim.")
        }, 500)
      } catch (error) {
        console.error("Error loading draft for editing:", error)
        alert("Error loading draft. Please try again.")
        // Clear invalid data
        localStorage.removeItem("edit_claim_draft")
        localStorage.removeItem("editing_mode")
      }
    } else {
      // Clear any leftover editing flags and data
      localStorage.removeItem("edit_claim_draft")
      localStorage.removeItem("editing_mode")
      localStorage.removeItem("claim_form_data")

      // Clear uploaded files
      setUploadedFiles([])
    }
  }, []) // Only run once on mount

  const steps = [
    { id: 1, title: "Patient Info", icon: "👤" },
    { id: 2, title: "Insurance", icon: "🏥" },
    { id: 3, title: "Service Details", icon: "⚕️" },
    { id: 4, title: "Provider Info", icon: "🏢" },
    { id: 5, title: "Documents", icon: "📄" },
    { id: 6, title: "Review", icon: "✅" },
  ]

  const handleInputChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      const newData = { ...prev }
      if (index !== null) {
        newData[section][field][index] = {
          ...newData[section][field][index],
          ...value,
        }
      } else if (typeof field === "object") {
        Object.keys(field).forEach((key) => {
          if (newData[section][key] !== undefined) {
            newData[section][key] = field[key]
          }
        })
      } else {
        newData[section][field] = value
      }
      return newData
    })
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: "uploaded",
      hash: `hash_${Math.random().toString(36).substr(2, 9)}`, // Mock blockchain hash
    }))
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

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
    }))
  }

  const removeProcedure = (index) => {
    setFormData((prev) => ({
      ...prev,
      service: {
        ...prev.service,
        procedures: prev.service.procedures.filter((_, i) => i !== index),
      },
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.patient.firstName) newErrors.firstName = "First name is required"
        if (!formData.patient.lastName) newErrors.lastName = "Last name is required"
        if (!formData.patient.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.patient.gender) newErrors.gender = "Gender is required"
        if (!formData.patient.address.street) newErrors.street = "Street address is required"
        if (!formData.patient.address.city) newErrors.city = "City is required"
        if (!formData.patient.address.state) newErrors.state = "State is required"
        if (!formData.patient.address.zipCode) newErrors.zipCode = "ZIP code is required"
        if (!formData.patient.phone) newErrors.phone = "Phone number is required"
        if (!formData.patient.email) newErrors.email = "Email is required"
        break
      case 2:
        if (!formData.insurance.primary.company) newErrors.insuranceCompany = "Insurance company is required"
        if (!formData.insurance.primary.policyNumber) newErrors.policyNumber = "Policy number is required"
        if (!formData.insurance.primary.groupNumber) newErrors.groupNumber = "Group number is required"
        break
      case 3:
        if (!formData.service.dateOfService) newErrors.dateOfService = "Date of service is required"
        if (!formData.service.placeOfService) newErrors.placeOfService = "Place of service is required"
        if (!formData.service.diagnosis.primary) newErrors.primaryDiagnosis = "Primary diagnosis is required"
        if (!formData.service.diagnosis.description)
          newErrors.diagnosisDescription = "Diagnosis description is required"
        if (!formData.service.procedures[0].code) newErrors.procedureCode = "At least one procedure code is required"
        if (!formData.service.procedures[0].description)
          newErrors.procedureDescription = "Procedure description is required"
        if (!formData.service.procedures[0].charges) newErrors.procedureCharges = "Procedure charges are required"
        break
      case 4:
        if (!formData.provider.npi) newErrors.npi = "NPI is required"
        if (!formData.provider.name) newErrors.providerName = "Provider name is required"
        if (!formData.provider.address.street) newErrors.providerStreet = "Provider street address is required"
        if (!formData.provider.address.city) newErrors.providerCity = "Provider city is required"
        if (!formData.provider.address.state) newErrors.providerState = "Provider state is required"
        if (!formData.provider.address.zipCode) newErrors.providerZipCode = "Provider ZIP code is required"
        if (!formData.provider.phone) newErrors.providerPhone = "Provider phone is required"
        if (!formData.provider.taxId) newErrors.taxId = "Tax ID is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSSNChange = (value) => {
    // Remove any non-digits
    const cleanValue = value.replace(/\D/g, "")
    // Format as XXX-XX-XXXX
    let formattedValue = cleanValue
    if (cleanValue.length >= 3) {
      formattedValue = cleanValue.slice(0, 3) + "-" + cleanValue.slice(3)
    }
    if (cleanValue.length >= 5) {
      formattedValue = cleanValue.slice(0, 3) + "-" + cleanValue.slice(3, 5) + "-" + cleanValue.slice(5, 9)
    }
    handleInputChange("patient", "ssn", formattedValue)
  }

  const handleSSNBlur = () => {
    if (formData.patient.ssn && formData.patient.ssn.length >= 4) {
      setSsnMasked(true)
    }
  }

  const handleSSNFocus = () => {
    setSsnMasked(false)
  }

  const getMaskedSSN = () => {
    if (!ssnMasked || !formData.patient.ssn) return formData.patient.ssn
    const cleanSSN = formData.patient.ssn.replace(/\D/g, "")
    if (cleanSSN.length >= 4) {
      return "***-**-" + cleanSSN.slice(-4)
    }
    return formData.patient.ssn
  }

  const saveClaimToStorage = (isDraft = true) => {
    const claimData = {
      id: isEditing ? editingClaimId : Date.now().toString(),
      ...formData,
      uploadedFiles,
      isDraft,
      savedAt: new Date().toISOString(),
      claimId: isDraft
        ? `DRAFT-${Date.now()}`
        : `CLM-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
      status: isDraft ? "Draft" : "In Review",
    }

    const existingClaims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")

    if (isEditing) {
      // Update existing claim
      const updatedClaims = existingClaims.map((claim) => (claim.id === editingClaimId ? claimData : claim))
      localStorage.setItem("vistora_claims", JSON.stringify(updatedClaims))
    } else {
      // Add new claim
      existingClaims.push(claimData)
      localStorage.setItem("vistora_claims", JSON.stringify(existingClaims))
    }

    return claimData
  }

  const handleFileUploadWithPreview = (event) => {
    const files = Array.from(event.target.files)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
          status: "uploaded",
          hash: `hash_${Math.random().toString(36).substr(2, 9)}`,
          preview: file.type.startsWith("image/") ? e.target.result : null,
          file: file, // Store the actual file object
        }

        setUploadedFiles((prev) => [...prev, newFile])
      }

      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file)
      } else {
        reader.readAsText(file)
      }
    })
  }

  const handleSaveDraft = () => {
    const savedClaim = saveClaimToStorage(true)
    showToast(`Claim saved as draft! Draft ID: ${savedClaim.claimId}`, "success")

    // Add notification
    addNotification(
      "claim",
      "Claim Draft Saved",
      `Claim draft ${savedClaim.claimId} has been saved`,
      savedClaim.claimId,
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Save the final claim
    const finalClaim = saveClaimToStorage(false)

    // Simulate API call with blockchain integration
    setTimeout(() => {
      const blockchainHash = `0x${Math.random().toString(36).substr(2, 9)}`

      // Enhanced AI validation for success page
      const finalAiValidation = {
        score: Math.floor(Math.random() * 10) + 90, // 90-99%
        confidence: Math.floor(Math.random() * 5) + 95, // 95-99%
        estimatedApprovalTime: "2-3 business days",
        approvalProbability: Math.floor(Math.random() * 10) + 90, // 90-99%
        riskAssessment: "Low Risk",
        fraudScore: Math.floor(Math.random() * 5) + 1, // 1-5%
        complianceScore: Math.floor(Math.random() * 5) + 95, // 95-99%
        recommendations: [
          "All required documentation provided",
          "Diagnosis and procedure codes are properly aligned",
          "Insurance verification successful",
        ],
      }

      setSubmissionResult({
        claim: finalClaim,
        blockchainHash,
        aiValidation: finalAiValidation,
        submittedAt: new Date().toISOString(),
      })

      setIsSubmitting(false)
      setShowSuccessPage(true)
    }, 2000)
  }

  // Success Page Component
  const renderSuccessPage = () => {
    if (!submissionResult) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 font-['Manrope',_sans-serif] flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8">
          {/* Success Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              Claim {isEditing ? "Updated" : "Submitted"} Successfully!
            </h1>
            <p className="text-xl text-slate-600">Your claim has been securely processed and is now under review</p>
          </div>

          {/* Claim Details Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              Claim Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Claim ID</div>
                  <div className="text-lg font-bold text-emerald-600">{submissionResult.claim.claimId}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Patient</div>
                  <div className="text-slate-900 font-semibold">
                    {submissionResult.claim.patient.firstName} {submissionResult.claim.patient.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Provider</div>
                  <div className="text-slate-900">{submissionResult.claim.provider.name}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Blockchain Hash</div>
                  <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2 rounded">
                    {submissionResult.blockchainHash}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Total Amount</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    $
                    {submissionResult.claim.service.procedures
                      .reduce((total, proc) => total + (Number.parseFloat(proc.charges) || 0), 0)
                      .toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Date of Service</div>
                  <div className="text-slate-900">{submissionResult.claim.service.dateOfService}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">{isEditing ? "Updated" : "Submitted"}</div>
                  <div className="text-slate-900">{new Date(submissionResult.submittedAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Status</div>
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    In Review
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis Results */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  AI Analysis Complete
                </h3>
                <p className="text-purple-700">Advanced claim validation and approval prediction</p>
              </div>
            </div>

            {/* Prominent AI Probability Display */}
            <div className="bg-white rounded-2xl p-8 mb-6 border-2 border-purple-200 text-center">
              <h4 className="text-lg font-bold text-slate-900 mb-4">AI Approval Prediction</h4>
              <div className="text-6xl font-bold text-emerald-600 mb-4">
                {submissionResult.aiValidation.approvalProbability}%
              </div>
              <p className="text-xl text-slate-700 mb-2">Probability of Approval</p>
              <p className="text-slate-600">
                Based on historical data and claim analysis, this claim has a{" "}
                <strong className="text-emerald-600">{submissionResult.aiValidation.approvalProbability}%</strong>{" "}
                chance of approval
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {submissionResult.aiValidation.confidence}%
                </div>
                <div className="text-sm font-semibold text-slate-700">AI Confidence</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {submissionResult.aiValidation.fraudScore}%
                </div>
                <div className="text-sm font-semibold text-slate-700">Fraud Risk</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {submissionResult.aiValidation.complianceScore}%
                </div>
                <div className="text-sm font-semibold text-slate-700">Compliance Score</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-purple-100">
              <h4 className="font-bold text-slate-900 mb-4">AI Recommendations</h4>
              <div className="space-y-2">
                {submissionResult.aiValidation.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-100 border border-emerald-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-emerald-600 text-xl">✅</span>
                <div>
                  <div className="font-bold text-emerald-900">High Approval Probability</div>
                  <div className="text-emerald-700 text-sm">
                    Expected processing time: {submissionResult.aiValidation.estimatedApprovalTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setShowSuccessPage(false)
                navigate("/dashboard/claims")
              }}
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl"
            >
              View All Claims
            </button>
            <button
              onClick={() => {
                setShowSuccessPage(false)
                setCurrentStep(1)
                setIsEditing(false)
                setEditingClaimId(null)
                setFormData({
                  patient: {
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    gender: "",
                    ssn: "",
                    address: { street: "", city: "", state: "", zipCode: "" },
                    phone: "",
                    email: "",
                  },
                  insurance: {
                    primary: {
                      company: "",
                      policyNumber: "",
                      groupNumber: "",
                      subscriberName: "",
                      subscriberDob: "",
                      relationship: "self",
                    },
                    secondary: { hasSecondary: false, company: "", policyNumber: "", groupNumber: "" },
                  },
                  service: {
                    dateOfService: "",
                    placeOfService: "",
                    diagnosis: { primary: "", secondary: [], description: "" },
                    procedures: [{ code: "", description: "", modifier: "", units: 1, charges: "" }],
                    referringProvider: "",
                    authorizationNumber: "",
                  },
                  provider: {
                    npi: "",
                    name: "",
                    address: { street: "", city: "", state: "", zipCode: "" },
                    phone: "",
                    taxId: "",
                  },
                })
                setUploadedFiles([])
                setSubmissionResult(null)
              }}
              className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-bold"
            >
              Submit Another Claim
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show success page if claim was submitted
  if (showSuccessPage) {
    return renderSuccessPage()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Patient Information
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Enter the patient's personal and contact information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  First Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.firstName ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.patient.firstName}
                  onChange={(e) => handleInputChange("patient", "firstName", e.target.value)}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Last Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.lastName ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.patient.lastName}
                  onChange={(e) => handleInputChange("patient", "lastName", e.target.value)}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.dateOfBirth ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.patient.dateOfBirth}
                  onChange={(e) => handleInputChange("patient", "dateOfBirth", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Gender *
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.gender ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.patient.gender}
                  onChange={(e) => handleInputChange("patient", "gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">SSN</label>
                <input
                  type="text"
                  placeholder="XXX-XX-XXXX"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                  value={getMaskedSSN()}
                  onChange={(e) => handleSSNChange(e.target.value)}
                  onFocus={handleSSNFocus}
                  onBlur={handleSSNBlur}
                  maxLength={11}
                />
                <p className="text-xs text-slate-500 font-['Manrope',_sans-serif]">
                  {ssnMasked ? "Only last 4 digits shown for security" : "Format: XXX-XX-XXXX"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">Address</label>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Street Address *"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                      errors.street ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                    value={formData.patient.address.street}
                    onChange={(e) =>
                      handleInputChange("patient", "address", {
                        ...formData.patient.address,
                        street: e.target.value,
                      })
                    }
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.street}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="City *"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                        errors.city ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                      value={formData.patient.address.city}
                      onChange={(e) =>
                        handleInputChange("patient", "address", {
                          ...formData.patient.address,
                          city: e.target.value,
                        })
                      }
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State *"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                        errors.state ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                      value={formData.patient.address.state}
                      onChange={(e) =>
                        handleInputChange("patient", "address", {
                          ...formData.patient.address,
                          state: e.target.value,
                        })
                      }
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="ZIP Code *"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                        errors.zipCode ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                      value={formData.patient.address.zipCode}
                      onChange={(e) =>
                        handleInputChange("patient", "address", {
                          ...formData.patient.address,
                          zipCode: e.target.value,
                        })
                      }
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Phone *
                </label>
                <input
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.patient.phone}
                  onChange={(e) => handleInputChange("patient", "phone", e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.email ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.patient.email}
                  onChange={(e) => handleInputChange("patient", "email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Insurance Information
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Provide primary and secondary insurance details
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
              <h3 className="font-bold text-emerald-900 mb-6 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Primary Insurance
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Insurance Company *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                      errors.insuranceCompany ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                    value={formData.insurance.primary.company}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        company: e.target.value,
                      })
                    }
                    placeholder="Enter insurance company name"
                  />
                  {errors.insuranceCompany && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.insuranceCompany}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                      errors.policyNumber ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                    value={formData.insurance.primary.policyNumber}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        policyNumber: e.target.value,
                      })
                    }
                    placeholder="Enter policy number"
                  />
                  {errors.policyNumber && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.policyNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Group Number *
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                      errors.groupNumber ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                    value={formData.insurance.primary.groupNumber}
                    onChange={(e) =>
                      handleInputChange("insurance", "primary", {
                        ...formData.insurance.primary,
                        groupNumber: e.target.value,
                      })
                    }
                    placeholder="Enter group number or N/A"
                  />
                  {errors.groupNumber && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.groupNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Relationship to Subscriber
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                      Subscriber Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
                      value={formData.insurance.primary.subscriberName}
                      onChange={(e) =>
                        handleInputChange("insurance", "primary", {
                          ...formData.insurance.primary,
                          subscriberName: e.target.value,
                        })
                      }
                      placeholder="Enter subscriber name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                      Subscriber DOB
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
                      value={formData.insurance.primary.subscriberDob}
                      onChange={(e) =>
                        handleInputChange("insurance", "primary", {
                          ...formData.insurance.primary,
                          subscriberDob: e.target.value,
                        })
                      }
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-emerald-600 border-2 border-slate-300 rounded focus:ring-emerald-500"
                  checked={formData.insurance.secondary.hasSecondary}
                  onChange={(e) =>
                    handleInputChange("insurance", "secondary", {
                      ...formData.insurance.secondary,
                      hasSecondary: e.target.checked,
                    })
                  }
                />
                <span className="text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Patient has secondary insurance
                </span>
              </label>
            </div>

            {formData.insurance.secondary.hasSecondary && (
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-6 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Secondary Insurance
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                      Insurance Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
                      value={formData.insurance.secondary.company}
                      onChange={(e) =>
                        handleInputChange("insurance", "secondary", {
                          ...formData.insurance.secondary,
                          company: e.target.value,
                        })
                      }
                      placeholder="Enter secondary insurance company"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
                      value={formData.insurance.secondary.policyNumber}
                      onChange={(e) =>
                        handleInputChange("insurance", "secondary", {
                          ...formData.insurance.secondary,
                          policyNumber: e.target.value,
                        })
                      }
                      placeholder="Enter secondary policy number"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Service Details
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Enter diagnosis codes, procedures, and service information
              </p>
            </div>

            {/* AI Insights Card */}
            {aiValidation && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      AI Validation Insights
                    </h3>
                    <p className="text-purple-700 text-sm font-['Manrope',_sans-serif]">
                      Real-time claim analysis and recommendations
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <div className="text-sm font-semibold text-slate-700 mb-2 font-['Manrope',_sans-serif]">
                      Validation Score
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${aiValidation.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xl font-bold text-emerald-600 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                        {aiValidation.score}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <div className="text-sm font-semibold text-slate-700 mb-2 font-['Manrope',_sans-serif]">
                      AI Confidence
                    </div>
                    <div className="text-purple-600 font-bold text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      {aiValidation.confidence}%
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-purple-100">
                    <div className="text-sm font-semibold text-slate-700 mb-2 font-['Manrope',_sans-serif]">
                      Est. Approval Time
                    </div>
                    <div className="text-emerald-600 font-bold font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      {aiValidation.estimatedApprovalTime}
                    </div>
                  </div>
                </div>

                {aiValidation.suggestions.length > 0 && (
                  <div className="mt-6">
                    <div className="text-sm font-semibold text-slate-700 mb-3 font-['Manrope',_sans-serif]">
                      AI Recommendations
                    </div>
                    <div className="space-y-2">
                      {aiValidation.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="text-sm text-purple-700 bg-purple-100 px-4 py-2 rounded-lg border border-purple-200 font-['Manrope',_sans-serif]"
                        >
                          💡 {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aiValidation.riskFlags.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-slate-700 mb-3 font-['Manrope',_sans-serif]">
                      Risk Flags
                    </div>
                    <div className="space-y-2">
                      {aiValidation.riskFlags.map((flag, index) => (
                        <div
                          key={index}
                          className="text-sm text-amber-700 bg-amber-100 px-4 py-2 rounded-lg border border-amber-200 font-['Manrope',_sans-serif]"
                        >
                          ⚠️ {flag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Date of Service *
                </label>
                <input
                  type="date"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.dateOfService ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.service.dateOfService}
                  onChange={(e) => handleInputChange("service", "dateOfService", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dateOfService && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.dateOfService}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Place of Service *
                </label>
                <select
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.placeOfService ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.service.placeOfService}
                  onChange={(e) => handleInputChange("service", "placeOfService", e.target.value)}
                >
                  <option value="">Select Place of Service</option>
                  <option value="11">Office</option>
                  <option value="21">Inpatient Hospital</option>
                  <option value="22">Outpatient Hospital</option>
                  <option value="23">Emergency Room</option>
                  <option value="31">Skilled Nursing Facility</option>
                </select>
                {errors.placeOfService && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.placeOfService}</p>
                )}
              </div>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-6 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Diagnosis Information
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Primary Diagnosis Code (ICD-10) *
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="e.g., Z00.00"
                      className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                        errors.primaryDiagnosis ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
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
                      className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-['Manrope',_sans-serif]"
                      onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                    >
                      🔍 Search
                    </button>
                  </div>
                  {errors.primaryDiagnosis && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.primaryDiagnosis}</p>
                  )}
                </div>

                {showAiSuggestions && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        AI Suggested Codes
                      </div>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-600"
                        onClick={() => setShowAiSuggestions(false)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div
                        className="p-2 hover:bg-slate-50 rounded cursor-pointer"
                        onClick={() =>
                          handleInputChange("service", "diagnosis", {
                            ...formData.service.diagnosis,
                            primary: "J02.9",
                            description: "Acute pharyngitis, unspecified",
                          })
                        }
                      >
                        <div className="font-semibold text-slate-900 font-['Manrope',_sans-serif]">J02.9</div>
                        <div className="text-sm text-slate-600 font-['Manrope',_sans-serif]">
                          Acute pharyngitis, unspecified
                        </div>
                      </div>
                      <div
                        className="p-2 hover:bg-slate-50 rounded cursor-pointer"
                        onClick={() =>
                          handleInputChange("service", "diagnosis", {
                            ...formData.service.diagnosis,
                            primary: "J01.90",
                            description: "Acute sinusitis, unspecified",
                          })
                        }
                      >
                        <div className="font-semibold text-slate-900 font-['Manrope',_sans-serif]">J01.90</div>
                        <div className="text-sm text-slate-600 font-['Manrope',_sans-serif]">
                          Acute sinusitis, unspecified
                        </div>
                      </div>
                      <div
                        className="p-2 hover:bg-slate-50 rounded cursor-pointer"
                        onClick={() =>
                          handleInputChange("service", "diagnosis", {
                            ...formData.service.diagnosis,
                            primary: "J06.9",
                            description: "Acute upper respiratory infection, unspecified",
                          })
                        }
                      >
                        <div className="font-semibold text-slate-900 font-['Manrope',_sans-serif]">J06.9</div>
                        <div className="text-sm text-slate-600 font-['Manrope',_sans-serif]">
                          Acute upper respiratory infection, unspecified
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Diagnosis Description *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter diagnosis description"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                      errors.diagnosisDescription
                        ? "border-red-300 bg-red-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    value={formData.service.diagnosis.description}
                    onChange={(e) =>
                      handleInputChange("service", "diagnosis", {
                        ...formData.service.diagnosis,
                        description: e.target.value,
                      })
                    }
                  />
                  {errors.diagnosisDescription && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">
                      {errors.diagnosisDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Procedures
                </h3>
                <button
                  type="button"
                  onClick={addProcedure}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-['Manrope',_sans-serif]"
                >
                  + Add Procedure
                </button>
              </div>

              {formData.service.procedures.map((procedure, index) => (
                <div key={index} className="mb-6 p-4 border-2 border-slate-200 rounded-xl bg-white last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900 font-['Manrope',_sans-serif]">Procedure {index + 1}</h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeProcedure(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-['Manrope',_sans-serif]"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        Procedure Code (CPT/HCPCS) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 99213"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                          index === 0 && errors.procedureCode
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        value={procedure.code}
                        onChange={(e) =>
                          handleInputChange("service", "procedures", { ...procedure, code: e.target.value }, index)
                        }
                      />
                      {index === 0 && errors.procedureCode && (
                        <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.procedureCode}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        Modifier
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 25"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                        value={procedure.modifier}
                        onChange={(e) =>
                          handleInputChange("service", "procedures", { ...procedure, modifier: e.target.value }, index)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        Description *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter procedure description"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                          index === 0 && errors.procedureDescription
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        value={procedure.description}
                        onChange={(e) =>
                          handleInputChange(
                            "service",
                            "procedures",
                            { ...procedure, description: e.target.value },
                            index,
                          )
                        }
                      />
                      {index === 0 && errors.procedureDescription && (
                        <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">
                          {errors.procedureDescription}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                          Units
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                          value={procedure.units}
                          onChange={(e) =>
                            handleInputChange(
                              "service",
                              "procedures",
                              { ...procedure, units: Number.parseInt(e.target.value) || 1 },
                              index,
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                          Charges ($) *
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                            index === 0 && errors.procedureCharges
                              ? "border-red-300 bg-red-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          value={procedure.charges}
                          onChange={(e) =>
                            handleInputChange("service", "procedures", { ...procedure, charges: e.target.value }, index)
                          }
                        />
                        {index === 0 && errors.procedureCharges && (
                          <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">
                            {errors.procedureCharges}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Referring Provider
                </label>
                <input
                  type="text"
                  placeholder="Enter referring provider name"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                  value={formData.service.referringProvider}
                  onChange={(e) => handleInputChange("service", "referringProvider", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Authorization Number
                </label>
                <input
                  type="text"
                  placeholder="Enter authorization number if applicable"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                  value={formData.service.authorizationNumber}
                  onChange={(e) => handleInputChange("service", "authorizationNumber", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Provider Information
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Enter details about the healthcare provider
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Provider Name *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.providerName ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.provider.name}
                  onChange={(e) => handleInputChange("provider", "name", e.target.value)}
                  placeholder="Enter provider name"
                />
                {errors.providerName && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  NPI (National Provider Identifier) *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.npi ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.provider.npi}
                  onChange={(e) => handleInputChange("provider", "npi", e.target.value)}
                  placeholder="Enter 10-digit NPI"
                  maxLength={10}
                />
                {errors.npi && <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.npi}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                Provider Address
              </label>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Street Address *"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                      errors.providerStreet ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                    value={formData.provider.address.street}
                    onChange={(e) =>
                      handleInputChange("provider", "address", {
                        ...formData.provider.address,
                        street: e.target.value,
                      })
                    }
                  />
                  {errors.providerStreet && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerStreet}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="City *"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                        errors.providerCity ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                      value={formData.provider.address.city}
                      onChange={(e) =>
                        handleInputChange("provider", "address", {
                          ...formData.provider.address,
                          city: e.target.value,
                        })
                      }
                    />
                    {errors.providerCity && (
                      <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerCity}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State *"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                        errors.providerState ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                      value={formData.provider.address.state}
                      onChange={(e) =>
                        handleInputChange("provider", "address", {
                          ...formData.provider.address,
                          state: e.target.value,
                        })
                      }
                    />
                    {errors.providerState && (
                      <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerState}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="ZIP Code *"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                        errors.providerZipCode ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                      value={formData.provider.address.zipCode}
                      onChange={(e) =>
                        handleInputChange("provider", "address", {
                          ...formData.provider.address,
                          zipCode: e.target.value,
                        })
                      }
                    />
                    {errors.providerZipCode && (
                      <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerZipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Provider Phone *
                </label>
                <input
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.providerPhone ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.provider.phone}
                  onChange={(e) => handleInputChange("provider", "phone", e.target.value)}
                />
                {errors.providerPhone && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerPhone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Tax ID *
                </label>
                <input
                  type="text"
                  placeholder="XX-XXXXXXX"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.taxId ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.provider.taxId}
                  onChange={(e) => handleInputChange("provider", "taxId", e.target.value)}
                />
                {errors.taxId && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.taxId}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Supporting Documents
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Upload any relevant medical records or supporting documentation
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-xl">🔒</span>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                    Secure Document Upload
                  </h3>
                  <p className="text-emerald-700 text-sm font-['Manrope',_sans-serif]">
                    All files are encrypted and stored securely
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                <div className="mb-4">
                  <span className="text-4xl">📄</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Drag and drop files here
                </h4>
                <p className="text-slate-600 mb-6 font-['Manrope',_sans-serif]">
                  or click to browse from your computer
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  onChange={handleFileUploadWithPreview}
                />
                <label
                  htmlFor="file-upload"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 cursor-pointer font-semibold font-['Manrope',_sans-serif]"
                >
                  Select Files
                </label>
                <p className="text-xs text-slate-500 mt-4 font-['Manrope',_sans-serif]">
                  Supported formats: PDF, JPG, PNG, TIFF (Max 10MB per file)
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-bold text-slate-900 mb-4 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center">
                            <span className="text-slate-600 text-lg">
                              {file.type.includes("image") ? "🖼️" : file.type.includes("pdf") ? "📄" : "📎"}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 font-['Manrope',_sans-serif]">{file.name}</div>
                            <div className="text-xs text-slate-500 font-['Manrope',_sans-serif]">
                              {(file.size / 1024).toFixed(1)} KB • Uploaded {new Date(file.uploadDate).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {file.preview && (
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-800 text-sm font-['Manrope',_sans-serif]"
                              onClick={() => window.open(file.preview, "_blank")}
                            >
                              Preview
                            </button>
                          )}
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm font-['Manrope',_sans-serif]"
                            onClick={() => removeFile(file.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">ℹ️</span>
                </div>
                <h3 className="font-bold text-blue-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Recommended Documents
                </h3>
              </div>
              <ul className="space-y-2 text-blue-800 font-['Manrope',_sans-serif]">
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Medical records related to the service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Physician notes or orders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Lab or test results</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Prior authorization documentation (if applicable)</span>
                </li>
              </ul>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Review and Submit
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Please review all information before submitting your claim
              </p>
            </div>

            {/* Patient Information Summary */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Patient Information
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-['Manrope',_sans-serif]"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">Name</div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.patient.firstName} {formData.patient.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                    Date of Birth
                  </div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">{formData.patient.dateOfBirth}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">Address</div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.patient.address.street}, {formData.patient.address.city}, {formData.patient.address.state}{" "}
                    {formData.patient.address.zipCode}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">Contact</div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.patient.phone} | {formData.patient.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Information Summary */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Insurance Information
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-['Manrope',_sans-serif]"
                >
                  Edit
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                    Primary Insurance
                  </div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.insurance.primary.company} | Policy: {formData.insurance.primary.policyNumber} | Group:{" "}
                    {formData.insurance.primary.groupNumber}
                  </div>
                </div>
                {formData.insurance.secondary.hasSecondary && (
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Secondary Insurance
                    </div>
                    <div className="text-slate-900 font-['Manrope',_sans-serif]">
                      {formData.insurance.secondary.company} | Policy: {formData.insurance.secondary.policyNumber}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Service Details Summary */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Service Details
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-['Manrope',_sans-serif]"
                >
                  Edit
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Date of Service
                    </div>
                    <div className="text-slate-900 font-['Manrope',_sans-serif]">{formData.service.dateOfService}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Place of Service
                    </div>
                    <div className="text-slate-900 font-['Manrope',_sans-serif]">{formData.service.placeOfService}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                    Primary Diagnosis
                  </div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.service.diagnosis.primary} - {formData.service.diagnosis.description}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                    Procedures
                  </div>
                  <div className="space-y-2">
                    {formData.service.procedures.map((procedure, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-lg">
                        <div className="font-semibold text-slate-900 font-['Manrope',_sans-serif]">
                          {procedure.code} {procedure.modifier && `- ${procedure.modifier}`}
                        </div>
                        <div className="text-sm text-slate-600 font-['Manrope',_sans-serif]">
                          {procedure.description} | Units: {procedure.units} | Charges: ${procedure.charges}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Information Summary */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Provider Information
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-['Manrope',_sans-serif]"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                    Provider Name
                  </div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">{formData.provider.name}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">NPI</div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">{formData.provider.npi}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">Address</div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.provider.address.street}, {formData.provider.address.city},{" "}
                    {formData.provider.address.state} {formData.provider.address.zipCode}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                    Phone / Tax ID
                  </div>
                  <div className="text-slate-900 font-['Manrope',_sans-serif]">
                    {formData.provider.phone} | {formData.provider.taxId}
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Documents Summary */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Supporting Documents
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-['Manrope',_sans-serif]"
                >
                  Edit
                </button>
              </div>
              {uploadedFiles.length > 0 ? (
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-600">
                          {file.type.includes("image") ? "🖼️" : file.type.includes("pdf") ? "📄" : "📎"}
                        </span>
                        <span className="text-slate-900 font-['Manrope',_sans-serif]">{file.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-['Manrope',_sans-serif]">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-600 italic font-['Manrope',_sans-serif]">No documents uploaded</div>
              )}
            </div>

            {/* Total Charges Summary */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Total Charges
                </h3>
                <div className="text-2xl font-bold text-emerald-600 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  $
                  {formData.service.procedures
                    .reduce((total, proc) => total + (Number.parseFloat(proc.charges) || 0), 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>

            {/* Blockchain Security Notice */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🔒</span>
                </div>
                <h3 className="font-bold text-blue-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Secure Blockchain Submission
                </h3>
              </div>
              <p className="text-blue-800 mb-4 font-['Manrope',_sans-serif]">
                Your claim will be securely stored with blockchain technology, ensuring:
              </p>
              <ul className="space-y-2 text-blue-700 font-['Manrope',_sans-serif]">
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Tamper-proof record of your submission</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Complete audit trail of all claim activities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Enhanced security and privacy protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Faster processing through smart contract validation</span>
                </li>
              </ul>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-5 h-5 text-emerald-600 border-2 border-slate-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-slate-700 font-['Manrope',_sans-serif]">
                  I certify that the information provided is true and accurate to the best of my knowledge. I authorize
                  the release of any medical or other information necessary to process this claim.
                </label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Manrope',_sans-serif]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
            {isEditing ? "Edit Claim" : "Submit New Claim"}
          </h1>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/claims")}
              className="px-4 py-2 border-2 border-red-300 text-red-700 rounded-xl hover:bg-red-50 hover:border-red-400 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id < currentStep
                    ? "text-emerald-600"
                    : step.id === currentStep
                      ? "text-blue-600"
                      : "text-slate-400"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                    step.id < currentStep
                      ? "bg-emerald-100 text-emerald-600"
                      : step.id === currentStep
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step.id < currentStep ? "✓" : step.icon}
                </div>
                <div className="text-sm font-semibold">{step.title}</div>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 h-2 bg-slate-200 w-full rounded-full"></div>
            <div
              className="absolute top-0 left-0 h-2 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold"
              >
                Next
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-6 py-3 border-2 border-emerald-300 text-emerald-700 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 font-semibold"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold flex items-center space-x-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Submit Claim</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitClaim