import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  arrPersonajes: any[];
  currentPage: number;
  numPages:number;
  constructor( private personajesService: PersonajesService) { 
    this.arrPersonajes = [];
    this.currentPage = 1;
    this.numPages = this.currentPage;
  }

  ngOnInit(): void {
    this.personajesService.getAll()
    .then(response =>  {
      console.log(response);
      this.arrPersonajes = response['results'];
      this.numPages = response['info']['pages'];
    })
  }

  async changePage(siguiente:any){
    if(siguiente){
      this.currentPage++;
    }else{
      this.currentPage--;
    }

    const response = await this.personajesService.getAll(this.currentPage);
    this.arrPersonajes = response['results'];
  }

}
