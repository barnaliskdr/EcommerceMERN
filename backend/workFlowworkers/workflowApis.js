import axios from 'axios';

export const fetchAndLockWorkflow = async (tasktopic) => {
    const requestBody = {
        workerId: "status-worker",
        maxTasks: 5,
        usePriority: true,
        topics: [
            {
                // topicName: "update-order-status",
                topicName: tasktopic,
                lockDuration: 10000
            }
        ]
    };

    try{
    const response = await fetch(`http://localhost:8080/engine-rest/external-task/fetchAndLock`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${userId}`
        // },
        body: JSON.stringify(requestBody)
    });
    }
    catch(error) {
        console.error("Error fetching and locking workflow:", error);
        throw new Error("Failed to fetch and lock workflow");   
    }
//   if (!response.ok) {
//     throw new Error(`Failed to lock workflow: ${response.statusText}`);
//   }

  return response.json();
}

export const completeWorkflowTask = async (taskId, variables) => {
    try {
        const response = await fetch(`http://localhost:8080/engine-rest/external-task/${taskId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                variables: variables
            })
        });
        return response.json();
    } catch (error) {
        console.error("Error completing workflow task:", error);
        throw new Error("Failed to complete workflow task");
    }
}


export const completeUserTask = async (taskId) => {
    try {
        const response = await fetch(`http://localhost:8080/engine-rest/external-task/${taskId}/failure`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({     
            variables: {
                signal: { value: "SHIPPED", type: "String" }
            }
            })
        });
        return response.json();
    } catch (error) {
        console.error("Error handling workflow failure:", error);
        throw new Error("Failed to handle workflow failure");
    }
}

export const startWorkflow = async (processDefinitionKey, variables) => {
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