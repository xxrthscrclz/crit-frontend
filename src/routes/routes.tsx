import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import RecommendPage from '@/pages/recommend';
import AnalysisPage from '@/pages/analysis';
import TrendPage from '@/pages/trend';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import PrivateRoute from '@/routes/privateRoute';
import MemberRoute from '@/routes/memberRoute';
import ScrollToTop from '@/routes/ScrollToTop';

const Router = () => {
  return (
    <Suspense>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth-callback" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route index element={<MainPage />} />
            <Route path="recommend" element={<RecommendPage />} />
            <Route path="trend" element={<TrendPage />} />
            <Route path="analysis" element={<MemberRoute />}>
              <Route index element={<AnalysisPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
