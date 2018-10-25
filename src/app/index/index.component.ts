import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  zichan = 0;
  bi = 0;
  cunchu = 0;
  moneys = 0;
  switch = 0;
  // faOn = 0;
  daisf = 0;
  ann: object;
  constructor(public http: HttpClient) {
    http.get(sessionStorage['http'] + '/action/wallets/GetInfo/' + localStorage['un']).subscribe(data => {
      if (data == null) {
        localStorage.clear();
        location.href = '/';
      }
      const json = JSON.parse(data['data']);
      this.zichan =  json.zichan == null ? 0 : json.zichan;
      this.cunchu = json.HYT == null ? 0 : json.HYT;
      this.bi = json.HYB == null ? 0 : json.HYB;
      this.moneys = json.Moneys == null ? 0 : json.Moneys;
      this.switch = json.Switch;
      this.daisf = json.daisf == null ? 0 : json.daisf;
      // this.faOn = data['faOn'];
    });
  }

  ngOnInit() {
    this.http.get(sessionStorage['http'] + '/action/anns/getlist').subscribe(data => {
      this.ann = data;
    });
  }

  // stop(e) {
  //   this.switch = 1;
  //   e.target.disabled = true;
  //   this.http.put(sessionStorage['http'] + '/action/Switches/switch?id=' + localStorage['ID'] + '&s=' + this.switch, {}).subscribe(data => {
  //
  //   }, error2 => {
  //     this.switch = 0;
  //   });
  // }
  //
  // open(e) {
  //   this.switch = 0;
  //   e.target.disabled = true;
  //   this.http.put(sessionStorage['http'] + '/action/Switches/switch?id=' + localStorage['ID'] + '&s=' + this.switch, {}).subscribe(data => {
  //
  //   }, error2 => {
  //     this.switch = 1;
  //   });
  // }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

}
