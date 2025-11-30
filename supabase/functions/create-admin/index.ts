import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Create admin user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@ngfamilyshield.com',
      password: 'NGadmin123!@#',
      email_confirm: true,
    });

    if (userError) {
      // Check if user already exists
      if (userError.message.includes('already registered')) {
        // Get existing user
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = users.find(u => u.email === 'admin@ngfamilyshield.com');
        
        if (existingUser) {
          // Add admin role
          const { error: roleError } = await supabaseAdmin
            .from('admin_roles')
            .upsert({
              user_id: existingUser.id,
              role: 'admin',
            });

          if (roleError) throw roleError;

          return new Response(
            JSON.stringify({ 
              message: 'Admin user already exists, role updated',
              userId: existingUser.id 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
      throw userError;
    }

    // Add admin role to new user
    const { error: roleError } = await supabaseAdmin
      .from('admin_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin',
      });

    if (roleError) throw roleError;

    return new Response(
      JSON.stringify({ 
        message: 'Admin user created successfully',
        userId: userData.user.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});