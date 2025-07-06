import axios from "axios";
import { Client, logger } from "camunda-external-task-client-js";


const client = new Client({
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger
});

client.subscribe("place-order", async function ({ task, taskService }) {
  const orderId = task.variables.get("orderId");
  const userId = task.variables.get("userId");

  console.log(`Processing order ${orderId} for user ${userId}`);

  try {
    await axios.post("http://localhost:5000/api/orders/placeorder", {
      orderId,
      userId
    });

  const executionId = task.executionId; // 👈 Execution ID
  const taskId = task.id;               // 👈 External task ID

  console.log("Execution ID:", executionId);
  console.log("External Task ID:", taskId);

  // Optionally set a new variable:
  await taskService.setVariables(task, {
    executionId: executionId,
    externalTaskId: taskId
  });

  console.log("task Id:", executionId);
  console.log("task Id:", taskId);

    // Complete the task after successful API call

  await taskService.complete(task);

    await taskService.complete(task);
    console.log("Order placed successfully.");
  } catch (err) {
    console.error("Order placement failed:", err.message);

    await taskService.handleFailure(task, {
      errorMessage: "Place Order API Failed",
      errorDetails: err.message,
      retries: 2,
      retryTimeout: 10000
    });
  }
});


client.subscribe("update-order-status", async ({ task, taskService }) => {
  const orderId = task.variables.get("orderId");

  try {
    const response = await axios.post("http://localhost:5000/api/orders/update-status", {
      orderId,
      status: "shipped"
    });

    await taskService.complete(task);
    console.log("Order status updated.");
  } catch (err) {
    console.error("Failed to update status:", err.message);
    await taskService.handleFailure(task, {
      errorMessage: "Failed to call update status API",
      errorDetails: err.message,
      retries: 2,
      retryTimeout: 10000
    });
  }
});

