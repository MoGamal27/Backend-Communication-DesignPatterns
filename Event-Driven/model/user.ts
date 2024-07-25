import {Schema, model, Document} from 'mongoose';

interface IUser extends Document {
    name: string
    email: string
}

const userSchema = new Schema<IUser>({
    name: String,
    email: String
})

const User = model<IUser>('User', userSchema);

export default User;