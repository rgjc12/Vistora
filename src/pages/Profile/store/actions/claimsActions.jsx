export const fetchClaims = (claims) => ({
    type: "FETCH_CLAIMS",
    payload: claims,
  })
  
  export const addClaim = (claim) => ({
    type: "ADD_CLAIM",
    payload: claim,
  })
  
  export const updateClaim = (claim) => ({
    type: "UPDATE_CLAIM",
    payload: claim,
  })
  