import Client from '@/components/client';
import { fetchHumeToken } from './fetchHumeToken';

export const dynamic = 'force-dynamic';

export default async function Voice() {
    try {
        const accessToken = await fetchHumeToken();

        return (
            <div className='flex-col justify-center h-screen'>
                <div className="flex justify-left w-full p-4">
                    <a href="/">
                    <svg viewBox="0 -960 960 960" width="24px" fill="#c8cacd">
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                    </svg>
                    </a>
                </div>
                <div className="flex justify-center">
                <div className='flex flex-col h-screen justify-between p-16'>
                    <h3 className='text-center text-2xl'>Personal Friend</h3>
                    <Client accessToken={accessToken} />
                </div>
                </div>
            </div>
        );
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
    }
}