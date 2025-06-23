import express from "express";
import getAgents from './controllers/getAgents';
import initializeThreads from './controllers/initializeThreads';
import loadThread from './controllers/loadThread';
import createThread from './controllers/createThread';

const router = express.Router();

router.post("/get-agents", getAgents);
router.post("/initialize-threads", initializeThreads);
router.post("/load-thread", loadThread);
router.post("/create-thread", createThread);

export default router;