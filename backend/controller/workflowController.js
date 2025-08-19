import { fetchAndLockWorkflow,completeWorkflowTask, completeUserTask } from "../workFlowworkers/workflowApis.js";
import axios from "axios";


export const getAllTasks = async (req, res) => {
   try {
    const response = await axios.get("http://localhost:8080/engine-rest/task", {
      params: {
        candidateUser: "admin",
        processDefinitionKey: "Process_1biqo1h"
      }
    });

    // Each task has: id, name, assignee, variables, etc.
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// export const completeTask = async (req, res) => {
//     const { taskId } = req.params;
//     const { variables } = req.body;

//     // try {
//     //     await req.workflow.completeTask(taskId, variables);
//     //     res.status(200).json({ message: 'Task completed successfully' });
//     // } catch (error) {
//     //     console.error('Error completing task:', error);
//     //     res.status(500).json({ error: 'Failed to complete task' });
//     // }

//     try {
//     await axios.post(`http://localhost:8080/engine-rest/task/${req.params.taskId}/complete`, {
//       variables: {
//         approvedBy: { value: "admin", type: "String" }
//       }
//     });
//     res.json({ message: "Task completed" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

export const completeServiceTask = async (tasktopic, taskId) => {
  //fetch external taskId  of the process instance
  //fetchandLocak
  //hit complete api
  let variables;
  if(tasktopic == "place-order")
  {
    variables = {
        "workerId": "place-order-worker"
    }
  }
  if(tasktopic == "update-order-status")
  {
    variables = {
          "workerId": "status-worker"
        }
  }
  try{
    console.log("Fetching and locking workflow task for topic:", tasktopic);
    const taskIdToComplete = await fetchAndLockWorkflow(tasktopic);
    console.log("Task ID to complete:", taskIdToComplete);
    const completeTaskResponse = await completeWorkflowTask(taskIdToComplete, variables);
    console.log("Task completed successfully:", completeTaskResponse);
    // const response = await axios.post(`http://localhost:8080/engine-rest/external-task/${taskIdToComplete}/complete`, {
    //   workerId: "orderWorker",
    //   variables: {
    //     orderId: { value: taskId, type: "String" },
    //     userId: { value: taskId, type: "String" }
    //   }
    // });
    return taskIdToComplete;
  }
  catch (error) {
    console.error("Error completing service task:", error);
    throw new Error("Failed to complete service task: " + error.message);
  }
}


export const completeHumanTask = async (taskId) => {
  try{
    const response = await completeUserTask(taskId);
    console.log("Human task completed successfully:", response);
    return response;
  }
  catch(error) {
    console.error("Error completing human task:", error);
    throw new Error("Failed to complete human task: " + error.message);
  }
}
