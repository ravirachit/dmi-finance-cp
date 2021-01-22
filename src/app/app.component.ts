import { Component } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig,MatBottomSheet } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dmi-Customer-Portal';
  counter:any=0;
  event:any='';
  loanDetail:any='';

  constructor(private snackBar: MatSnackBar, private ngsw: ServiceWorkerModule,private bottomSheet: MatBottomSheet,private data: DataService) {
  }

  ngOnInit(){
    this.checkInstallation();
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
  }

  checkInstallation(){
    if ((navigator as any).standalone == false) {
      this.snackBar.open('For Quick Access Add to Home Screen.', 'OK', { duration: 5000 });
    }
    if ((navigator as any).standalone == undefined) {
      if (window.matchMedia('(display-mode: browser').matches) {
        window.addEventListener('beforeinstallprompt', event => {
          this.event=event;
            this.event.preventDefault();
            // let config = new MatSnackBarConfig();
            // config.panelClass = ['custom-class'];
            // config.duration = 5000;
            // const sb = this.snackBar.open('For Quick Access Add to Home Screen.', 'OK', config);
            // sb.onAction().subscribe(() => {
            //     (event as any).prompt();
            //     (event as any).userChoice.then(result => {
            //         if (result.outcome == 'dismissed') {
            //             //TODO: Track no installation 
            //         } else {
            //             //TODO: It was installed
            //         }
            //     });
            // });
          this.showAddShortcutAlert();
          return false;
        });
      }
    }
    else{
    }
  }

  showAddShortcutAlert(){
    let sheetRef =  this.bottomSheet.open(BottomSheetComponent);
    sheetRef.afterDismissed().subscribe( data => {
      if(data && data.message=='Cancel') {
        this.counter=this.counter+1;
        this.event.preventDefault();
      } if(data && data.message=='Install') {
        (this.event as any).prompt();
        this.event.preventDefault();
      }
      if(this.counter==1){setTimeout(() => this.showAddShortcutAlert(), 60000)}
    });
  }

}
