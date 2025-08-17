import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Check if the current user is an admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(data?.role === 'admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [user]);

  const ensureProfile = async (userId: string, userEmail: string) => {
    try {
      const { data: existing, error: selErr } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('user_id', userId)
        .single();

      if (selErr) {
        // No profile yet, create one. Make the demo email an admin.
        await supabase.from('profiles').insert({
          user_id: userId,
          role: userEmail === 'admin@restaurant.com' ? 'admin' : 'customer',
        });
      }
    } catch (e) {
      console.error('ensureProfile error', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await signUp(email, password);
        if (error) {
          toast({
            title: 'Sign up failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          const newUser = data.session?.user ?? data.user ?? null;
          if (newUser) await ensureProfile(newUser.id, email);
          toast({
            title: newUser ? 'Account created' : 'Check your email',
            description: newUser
              ? 'You are signed in and ready to go.'
              : 'We sent you a confirmation link to complete sign up.',
          });
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Authentication failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          const signedUser = data.session?.user ?? data.user ?? null;
          if (signedUser) await ensureProfile(signedUser.id, email);
          toast({
            title: 'Welcome back!',
            description: 'Successfully signed in to admin dashboard.',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (user && isAdmin === null)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    if (user && isAdmin === false) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                <p className="text-muted-foreground mb-4">
                  You don't have admin privileges to access this area.
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>
                Sign in to access the restaurant admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@restaurant.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </form>
                <div className="mt-3 text-sm text-center">
                  <button
                    type="button"
                    className="underline text-primary"
                    onClick={() => setIsSignUp((s) => !s)}
                  >
                    {isSignUp ? 'Have an account? Sign in' : "Don't have an account? Create one"}
                  </button>
                </div>
                <div className="mt-6 text-xs text-muted-foreground text-center">
                  <p>Demo credentials:</p>
                  <p>Email: admin@restaurant.com</p>
                  <p>Password: admin123</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminAuth;