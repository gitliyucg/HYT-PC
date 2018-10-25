import {Component, OnInit, Output} from '@angular/core';
import {Pagination} from "../widgets/pagination/pageconfig";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Vpconfig} from "../widgets/verify-pass/vpconfig";

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  model: any = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  formModel: FormGroup;
  bizhi = 0;
  HYT = 0;
  @Output() vpconfig: Vpconfig = Vpconfig.defaultVpconfig;
  constructor(public fb: FormBuilder, public http: HttpClient, private router: Router) {
    this.formModel = fb.group({
      UID: [localStorage['ID']],
      UserName: [localStorage['un']],
      Numbers: ['', [Validators.required, Validators.min(1)]],
    });
    http.get(sessionStorage['http'] + '/action/release/GetParams/' + localStorage['un']).subscribe(data => {
      this.HYT = Number(data['HYT']);
      this.bizhi = Number(data['bizhi']);
      this.formModel.get('Numbers').setValidators([Validators.required, Validators.min(1), Validators.max(this.HYT)]);
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
    const url = sessionStorage['http'] + '/action/Release/GetList?u=' + localStorage['un'] + '&num=' + page;
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
      this.http.post(sessionStorage['http'] + '/action/Release/PostGive', this.formModel.value).subscribe(data => {
        alert('提取成功');
        this.router.navigate(['/index']);
      }, error2 => {
        alert(error2.error.Message);
        this.router.navigate(['/index']);
      });
    }
  }
}
