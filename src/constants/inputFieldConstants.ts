import React from 'react';
import TextFieldSettings from '@components/organisms/property/TextFieldSettings';
import SelectFieldSettings from '@components/organisms/property/SelectFieldSettings';
import TextFieldDesigner from '@components/organisms/designer/TextFieldDesigner';
import SelectFieldDesigner from '@components/organisms/designer/SelectFieldDesigner';
import RadioButtonFieldDesigner from '@components/organisms/designer/RadioButtonFieldDesigner';
import RadioButtonFieldSettings from '@components/organisms/property/RadioButtonFieldSettings';
import CheckBoxFieldSettings from '@components/organisms/property/CheckboxFieldSettings';
import DateTimeFieldDesigner from '@components/organisms/designer/DateTimeFieldDesigner';
import DateTimeFieldSettings from '@components/organisms/property/DateTimeFieldSettings';
import FileUploadFieldSettings from '@components/organisms/property/FileUploadFieldSettings';
import FileUploadFieldDesigner from '@components/organisms/designer/FileUploadFieldDesigner';
import StepperDesigner from '@components/organisms/designer/StepperDesigner';
import NumberFieldSettings from '@components/organisms/property/NumberFieldSettings';
import NumberFieldDesigner from '@components/organisms/designer/NumberFieldDesigner';
import PasswordFieldSettings from '@components/organisms/property/PasswordFieldSettings';
import PasswordFieldDesigner from '@components/organisms/designer/PasswordFieldDesigner';
import CheckboxFieldDesigner from '@components/organisms/designer/CheckboxFieldDesigner';
import TextAreaFieldSettings from '@components/organisms/property/TextAreaFieldSettings';
import TextAreaFieldDesigner from '@components/organisms/designer/TextAreaFieldDesigner';
import SectionFieldSettings from '@components/organisms/property/SectionFieldSettings';
import StepperFieldSettings from '@components/organisms/property/StepperFieldSettings';
import SectionDesigner from '@components/organisms/designer/SectionDesigner';

import { VARIANT, fieldTypes } from "@constants/fieldTypes";

import { IconType } from "react-icons";
import { CiText } from "react-icons/ci";
import { LuBoxSelect } from 'react-icons/lu';
import { IoMdCheckbox, IoMdRadioButtonOn } from 'react-icons/io';
import { BsCalendar2DateFill, BsTextareaT } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { GoNumber } from 'react-icons/go';
import { MdOutlinePassword } from 'react-icons/md';
import { RxDividerVertical } from 'react-icons/rx';
import { TbSection } from 'react-icons/tb';

export interface InputFieldConfig {
    type: string;
    icon: IconType;
    title: string;
    variant: string;
    propertyComponent: React.ElementType;
    designerComponent: React.ElementType;
    construct: () => Record<string, unknown>;
}

const INPUT_FIELDS: { [key: string]: InputFieldConfig } = {
    [fieldTypes.TEXT]: {
        type: fieldTypes.TEXT,
        propertyComponent: TextFieldSettings,
        designerComponent: TextFieldDesigner,
        icon: CiText,
        title: "Input",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.TEXT,
            label: 'Label',
            name: 'name',
            placeholder: 'Placeholder',
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.SELECT]: {
        type: fieldTypes.SELECT,
        propertyComponent: SelectFieldSettings,
        designerComponent: SelectFieldDesigner,
        icon: LuBoxSelect,
        title: "Select",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.SELECT,
            label: '',
            name: '',
            options: [],
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.SECTION]: {
        type: fieldTypes.SECTION,
        propertyComponent: SectionFieldSettings,
        designerComponent: SectionDesigner,
        icon: TbSection,
        title: "Section",
        variant: VARIANT.SECTION,
        construct: () => ({
            type: fieldTypes.SECTION,
            cols: 1,
            title: "section 1",
            isCollapsable: true,
            conditions: {},
        }),
    },
    [fieldTypes.STEPPER]: {
        type: fieldTypes.STEPPER,
        propertyComponent: StepperFieldSettings,
        designerComponent: StepperDesigner,
        icon: RxDividerVertical,
        title: "Stepper",
        variant: VARIANT.STEPPER,
        construct: () => ({
            type: fieldTypes.STEPPER,
            isCollapse: false,
            title: "Step",
            conditions: {},
        }),
    },
    [fieldTypes.RADIO]: {
        type: fieldTypes.RADIO,
        propertyComponent: RadioButtonFieldSettings,
        designerComponent: RadioButtonFieldDesigner,
        icon: IoMdRadioButtonOn,
        title: "Radio",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.RADIO,
            label: '',
            name: '',
            options: [],
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.CHECKBOX]: {
        type: fieldTypes.CHECKBOX,
        propertyComponent: CheckBoxFieldSettings,
        designerComponent: CheckboxFieldDesigner,
        icon: IoMdCheckbox,
        title: "CheckBox",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.CHECKBOX,
            label: '',
            name: '',
            options: [],
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.DATETIME]: {
        type: fieldTypes.DATETIME,
        propertyComponent: DateTimeFieldSettings,
        designerComponent: DateTimeFieldDesigner,
        icon: BsCalendar2DateFill,
        title: "DateTime",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.DATETIME,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.FILEUPLOAD]: {
        type: fieldTypes.FILEUPLOAD,
        propertyComponent: FileUploadFieldSettings,
        designerComponent: FileUploadFieldDesigner,
        icon: FaFileUpload,
        title: "FileUpload",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.FILEUPLOAD,
            label: '',
            name: '',
            accept: '', // file types
            maxFileSize: null, // in bytes
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.NUMBER]: {
        type: fieldTypes.NUMBER,
        propertyComponent: NumberFieldSettings,
        designerComponent: NumberFieldDesigner,
        icon: GoNumber,
        title: "Number",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.NUMBER,
            label: '',
            name: '',
            defaultValue: null,
            min: null,
            max: null,
            step: 1,
            validations: [],
            conditions: {},
        }),
    },
    [fieldTypes.PASSWORD]: {
        type: fieldTypes.PASSWORD,
        propertyComponent: PasswordFieldSettings,
        designerComponent: PasswordFieldDesigner,
        icon: MdOutlinePassword,
        title: "Password",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.PASSWORD,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],
            minLength: null,
            maxLength: null,
            pattern: '',
            conditions: {},
        }),
    },
    [fieldTypes.TEXTAREA]: {
        type: fieldTypes.TEXTAREA,
        propertyComponent: TextAreaFieldSettings,
        designerComponent: TextAreaFieldDesigner,
        icon: BsTextareaT,
        title: "TextArea",
        variant: VARIANT.FIELD,
        construct: () => ({
            type: fieldTypes.TEXTAREA,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],
            rows: 3,
            cols: 30,
            maxLength: null,
            conditions: {},
        }),
    },
};

export default INPUT_FIELDS;
