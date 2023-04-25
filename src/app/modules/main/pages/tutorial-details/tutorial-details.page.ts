import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "@core/http";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-tutorial-details',
  templateUrl: './tutorial-details.page.html',
  styleUrls: ['./tutorial-details.page.scss']
})
export class TutorialDetailsPage implements OnInit {
  form = new FormGroup({
    province_id: new FormControl(),
    major: new FormControl(),
    school_type: new FormControl(),
    school_id: new FormControl(),
    gender_id: new FormControl(),
    grade: new FormControl(),
    stage: new FormControl(),
    field: new FormControl(),
  });
  filterEnabled: boolean = false;
  count: any;

  constructor(private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.count = await this.dataService.getExamCount()
  }

  async clearFilter() {
    this.count = await this.dataService.getExamCount();
    this.form.reset();
    this.filterEnabled = false;
  }

  async onSubmitFilter() {
    const filters = this.utilsService.getDirtyControls(this.form);
    if (!filters) {
      return;
    }
    this.count = await this.dataService.getExamCount(filters)
    this.filterEnabled = true;
  }
}
