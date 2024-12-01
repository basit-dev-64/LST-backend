import { burnTokens, mintTokens, sendNativeTokens } from "../utils/minting.utils";
import DummyJson from "../heliusResponse.json";
import { MY_PUBLIC_KEY } from "../utils/address";

export const stakeTokenWebhook = async (req: any, res: any) => {
  try {
    // const payload = DummyJson.nativeTransfers[0]
    // const payload = req.body.data.nativeTransfers[0];
    const payload = req.body
    if (payload.toUserAccount != MY_PUBLIC_KEY) {
      console.log("Not your accnt");
      res.json({ message: "Processed" });
      return;
    }
    const fromAddress = payload.fromUserAccount;
    const toAddress = MY_PUBLIC_KEY;
    const amount = payload.amount;

    await mintTokens(fromAddress, amount);

    res.send("Success");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error" });
  }
};

export const unstakeTokens = async (req: any, res: any) => {
    try {
        const { userPublicKey, amount } = req.body;

        if (!userPublicKey || !amount) {
            res.status(400).json({ error: 'Invalid input data' });
            return;
        }
        
        await burnTokens(userPublicKey,amount)
      
        await sendNativeTokens(userPublicKey,amount)

        res.json({ message: `Unstaked ${amount} tokens successfully.` });
    } catch (error) {
        console.error('Error unstaking tokens:', error);
        res.status(500).json({ error: 'Failed to unstake tokens' });
    }
};
