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
  collection = []
  spinner = false
  downloadlink = ''
  error: any = {}
  err = false
  alert = false

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
      },1100)
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
    // let  = 0
    // console.log(this.collection[j + 1])
    let i, j, temp;
    for(i = 0; i < this.collection.length; i++){
      for(j = 1; j < this.collection.length - i; j++){
        if(this.collection[j  - 1].forks_count > this.collection[j].forks_count){
          temp = this.collection[j]
          this.collection[j] = this.collection[j - 1]
          this.collection[j - 1] = temp
        }
      }
    }
    if(this.collection.length != 0){
      this.alert = true
      setTimeout(()=> {
        this.alert = false
      },2500)
    }
    
  }


}
