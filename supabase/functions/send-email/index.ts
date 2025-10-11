import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';
import * as SendGrid from 'https://esm.sh/@sendgrid/mail';

// Initialize SendGrid
SendGrid.setApiKey(Deno.env.get('SENDGRID_API_KEY') || '');

serve(async (req) => {
  try {
    const { to, subject, content, replyTo } = await req.json();
    
    // Validate inputs
    if (!to || !subject || !content) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create email message
    const msg = {
      to,
      from: Deno.env.get('SENDGRID_FROM_EMAIL') || 'noreply@yourdomain.com',
      subject,
      html: content,
      ...(replyTo && { replyTo })
    };

    // Send email
    await SendGrid.send(msg);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});