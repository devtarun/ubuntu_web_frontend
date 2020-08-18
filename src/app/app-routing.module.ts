import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: LoginComponent,
			},
			{
				path: 'login',
				component: LoginComponent,
			}
		]
	},
	{
		path: 'desktop',
		component: DesktopComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
