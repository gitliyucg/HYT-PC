import { Component } from '@angular/core';
import { environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    sessionStorage['http'] = environment.ApiUrl;
    window.onload = function () {
      if (document.body.clientWidth <= 768) {
        localStorage.clear();
        window.location.href = environment.wap;
        return false;
      }
    };
  }
}
