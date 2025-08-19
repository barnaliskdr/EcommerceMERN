import  express from 'express';
import { getAllTasks } from '../controller/workflowController.js';
import { completeUserTask } from '../workFlowworkers/workflowApis.js';
import { updateStatusToDB } from '../controller/ordercontroller.js';


const router = express.Router();


router.get('/tasks',getAllTasks);
router.post('/tasks/:processInstanceId/completeTask', completeUserTask);
router.post('/tasks/:taskTopic/:processInstanceId', updateStatusToDB);
// Make sure to pass processInstanceId from the request body to completeUserTask
// router.post('/tasks/:processInstanceId/complete', (req, res) => {
//     // const { processInstanceId } = req.body;
//     completeUserTask(processInstanceId);
// });

export default router;