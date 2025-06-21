import { loginfromserver } from "../services/LoginService";

export const login = (name, email, password, navigate) => {

    return async (dispatch) => {
        dispatch({
            type: "LOGIN"
        });
        try{
            const responseData = await loginfromserver(name, email, password, navigate);
                // {
                //     "message": "Login successful",
                //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvb2phQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUG9vamEgR29tZXMiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NDk5ODUyMTQsImV4cCI6MTc1MDA3MTYxNH0.F35iQo9Bb3DcDn_oNU1VehHZZcBpqhyBZlKbm3PkLmg",
                //     "user": {
                //         "id": "684e788c6747ce7408b14245",
                //         "name": "Pooja Gomes"
                //     }
                // }
            dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                name: responseData.user.name,
                email: responseData.user.email,
                role: responseData.user.role,
                token: responseData.token
            }
            });
        }
    catch(error) {
        console.error("Login failed:", error);
        dispatch({
            type: "LOGIN_FAILURE",
            payload: error.message
        });
    }
}}
