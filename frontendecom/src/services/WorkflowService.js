export const completeUserTaskFromBackend = async(processInstanceId,userSignal) =>
{
    console.log("processInstanceId in completeUserTaskFromBackend",processInstanceId);
    console.log("userTaskToBeCompleted in completeUserTaskFromBackend",userSignal);
    try{
        const response = await fetch(`http://localhost:5000/api/workflow/tasks/${processInstanceId}/completeTask`, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    variables: {
                        signal: { value: userSignal, type: "String" }
                    }
                })

        });
    }
    catch(Error)
    {

    }
    
}// export const completeUserTask = async(processInstanceId) => {
    
//     try{
//         const response = await fetch('http://localhost:5000/api/workflow/tasks/'+processInstanceId+"/completeTask")
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Task completed successfully:", data);
//         return data;
//     }
//     catch(error)
//     {
//         console.error("Error completing human task:", error);
//         throw new Error("Failed to complete human task");
//     }
// }


// export const paceOrder = async