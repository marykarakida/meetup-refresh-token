import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PersistLogin from '../shared/components/PersistLogin';
import PublicRoute from '../shared/components/PublicRoute';
import PrivateRoute from '../shared/components/PrivateRoute';
import Layout from '../shared/layouts/Layout';

import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<PersistLogin />}>
                    {/* PUBLIC ROUTES */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute restricted>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute restricted>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />

                    {/* PRIVATE ROUTES */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Route>
        </Routes>
    );
}
