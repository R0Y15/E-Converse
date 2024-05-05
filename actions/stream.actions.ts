"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('User not found');
    if (!apiKey) throw new Error('Stream API key is required');
    if (!secretKey) throw new Error('Stream secret key is required');

    // create StreamClient, Expire time and Issued time
    const client = new StreamClient(apiKey, secretKey)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.round(Date.now() / 1000) - 60;

    // generate Token
    const Token = client.createToken(user?.id, exp, issued);

    return Token;
}