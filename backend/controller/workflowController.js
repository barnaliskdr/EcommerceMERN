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


export const completeTask = async (req, res) => {
    const { taskId } = req.params;
    const { variables } = req.body;

    // try {
    //     await req.workflow.completeTask(taskId, variables);
    //     res.status(200).json({ message: 'Task completed successfully' });
    // } catch (error) {
    //     console.error('Error completing task:', error);
    //     res.status(500).json({ error: 'Failed to complete task' });
    // }

    try {
    await axios.post(`http://localhost:8080/engine-rest/task/${req.params.taskId}/complete`, {
      variables: {
        approvedBy: { value: "admin", type: "String" }
      }
    });
    res.json({ message: "Task completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}