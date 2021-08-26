import { Component, OnInit } from '@angular/core';
// import { EmailJSResponseStatus } from 'emailjs-com';
import emailjs, {EmailJSResponseStatus, init } from 'emailjs-com';

@Component({
  selector: 'app-nous-contacter',
  templateUrl: './nous-contacter.component.html',
  styleUrls: ['./nous-contacter.component.scss']
})
export class NousContacterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init("user_Yhs3oSCA7VZeT9wdLkfcM");
  }


  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_3kux9lo', 'template_xgvfmet', e.target as HTMLFormElement, 'user_Yhs3oSCA7VZeT9wdLkfcM')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

}
