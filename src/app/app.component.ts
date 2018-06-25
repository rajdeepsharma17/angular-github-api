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
  user = 'octocat'
  repo = 'Hello-World'
  private apiUrl = ''
  data: any = {}
  forksCount = []
  collection = []
  spinner = false
  downloadlink = ''
  error: any = {}
  err = false

  @ViewChild('userText') userText;
  @ViewChild('repoText') repoText;


  constructor(private http:Http){
    
  }

  fetchDetail(e){
    e.preventDefault()
    this.err = false
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
        this.collection.push(this.data)
        this.forksCount.push(this.data.forks_count)
      },1300)
      this.downloadlink = this.data.html_url + "/archive/master.zip"
    },
    error => {
      this.error = error
      console.log(this.error)
      this.err = true
    }
  )
  
  }

  sortForkCount(e){
    e.preventDefault()
    this.forksCount.sort().reverse()
  }


}
