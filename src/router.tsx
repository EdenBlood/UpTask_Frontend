import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView"
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import RequestCodeNewPasswordView from "./views/auth/RequestCodeNewPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: <DashboardView />
      },
      {
        path: "/projects/create",
        element: <CreateProjectView />
      },
      {
        path: "/project/:projectId/edit",
        element: <EditProjectView />
      },
      {
        path: "/project/:projectId",
        element: <ProjectDetailsView />
      },
      {
        path: "/project/:projectId/team",
        element: <ProjectTeamView />
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: '/profile',
            element: <ProfileView />
          },
          {
            path: '/profile/change-password',
            element: <ChangePasswordView />
          }
        ]
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginView />
      },
      {
        path: "/auth/register",
        element: <RegisterView />
      },
      {
        path: "/auth/confirm-account",
        element: <ConfirmAccountView />
      },
      {
        path: "/auth/request-code",
        element: <RequestNewCodeView />
      },
      {
        path: "/auth/request-change-password-code",
        element: <RequestCodeNewPasswordView />
      },
      {
        path: "/auth/new-password",
        element: <NewPasswordView />
      }
    ]
  },
  {
    path: "/404",
    element: <NotFound />
  }
])

