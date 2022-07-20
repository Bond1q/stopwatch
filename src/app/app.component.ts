import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	minutes: string = '00';
	seconds: string = '00';
	allTime: number = 0;
	isActive: boolean = false;
	timer: Observable<number> = interval(1000);
	subcription: Subscription = new Subscription();


	setTime(newTime: number): void {
		this.allTime = newTime;
		this.seconds = String(this.allTime % 60);
		this.minutes = String(Math.floor(this.allTime / 60));
		this.seconds.length == 1 ? this.seconds = '0' + this.seconds : '';
		this.minutes.length == 1 ? this.minutes = '0' + this.minutes : '';
	}

	startStop(): void {
		this.isActive = !this.isActive;
		if (this.isActive) {
			this.subcription.unsubscribe();
			this.subcription = interval(1000).subscribe((s: any) => {
				this.setTime(++this.allTime);
			})
		} else {
			this.subcription.unsubscribe();
			this.setTime(0);
		}


	}

	reset(): void {
		this.setTime(0);
		this.isActive = false;
		this.startStop();
	}

	wait(): void {
		this.isActive = false;
		this.subcription.unsubscribe();
	}
}
