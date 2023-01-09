import { Component } from '@angular/core';
import {
  delay, switchMap, Observable, Subject, startWith, shareReplay,
} from 'rxjs';
import { HttpService } from 'src/app/services/main/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [HttpService],
})
export class MainComponent {
  request$: Subject<void> = new Subject<void>();

  response$: Observable<Array<number>> = this.request$.pipe(
    startWith(null),
    switchMap(() => this.httpService.getRandomNumber()),
    shareReplay(1),
  );

  firstValue$ = this.response$;

  secondValue$ = this.response$.pipe(delay(3000));

  thirdValue$ = this.response$.pipe(delay(6000));

  constructor(private httpService: HttpService) {}

  getRandoms(): void {
    this.request$.next();
  }
}
