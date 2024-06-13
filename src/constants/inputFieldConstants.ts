// inputFieldConstants.ts

import React from 'react';
import TextFieldSettings from '@components/molecules/TextFieldSettings';
import SelectFieldSettings from '@components/molecules/SelectFieldSettings';
import TextFieldDesigner from '@components/molecules/TextFieldDesigner';
import SelectFieldDesigner from '@components/molecules/SelectFieldDesigner';

//constants
import { fieldTypes } from "@constants/fieldTypes"

//icons

import { LucideIcon, TextCursorInput } from "lucide-react"
import StepperDesigner from '@components/molecules/StepperDesigner';

interface InputFieldConfig {
    type: string;
    icon: LucideIcon;
    propertyComponent: React.ElementType;
    designerComponent: React.ElementType;
    construct: () => Record<string, unknown>;
}

const INPUT_FIELDS: { [key: string]: InputFieldConfig } = {
    [fieldTypes.TEXT]: {
        type: fieldTypes.TEXT,
        propertyComponent: TextFieldSettings,
        designerComponent: TextFieldDesigner,
        icon: TextCursorInput,
        construct: () => ({
            id: Date.now().toString(),
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
        icon: TextCursorInput,

        construct: () => ({
            id: Date.now().toString(),
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
        icon: TextCursorInput,

        construct: () => ({
            id: Date.now().toString(),
            type: fieldTypes.SECTION,
            cols: 1,
            isCollapsable: true
        }),
    },
    [fieldTypes.STEPPER]: {
        type: fieldTypes.STEPPER,
        propertyComponent: SelectFieldDesigner,
        designerComponent: StepperDesigner,
        icon: TextCursorInput,

        construct: () => ({
            id: Date.now().toString(),
            type: fieldTypes.STEPPER,
            isCollapse: false
        })
    }
};

export default INPUT_FIELDS;
