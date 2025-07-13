import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { NotificationMenuComponent } from './features/notification-menu/notification-menu.component';
import { TestComponent } from './features/test/test.component';
import { PlayComponent } from './features/play/play.component';
import { AuthComponent } from './features/auth/auth.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: "edit",
                component: ProfileEditComponent
            },
            {
                path: "view",
                component: ProfileViewComponent
            }
        ]
    },
    {
        path: "auth",
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: "notifications",
        component: NotificationMenuComponent
    },
    {
        path: "play",
        component: PlayComponent
    },

    {
        path: 'test',
        component: TestComponent
    },
    {
        path: "",
        component: HomeComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
