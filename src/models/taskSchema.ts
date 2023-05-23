import mongoose, { Schema, Document } from 'mongoose';

enum TaskStatus {
    ToDo = 'to_do',
    InProgress = 'in_progress',
    Done = 'done',
}

enum TaskPriority {
    Low = 'low',
    Middle = 'middle',
    High = 'high',
}

interface ITask extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    expired_at: Date;
    owner: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: TaskStatus.ToDo,
        enum: Object.values(TaskStatus),
    },
    priority: {
        type: String,
        required: true,
        enum: Object.values(TaskPriority),
    },
    expired_at: {
        type: Date,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;