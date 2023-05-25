import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';
import { AuthGuard } from '../../shared/providers/authGuard.service';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        children: [
          {
            path: '',
            component: SchedulePage,
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
          }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'cars-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../cars-list/cars-list.module').then(m => m.CarsListModule)
          }
        ]
      },
      {
        path: 'cars-detail',
        children: [
          {
            path: '',
            loadChildren: () => import('../cars-detail/cars-detail.module').then(m => m.CarsDetailModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

