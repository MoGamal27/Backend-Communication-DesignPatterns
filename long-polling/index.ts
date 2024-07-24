import express, { Request, Response} from 'express';
import Job, { IJob } from './jobModel';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// MongoDB Connection
const url: string = process.env.MONGO_URL || '';
mongoose.connect(url).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log(err);
});

app.post('/submit-job', async (req: Request , res: Response) =>{
   const jobId = `job:${Date.now()}`;
   const job = new Job({
       jobId,
       progress: 0
   })
   await job.save();
   updateJob(jobId, 0);
   res.end("\n\n" + jobId + "\n\n");
})

app.get('/getStatus', async (req: Request , res: Response) =>{
    console.log(req.query.jobId);
    // Long polling, don't respond until done
    while (await checkJobComplete(req.query.jobId as string) === false);
    const job = await Job.findOne({ jobId: req.query.jobId as string });
    res.end("\n\nJobStatus: Complete " + job?.progress + "%\n\n");
})

app.listen(3000, ()=>{
    console.log('Lisnting on port 3000')
}) 

async function checkJobComplete(jobId: string): Promise<boolean>{
    const job = await Job.findOne({ jobId });
    if(!job) return false;
    if(job.progress == 100) return true;
    return false;
}

async function updateJob(jobId: string, progress: number): Promise<void>{
   await Job.findOneAndUpdate({ jobId }, { progress });
   console.log(`updated ${jobId} to ${progress}`);
   if(progress == 100) return;
   setTimeout(() => updateJob(jobId, progress + 10), 1000);
}
