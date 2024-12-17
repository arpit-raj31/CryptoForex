import mongoose from 'mongoose';

const liveAccountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    secretKey: { type: String, required: true, unique: true },
    walletPin: { type: String, required: true, minlength: 4, maxlength: 4 },
  },
  {
    timestamps: true,
  }
);

const LiveAccount = mongoose.model('LiveAccount', liveAccountSchema);
export default LiveAccount;
