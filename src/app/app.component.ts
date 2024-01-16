import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { LabelInputComponent } from './dialog/label-input/label-input.component';

interface FORM_FIELD {
  type: string;
  placeholder: string;
  label: string;
}

enum FORM_FIELD_TYPES {
  EMAIL = 'email',
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
}

interface FORM_CONFIG_HISTORY {
  count: number;
  current: number;
  formConfigs: Array<FORM_CONFIG>;
}

interface FORM_CONFIG {
  createdAt: string;
  elements: Array<FORM_FIELD>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'centilytics-assignment';
  dndForm!: UntypedFormGroup;
  formFields: Array<FORM_FIELD> = [
    {
      type: FORM_FIELD_TYPES.EMAIL,
      placeholder: 'Email Field',
      label: '',
    },
    {
      type: FORM_FIELD_TYPES.TEXT,
      placeholder: 'Text Field',
      label: '',
    },
    {
      type: FORM_FIELD_TYPES.NUMBER,
      placeholder: 'Number Field',
      label: '',
    },
    {
      type: FORM_FIELD_TYPES.PASSWORD,
      placeholder: 'Password Field',
      label: '',
    },
  ];
  dropFormFields: Array<FORM_FIELD> = [];
  formConfigHistory: FORM_CONFIG_HISTORY = { count: 0, current: 0, formConfigs: [] };
  readonly FORM_FIELD_TYPES = FORM_FIELD_TYPES;

  constructor(private formBuilder: UntypedFormBuilder, private dialog: MatDialog) {}

  get formElementsArray() {
    return this.dndForm.get('elements') as UntypedFormArray;
  }

  get formConfig() {
    if (!this.formConfigHistory.formConfigs[this.formConfigHistory.current]) {
      this.formConfigHistory.formConfigs[this.formConfigHistory.current] = {
        createdAt: Date.now().toString(),
        elements: [],
      };
    }
    return this.formConfigHistory.formConfigs[this.formConfigHistory.current].elements;
  }

  initDndForm() {
    this.dndForm = this.formBuilder.group({
      elements: this.formBuilder.array(
        this.formConfig.map(() => this.formElementsArray.push(this.formBuilder.control([])))
      ),
    });
  }

  addNewField(data: FORM_FIELD) {
    this.dialog
      .open(LabelInputComponent)
      .afterClosed()
      .subscribe((label) => {
        if (!label) return;
        this.formConfig.push({ ...data, label });
        this.formElementsArray.push(this.formBuilder.control([]));
      });
  }

  handleFieldDrop(event: CdkDragDrop<FORM_FIELD>) {
    const { data } = event.item;
    this.addNewField(data);
  }

  handleFormSubmit() {
    this.formConfigHistory.count += 1;
    this.formConfigHistory.current += 1;
  }

  ngOnInit() {
    this.initDndForm();
  }
}
