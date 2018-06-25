import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = 'rajdeepsharma17'
  repo = 'SIH_Kerela'

  private apiUrl = 'https://api.github.com/repos/' + this.user + '/' + this.repo
  data: any = {}

  constructor(private http:Http){
    this.getContacts()
    this.getData()
  }

  getData(){
    return this.http.get(this.apiUrl).pipe(
      map((res: Response) => res.json())
    )
  }

  getContacts(){
    this.getData().subscribe(data => {
      console.log(data)
      this.data = data
      console.log(data.archive_url)
    })
  }
}
