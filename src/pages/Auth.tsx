import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check hardcoded credentials
    if (username !== 'NGadmin' || password !== 'NG123') {
      toast({
        title: 'Invalid credentials',
        description: 'Username or password is incorrect.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // First, try to create the admin user if it doesn't exist
      const createResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!createResponse.ok) {
        console.log('Admin user might already exist, trying to login...');
      }

      // Sign in with the admin account
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@ngfamilyshield.com',
        password: 'NGadmin123!@#',
      });
      
      if (error) {
        // If user doesn't exist, show helpful message
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Setup Required',
            description: 'Please contact support to set up your admin account.',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
        return;
      }
      
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="mt-1.5"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;