import { HttpClient } from '@angular/common/http';
import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {appLinks} from "../../../../app.links";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

  @Input() dishId: number = 0;
  currentComment: string = "";
  currentPage: number = 0;
  perPage: number = 10;
  pagesTotal: number = 1;

  comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      // @ts-ignore
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch {}
  }

  loadMore() {
    if (this.currentPage >= this.pagesTotal) {
      return;
    }
    this.currentPage ++;
    this.http.get(appLinks.commentList
      + "?dishId=" + this.dishId + "&pageNo=" + this.currentPage + "&perPage=" + this.perPage)
      .subscribe(res => {
        // @ts-ignore
        if (res.list !== null) {
          /*/ @ts-ignore
          for (const comment: Comment in res.list) {
            if (comment.name)
          }*/
          // @ts-ignore
          this.comments = res.list.concat(this.comments);
        }
        // @ts-ignore
        this.pagesTotal = res.pagesTotal;
      });
  }

  postComment() {
    this.http.post(appLinks.comment, {
      dishId: this.dishId,
      text: this.currentComment
    }).subscribe(() => {
      this.comments = [];
      this.currentPage = 0;
      this.loadMore();
      this.scrollToBottom();
    });
  }

  onScroll() {
    this.loadMore();
  }
}
