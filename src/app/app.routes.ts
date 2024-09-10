import { Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { adminAuthGuard } from './guards/adminAuth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path : "admin",
        component : AdminComponent, 
        canActivate : [adminAuthGuard],
        data : { role : "admin"}
    },
    {
        path : "",
        component : AllTasksComponent,
        canActivate : [authGuard],
    },
    {
        path : "add-task",
        component : AddTaskComponent,
        canActivate : [authGuard],
    },
    {
        path : "add-task/:id",
        component : AddTaskComponent,
        canActivate : [authGuard],
    },
    {
        path : "task/:id",
        component : TaskPageComponent,
    },
    {
        path : "login",
        component : LoginComponent,
    },
    {
        path : "register",
        component : RegisterComponent
    },
    {
        path : "**",
        component: NotFoundComponent
    }
];
