import { Component, ViewChild } from '@angular/core';
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
  private apiUrl = ''
  data: any = {}
  forksCount = []
  spinner = false

  @ViewChild('userText') userText;
  @ViewChild('repoText') repoText;


  constructor(private http:Http){
    
  }

  fetchDetail(){
    this.spinner = true
    this.user = this.userText.nativeElement.value;
    this.repo = this.repoText.nativeElement.value;
    this.apiUrl = 'https://api.github.com/repos/' + this.user + '/' + this.repo
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
      setTimeout(()=> {
        this.spinner = false
        this.forksCount.push(this.data.forks_count)
      },1300)
      
    })
  }

  sortForkCount(){
    this.forksCount.sort().reverse()
  }

}
