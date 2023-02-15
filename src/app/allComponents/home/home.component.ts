import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  supportLanguages=['English', 'Hindi',  'Assamese','Bangla','Bhojpuri', 'Gujarati','Kannad','Marathi','Punjabi','Tamil','Telgu','Urdu'];

  constructor(private translateService : TranslateService){

    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

    const browserLang  = this.translateService.getBrowserLang();
    // this.translateService.use(browserLang);
  }

  selectLang(lang:string){
    this.translateService.use(lang);
  }
}
