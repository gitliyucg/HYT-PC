import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
  userid = localStorage['un'];
  name = localStorage['name'];
  lasttime = localStorage['lasttime'];
  phone = '*'
  constructor(public http: HttpClient) {
    http.get(sessionStorage['http'] + '/action/users/getphone').subscribe(data => {
      this.phone = data.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    });
  }

  ngOnInit() {
  }

}
