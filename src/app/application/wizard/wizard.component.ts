import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { FileInfo, SelectEvent, RemoveEvent, ClearEvent } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styles: []
})
export class WizardComponent implements OnInit {
  currentStep = 1;
  constructor(
    protected formService: ApplicationService
  ) { }

  ngOnInit() {
  }

  moveStep(direction: number) {
    this.currentStep += direction;
  }

  submit() {
    // Is it possible to make it so the value of the control is the actual files?
    const ctrl = this.formService.pageOne.get('avatar');
    console.log(ctrl);
    const files = ctrl.value;
    // Always null
    console.log(files);

    // Here we would build the objects and POST to an API, putting the files into the FormData of the http call
    // callApi();
  }




  // Everything Below here is an example of my 'work around', where I just keep track of
  // the files that are added/removed, and then submit these files instead of the value of the form control
  // None of these events are actually connected to my file upload right now, but this is their logic.
  avatarFiles: FileInfo[];

  patchFiles() {
    if (this.avatarFiles) {
      const temp = [];
      // Not sure why this is necessary...but patching using just the normal avatarFiles object doesn't seem to work
      this.avatarFiles.forEach(a => {
        temp.push({name: a.name, size: a.size, state: a.state, rawFile: a.rawFile, extension: a.extension, uid: a.uid});
      });

      this.formService.pageOne.patchValue({
        avatar: temp
      });
    }
  }

  // Add newly selected files to the local array
  selectEventHandler(e: SelectEvent) {
    if (!this.avatarFiles) {
      this.avatarFiles = [];
    }
    e.files.forEach(f => {
      if (!f.validationErrors) {
        this.avatarFiles.push(f);
      }
    });
  }

  // Remove files from the local array
  removeFileUpload(e: RemoveEvent) {
    e.files.forEach(f => {
      this.avatarFiles = this.avatarFiles.filter(b => b.uid !== f.uid);
    });
  }

  // Clear all files from local array
  clearFileUpload(e: ClearEvent) {
    this.avatarFiles = [];
  }
}
