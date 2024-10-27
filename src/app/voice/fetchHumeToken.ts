'use server'

import { fetchAccessToken } from 'hume';

export async function fetchHumeToken() {
    const HUME_API_KEY = process.env.HUME_API_KEY;
    const HUME_SECRET_KEY = process.env.HUME_SECRET_KEY;

    if (!HUME_API_KEY || !HUME_SECRET_KEY) {
        throw new Error('Hume API configuration is incomplete');
    }

    try {
        const accessToken = await fetchAccessToken({
            apiKey: HUME_API_KEY,
            secretKey: HUME_SECRET_KEY,
        });

        if (!accessToken) {
            throw new Error('Failed to fetch access token');
        }

        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
}