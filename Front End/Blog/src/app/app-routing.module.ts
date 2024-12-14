import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'Home',
  },
  {
    path: 'Auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Profile',
    loadChildren: () =>
      import('./components/pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'Article',
    loadChildren: () =>
      import('./components/pages/article/article.module').then(
        (m) => m.ArticleModule
      ),
  },
  { path: 'social', loadChildren: () => import('./components/pages/social/social.module').then(m => m.SocialModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
