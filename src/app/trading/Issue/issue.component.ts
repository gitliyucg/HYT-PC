import {Component, OnInit, Output} from '@angular/core';
import {Pagination} from '../../widgets/pagination/pageconfig';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import {Vpconfig} from '../../widgets/verify-pass/vpconfig';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  model: any = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  formModel: FormGroup;
  bizhi = 0;
  HYB = 0;
  tax = 0; // 手续费
  rmb = 0;
  switch = 0;
  heji = 0;
  gsmin = 0;
  @Output() vpconfig: Vpconfig = Vpconfig.defaultVpconfig;
  constructor(public fb: FormBuilder, public http: HttpClient, private router: Router) {
    this.formModel = fb.group({
      Price: ['', [Validators.required, Validators.min(1)]],
      Mins: ['', [Validators.required, Validators.min(0.01)]],
      Maxs: [''],
      Numbers: ['', [Validators.required, Validators.min(1)]]
    });
    http.get(sessionStorage['http'] + '/action/exchanges/GetParams').subscribe(data => {
      this.HYB = Number(data['HYB']);
      this.bizhi = Number(data['bizhi']);
      this.tax = Number(data['tax']);
      this.switch = Number(data['On']);
      this.gsmin = Number(data['gsmin']);
      this.formModel.get('Price').setValidators([Validators.required, Validators.min(this.bizhi)]);
      this.formModel.get('Numbers').setValidators([Validators.required, Validators.min(1), Validators.max(Math.floor(this.HYB * (1 - this.tax)))]);
    });

    this.formModel.get('Price').valueChanges.debounceTime(10).subscribe(val => {
      const obj = this.tonumber(val, 2);
      this.formModel.get('Price').setValue(obj);
    });

    this.formModel.get('Numbers').valueChanges.debounceTime(10).subscribe(val => {
      if (val > 0) {
        if (val.toString().indexOf('.') > 0) {
          this.formModel.get('Numbers').setValue(Math.floor(val));
        }
        this.rmb = Number(this.formModel.get('Price').value) * Math.floor(val);
        this.heji = this.accMul(Math.floor(val), (1 + this.tax));
      } else {
        this.heji = 0;
      }
    });

    this.formModel.get('Mins').valueChanges.debounceTime(10).subscribe(val => {
      this.rmb = val * this.bizhi;
      const obj = this.tonumber(val, 2);
      this.formModel.get('Mins').setValue(obj);
    });

    // this.formModel.get('Maxs').valueChanges.debounceTime(10).subscribe(val => {
    //   this.rmb = val * this.bizhi;
    //   const obj = this.tonumber(val, 2);
    //   this.formModel.get('Maxs').setValue(obj);
    // });
  }

  public ngOnInit(): void {
    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  private initList(): void {
    const page = this.pagination.currentPage;
    const url = sessionStorage['http'] + '/action/exchanges/GetList?num=' + page;
    this.http.get(url)
      .subscribe(data => {
        this.model = JSON.parse(data['data']);
        this.pagination.totalItems = data['Total'];
      });
  }

  tonumber(obj, len) {
    if (obj != '' && obj.substr(0, 1) == '.') {
      obj = '';
    }
    obj = obj.replace(/^0*(0\.|[1-9])/, '$1'); // 解决 粘贴不生效
    obj = obj.replace(/[^\d.]/g, '');  // 清除“数字”和“.”以外的字符
    obj = obj.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
    obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    if (len === 2) {
      obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
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

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

  onSubmit(e) {
    if (this.switch == 1) {
      alert('挂售功能暂时关闭');
      return false;
    }
    if (Number(this.formModel.get('Price').value) < this.bizhi) {
      alert('挂售单价不得低于当前币值');
      return false;
    }
    // if (this.rmb.toString().split('.').length >= 2) {
    //   if (this.rmb.toString().split('.')[1].length > 2) {
    //     alert('为避免您的损失，挂售价值需控制在小数点后两位');
    //     return false;
    //   }
    // }
    if (this.formModel.get('Numbers').value < this.gsmin) {
      alert('每次交易数量需大于 ' + this.gsmin + ' 枚');
      return false;
    }

    if (this.rmb < Number(this.formModel.get('Mins').value)) {
      alert('最低买入不能大于挂售总价值');
      return false;
    }
    this.formModel.get('Maxs').setValue(this.rmb);
    this.vpconfig.show = true;

  }

  result(i: number) {
    if (i == 0) {
      this.http.post(sessionStorage['http'] + '/action/exchanges/PostExchange', this.formModel.value).subscribe(data => {
        alert('发布成功');
        this.router.navigate(['/trading']);
      }, error2 => {
        alert(error2.error.Message);
      });
    }
  }

  quxiao(ID, i) {
    if (confirm('确定要取消吗？')) {
      this.http.put(sessionStorage['http'] + '/action/exchanges/QuXiao/' + ID, '').subscribe(data => {
        this.model[i].State = 1;
      }, error2 => {
        alert(error2.error.Message);
      });
    }
  }

  accMul(arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length; } catch (e) {}
    try {
      m += s2.split('.')[1].length; } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  }

}
