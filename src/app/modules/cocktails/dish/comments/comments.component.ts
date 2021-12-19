import { HttpClient } from '@angular/common/http';
import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {appLinks} from "../../../../app.links";
import {DishComment} from './comment';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";

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
  userRole: string | null = null;

  comments: DishComment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
    this.scrollToBottom();
    this.userRole = localStorage.getItem("USER_ROLE");
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
    this.http.get<DishComment[]>(appLinks.commentList
      + "?dishId=" + this.dishId + "&pageNo=" + this.currentPage + "&perPage=" + this.perPage)
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
    this.http.post(appLinks.comment, {
      dishId: this.dishId,
      text: this.currentComment
    })
    .subscribe(() => {
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
