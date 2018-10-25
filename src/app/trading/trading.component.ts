import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pagination} from '../widgets/pagination/pageconfig';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {
  model: any = [];
  // 传出分页总数
  @Output() public pagination: Pagination = Pagination.defaultPagination;
  formModel: FormGroup;
  constructor(public fb: FormBuilder, public http: HttpClient, private router: Router) {

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
    const url = sessionStorage['http'] + '/action/exchanges/GetAll?num=' + page;
    this.http.get(url)
      .subscribe(data => {
        this.model = JSON.parse(data['data']);
        this.pagination.totalItems = data['Total'];
      });
  }

}
