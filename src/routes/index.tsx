import { Navigate, createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/Dashboard/DashboardPage'
import ExpensesPage from '@/pages/Expenses/ExpensesPage'
import GoalsPage from '@/pages/Goals/GoalsPage'
import CommunityPage from '@/pages/Community/CommunityPage'
import ReportsPage from '@/pages/Reports/ReportsPage'
import ProfilePage from '@/pages/Profile/ProfilePage'
import LoginPage from '@/pages/Login/LoginPage'
import SignupPage from '@/pages/Signup/SignupPage'
import NotFoundPage from '@/pages/NotFound/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'expenses', element: <ExpensesPage /> },
      { path: 'goals', element: <GoalsPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '*', element: <NotFoundPage /> },
])
