const express=require('express');
const authenticateUser=require('../middlewares/auth');

const router=express.Router();

const{createJob,deleteJob,getAllJobs,getJob,editJob}=require('../controllers/jobs')

router.route('/').post(authenticateUser,createJob).get(authenticateUser,getAllJobs)
router.route('/:id').get(authenticateUser,getJob).patch(authenticateUser,editJob).delete(authenticateUser,deleteJob);

module.exports=router;