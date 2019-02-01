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
  user = ''
  repo = ''
  private apiUrl = ''
  data: any = {}
  collection = []
  spinner = false
  downloadlink = ''
  error: any = {}
  err = false
  alert = false
  selectedOption: string;
  fetchInFlight: boolean



  options = [
    { name: "Forks Count", value: 'forks_count' },
    { name: "Watch", value: 'subscribers_count' },
    { name: "Stars", value: 'stargazers_count' }
    ]
  // print() {
  //   console.log(this.selectedOption)
  // }

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
    if(!this.fetchInFlight){
      this.getContacts()
      this.fetchInFlight = true
    }
  }

  getData(){
    return this.http.get(this.apiUrl).pipe(
      map((res: Response) => res.json())
    )
    // this.fetchInFlight = false
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

  sortCount(e){
    e.preventDefault()
    // let  = 0
    // console.log(this.collection[j + 1])
    var sortmethod = this.selectedOption
    if(sortmethod == 'forks_count'){
      this.mainSort('forks_count')
    }

    if(sortmethod == 'subscribers_count'){
      this.mainSort('subscribers_count')
    }

    if(sortmethod == 'stargazers_count'){
      this.mainSort('stargazers_count')
    }
    
    if(this.collection.length != 0){
      this.alert = true
      setTimeout(()=> {
        this.alert = false
      },2500)
    }
    
  }

  mainSort = function(prop){
    this.collection.sort((obj1, obj2)=>{
      return obj1[prop] < obj2[prop]
    })
  }

  



}
