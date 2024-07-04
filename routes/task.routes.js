import express from 'express'
import { newTask , allTasks, updateTask, deleteTask} from '../controllers/task.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.route("/new").post(isAuthenticated ,newTask)
router.route("/my").post(isAuthenticated, allTasks)
router.route("/:id")
.put(isAuthenticated, updateTask)
.delete(isAuthenticated, deleteTask)

export default router