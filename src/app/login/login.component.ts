import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	bg_src: String = "../assets/ubuntu-aurora-1920-by-1200.png";

	today = new Date();
	todayDay = this.today.toLocaleString('en-us', { weekday: 'long' });
	time = this.today.getHours() + ":" + this.today.getMinutes();

	desktopUsers: Array<any> = null;
	selectedUser: any = null;

	constructor(private _API: ApiService, private router: Router) {
		this._API.getUsers().subscribe(res => {
			this.desktopUsers = res.data
		});
	}

	ngOnInit() {
	}

	loginUser = (id, name) => {
		this.selectedUser = {
			id: id,
			name: name
		};
	}

	logIn(e) {
		if (e.keyCode == 13) {
			let data = {
				"user_name": this.selectedUser.name,
				"password": e.target.value
			};

			/* 
			{
				"msg": "Authenticated",
				"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRhcnVuIiwidXNlcklkIjoiNWU0NzI0Y2QzNTNiZDBkMmEzY2U4NDRlIiwiaWF0IjoxNTgxNzI0MzM4LCJleHAiOjE2MTMyODE5Mzh9.VdRkW_SDnIYlJmtQWVJ44ZnELJ6doJYj5nRE0VtxTY0"
			}
			 */
			
			this._API.userLogin(data).subscribe(res => {
				if(res.msg == 'Auth Failed') return;
				else {
					localStorage.setItem('userId', this.selectedUser.id);
					localStorage.setItem('token', res.token);
					this.router.navigateByUrl('/desktop');
				}
			});
		} else {
			return false;
		}
	}

}
