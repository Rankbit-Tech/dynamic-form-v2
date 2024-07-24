import React from 'react';
import { IconType } from "react-icons";
export interface InputFieldConfig {
    type: string;
    icon: IconType;
    title: string;
    variant: string;
    propertyComponent: React.ElementType;
    renderComponent?: React.ElementType;
    designerComponent: React.ElementType;
    construct: () => Record<string, unknown>;
}
declare const INPUT_FIELDS: {
    [key: string]: InputFieldConfig;
};
export default INPUT_FIELDS;
//# sourceMappingURL=inputFieldConstants.d.ts.map