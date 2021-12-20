import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModeratorService} from "../../core/services/moderator.service";
import {Location} from "@angular/common";
import {Kitchenware} from "../../core/models/kitchenware";
import {UploadService} from "../../auth/services/client/upload.service";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {Subscription} from "rxjs";

@AutoUnsubscribe()
@Component({
  selector: 'app-add-edit-kitchenware',
  templateUrl: './add-edit-kitchenware.component.html',
  styleUrls: ['./add-edit-kitchenware.component.scss']
})
export class AddEditKitchenwareComponent implements OnInit {

  kitchenware: Kitchenware = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    isActive: false,
  };
  public img: any;
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
    private uploadService: UploadService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (Number(this.route.snapshot.paramMap.get('id')) > 0) {
      this.getKitchenware();
    }
  }

  goBack(): void {
    this.location.back();
  }

  onAddClick(): void {
    if (this.kitchenware.id === 0) {
      this.subscriptions.add(
        this.moderatorService.addKitchenware(this.kitchenware).subscribe((response: any) => {
        this.router.navigate(['/moderator/kitchenware'])
      }))
    } else {
      this.subscriptions.add(
      this.moderatorService.editKitchenware(this.kitchenware).subscribe((response: any) => {
        this.router.navigate(['/moderator/kitchenware'])
      }))
    }

  }

  getKitchenware(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.moderatorService.getKitchenwareById(id)
      .subscribe((response: Kitchenware) => {
        this.kitchenware = response
        this.img = this.uploadService.initImage(this.kitchenware.imageId);
      }))
  }

  onFileSelect($event: any) {
    this.subscriptions.add(
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response => {
      this.kitchenware.imageId = response.public_id;
      this.img = this.uploadService.initImage(this.kitchenware.imageId);
    }))
  }

  ngOnDestroy() {}
}
