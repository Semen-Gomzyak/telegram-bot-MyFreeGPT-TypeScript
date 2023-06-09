"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["ToDo"] = "to_do";
    TaskStatus["InProgress"] = "in_progress";
    TaskStatus["Done"] = "done";
})(TaskStatus || (TaskStatus = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["Low"] = "low";
    TaskPriority["Middle"] = "middle";
    TaskPriority["High"] = "high";
})(TaskPriority || (TaskPriority = {}));
const taskSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
//# sourceMappingURL=taskSchema.js.map