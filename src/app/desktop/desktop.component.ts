import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-desktop',
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

	bg_src: String = "../assets/ubuntu-aurora-1920-by-1200.png";

	today = new Date();
	todayDay = this.today.toLocaleString('en-us', { weekday: 'long' });
	time = this.today.getHours() + ":" + this.today.getMinutes();

	contextMenuItems: Array<Object> = [
		{
			name: "New Folder",
			shortcut: "Shift+Ctrl+N",
			action: "new_folder",
			active: true
		},
		{
			name: "Paste",
			shortcut: "Ctrl+V",
			action: "paste",
			active: false
		},
		{
			name: "Select All",
			shortcut: "Ctrl+A",
			action: "select_all",
			active: false
		},
		{
			name: "Properties",
			shortcut: "Ctrl+I",
			action: "properties",
			active: false
		},
		{
			name: "Keep Aligned",
			shortcut: null,
			action: "keep_aligned",
			active: true
		},
		{
			name: "Organise Desktop by Name",
			shortcut: null,
			action: "organise",
			active: true
		},
		{
			name: "Change Background",
			shortcut: null,
			action: "background",
			active: true
		},
		{
			name: "Open Terminal",
			shortcut: null,
			action: "terminal",
			active: true
		}
	];
	contextMenuOpen: Boolean = false;

	desktopFolders: Array<any> = [];
	loggedInUser: string;

	selectedFolder: any = null;

	constructor(private _API: ApiService) {
		this.loggedInUser = localStorage.getItem('userId');
	}

	ngOnInit() {

		this._API.getFolders(this.loggedInUser).subscribe(res => {

			this.desktopFolders = res.data.folders.children;
			console.log(this.desktopFolders);
		});

		document.getElementById('main_content').addEventListener('click', e => {
			if (this.contextMenuOpen) this.contextMenuOpen = false
		});
		document.getElementById('main_content').addEventListener('contextmenu', e => {
			e.preventDefault();
			let contextMenu = (<HTMLDivElement>document.querySelector('.context-menu'));
			// if (e.x >= screen.width - contextMenu.offsetWidth) {
			// 	contextMenu.style.right = e.y.toString() + "px";
			// }
			// if (e.y >= screen.height - contextMenu.offsetHeight) {
			// 	contextMenu.style.bottom = e.x.toString() + "px";
			// }
			contextMenu.style.top = e.x.toString() + "px";
			contextMenu.style.left = e.y.toString() + "px";
			this.contextMenuOpen = true;
		});

	}

	contextAction = action => {
		if (action == 'new_folder') {
			let folderName = prompt('Folder Name?').trim();
			if (folderName == null || folderName == "") {
				return;
			} else {
				this._API.newFolder(this.loggedInUser, {
					"folder_name": folderName
				}).subscribe(res => {
					if (res.msg == "Success")
						this.desktopFolders = res.data.folders.children;
				});

			}
		}

		if (action == 'organise') this.desktopFolders.sort();

		if (action == 'background') {
			console.log('https://picsum.photos/1920/1080');

			fetch(`https://source.unsplash.com/1920x1080`).then((response) => {
				(<HTMLImageElement>document.querySelector('.bg_img')).src = response.url;
			})
		}

		if (action == 'terminal') { }
	}

	onRightClick = e => {
		document.querySelectorAll('.delete').forEach(el => {
			el.classList.remove('active');
		});

		(<HTMLSpanElement>document.getElementById(e)).classList.add('active');
	}

	deleteFolder = (folderName) => {
		console.log(folderName);
		let confirmAction = confirm('Are You Sure?');
		if (confirmAction) {
			this._API.deleteFolder(this.loggedInUser, folderName).subscribe(res => {
				if (res.msg == "Success") {
					this.desktopFolders = res.data.folders.children;
					console.log(this.desktopFolders);
				}
			});
		} else {
			return;
		}
	}

	// openFolder = (folderName, isHome, parentName = null) => {
	// 	if (isHome) {
	// 		this.selectedFolder = this.desktopFolders.filter(el => {
	// 			return el.name == folderName
	// 		});
	// 	} else {
	// 		console.log(123);
	// 		this.desktopFolders.filter(el => {
	// 			if (el.name == parentName) {
	// 				this.selectedFolder = el.children.filter(el => el.name == folderName);
	// 				console.log(this.selectedFolder);
	// 			}
	// 		});
	// 	}
	// }
	// closeFolder = () => this.selectedFolder = null

}
