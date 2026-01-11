import React, { useState } from 'react';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Smartphone, Key, Monitor } from 'lucide-react';
import { toast } from 'react-toastify';

export const SecurityPage: React.FC = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState(30);

    const handleSave = () => {
        toast.success('Security settings updated successfully');
    };

    return (
        <div className="space-y-6 p-6 bg-background-primary min-h-screen">
             <div>
                <h1 className="text-3xl font-bold text-text-primary">Login Security</h1>
                <p className="mt-1 text-text-secondary">Manage 2FA, sessions, and password policies</p>
             </div>

             <div className="grid gap-6">
                 {/* 2FA Section */}
                 <div className="bg-surface-base border border-border-primary rounded-lg p-6 shadow-sm">
                     <div className="flex items-start justify-between">
                         <div className="flex gap-4">
                             <div className="p-2 bg-blue-50 rounded-lg h-fit">
                                 <Smartphone className="h-6 w-6 text-blue-600" />
                             </div>
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication (2FA)</h3>
                                 <p className="text-gray-500 mt-1 max-w-xl">
                                     Add an extra layer of security to your account by requiring a code from your authenticator app in addition to your password.
                                 </p>
                             </div>
                         </div>
                         <div className="flex items-center">
                             <label className="relative inline-flex items-center cursor-pointer">
                                 <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={twoFactorEnabled}
                                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                                 />
                                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                             </label>
                         </div>
                     </div>
                 </div>

                 {/* Session Management */}
                 <div className="bg-surface-base border border-border-primary rounded-lg p-6 shadow-sm">
                     <div className="flex gap-4 mb-6">
                         <div className="p-2 bg-green-50 rounded-lg h-fit">
                             <Monitor className="h-6 w-6 text-green-600" />
                         </div>
                         <div>
                             <h3 className="text-lg font-semibold text-gray-900">Session Management</h3>
                             <p className="text-gray-500 mt-1">
                                 Control how long admin sessions remain active before requiring re-login.
                             </p>
                         </div>
                     </div>
                     
                     <div className="max-w-xs">
                         <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                         <div className="flex gap-2">
                             <Input 
                                type="number" 
                                value={sessionTimeout}
                                onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                             />
                             <Button onClick={handleSave} className="bg-brand-primary text-white">Update</Button>
                         </div>
                     </div>
                 </div>

                 {/* Password Policy */}
                 <div className="bg-surface-base border border-border-primary rounded-lg p-6 shadow-sm">
                     <div className="flex gap-4 mb-6">
                         <div className="p-2 bg-purple-50 rounded-lg h-fit">
                             <Key className="h-6 w-6 text-purple-600" />
                         </div>
                         <div>
                             <h3 className="text-lg font-semibold text-gray-900">Password Policy</h3>
                             <p className="text-gray-500 mt-1">
                                 Enforce password complexity requirements for all admin users.
                             </p>
                         </div>
                     </div>

                     <div className="space-y-4 max-w-lg">
                         <div className="flex items-center justify-between">
                             <span className="text-sm font-medium text-gray-700">Minimum Length</span>
                             <span className="text-sm text-gray-500">8 characters</span>
                         </div>
                         <div className="flex items-center justify-between">
                             <span className="text-sm font-medium text-gray-700">Require Special Character</span>
                             <span className="text-sm text-green-600 font-medium">Enabled</span>
                         </div>
                         <div className="flex items-center justify-between">
                             <span className="text-sm font-medium text-gray-700">Require Number</span>
                             <span className="text-sm text-green-600 font-medium">Enabled</span>
                         </div>
                         <div className="pt-4">
                             <Button variant="outline" className="w-full">
                                 Change Policy Settings
                             </Button>
                         </div>
                     </div>
                 </div>

             </div>
        </div>
    );
};
