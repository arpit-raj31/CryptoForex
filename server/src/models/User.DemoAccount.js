import mongoose from 'mongoose';

const demoAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 10000 },

}, { timestamps: true });

const DemoAccount = mongoose.model('DemoAccount', demoAccountSchema);
export default DemoAccount;
