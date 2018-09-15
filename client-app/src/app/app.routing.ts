import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';


const appRoutes: Routes = [
  // Site routes goes here
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'results',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: ResultsComponent,  pathMatch: 'full' }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);


