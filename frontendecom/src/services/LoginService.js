import axios from "axios";

export const loginfromserver = async (name, email, password, navigate, setError) => {
    try {
        console.log("inside try block of login");

        // const response = await fetch("http://localhost:5000/api/auth/login", {
        // method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify({
        //     name: name,
        //     email: email,
        //     password: password
        // })
        // });


        try {
            console.log("inside try block of login");

            const response = await axios.post("http://localhost:5000/api/auth/login", {
                name,
                email,
                password
            });

            console.log("resp-->", response.data);

            navigate("/");
            return response.data; // Axios puts parsed data in response.data

        } catch (err) {
            console.error("Login error:", err.response.data.message);
            setError(err.response.data.message || "Login failed");
        }

        // if (!response.ok) {
        //     console.log("response-->", response);
        //     setError(response.message);
        //     // throw new Error(`HTTP error! status: ${response.status}`);
        // }
       
        // dispatch({
        //   type: "LOGIN_SUCCESS",
        //   payload: data
        // });
       

    } catch (err) {
        setError(err);
        console.log("error-->", err);
    }
}