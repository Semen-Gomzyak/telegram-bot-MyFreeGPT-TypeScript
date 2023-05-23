import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    first_name: string;
    language_code: string;
    id_chat: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    language_code: {
        type: String,
        required: true,
    },
    id_chat: {
        type: Number,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;