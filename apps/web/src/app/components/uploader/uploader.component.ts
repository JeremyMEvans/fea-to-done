import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'nxlp-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Input() maxSize: number;
  @Output() uploaded: EventEmitter<File> = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('uploader') uploader: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  promptFile() {
    this.fileInput.nativeElement.click();
  }

  highlight(type: string) {
    switch (type) {
      case 'over':
        this.renderer.addClass(this.uploader.nativeElement, 'over');
        break;
      default:
        this.renderer.removeClass(this.uploader.nativeElement, 'over');
    }
  }

  uploadFile(file: File) {
    if (file[0].size <= this.maxSize * 1024) {
      this.uploaded.emit(file);
    } else {
      alert('Max upload size ' + this.maxSize + 'kb');
    }
  }
}
