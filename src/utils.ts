import * as dotenv from 'dotenv';

dotenv.config();

const loginData: { token: string } = {
    token: `token ${process.env.GITHUB_TOKEN}`
};

export default loginData;
