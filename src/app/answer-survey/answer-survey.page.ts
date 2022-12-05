import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AnswerService } from '../services/answer.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.page.html',
  styleUrls: ['./answer-survey.page.scss'],
})
export class AnswerSurveyPage implements OnInit {

  private surveyId: any; 

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private answerService: AnswerService
  ){
    this.route.queryParams
      .subscribe((params: any) => {
        this.surveyId = params.survey;
        this.getSurvey()
    })  
  }

  ngOnInit() {
  }

  public survey: any = {}

  getSurvey() {
    this.surveyService.getById(Number(this.surveyId)).subscribe((result: any) => {
      this.survey = result.data;
    });
  }

  async save() {
    let errors = false

    this.survey.format.forEach((question: any) => {
      if (question.isRequired && (!question.value || question.value == '')) {
        errors = true;
      }
    });

    if (errors) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Campos vacios',
        message: 'Asegurece de llenar por lo menos las preguntas marcadas con *',
        buttons: ['OK'],
      });
  
      await alert.present();

      return;
    }

    const data = {
      format: this.survey.format,
      surveyId: this.survey.id,
      userId: Number(localStorage.getItem('user-id')),
    };

    this.answerService.create(data).subscribe(async (result: any) => {
      const toast = await this.toastController.create({
        message: 'Éxito, encuesta guardada exitosamente',
        duration: 1500,
        position: 'bottom'
      });
  
      await toast.present();
      
      this.back();
    });
  }

  back(){
    this.router.navigate(['/survey'])
  }
}
