export const loginfromserver = async (name,email, password, navigate) => {
    try 
        {
            console.log("inside try block of login");
           
            const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("resp-->", data);
            navigate("/");
            // dispatch({
            //   type: "LOGIN_SUCCESS",
            //   payload: data
            // });
            return data; // Return the response data if needed
            
        } catch (err) 
        {
            console.log("error-->", err);
        }    
}