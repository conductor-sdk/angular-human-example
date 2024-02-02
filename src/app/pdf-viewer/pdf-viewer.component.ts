import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PdfJsViewerComponent, PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule,
    PdfJsViewerModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css'
})
export class PdfViewerComponent implements OnInit{
  title = 'test-ng2pdfjsviewer';

  @ViewChild('pdfViewer') pdfViewerComponent!: PdfJsViewerComponent;
  private pdfjsViewerApp: any; 

  ngOnInit(): void {}
  
  onDocumentLoad() {
    this.pdfjsViewerApp = this.pdfViewerComponent.PDFViewerApplication;
    if (this.pdfjsViewerApp) {
      let data1 =  this.pdfViewerComponent.PDFViewerApplication.pdfDocument.getData();
    } else {
      console.error('PDFViewerApplication is not available');
    }
  }

}
