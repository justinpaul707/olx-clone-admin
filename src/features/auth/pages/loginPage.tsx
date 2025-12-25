import React from 'react';
import LoginForm from '../components/login/LoginForm';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@app/components/ui/card';
import { Check } from 'lucide-react';


const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-brand-primary flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <Card className="w-full rounded-2xl overflow-hidden shadow-2xl border-0 bg-surface">
          <div className="flex flex-col md:flex-row min-h-[600px]">
            {/* Left Side - Welcome Section */}
            <div className="flex-1 bg-brand-primary text-inverse p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Decorative background circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                {/* Shopping Illustration */}
                <div className="mb-8 flex justify-center items-center">
                  <div className="w-56 h-44 md:w-64 md:h-48 bg-white/10 rounded-2xl flex items-center justify-center relative backdrop-blur-sm">
                    <span className="absolute left-[30%] top-[30%] text-6xl md:text-7xl">�</span>
                    <span className="absolute right-[20%] bottom-[20%] text-4xl md:text-5xl">🛍️</span>
                    <div className="absolute left-[10%] top-[20%] w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-base shadow-lg">
                      💰
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
                  Welcome Back!
                </h1>
                <p className="text-base md:text-lg mb-8 opacity-90 max-w-md mx-auto">
                  Sign in to your OLX Clone account and continue your journey
                </p>
                
                {/* Features List */}
                <div className="text-left max-w-sm mx-auto space-y-3">
                  {[
                    'Buy and sell items easily',
                    'Connect with local sellers',
                    'Secure transactions',
                    '24/7 customer support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center opacity-90">
                      <div className="mr-3 flex-shrink-0">
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 bg-surface">
              <CardContent className="p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
                    Sign In
                  </h2>
                  <p className="text-sm md:text-base text-secondary">
                    Enter your credentials to access your account
                  </p>
                </div>

                <div className="max-w-md mx-auto w-full">
                  <LoginForm />
                </div>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-primary" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface px-2 text-secondary">OR</span>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-sm md:text-base text-secondary">
                    New to OLX Clone?
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap items-center text-sm md:text-base">
                    <Link 
                      to="/auth/signup" 
                      className="font-semibold hover:underline transition-colors text-brand-primary"
                    >
                      Create Account
                    </Link>
                    <span className="text-secondary">•</span>
                    <Link 
                      to="/help" 
                      className="text-secondary hover:text-primary hover:underline transition-colors">
                      Need Help?
                    </Link>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="bg-primary -mx-8 md:-mx-12 lg:-mx-16 mt-8 p-4 md:p-6 text-center border-t border-primary">
                  <p className="text-xs md:text-sm text-secondary">
                    By signing in, you agree to our{' '}
                    <Link 
                      to="/terms" 
                      className="hover:underline text-brand-primary"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link 
                      to="/privacy" 
                      className="hover:underline text-brand-primary"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
