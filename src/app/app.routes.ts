import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AssetListComponent } from './pages/asset-list/asset-list.component';
import { AllAssetsComponent } from './pages/all-assets/all-assets.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'asset-list', component: AssetListComponent},
    {path: 'all-assets', component: AllAssetsComponent},
];
