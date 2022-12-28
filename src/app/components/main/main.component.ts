import { Component, OnInit } from '@angular/core';
import { map, timer, delay, forkJoin, Subject, switchMap } from 'rxjs';
import { HttpService } from 'src/app/services/main/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [HttpService],
})
export class MainComponent implements OnInit {
  clickStream$ = new Subject();

  firstValue: any;
  secondValue: any;
  thirdValue: any;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.clickStream$
    .asObservable()
    .pipe(
      switchMap(() => this.getRandomNumber()),
    ).subscribe();

    this.clickStream$.next('');
  }

  getRandoms($event: any): void {
    this.clickStream$.next($event);
  }

  private getRandomNumber() {
    return this.httpService.getRandomNumber()
      .pipe(
        switchMap(value => forkJoin(
          this.setFirstValue(value),
          this.setSecondValue(value),
          this.setThirdValue(value)
        )),
      );
  }

  private setFirstValue(value: any) {
    return timer(0).pipe(
      delay(0),
      map(() => this.firstValue = value)
    )
  }

  private setSecondValue(value: any) {
    return timer(0).pipe(
      delay(3000),
      map(() => this.secondValue = value)
    )
  }

  private setThirdValue(value: any) {
    return timer(0).pipe(
      delay(6000),
      map(() => this.thirdValue = value)
    )
  }
}
