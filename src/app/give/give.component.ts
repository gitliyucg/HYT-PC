import {Component, OnInit, Output} from '@angular/core';
import {Pagination} from '../widgets/pagination/pageconfig';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {Vpconfig} from '../widgets/verify-pass/vpconfig';

@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss']
})
export class GiveComponent implements OnInit {
  model: any = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  formModel: FormGroup;
  bizhi = 0;
  HYB = 0;
  btnOn = true;
  @Output() vpconfig: Vpconfig = Vpconfig.defaultVpconfig;
  constructor(public fb: FormBuilder, public http: HttpClient, private router: Router) {
    this.formModel = fb.group({
      UserName: [localStorage['un']],
      who: ['', Validators.required],
      uname: [{value: '', disabled: true}, Validators.required],
      Numbers: ['', [Validators.required, Validators.min(1)]],
    });
    http.get(sessionStorage['http'] + '/action/Give/GetParams/' + localStorage['un']).subscribe(data => {
      this.HYB = Number(data['HYB']);
      this.bizhi = Number(data['bizhi']);
      this.formModel.get('Numbers').setValidators([Validators.required, Validators.min(1), Validators.max(this.HYB)]);
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
    const url = sessionStorage['http'] + '/action/Give/GetList?u=' + localStorage['un'] + '&num=' + page;
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
        UserName: localStorage['un'],
        who: this.formModel.get('who').value,
        uname: this.formModel.get('uname').value,
        Numbers: this.formModel.get('Numbers').value,
      };
      this.http.post(sessionStorage['http'] + '/action/Give/PostGive', params).subscribe(data => {
        alert('转赠成功');
        this.router.navigate(['/index']);
      }, error2 => {
        alert(error2.error.Message);
        this.router.navigate(['/index']);
      });
    }
  }

}
