import {Component, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Pagination} from '../widgets/pagination/pageconfig';

@Component({
  selector: 'app-stored',
  templateUrl: './stored.component.html',
  styleUrls: ['./stored.component.scss']
})
export class StoredComponent implements OnInit {
  model: any = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  constructor(public http: HttpClient, private router: Router) {

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
    const url = sessionStorage['http'] + '/action/BaoDans/GetList?u=' + localStorage['un'] + '&num=' + page;
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

  GetState(s) {
    switch (s) {
      case  0:
        return '正常';
      case  1:
        return '冻结';
      case  2:
        return '到期';
      case  3:
        return '到期';
      case  4:
        return '撤资';
      case  5:
        return '已删除';
    }
  }

}
