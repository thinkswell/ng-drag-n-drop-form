import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';

import { LabelInputComponent } from './dialog/label-input/label-input.component';
import { FORM_CONFIG_HISTORY, FORM_FIELD, FORM_FIELD_TYPES } from './shared/models/app.model';


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
  dropFormFields: Array<FORM_FIELD | { value: string }> = [];
  formConfigHistory: FORM_CONFIG_HISTORY = { count: 0, current: 0, formConfigs: [] };
  readonly FORM_FIELD_TYPES = FORM_FIELD_TYPES;

  constructor(private formBuilder: UntypedFormBuilder, private dialog: MatDialog) {}

  get formElementsArray() {
    return this.dndForm.get('elements') as UntypedFormArray;
  }

  get formConfig() {
    return this.formConfigHistory.formConfigs[this.formConfigHistory.current].elements;
  }

  initDndForm() {
    this.dndForm = this.formBuilder.group({
      elements: this.formBuilder.array(
        this.formConfig.map((element) => this.formElementsArray.push(this.formBuilder.control([element.value])))
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

  updateFormConfigs() {
    this.formElementsArray.controls.forEach((control, i) => {
      this.formConfig[i].value = control.value;
    })
    this.formConfigHistory.count += 1;
    this.formConfigHistory.current += 1;
  }

  initFormConfigHistory() {
    this.formConfigHistory.formConfigs = [...this.formConfigHistory.formConfigs, {
      createdAt: Date.now().toString(),
      elements: [],
    }]
  }

  handleFormSubmit() {
    this.updateFormConfigs();
    this.initFormConfigHistory();
    this.initDndForm();
  }
  
  updateCurrentFormConfig(index: number) {
    console.log({newIndex: index})
    this.formConfigHistory.current = index;
    this.initDndForm();
  }

  ngOnInit() {
    this.initFormConfigHistory();
    this.initDndForm();
  }
}
