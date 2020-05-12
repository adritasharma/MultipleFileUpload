import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-file-drop',
  templateUrl: './custom-file-drop.component.html',
  styleUrls: ['./custom-file-drop.component.css']
})
export class CustomFileDropComponent implements OnInit {

  constructor() { }

  @Output() onFileListChange = new EventEmitter();

  ngOnInit() {
  }
  files: any[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.onFileListChange.emit(this.files)
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.onFileListChange.emit(this.files)
  }

}
