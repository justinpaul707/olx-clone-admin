import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { childrenType } from '@app/types';
import NotFoundPage from '@app/features/shared/pages/NotFoundPage';
import AuthNavigationProvider from '@app/components/providers/AuthNavigationProvider';

const BrowserRouterProvider: React.FC<childrenType> = ({ children }) => {

    return (
        <BrowserRouter>
            <AuthNavigationProvider>
                <Routes>
                    {children}
                    <Route path='*' element={<NotFoundPage/>} />
                </Routes>
            </AuthNavigationProvider>
        </BrowserRouter>
    )
}

export default BrowserRouterProvider