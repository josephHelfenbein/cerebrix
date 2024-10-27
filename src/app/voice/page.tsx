import Client from '@/src/components/client';
import {fetchAccessToken} from 'hume';

export default async function Voice(){
    const HUME_API_KEY = String(process.env.HUME_API_KEY);
    const HUME_SECRET_KEY = String(process.env.HUME_SECRET_KEY);
    const accessToken = await fetchAccessToken({
        apiKey: HUME_API_KEY,
        secretKey: HUME_SECRET_KEY,
      });
      if(!accessToken) throw Error();
    return (
        <div className='flex justify-center h-screen'>
       
            <div className='flex flex-col h-screen justify-between p-16'>
                <h3 className='text-center text-2xl'>Personal Friend</h3>
                <Client accessToken={accessToken}/>
            </div>
            
        </div>
        
    )
}
