import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DishComment} from "../../cocktails/dish/comments/comment";
import {appLinks} from "../../../app.links";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {}

    public getPaginatedComments(dishId: number, page: number, perPage: number): Observable<DishComment[]> {
        return this.http.get<DishComment[]>(
            appLinks.commentList, {params: new HttpParams()
                .set("dishId", dishId)
                .set("pageNo", page)
                .set("perPage", perPage)
            }
        );
    }

    public postComment(dishId: number, text: string): Observable<void> {
        return this.http.post<void>(
            appLinks.comment, {
                dishId: dishId,
                text: text
            }
        );
    }
}
