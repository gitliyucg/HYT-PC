import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined, isUndefined} from 'util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {noUndefined} from '@angular/compiler/src/util';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  model: any = [];
  yuan;
  Mei;
  ID;
  view = false;
  constructor(public http: HttpClient, public router: Router, public info: ActivatedRoute) {
    this.ID = this.info.snapshot.params['id'];
    this.http.get(sessionStorage['http'] + '/action/exchanges/GetInfo/' + this.ID).subscribe(data => {
      this.model = data;
      this.view = true;
    }, error2 => {
      alert(error2.error.Message);
      this.router.navigate(['/trading']);
    });
  }

  ngOnInit() {
  }

  yuaninput(e) {
    if (e.target.value == '') {
      this.Mei = '';
      return false;
    }
    if (e.target.value.length >= 12) {
      e.target.value = e.target.value.substring(0, 12);
      return false;
    }
    const ton = this.tonumber(e.target.value, 2);
    let jisuan = ton / this.model.Price;
    if (!isNullOrUndefined(jisuan.toString().split('.')[1])) {
      if (jisuan.toString().split('.')[1].length > 6) {
        jisuan = Number(jisuan.toFixed(6));
      }
    }
    this.Mei = jisuan;
    this.yuan = ton;
    e.target.value = ton;
  }

  mei(e) {
    if (e.target.value == '') {
      this.yuan = '';
      return false;
    }
    if (e.target.value.length >= 12) {
      e.target.value = e.target.value.substring(0, 12);
      return false;
    }
    const valid = /^\d+$/;
    if (!valid.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^1-9]/g, '');
      return false;
    }
    const ton = this.tonumber(e.target.value, 0);
    let jisuan = ton * this.model.Price;
    if (!isNullOrUndefined(jisuan.toString().split('.')[1])) {
      if (jisuan.toString().split('.')[1].length > 6) {
        jisuan = Number(jisuan.toFixed(6));
      }
    }
    this.yuan = jisuan;
    this.Mei = ton;
    e.target.value = ton;
  }

  tonumber(obj, len) {
    if (obj != '' && obj.substr(0, 1) == '.') {
      obj = '';
    }
    obj = obj.replace(/^0*(0\.|[1-9])/, '$1'); // 解决 粘贴不生效
    obj = obj.replace(/[^\d.]/g, '');  // 清除“数字”和“.”以外的字符
    obj = obj.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
    obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    if (len === 6) {
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
    } else if (len == 3) {
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');
    }
    if (obj.indexOf('.') < 0 && obj != '') {// 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      if (obj.substr(0, 1) == '0' && obj.length == 2) {
        obj = obj.substr(1, obj.length);
      }
    }
    return obj;
  }

  onSubmit(e) {
    if (this.yuan == undefined || this.Mei == undefined || this.yuan <= 0 || this.Mei <= 0) {
      alert('请输入正确买入量');
      return false;
    }

    if (this.Mei > this.model.Numbers) {
      alert('超出挂售数量');
      return false;
    }

    if (this.yuan < this.model.Mins) {
      alert('最低买入为 ' + this.model.Mins + ' RMB');
      return false;
    }
    if (this.yuan > this.model.Maxs) {
      alert('最高买入为 ' + this.model.Maxs + ' RMB');
      return false;
    }
    if (this.yuan.toString().split('.').length == 2) {
      if (this.yuan.toString().split('.')[1].length > 2) {
        alert('RMB不得超过小数点后两位');
        return false;
      }
    }
    if (this.Mei.toString().split('.').length == 2) {
      if (this.Mei.toString().split('.')[1].length > 3) {
        alert('买入HYT数量不得超过小数点后三位');
        return false;
      }
    }

    const params = {
      ID: this.ID,
      RMB: this.yuan,
      Numbers: this.Mei
    };
    this.http.post(sessionStorage['http'] + '/action/orders/indent', params).subscribe(data => {
      this.router.navigate(['/trading/orderview/' + data.toString()]);
    }, error2 => {
      alert(error2.error.Message);
      this.router.navigate(['/trading']);
    });

  }

}
