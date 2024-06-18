// inputFieldConstants.ts

import React from 'react';
import TextFieldSettings from '@components/molecules/TextFieldSettings';
import SelectFieldSettings from '@components/molecules/SelectFieldSettings';
import TextFieldDesigner from '@components/molecules/TextFieldDesigner';
import SelectFieldDesigner from '@components/molecules/SelectFieldDesigner';
import RadioButtonFieldDesigner from '@components/organisms/RadioButtonFieldDesigner';
import RadioButtonFieldSettings from '@components/organisms/RadioButtonFieldSettings';
import CheckBoxFieldDesigner from '@components/organisms/CheckboxFieldDesigner';
import CheckBoxFieldSettings from '@components/organisms/CheckboxFieldSettings';
import DateTimeFieldDesigner from '@components/organisms/DateTimeFieldDesigner';
import DateTimeFieldSettings from '@components/organisms/DateTimeFieldSettings';
import FileUploadFieldSettings from '@components/organisms/FileUploadFieldSettings';
import FileUploadFieldDesigner from '@components/organisms/FileUploadFieldDesigner';
import StepperDesigner from '@components/molecules/StepperDesigner';
import NumberFieldSettings from '@components/organisms/NumberFieldSettings';
import NumberFieldDesigner from '@components/organisms/NumberFieldDesigner';
import PasswordFieldSettings from '@components/organisms/PasswordFieldSettings';
import PasswordFieldDesigner from '@components/organisms/PasswordFieldDesigner';



//constants
import { fieldTypes } from "@constants/fieldTypes"

//icons
import { IconType } from "react-icons";
import { CiText } from "react-icons/ci";
import { LuBoxSelect } from 'react-icons/lu';
import { TbSection } from 'react-icons/tb';
import { IoMdCheckbox, IoMdRadioButtonOn } from 'react-icons/io';
import { BsCalendar2DateFill, BsTextareaT } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { GoNumber } from 'react-icons/go';
import { MdOutlinePassword } from 'react-icons/md';
import { RxDividerVertical } from 'react-icons/rx';

interface InputFieldConfig {
    type: string;
    icon: IconType;
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
        construct: () => ({
            type: fieldTypes.TEXT,
            label: '',
            name: '',
            placeholder: '',
            validations: [],
        }),
    },
    [fieldTypes.SELECT]: {
        type: fieldTypes.SELECT,
        propertyComponent: SelectFieldSettings,
        designerComponent: SelectFieldDesigner,
        icon: LuBoxSelect,

        construct: () => ({
            type: fieldTypes.SELECT,
            label: '',
            name: '',
            options: [],
            validations: [],
        }),
    },
    [fieldTypes.SECTION]: {
        type: fieldTypes.SECTION,
        propertyComponent: SelectFieldSettings,
        designerComponent: SelectFieldDesigner,
        icon: TbSection,

        construct: () => ({
            type: fieldTypes.SECTION,
            cols: 1,
            isCollapsable: true
        }),
    },
    [fieldTypes.STEPPER]: {
        type: fieldTypes.STEPPER,
        propertyComponent: SelectFieldDesigner,
        designerComponent: StepperDesigner,
        icon: RxDividerVertical,

        construct: () => ({
            type: fieldTypes.STEPPER,
            isCollapse: false
        })
    },

    [fieldTypes.RADIO]: {
        type: fieldTypes.RADIO,
        propertyComponent: RadioButtonFieldSettings,
        designerComponent: RadioButtonFieldDesigner,
        icon: IoMdRadioButtonOn,

        construct: () => ({
            type: fieldTypes.RADIO,
            label: '',
            name: '',
            options: [],
            validations: [],
        }),
    },

    [fieldTypes.CHECKBOX]: {
        type: fieldTypes.CHECKBOX,
        propertyComponent: CheckBoxFieldSettings,
        designerComponent: CheckBoxFieldDesigner,
        icon: IoMdCheckbox,
        construct: () => ({
            type: fieldTypes.CHECKBOX,
            label: '',
            name: '',
            Option: [],
            validations: [],
        }),

    },
    [fieldTypes.DATETIME]: {
        type: fieldTypes.DATETIME,
        propertyComponent: DateTimeFieldSettings,
        designerComponent: DateTimeFieldDesigner,
        icon: BsCalendar2DateFill,

        construct: () => ({
            type: fieldTypes.DATETIME,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],

        }),


    },
    [fieldTypes.FILEUPLOAD]: {
        type: fieldTypes.FILEUPLOAD,
        propertyComponent: FileUploadFieldSettings,
        designerComponent: FileUploadFieldDesigner,
        icon: FaFileUpload,

        construct: () => ({
            type: fieldTypes.DATETIME,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],

        }),


    },
    [fieldTypes.NUMBER]: {
        type: fieldTypes.NUMBER,
        propertyComponent: NumberFieldSettings,
        designerComponent: NumberFieldDesigner,
        icon: GoNumber,

        construct: () => ({
            type: fieldTypes.NUMBER,
            label: '',
            name: '',
            defaultValue: null,
            min: null,
            max: null,
            step: 1,
            validations: [],

        }),


    },
    [fieldTypes.PASSWORD]: {
        type: fieldTypes.PASSWORD,
        propertyComponent: PasswordFieldSettings,
        designerComponent: PasswordFieldDesigner,
        icon: MdOutlinePassword,

        construct: () => ({
            type: fieldTypes.PASSWORD,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],
            minLength: null,
            maxLength: null,
            pattern: '',
        }),



    },

    [fieldTypes.TEXTAREA]: {
        type: fieldTypes.TEXTAREA,
        propertyComponent: TextFieldSettings,
        designerComponent: TextFieldDesigner,
        icon: BsTextareaT,

        construct: () => ({
            type: fieldTypes.TEXTAREA,
            label: '',
            name: '',
            defaultValue: '',
            validations: [],
            rows: 3,
            cols: 30,
            maxLength: null,
        }),




    },


};

export default INPUT_FIELDS