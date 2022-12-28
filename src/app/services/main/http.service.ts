import { Injectable } from '@angular/core'
import { ajax } from 'rxjs/ajax';

@Injectable()
export class HttpService {
  randomApi: string = 'http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1';

  constructor() {}

  getRandomNumber() {
    return ajax.getJSON(this.randomApi);
  }
}
