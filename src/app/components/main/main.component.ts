import { Component, OnInit } from '@angular/core';
import { map, timer, delay, forkJoin, switchMap, Observable} from 'rxjs';
import { HttpService } from 'src/app/services/main/http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [HttpService],
})
export class MainComponent implements OnInit {
  value$: Observable<Array<number>> = new Observable<Array<number>>();

  firstValue: number = 0;
  secondValue: number = 0;
  thirdValue: number = 0;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getRandoms();
  }

  getRandoms(): void {
    this.value$ = this.httpService.getRandomNumber()
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
