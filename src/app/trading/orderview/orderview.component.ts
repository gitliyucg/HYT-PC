import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.scss']
})
export class OrderviewComponent implements OnInit {
  ID;
  model: any = [];
  bank: any = [];
  timer;
  minute;
  second;
  view = false;
  constructor(public http: HttpClient, public info: ActivatedRoute, public router: Router) {
    this.ID = info.snapshot.params['id'].split('lml')[1];
    if (this.ID == 'undefined' || this.ID == '' || Number(this.ID) == 0) {
      this.router.navigate(['/trading/orders']);
    }

    this.http.get(sessionStorage['http'] + '/action/orders/getview/' + this.ID).subscribe(data => {
      this.model = JSON.parse(data['order']);
      this.bank = JSON.parse(data['data']);
      if(this.model.States == 0) {
        this.model.Times = this.model.Times.replace('T',' ');
        this.getTime(this.model.Times);
      }
      this.view = true;
    }, error2 => {
      alert(error2.error.Message);
      this.router.navigate(['/trading/orders']);
      return false;
    });
  }

  ngOnInit() {
  }

  getTime(t) {
    console.log(this.model.Times);
    const that = this;
    this.timer = setInterval(function () {
      const ti = Date.now() - Date.parse(that.model.Times);
      that.diff(ti);
    }, 1000);
  }

  diff(val) {
    const rDate = {days: 0, hours: 0, minutes: 0, seconds: 0};
    rDate.days = Math.floor(val / (24 * 3600 * 1000));
    const leave1 = val % (24 * 3600 * 1000);
    rDate.hours = Math.floor(leave1 / (3600 * 1000));
    const leave2 = leave1 % (3600 * 1000);
    rDate.minutes = Math.floor(leave2 / (60 * 1000));
    const leave3 = leave2 % (60 * 1000);
    rDate.seconds = Math.round(leave3 / 1000);
    this.minute = 29 - rDate.minutes;
    this.second = 60 - rDate.seconds;
    if (rDate.days >= 0 && rDate.hours >=0 && this.minute <= 0) {
      // 超时不跑
      if (this.timer) {
        clearInterval(this.timer);
      }
      // 更新订单超时
      this.http.put(sessionStorage['http'] + '/action/orders/timeout/' + this.ID, '').subscribe(data => {
        this.router.navigate(['/trading/orders']);
      }, error2 => {
        alert(error2.error.Message);
        this.router.navigate(['/trading/orders']);
      });
    }
  }

  pay() {
    // 标记为付款
    if (confirm('请确认已付款后再点击标记为已付款按钮')) {
      this.http.put(sessionStorage['http'] + '/action/orders/Pay/' + this.ID, '').subscribe(data => {
        this.router.navigate(['/trading/orders']);
      }, error2 => {
        alert(error2.error.Message);
        this.router.navigate(['trading/orders']);
      });
    }
  }

  cancel() {
    // 取消订单
    if (confirm('如果账户内出现多次超时未付款订单，可能会被视为恶意操作。')) {
      this.http.put(sessionStorage['http'] + '/action/orders/OrderCancel/' + this.ID, '').subscribe(data => {
        this.router.navigate(['/trading/orders']);
      }, error2 => {
        alert(error2.error.Message);
        this.router.navigate(['trading/orders']);
      });
    }
  }

}
