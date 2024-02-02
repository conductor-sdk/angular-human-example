import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  JsonFormsAngularService,
  JsonFormsControl,
  JsonFormsModule,
} from '@jsonforms/angular';
import {
  RankedTester,
  rankWith,
  and,
  optionIs,
  StatePropsOfControl,
  formatIs,
  scopeEndsWith
} from '@jsonforms/core';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { PdfJsViewerComponent, PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'TextControlRenderer',
  template: ` <ng2-pdfjs-viewer
    #pdfViewer
    pdfSrc="{{ data }}"
  ></ng2-pdfjs-viewer>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
      }
      mat-form-field {
        flex: 1 1 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonFormsModule, JsonFormsAngularMaterialModule, PdfJsViewerModule],
})
export class PdfDisplayControlRenderer extends JsonFormsControl {
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' = undefined;
  paragraph = false;
  noWrap = false;
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }
  getStyles = () => {
    if (this.align) {
      return 'text-align:' + this.align;
    }
    return '';
  };
  dataOrLabel = () => this.data || this.label;
  override getEventValue = (event: any) => {
    console.log('this is a pdf', event);

    event.target.value || undefined;
  };
  override mapAdditionalProps(props: StatePropsOfControl): void {
    console.log('the props are: ', props);
    this.align = props?.uischema?.options!['align'];
    this.paragraph = props?.uischema?.options!['paragraph']; //this.form.get('paragraph')?.value;
    this.noWrap = props?.uischema?.options!['noWrap']; //this.form.get('noWrap')?.value;
  }
}
export const PdfDisplayRendererTester: RankedTester = rankWith(
  3, //increase rank as needed
  and(
    formatIs('uri'),
    optionIs('readonly', true),
    optionIs('display', 'image-viewer'),
    scopeEndsWith("_pdf")
  )
);
