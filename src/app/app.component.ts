import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { LabelInputComponent } from './dialog/label-input/label-input.component';
import { FORM_CONFIG_HISTORY, FORM_FIELD, FORM_FIELD_TYPES } from './shared/models/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Drag n Drop Form';
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

  // form elements array getter
  get formElementsArray() {
    return this.dndForm.get('elements') as UntypedFormArray;
  }

  // current formConfig from config history based on current pointer
  get formConfig() {
    return this.formConfigHistory.formConfigs[this.formConfigHistory.current].elements;
  }

  /**
   * Will initilaize the dnd form group and set the elements value if present in formElementsArray
   */
  initDndForm() {
    this.dndForm = this.formBuilder.group({
      elements: this.formBuilder.array(
        this.formConfig.map(() => this.formElementsArray.push(this.formBuilder.control([])))
      ),
    });
    this.formElementsArray.controls.forEach((control, i) => {
      control.setValue(this.formConfig[i].value);
    });
  }

  /**
   * will open the dialog to write label and add the field into formConfig and formElements array
   * @param data - new form field to be added
   */
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

  /**
   * will handle the form field drop event, dragged from the sidebar
   * @param event - drop event into the form container
   */
  handleFieldDrop(event: CdkDragDrop<FORM_FIELD>) {
    const { data } = event.item;
    this.addNewField(data);
  }

  /**
   * update the formConfigHistory to save current data and make space for new formConfig
   */
  updateFormConfigs() {
    this.formElementsArray.controls.forEach((control, i) => {
      this.formConfig[i].value = control.value;
    });
    this.formConfigHistory.count += 1;
    this.formConfigHistory.current += 1;
  }

  /**
   * will intialize form config history too add new form configs
   */
  initFormConfigHistory() {
    this.formConfigHistory.formConfigs = [
      ...this.formConfigHistory.formConfigs,
      {
        createdAt: Date.now().toString(),
        elements: [],
      },
    ];
  }

  /**
   * handle form submission and call required functions
   */
  handleFormSubmit() {
    this.updateFormConfigs();
    this.initFormConfigHistory();
    this.initDndForm();
  }

  /**
   * will update formConfigHistory current pointer and intialize form for the currently selected formConfig
   * @param index - current selected index 
   */
  updateCurrentFormConfig(index: number) {
    this.formConfigHistory.current = index;
    this.initDndForm();
  }

  ngOnInit() {
    this.initFormConfigHistory();
    this.initDndForm();
  }
}
