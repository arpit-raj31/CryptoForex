import DemoAccount from '../models/User.DemoAccount.js';
import LiveAccount from '../models/User.LiveAccount.model.js';


// Live Account 

export const createLiveAccount = async (req, res) => {
  const { userId, secretKey, walletPin } = req.body;

  try {
    const existingAccount = await LiveAccount.findOne({ user: userId });
    if (existingAccount) {
      return res.status(400).json({ message: 'Live account already exists for this user' });
    }

    const newLiveAccount = new LiveAccount({
      user: userId,
      secretKey,
      walletPin,
      balance: 0,
    });

    await newLiveAccount.save();
    res.status(201).json({ message: 'Live account created successfully', newLiveAccount });
  } catch (err) {
    res.status(500).json({ message: 'Error creating live account', error: err.message });
  }
};


export const getLiveAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    const account = await LiveAccount.findOne({ user: userId }).populate('user', 'username email');
    if (!account) {
      return res.status(404).json({ message: 'Live account not found' });
    }

    res.status(200).json({ account });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching live account', error: err.message });
  }
};


export const updateBalance = async (req, res) => {
  const { userId } = req.params;
  const { balance } = req.body;

  try {
    const account = await LiveAccount.findOne({ user: userId });
    if (!account) {
      return res.status(404).json({ message: 'Live account not found' });
    }

    account.balance = balance;
    await account.save();

    res.status(200).json({ message: 'Balance updated successfully', account });
  } catch (err) {
    res.status(500).json({ message: 'Error updating balance', error: err.message });
  }
};


export const withdraw = async (req, res) => {
    const { userId } = req.params;
    const { amount, walletPin } = req.body;
  
    try {

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
      }
  
      const liveAccount = await LiveAccount.findOne({ user: userId });
      if (!liveAccount) {
        return res.status(404).json({ message: 'Live account not found' });
      }
  
      if (liveAccount.walletPin !== walletPin) {
        return res.status(401).json({ message: 'Invalid wallet pin' });
      }
  
      if (liveAccount.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      liveAccount.balance -= amount;
  
      await liveAccount.save();
  
      res.status(200).json({ message: 'Withdrawal successful', balance: liveAccount.balance });
    } catch (err) {
      console.error('Error during withdrawal:', err.message);
      res.status(500).json({ message: 'Error processing withdrawal', error: err.message });
    }
  };


  export const deposit = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
  
    try {
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit amount' });
      }
  
      const liveAccount = await LiveAccount.findOne({ user: userId });
      if (!liveAccount) {
        return res.status(404).json({ message: 'Live account not found' });
      }
  
      liveAccount.balance += amount;
  
      await liveAccount.save();
  
      res.status(200).json({ message: 'Deposit successful', balance: liveAccount.balance });
    } catch (err) {
      console.error('Error during deposit:', err.message);
      res.status(500).json({ message: 'Error processing deposit', error: err.message });
    }
  };




// Demo Account 


export const createDemoAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    const existingAccount = await DemoAccount.findOne({ user: userId });
    if (existingAccount) {
      return res.status(400).json({ message: 'Demo account already exists for this user' });
    }

    const newDemoAccount = new DemoAccount({
      user: userId,
      balance: 0,
    });

    await newDemoAccount.save();
    res.status(201).json({ message: 'Demo account created successfully', newDemoAccount });
  } catch (err) {
    res.status(500).json({ message: 'Error creating Demo account', error: err.message });
  }
};


export const getDemoAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    const account = await DemoAccount.findOne({ user: userId }).populate('user', 'username email');
    if (!account) {
      return res.status(404).json({ message: 'Live account not found' });
    }

    res.status(200).json({ account });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching live account', error: err.message });
  }
};


export const updateDemoBalance = async (req, res) => {
  const { userId } = req.params;
  const { balance } = req.body;

  try {
    const account = await DemoAccount.findOne({ user: userId });
    if (!account) {
      return res.status(404).json({ message: 'Live account not found' });
    }

    account.balance = balance;
    await account.save();

    res.status(200).json({ message: 'Balance updated successfully', account });
  } catch (err) {
    res.status(500).json({ message: 'Error updating balance', error: err.message });
  }
};


export const demowithdraw = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
  
    try {

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
      }
  
      const demoAccount = await DemoAccount.findOne({ user: userId });
      if (!demoAccount) {
        return res.status(404).json({ message: 'Live account not found' });
      }
  
  
      if (demoAccount.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      demoAccount.balance -= amount;
  
      await demoAccount.save();
  
      res.status(200).json({ message: 'Withdrawal successful', balance: demoAccount.balance });
    } catch (err) {
      console.error('Error during withdrawal:', err.message);
      res.status(500).json({ message: 'Error processing withdrawal', error: err.message });
    }
  };


  export const demodeposit = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
  
    try {
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit amount' });
      }
  
      const demoAccount = await DemoAccount.findOne({ user: userId });
      if (!demoAccount) {
        return res.status(404).json({ message: 'Demo account not found' });
      }
  
      demoAccount.balance += amount;
  
      await demoAccount.save();
  
      res.status(200).json({ message: 'Deposit successful', balance: demoAccount.balance });
    } catch (err) {
      console.error('Error during deposit:', err.message);
      res.status(500).json({ message: 'Error processing deposit', error: err.message });
    }
  };