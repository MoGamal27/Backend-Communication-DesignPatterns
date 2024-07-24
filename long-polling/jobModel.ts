import mongoose, {Document, Schema} from 'mongoose'

interface IJob extends Document {
 jobId: string,
 progress: number
}

const jobSchema : Schema = new Schema({
    jobId: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    }
})

const Job = mongoose.model<IJob>('Job', jobSchema);
export default Job;
export { IJob };
