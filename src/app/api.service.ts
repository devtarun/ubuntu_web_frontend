import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ENDPOINT } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	loggedInUser = null;

	constructor(private http: HttpClient) { }

	getUsers(): Observable<any> {
		let url = ENDPOINT.API + '/users';
		return this.http.get(url, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}).pipe(map(res => res));
	}

	userLogin(data): Observable<any> {

		let url = ENDPOINT.API + '/users/login';

		return this.http.post(url, data, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		}).pipe(map(res => res));
	}

	getFolders(id): Observable<any> {
		let url = ENDPOINT.API + '/users/' + id + '/folders';
		return this.http.get(url, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			})
		}).pipe(map(res => res));
	}

	newFolder(id, data): Observable<any> {

		let url = ENDPOINT.API + '/users/' + id + '/folder/';

		return this.http.post(url, data, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			})
		}).pipe(map(res => res));
	}

	deleteFolder(id, data): Observable<any> {

		let url = ENDPOINT.API + '/users/' + id + '/folder/' + data;

		return this.http.delete(url, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('token')
			})
		}).pipe(map(res => res));
	}
}
