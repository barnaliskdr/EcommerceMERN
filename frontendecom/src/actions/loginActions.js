import { loginfromserver } from "../services/LoginService";

export const login = (name, email, password, navigate, setError) => {

    return async (dispatch) => {
        dispatch({
            type: "LOGIN"
        });
        try{
            const responseData = await loginfromserver(name, email, password, navigate, setError);
            console.log("Login successful response data:", responseData);
            sessionStorage.setItem("name", responseData.user.name);
            sessionStorage.setItem("id", responseData.user.id);
            sessionStorage.setItem("email", responseData.user.email);
            sessionStorage.setItem("role", responseData.user.role);
            sessionStorage.setItem("token", responseData.token);
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
                id: responseData.user.id,
                name: responseData.user.name,
                email: responseData.user.email,
                role: responseData.user.role,
                token: responseData.token
            }
            });
        }
    catch(error) {
        // console.error("Login failed:", error);
        // setError(error.message);
        dispatch({
            type: "LOGIN_FAILURE",
            payload: error.message
        });
    }
}}


export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT_SUCCESS"
        });
        // Optionally, you can clear user data from localStorage or any other storage
        // localStorage.removeItem("userData");
        // localStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("token");
        console.log("User logged out successfully");
    };
}