import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app = express();
import { stakeTokenWebhook, unstakeTokens } from "./controllers/StakeUnStake";

app.use(express.json())
app.post('/helius',stakeTokenWebhook);
app.post('/unstake',unstakeTokens)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});