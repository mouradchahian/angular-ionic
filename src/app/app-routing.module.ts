import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';
import { AuthGuard } from './shared/providers/authGuard.service';
import { VehicleComponent } from './pages/admin/vehicle/vehicle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  {
    path: 'user/profile/edit',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'user/reservation',
    component: ReservationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'filter',
    component: FilterPageComponent
  },
  {
    path: 'admin/cars',
    component: VehicleComponent
  },
  {
    path: 'user/notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule)
  }
  ,
  {
    path: 'cars-filter',
    loadChildren: () => import('./pages/cars-filter/cars-filter.module').then(m => m.CarsFilterModule)
  }
  ,
  {
    path: 'cars-detail',
    loadChildren: () => import('./pages/cars-detail/cars-detail.module').then(m => m.CarsDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
