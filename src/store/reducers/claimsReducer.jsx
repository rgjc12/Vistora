const initialState = {
    claims: [
      {
        id: 1,
        name: "Alexander",
        provider: "Foley",
        details: "alexander.foley@gmail.com",
        status: "Completed",
      },
      {
        id: 2,
        name: "Alexander",
        provider: "Foley",
        details: "alexander.foley@gmail.com",
        status: "Active",
      },
    ],
    stats: {
      total: 311,
      pending: 42,
      inProgress: 60,
      completed: 86,
    },
  }
  
  const claimsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_CLAIMS":
        return {
          ...state,
          claims: action.payload,
        }
      case "ADD_CLAIM":
        return {
          ...state,
          claims: [...state.claims, action.payload],
        }
      case "UPDATE_CLAIM":
        return {
          ...state,
          claims: state.claims.map((claim) => (claim.id === action.payload.id ? action.payload : claim)),
        }
      default:
        return state
    }
  }
  
  export default claimsReducer
  