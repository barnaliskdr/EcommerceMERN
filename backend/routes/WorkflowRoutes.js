import  express from 'express';
import { getAllTasks, completeTask } from '../controller/workflowController.js';


const router = express.Router();

// router.add('/start', async (req, res) => {
//   try {
//     const { processInstanceId } = await req.workflow.startProcess('ecommerce-process');
//     res.status(200).json({ processInstanceId });
//   } catch (error) {
//     console.error('Error starting workflow:', error);
//     res.status(500).json({ error: 'Failed to start workflow' });
//   }
// });

router.get('/tasks',getAllTasks);
router.post('/tasks/:taskId/complete', completeTask);

export default router;