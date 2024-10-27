import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const client = createClient(supabaseUrl, supabaseKey);

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  const eventType = evt.type
  if (eventType === 'user.created') {
    try {
      const userData = {
        id: evt.data.id,
        full_name: `${evt.data.first_name} ${evt.data.last_name}`.trim(),
        avatar_url: evt.data.image_url || null,
        billing_address: null,
        payment_method: null
      }

      const { data, error } = await client.from('users').insert(userData).select().single();

      if (error) {
        console.error('Error adding user to Supabase:', error)
        return NextResponse.json({ error: 'Error adding user to Supabase' }, { status: 500 })
      }

      return NextResponse.json({
        data: data,
        message: 'Successfully added user to Supabase',
      })
    } catch (error) {
      console.error('Error adding user to Supabase:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}