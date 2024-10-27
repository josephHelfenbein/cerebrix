import Client from '@/components/client';
import { fetchHumeToken } from './fetchHumeToken';

export const dynamic = 'force-dynamic';

export default async function Voice() {
    try {
        const accessToken = await fetchHumeToken();

        return (
            <div className='flex justify-center h-screen'>
                <div className='flex flex-col h-screen justify-between p-16'>
                    <h3 className='text-center text-2xl'>Personal Friend</h3>
                    <Client accessToken={accessToken} />
                </div>
            </div>
        );
    } catch (error) {
        return <div>Error: {error instanceof Error ? error.message : 'An unknown error occurred'}</div>;
    }
}