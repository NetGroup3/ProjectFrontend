import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModerListItem} from "../../admin/models/moderListItem";
import {appLinks} from "../../../app.links";
import {RequestBody} from "../../admin/models/requestBody";
import {AddEditModer} from "../../admin/models/addEditModer";

@Injectable({
    providedIn: 'root'
})
export class ModeratorListService {

    constructor(private http: HttpClient) {}

    public deleteModerator(id: number): Observable<void> {
        return this.http.delete<void>(appLinks.moderator + "/" + id);
    }

    public getPaginatedModerators(requestBody: RequestBody): Observable<ModerListItem[]> {
        return this.http.post<ModerListItem[]>(appLinks.moderatorList, requestBody);
    }

    public updateModerator(body: AddEditModer): Observable<void> {
        return this.http.put<void>(appLinks.moderator, body);
    }

    public createModerator(body: AddEditModer): Observable<void> {
        return this.http.post<void>(appLinks.moderator, body);
    }
}