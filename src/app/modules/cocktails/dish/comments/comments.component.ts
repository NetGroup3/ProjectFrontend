import {Component, Input, OnInit} from '@angular/core';
import {DishComment} from './comment';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CommentService} from 'src/app/modules/core/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() dishId: number = 0;
  currentComment: string = "";
  currentPage: number = 0;
  perPage: number = 10;
  pagesTotal: number = 1;
  userRole: string | null = null;

  comments: DishComment[] = [];

  constructor(
    private notification: NzNotificationService,
    private service: CommentService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem("USER_ROLE");
    this.loadMore();
  }

  loadMore() {
    if (this.currentPage >= this.pagesTotal) {
      return;
    }
    this.currentPage ++;

    this.service.getPaginatedComments(this.dishId, this.currentPage, this.perPage)
      .subscribe(list => {
        if (list !== null && list.length > 0) {
          
          for (const comment of list) {
            if (comment.lastname === null) {
              comment.firstname = "Anonimous";
              comment.lastname = "user";
            }
            comment.timestamp = (new Date(comment.timestamp.toString())).toLocaleString();
          }
          this.comments = list.concat(this.comments);
          this.pagesTotal = list[0].pagesTotal;
        }
      });
  }

  postComment() {
    if (this.currentComment === "") {
      return;
    }
    this.service.postComment(this.dishId, this.currentComment)
      .subscribe(() => {
        this.currentComment = "";
        this.comments = [];
        this.currentPage = 0;
        this.loadMore();
      },
      () => {
        this.notification
        .blank(
          "",
          "Oh snap. Couldn't post your comment. Please try again later"
        )
      });
  }
}
