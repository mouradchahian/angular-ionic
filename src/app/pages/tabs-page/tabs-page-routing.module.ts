import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';
import { AuthGuard } from '../../providers/authGuard.service';


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
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
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
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule)
          }
        ]
      },
      {
        path: 'vehicles',
        children: [
          {
            path: '',
            loadChildren: () => import('../vehiclesPage/vehicles.module').then(m => m.VehicleModule)
          }
        ]
      },
      {
        path: 'vehiclesDetail',
        children: [
          {
            path: '',
            loadChildren: () => import('../vehiclesDetail/vehiclesDetail.module').then(m => m.vehiclesDetailModule)
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

