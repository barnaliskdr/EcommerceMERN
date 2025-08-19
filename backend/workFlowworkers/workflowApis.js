import axios from 'axios';
import { request, response } from 'express';

// export const fetchAndLockWorkflow = async (tasktopic) => {

//     let workerId , topicName;
//     if(tasktopic == "place-order")
//     {
//         console.log("Fetching and locking workflow for place-order task");
//         workerId = "place-order-worker";
//         topicName = "place-order";
//     }
//     else if(tasktopic == "update-Order-Status")
//     {
//         workerId = "status-worker";
//         topicName = "update-order-status";
//     }
//     else
//     {
//         throw new Error("Invalid task topic provided");
//     }

//     const requestBody = {
//         workerId: workerId,
//         maxTasks: 1,
//         usePriority: true,
//         topics: [
//             {
//                 // topicName: "update-order-status",
//                 topicName: topicName,
//                 lockDuration: 10000
//             }
//         ]
//     };

//     try{
//     const response = await fetch(`http://localhost:8080/engine-rest/external-task/fetchAndLock`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Authorization': `Bearer ${userId}`
//         },
//         body: JSON.stringify(requestBody)
//     });
//        console.log("Response from workflowApis fetchAndLockWorkflow:", response);
//        return response.id;
//     }
//     catch(error) {
//         console.error("Error fetching and locking workflow:", error);
//         throw new Error("Failed to fetch and lock workflow");   
//     }
// //   if (!response.ok) {
// //     throw new Error(`Failed to lock workflow: ${response.statusText}`);
// //   }

//   return response.json();
// }


export const fetchAndLockWorkflow = async (tasktopic) => {
  let workerId, topicName;

  if (tasktopic === "place-order") {
    console.log("Fetching and locking workflow for place-order task");
    workerId = "place-order-worker";
    topicName = "place-order";
  } else if (tasktopic === "update-status-to-shipped") {
    workerId = "update-status-to-shipped";
    topicName = "update-status-to-shipped";
  } 
  else if (tasktopic === "update-status-to-delivered") {
    workerId = "update-status-to-delivered";
    topicName = "update-status-to-delivered";
  }
  else if(tasktopic === "update-status-to-out-for-delivery") {
    workerId = "update-status-to-out-for-delivery";
    topicName = "update-status-to-out-for-delivery";
  }
  else if (tasktopic === "update-status-to-delivered") {
    workerId = "update-status-to-delivered";
    topicName = "update-status-to-delivered";
  }
  else {
    throw new Error("Invalid task topic provided");
  }

  const requestBody = {
    workerId: workerId,
    maxTasks: 1,
    usePriority: true,
    topics: [
      {
        topicName: topicName,
        lockDuration: 10000
      }
    ]
  };

  try {
    const response = await fetch(`http://localhost:8080/engine-rest/external-task/fetchAndLock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Failed to lock workflow: ${response.status} ${response.statusText}`);
    }

    const data = await response.json(); // ✅ important
    console.log("Locked external task(s):", data);

    if (data.length > 0) {
      return data[0].id; // return the first external task object
    } else {
      console.log("No external tasks available to lock");
      return null;
    }
  } catch (error) {
    console.error("Error fetching and locking workflow:", error);
    throw new Error("Failed to fetch and lock workflow");
  }
};


export const completeWorkflowTask = async (taskId, variables) => {
    console.log("variables in completeWorkflowTask",variables);
    console.log("taskId in completeWorkflowTask:", taskId);
    // const requestBody = {
    //     workerId: "place-order-worker"
    // };
    // console.group("Hello:",requestBody);
    const requestBody = {
        workerId: "update-status-to-shipped"
    };
    try {
        const url = `http://localhost:8080/engine-rest/external-task/${taskId}/complete`;
        console.log("Completing workflow task at URL:", url);
        const response = await fetch(`http://localhost:8080/engine-rest/external-task/${taskId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(variables)
            // body:{
            // {
            //     // variables: variables
                // variables:
                // {
                //     workerId: "update-status-to-shipped"
                // }
            // }
              // }
        });
        console.log("Response: "+response);
        if(response.status !== 204) {
            throw new Error(`Failed to complete workflow task: ${response.status} ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Error completing workflow task:", error);
        throw new Error("Failed to complete workflow task");
    }
}


export const getUserTaskByProcessInstanceId = async (processInstanceId) => {
  console.log("processInstanceId in getTaskByProcessInstanceId:", processInstanceId);
  if(!processInstanceId) {
    throw new Error("processInstanceId is required"); 
  }
  try {
        const response = await fetch(`http://localhost:8080/engine-rest/task?processInstanceId=${processInstanceId}`, 
          {
            method : 'GET',
            headers:{
                'Content-Type': 'application/json'
            }

          });
          console.log("taskid to complete: ",response);
        // const shipmentUserTask = taskIds.find(task => task.name === "prepared for shipment");
        return response.json();
    } catch (error) {
        console.error("Error handling workflow failure:", error);
        throw new Error("Failed to handle workflow failure");
    }
}


export const getExternalTaskByProcessInstanceId = async (processInstanceId) => {
  try{
    const response = await fetch(`http://localhost:8080/engine-rest/external-task?processInstanceId=${processInstanceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch external task: ${response.status} ${response.statusText}`);
    }
    console.log("External task fetched successfully:", response);
    return response.json();
  }
  catch(error) {
    console.error("Error fetching external task by process instance ID:", error);
    throw new Error("Failed to fetch external task by process instance ID");
  }
}


// export const completeUserTask = async (req,res) => {
//     try {
//         const { processInstanceId } = req.params;
//          const { variables } = req.body; //taskTopic is passed in the request body
//         console.log("processInstanceId in completeUserTask:", processInstanceId);
//         const taskIds = await getUserTaskByProcessInstanceId(processInstanceId);
//         console.log("taskIds to complete:", taskIds);
//         const taskId = taskIds[0].id;
//         console.log("user Task ID to complete:", taskId);
//         // const shipmentUserTask = taskIds.find(task => task.name === "prepared for shipment");
//         const response = await fetch(`http://localhost:8080/engine-rest/task/${taskId}/complete`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({     
//             variables: {
//                 signal: { value: "SHIPPED", type: "String" }
//             }
//             })
//         });
//         console.log("Task completed. Response from completeUserTask:", response);
//         res.status(200).json({ message: "Task completed successfully" });
//         return res.json();
//     } catch (error) {
//         console.error("Error handling workflow failure:", error);
//         throw new Error("Failed to handle workflow failure");
//     }
// }


export const completeUserTask = async (req, res) => {
  try {
    const { processInstanceId } = req.params;
    const { variables } = req.body; // take variables from request body

    console.log("Received variables in completeUserTask:", variables);

    console.log("processInstanceId in completeUserTask:", processInstanceId);
    const taskIds = await getUserTaskByProcessInstanceId(processInstanceId);

    if (!taskIds || taskIds.length === 0) {
      return res.status(404).json({ message: "No user tasks found for given processInstanceId" });
    }

    const taskId = taskIds[0].id;
    console.log("user Task ID to complete:", taskId);

    const response = await fetch(`http://localhost:8080/engine-rest/task/${taskId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ variables }) // use dynamic variables
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Failed to complete task. Engine response:", errorBody);
      return res.status(500).json({ message: "Failed to complete task", error: errorBody });
    }

    console.log("Task completed. Response from completeUserTask:", await response.text());
    res.status(200).json({ message: "Task completed successfully" });
  } catch (error) {
    console.error("Error handling workflow failure:", error);
    res.status(500).json({ error: "Failed to handle workflow failure" });
  }
};



export const fetchexternalTask = async (processInstanceId) => {
     try {
    const response = await axios.get(`http://localhost:8080/engine-rest/external-task`, {
      params: { processInstanceId }
    })
    if (response.status !== 200) {console.error("Failed to fetch external task:", response);}
     return response.data;
    }
    catch (error) {
        console.error("Error fetching external task:", error);
        throw new Error("Failed to fetch external task");
    }
}


export const startWorkflow = async () => {
      // 2. Start Camunda process
    try{
    const response = await axios.post("http://localhost:8080/engine-rest/process-definition/key/Process_1biqo1h/start", {
    variables: 
      {
        orderId: { value: newOrder._id.toString(), type: "String" },
        userId: { value: newOrder.user.toString(), type: "String" },
        orderItems: {
          value: JSON.stringify(req.body.orderItems),
          type: "Json",
          valueInfo: {
            serializationDataFormat: "application/json"
          }
        }
        // Add more variables as needed
      }
      //http://localhost:8080/engine-rest/process-definition/key/Process_1biqo1h/start
      //This API call starts a new Camunda process instance (with key Process_1biqo1h) and passes the variables (orderId, userId, etc.) into the process.
      // Inside your BPMN process, you likely have a Service Task (or External Task) with a topic (e.g., "place-order").
      // Your Camunda worker (the Node.js worker you wrote) is subscribed to this topic (client.subscribe("place-order", ...)).
      // When the process instance reaches that task, Camunda sends the task and variables to your worker.
      // Your worker receives the variables (like orderId, userId), does its job (e.g., calls another API, updates DB), and then completes the task.
  });
    }
    catch(err)
    {
      console.error("Error starting workflow:", err);
      throw new Error("Failed to start workflow");
    }

}