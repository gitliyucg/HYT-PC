import {Component, OnInit, Output} from '@angular/core';
import {Pagination} from "../widgets/pagination/pageconfig";
import {HttpClient} from "@angular/common/http";
declare var $: any;

@Component({
  selector: 'app-liushui',
  templateUrl: './liushui.component.html',
  styleUrls: ['./liushui.component.scss']
})
export class LiushuiComponent implements OnInit {
  model: Array<any>;
  wheres = '';
  UserID = '';
  sd = '';
  ed = '';
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;


  constructor(public http: HttpClient) {
  }

  public ngOnInit(): void {
    $(function () {
      $('.bsrp-time').datetimepicker({
        minView: 'month', // 选择日期后，不会再跳转去选择时分秒
        language: 'cn',
        format: 'yyyy-mm-dd',
        todayBtn: 1,
        autoclose: 1,
      }).on('changeDate', function (ev) {
        $(this).focus();
        $(this).blur();
      });
    });
    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  private initList(): void {
    const page = this.pagination.currentPage;
    let url = sessionStorage['http'] + '/action/LiuShuis/GetList?u='+localStorage['un']+'&num=' + page;
    if (this.wheres != '') {
      url += this.wheres;
    }
    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['total'];
      });
  }

  // 会员账号搜索
  serach() {
    this.wheres = '';
    if (this.sd !== '') {
      this.wheres += '&sd=' + this.sd;
    }
    if (this.ed !== '') {
      this.wheres += '&ed=' + this.ed;
    }
    this.pagination.currentPage = 1;
    this.initList();
  }

  setSD(e) {
    this.sd = e;
  }

  setED(e) {
    this.ed = e;
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0];
      }
    } catch (e) {
      return time;
    }
  }


}
