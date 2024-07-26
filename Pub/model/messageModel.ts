import mongoose, {Schema, Document} from 'mongoose';

interface IMessage extends Document {
    topic: string;
    content: string;
}

const MessageSchema: Schema = new Schema({
    topic: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Message = mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
export { IMessage };
