import { Component, OnInit, Output } from '@angular/core';
import {Pagination} from '../widgets/pagination/pageconfig';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {Vpconfig} from '../widgets/verify-pass/vpconfig';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  model: any = [];
  // 传出分页总数
  @Output() public pagination: Pagination = Pagination.defaultPagination;
  formModel: FormGroup;
  bizhi = 0;
  HYB = 0;
  tax = 0; // 手续费
  switch = 0;
  lasttax = 0;
  btnOn = false;
  @Output() vpconfig: Vpconfig = Vpconfig.defaultVpconfig;
  constructor(public fb: FormBuilder, public http: HttpClient, private router: Router) {
    this.formModel = fb.group({
      who: ['', Validators.required],
      uname: [{value: '', disabled: true}, Validators.required],
      Numbers: ['', [Validators.required, Validators.min(1)]],
    });
    http.get(sessionStorage['http'] + '/action/transfers/GetParams/' + localStorage['un']).subscribe(data => {
      this.HYB = Number(data['HYB']);
      this.bizhi = Number(data['bizhi']);
      this.tax = Number(data['tax']);
      this.switch = Number(data['switch']);
      this.formModel.get('Numbers').setValidators([Validators.required, Validators.min(1), Validators.max(Math.floor(this.HYB))]);
    });

    this.formModel.get('who').valueChanges.debounceTime(1000).subscribe(val => {
      this.http.get(sessionStorage['http'] + '/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        this.formModel.get('uname').setValue(res.replace(/\"/g, ''));
        this.btnOn = false;
      }, error => {
        this.formModel.get('uname').setValue('');
        this.btnOn = true;
      });
    });

    this.formModel.get('Numbers').valueChanges.debounceTime(1).subscribe(val => {
      if (val > 0) {
        if (val.toString().indexOf('.') > 0) {
          this.formModel.get('Numbers').setValue(Math.floor(val));
        }
        this.lasttax = Math.floor(val) + Math.floor(val) * this.tax;
      } else {
        this.lasttax = 0;
      }

    });
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
    const url = sessionStorage['http'] + '/action/transfers/GetList?u=' + localStorage['un'] + '&num=' + page;
    this.http.get(url)
      .subscribe(data => {
        this.model = JSON.parse(data['data']);
        this.pagination.totalItems = data['Total'];
      });
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
    this.vpconfig.show = true;
  }

  result(i: number) {
    if (i == 0) {
      const params = {
        UID: Number(localStorage['ID']),
        UserName: localStorage['un'],
        who: this.formModel.get('who').value,
        Numbers: this.formModel.get('Numbers').value,
      };
      if (this.formModel.get('uname').value == localStorage['un']) {
        return confirm('当前接收会员为自己，自己转给自己也将计算互转费率');
      }
      this.http.post(sessionStorage['http'] + '/action/transfers/PostTransfers', params).subscribe(data => {
        alert('操作成功');
        this.router.navigate(['/index']);
      }, error2 => {
        alert(error2.error.Message);
        this.router.navigate(['/index']);
      });
    }
  }
}
