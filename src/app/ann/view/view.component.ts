import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  title = '';
  time = '';
  contents = '';
  constructor(public http: HttpClient, public info: ActivatedRoute) {
    const id = info.snapshot.params['id'];
    this.http.get(sessionStorage['http'] + '/action/anns/GetInfo/' + id).subscribe(data => {
      this.title = data['Title'];
      this.time = data['Times'];
      this.contents = data['Contents'];
    });
  }

  ngOnInit() {
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0] + ' ' + time.split('T')[1];
      }
    } catch (e) {
      return time;
    }
  }

}
