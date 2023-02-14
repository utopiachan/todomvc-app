import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-functionality',
  template: `
    <p>
      common-functionality works!
    </p>
  `,
  styles: [
  ]
})
export class ReloadComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  //for use to reload component to update data.
  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

  reloadPage() {
    window.location.reload()
  }

}
