import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/client/auth.service";
import {Router} from "@angular/router";
import {MapElement} from "./MapElement";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  links: Map<string | null, [MapElement]> = new Map<string, [MapElement]> ();

  constructor(private tokenService: AuthService, public router: Router) {
    this.links.set(null, [{name: "Cocktails", link: "/dishes", icon: "coffee"}]);
    // @ts-ignore
    this.links.set("USER", [{name: "Blog", link: "/user/blog", icon: "audit"},
                            {name: "Stock", link: "/personal-stock", icon: "container"},
                            {name: "Events", link: "/user/events", icon: "star"},
                            {name: "Friends", link: "/user/friends", icon: "team"},
                            {name: "Calendar", link: "/user/calendar", icon: "calendar"},
                            {name: "Cocktails", link: "/dishes", icon: "coffee"},
                            {name: "Favourites", link: "/user/favourite", icon: "heart"},
                            {name: "Settings", link: "/settings", icon: "setting"}
    ]);
    // @ts-ignore
    this.links.set("MODERATOR", [{name: "Cocktails", link: "/moderator/cocktails", icon: "coffee"},
                                 {name: "Ingredients", link: "/moderator/ingredients", icon: "apple"},
                                 {name: "Kitchenware", link: "/moderator/kitchenware", icon: "experiment"},
                                 {name: "Settings", link: "/settings", icon: "setting"}
    ]);
    // @ts-ignore
    this.links.set("ADMIN", [{name: "Cocktails", link: "/moderator/cocktails", icon: "coffee"},
                             {name: "Ingredients", link: "/moderator/ingredients", icon: "apple"},
                             {name: "Kitchenware", link: "/moderator/kitchenware", icon: "experiment"},
                             {name: "Moderators", link: "/admin/moderators", icon: "audit"},
                             {name: "Settings", link: "/settings", icon: "setting"}
    ])
  }

  get userType() {
    return this.tokenService.getUserRole();
  }

}
