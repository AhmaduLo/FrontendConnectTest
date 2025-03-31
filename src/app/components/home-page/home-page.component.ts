import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  template: `
   <nav>
    <div class="contain">
      <button  routerLink="/login" >Login</button>
      <button routerLink="/signup">Signup</button>
    </div>
   </nav>
   
  `,
  styleUrls: ['./home-page.component.scss']


})
export class HomePageComponent {

}
