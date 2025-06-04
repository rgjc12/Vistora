import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { setActiveTab } from "../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";

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
      // NOT editing - ensure we start with a clean form
      console.log("Starting with clean form - clearing all localStorage")
      setIsEditing(false)
      setEditingClaimId(null)

      // Clear any leftover editing flags and data
      localStorage.removeItem("edit_claim_draft")
      localStorage.removeItem("editing_mode")
      localStorage.removeItem("claim_form_data")

      // Reset form to initial state
      setFormData({
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
    alert(
      `Claim saved as draft!\nDraft ID: ${savedClaim.claimId}\nSaved at: ${new Date(savedClaim.savedAt).toLocaleString()}`,
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {submissionResult.aiValidation.approvalProbability}%
                </div>
                <div className="text-sm font-semibold text-slate-700">Approval Probability</div>
              </div>
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
                navigate("/claims")
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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:
border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
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
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold font-['Manrope',_sans-serif] flex items-center space-x-2"
                    >
                      <span>🔍</span>
                      <span>Lookup</span>
                    </button>
                  </div>
                  {errors.primaryDiagnosis && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.primaryDiagnosis}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                    Diagnosis Description *
                  </label>
                  <textarea
                    rows="3"
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
                    placeholder="Enter detailed diagnosis description or N/A"
                  />
                  {errors.diagnosisDescription && (
                    <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">
                      {errors.diagnosisDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Procedure Information
                </h3>
                <button
                  type="button"
                  onClick={addProcedure}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition-all duration-200 font-semibold font-['Manrope',_sans-serif] flex items-center space-x-2"
                >
                  <span>+</span>
                  <span>Add Procedure</span>
                </button>
              </div>

              {formData.service.procedures.map((procedure, index) => (
                <div key={index} className="border-2 border-slate-200 rounded-xl p-6 mb-6 last:mb-0 bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-slate-700 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      Procedure {index + 1}
                    </span>
                    {formData.service.procedures.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProcedure(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold font-['Manrope',_sans-serif] px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        CPT Code *
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="e.g., 99213"
                          className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                            index === 0 && errors.procedureCode
                              ? "border-red-300 bg-red-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          value={procedure.code}
                          onChange={(e) => handleInputChange("service", "procedures", { code: e.target.value }, index)}
                        />
                        <button
                          type="button"
                          className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200"
                        >
                          🔍
                        </button>
                      </div>
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
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
                        value={procedure.modifier}
                        onChange={(e) =>
                          handleInputChange("service", "procedures", { modifier: e.target.value }, index)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        Units
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white hover:border-slate-300"
                        value={procedure.units}
                        onChange={(e) =>
                          handleInputChange("service", "procedures", { units: Number.parseInt(e.target.value) }, index)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        Charges ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                          index === 0 && errors.procedureCharges
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        value={procedure.charges}
                        onChange={(e) => handleInputChange("service", "procedures", { charges: e.target.value }, index)}
                      />
                      {index === 0 && errors.procedureCharges && (
                        <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">
                          {errors.procedureCharges}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                        Description *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] bg-white ${
                          index === 0 && errors.procedureDescription
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        value={procedure.description}
                        onChange={(e) =>
                          handleInputChange("service", "procedures", { description: e.target.value }, index)
                        }
                        placeholder="Procedure description or N/A"
                      />
                      {index === 0 && errors.procedureDescription && (
                        <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">
                          {errors.procedureDescription}
                        </p>
                      )}
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
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                  value={formData.service.referringProvider}
                  onChange={(e) => handleInputChange("service", "referringProvider", e.target.value)}
                  placeholder="Enter referring provider name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  Authorization Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] hover:border-slate-300"
                  value={formData.service.authorizationNumber}
                  onChange={(e) => handleInputChange("service", "authorizationNumber", e.target.value)}
                  placeholder="Enter authorization number"
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
                Enter healthcare provider and practice details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 font-['Manrope',_sans-serif]">
                  NPI Number *
                </label>
                <input
                  type="text"
                  placeholder="10-digit NPI"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 font-['Manrope',_sans-serif] ${
                    errors.npi ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  value={formData.provider.npi}
                  onChange={(e) => handleInputChange("provider", "npi", e.target.value)}
                />
                {errors.npi && <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.npi}</p>}
              </div>

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
                  placeholder="Enter provider or practice name"
                />
                {errors.providerName && (
                  <p className="text-red-500 text-sm mt-1 font-['Manrope',_sans-serif]">{errors.providerName}</p>
                )}
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
                  Phone Number *
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
                  placeholder="XX-XXXXXXX or N/A"
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
                Upload medical records and supporting documentation
              </p>
            </div>

            <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-12 text-center bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all duration-300">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUploadWithPreview}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-emerald-400 mb-6 text-6xl">📁</div>
                <div className="text-xl font-bold text-slate-900 mb-3 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Upload Supporting Documents
                </div>
                <div className="text-slate-600 mb-6 font-['Manrope',_sans-serif]">
                  Drag and drop files here, or click to browse
                </div>
                <button
                  type="button"
                  className="px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-bold font-['Manrope',_sans-serif] shadow-lg hover:shadow-xl"
                >
                  Choose Files
                </button>
              </label>
            </div>

            <div className="text-sm text-slate-600 font-['Manrope',_sans-serif]">
              <p className="mb-2">
                <strong>Accepted file types:</strong> PDF, JPG, PNG, DOC, DOCX
              </p>
              <p>
                <strong>Maximum file size:</strong> 10MB per file
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                  Uploaded Files ({uploadedFiles.length})
                </h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                          {file.preview ? (
                            <img
                              src={file.preview || "/placeholder.svg"}
                              alt={file.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-emerald-600 text-xl">📄</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 font-['Manrope',_sans-serif]">{file.name}</div>
                          <div className="text-sm text-slate-500 font-['Manrope',_sans-serif]">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded{" "}
                            {new Date(file.uploadDate).toLocaleString()}
                          </div>
                          <div className="text-xs text-emerald-600 font-['Manrope',_sans-serif] mt-1">
                            🛡️ Hash: {file.hash}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-emerald-600 text-sm font-semibold bg-emerald-100 px-3 py-1 rounded-lg font-['Manrope',_sans-serif]">
                          ✓ Secured
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-200 font-['Manrope',_sans-serif]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-amber-800 mb-4 text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif] flex items-center space-x-2">
                <span>📋</span>
                <span>Document Checklist</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-700 font-['Manrope',_sans-serif]">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>Medical records and chart notes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>Lab results and diagnostic reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>Prior authorization (if required)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>Referral documentation (if applicable)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>Operative reports (for surgical procedures)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>Discharge summaries</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Review & Submit
              </h2>
              <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
                Review all information and submit your claim
              </p>
            </div>

            {/* AI Validation Results */}
            {aiValidation && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-900 text-xl font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      AI Validation Complete
                    </h3>
                    <p className="text-purple-700 font-['Manrope',_sans-serif]">
                      Advanced claim analysis and fraud detection completed
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm">
                    <div className="text-sm font-semibold text-slate-700 mb-3 font-['Manrope',_sans-serif]">
                      Validation Score
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${aiValidation.score}%` }}
                        ></div>
                      </div>
                      <span className="text-2xl font-bold text-emerald-600 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                        {aiValidation.score}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-['Manrope',_sans-serif]">
                      High confidence approval prediction
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm">
                    <div className="text-sm font-semibold text-slate-700 mb-3 font-['Manrope',_sans-serif]">
                      AI Confidence
                    </div>
                    <div className="text-purple-600 font-bold text-2xl font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      {aiValidation.confidence}%
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-['Manrope',_sans-serif]">
                      Model prediction accuracy
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm">
                    <div className="text-sm font-semibold text-slate-700 mb-3 font-['Manrope',_sans-serif]">
                      Est. Approval Time
                    </div>
                    <div className="text-emerald-600 font-bold text-lg font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      {aiValidation.estimatedApprovalTime}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-['Manrope',_sans-serif]">Based on similar claims</p>
                  </div>
                </div>

                {aiValidation.suggestions.length > 0 && (
                  <div className="mt-6">
                    <div className="text-sm font-semibold text-slate-700 mb-3 font-['Manrope',_sans-serif]">
                      Final AI Recommendations
                    </div>
                    <div className="space-y-2">
                      {aiValidation.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="text-sm text-purple-700 bg-purple-100 px-4 py-3 rounded-xl border border-purple-200 font-['Manrope',_sans-serif]"
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
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <h3 className="font-bold text-slate-900 mb-6 text-xl font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                Claim Summary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Patient
                    </div>
                    <div className="text-slate-900 font-semibold font-['Manrope',_sans-serif]">
                      {formData.patient.firstName} {formData.patient.lastName}
                    </div>
                    <div className="text-sm text-slate-500 font-['Manrope',_sans-serif]">
                      DOB: {formData.patient.dateOfBirth}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Primary Insurance
                    </div>
                    <div className="text-slate-900 font-semibold font-['Manrope',_sans-serif]">
                      {formData.insurance.primary.company}
                    </div>
                    <div className="text-sm text-slate-500 font-['Manrope',_sans-serif]">
                      Policy: {formData.insurance.primary.policyNumber}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Date of Service
                    </div>
                    <div className="text-slate-900 font-semibold font-['Manrope',_sans-serif]">
                      {formData.service.dateOfService}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Primary Diagnosis
                    </div>
                    <div className="text-slate-900 font-semibold font-['Manrope',_sans-serif]">
                      {formData.service.diagnosis.primary}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Procedures
                    </div>
                    <div className="space-y-2">
                      {formData.service.procedures.map((proc, index) => (
                        <div key={index} className="text-slate-900 text-sm font-['Manrope',_sans-serif]">
                          <span className="font-semibold">{proc.code}</span>
                          {proc.modifier && <span className="text-slate-500"> ({proc.modifier})</span>}
                          {proc.charges && <span className="text-emerald-600 font-semibold"> - ${proc.charges}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 font-['Manrope',_sans-serif]">
                      Total Charges
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                      $
                      {formData.service.procedures
                        .reduce((total, proc) => total + (Number.parseFloat(proc.charges) || 0), 0)
                        .toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tamper-Proof Verification */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-lg">🛡️</span>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
                    Tamper-Proof Verification
                  </h3>
                  <p className="text-emerald-700 text-sm font-['Manrope',_sans-serif]">
                    Blockchain-secured claim integrity
                  </p>
                </div>
              </div>
              <div className="text-sm text-emerald-700 font-['Manrope',_sans-serif] space-y-2">
                <p>✓ This claim will be secured using advanced blockchain technology</p>
                <p>✓ All data will be cryptographically hashed and stored immutably</p>
                <p>✓ Complete audit trail will be maintained for compliance</p>
                <p>✓ Anti-fraud measures automatically applied</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 text-emerald-600 border-2 border-slate-300 rounded focus:ring-emerald-500"
                  required
                />
                <div className="text-sm text-slate-700 font-['Manrope',_sans-serif]">
                  <span className="font-bold">I certify and acknowledge that:</span>
                  <ul className="mt-3 space-y-2 ml-4 list-disc">
                    <li>The information provided is true and accurate to the best of my knowledge</li>
                    <li>The services were medically necessary and actually provided to the patient</li>
                    <li>I have the legal right to submit this claim on behalf of the patient and provider</li>
                    <li>
                      I understand that any false claims may result in penalties under applicable federal and state laws
                    </li>
                    <li>I consent to blockchain verification and tamper-proof storage of this claim data</li>
                  </ul>
                </div>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Manrope',_sans-serif]">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
              {isEditing ? "Edit Claim" : "Submit New Claim"}
            </h1>
            <p className="text-slate-600 mt-2 font-['Manrope',_sans-serif]">
              {isEditing
                ? "Update your claim information"
                : "Complete all required information to submit your claim securely"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const claims = JSON.parse(localStorage.getItem("vistora_claims") || "[]")
                alert(
                  `You have ${claims.length} saved claims:\n${claims.map((c) => `${c.claimId} (${c.isDraft ? "Draft" : "Submitted"})`).join("\n")}`,
                )
              }}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-200 font-semibold font-['Manrope',_sans-serif]"
            >
              📋 View Saved Claims
            </button>
            <button
              onClick={() => navigate("/claims")}
              className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-all duration-200"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Editing Mode Indicator */}
        {isEditing && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">✏️</span>
              <span className="font-semibold text-blue-900">Editing Mode</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">
              You are currently editing an existing claim. Changes will update the original claim.
            </p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-300 text-slate-400 bg-white"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-xs font-medium transition-all duration-300 ${
                        currentStep >= step.id ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`h-0.5 transition-all duration-300 ${
                        currentStep > step.id ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold font-['Manrope',_sans-serif]"
              >
                ← Previous
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold font-['Manrope',_sans-serif]"
            >
              {isEditing ? "Update as Draft" : "Save Draft"}
            </button>

            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-bold font-['Manrope',_sans-serif] shadow-lg hover:shadow-xl"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-200 font-bold font-['Manrope',_sans-serif] shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <span>🔄</span>
                    <span>{isEditing ? "Updating..." : "Submitting..."}</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>🛡️</span>
                    <span>{isEditing ? "Update Claim" : "Submit Claim"}</span>
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitClaim
