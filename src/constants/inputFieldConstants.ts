// inputFieldConstants.ts

import React from 'react';
import TextFieldSettings from '@components/molecules/TextFieldSettings';
import SelectFieldSettings from '@components/molecules/SelectFieldSettings';
import TextFieldDesigner from '@components/molecules/TextFieldDesigner';
import SelectFieldDesigner from '@components/molecules/SelectFieldDesigner';


import { fieldTypes } from "@constants/fieldTypes"

interface InputFieldConfig {
    type: string;
    propertyComponent: React.ElementType;
    designerComponent: React.ElementType;
    construct: () => any;
}

const INPUT_FIELDS: { [key: string]: InputFieldConfig } = {
    [fieldTypes.TEXT]: {
        type: fieldTypes.TEXT,
        propertyComponent: TextFieldSettings,
        designerComponent: TextFieldDesigner,
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
        construct: () => ({
            id: Date.now().toString(),
            type: fieldTypes.SECTION,
            cols: 1,
            options: [],
            validations: [],
        }),
    }
};

export default INPUT_FIELDS;
