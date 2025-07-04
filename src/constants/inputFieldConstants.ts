import React from "react";
import SelectFieldSettings from "@components/organisms/property/SelectFieldSettings";
import SelectFieldDesigner from "@components/organisms/designer/SelectFieldDesigner";
import RadioButtonFieldDesigner from "@components/organisms/designer/RadioButtonFieldDesigner";
import RadioButtonFieldSettings from "@components/organisms/property/RadioButtonFieldSettings";
import CheckBoxFieldSettings from "@components/organisms/property/CheckboxFieldSettings";
import DateTimeFieldDesigner from "@components/organisms/designer/DateTimeFieldDesigner";
import DateTimeFieldSettings from "@components/organisms/property/DateTimeFieldSettings";
import StepperDesigner from "@components/organisms/designer/StepperDesigner";
import NumberFieldSettings from "@components/organisms/property/NumberFieldSettings";
import NumberFieldDesigner from "@components/organisms/designer/NumberFieldDesigner";
import PasswordFieldSettings from "@components/organisms/property/PasswordFieldSettings";
import PasswordFieldDesigner from "@components/organisms/designer/PasswordFieldDesigner";
import CheckboxFieldDesigner from "@components/organisms/designer/CheckboxFieldDesigner";
import TextAreaFieldSettings from "@components/organisms/property/TextAreaFieldSettings";
import TextAreaFieldDesigner from "@components/organisms/designer/TextAreaFieldDesigner";
import SectionFieldSettings from "@components/organisms/property/SectionFieldSettings";
import StepperFieldSettings from "@components/organisms/property/StepperFieldSettings";
import ImageUploadFieldSettings from "@components/organisms/property/ImageUploadFieldSettings";
import ImageUploadFieldDesigner from "@components/organisms/designer/ImageUploadFieldDesigner";
import SectionDesigner from "@components/organisms/designer/SectionDesigner";

import { VARIANT, fieldTypes } from "@constants/fieldTypes";

import { IconType } from "react-icons";
import { CiText } from "react-icons/ci";
import { IoMdCheckbox, IoMdRadioButtonOn } from "react-icons/io";
import { BsCalendar2DateFill, BsTextareaT } from "react-icons/bs";
import { FaCopy, FaFileUpload } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { MdCheckBoxOutlineBlank, MdOutlinePassword } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { TbGridDots, TbSection } from "react-icons/tb";
import { FaParagraph } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";

import SelectInput from "@components/atoms/SelectInput";
import SectionComponent from "@components/organisms/SectionComponent";
import GridFieldSettings from "@components/organisms/property/GridFieldSettings";
import GridFieldDesigner from "@components/organisms/designer/GridFieldDesigner";
import GridComponent from "@components/molecules/GridComponent";
import CheckBox from "@components/atoms/Checkbox";
import CustomDatePicker from "@components/atoms/DatePicker";
import CustomTextArea from "@components/atoms/TextArea";
import NumberInput from "@components/atoms/NumberInput";
import RadioInput from "@components/atoms/RadioInput";
import InputFieldSettings from "@components/organisms/property/InputFieldSettings";
import InputFieldDesigner from "@components/organisms/designer/InputFieldDesigner";
import InputField from "@components/atoms/Input";
import PasswordInput from "@components/atoms/PasswordInput";
import TextField from "@components/atoms/TextField";
import TextFieldSettings from "@components/organisms/property/TextFieldSettings";
import TextFieldDesigner from "@components/organisms/designer/TextFieldDesigner";
import AadharCardSettings from "@components/organisms/property/AadharCardSettings";
import AadharCardDesigner from "@components/organisms/designer/AadharCardDesigner";
import Summary from "@components/molecules/Summary";
import SummarySettings from "@components/organisms/property/SummarySettings";
import SummaryDesigner from "@components/organisms/designer/SummaryDesigner";
import ImageSettings from "@components/organisms/property/ImageSettings";
import ImageDesigner from "@components/organisms/designer/ImageDesigner";
import Image from "@components/atoms/Image";
import ImageUpload from "@components/atoms/ImageUpload";

import SameAsAboveDesigner from "@components/organisms/designer/SameAsAboveDesigner";
import SameAsAboveFieldSetting from "@components/organisms/property/SameAsAboveFieldSetting";
import SameAsAbove from "@components/molecules/SameAsAbove";
import AadharCard from "@components/molecules/AdharCard";
import Capture from "@components/atoms/Capture";
import CaptureFieldSettings from "@components/organisms/property/CaptureFieldSettings";
import CaptureFieldDesigner from "@components/organisms/designer/CaptureFieldDesigner";
import DividerWithHeader from "@components/atoms/Divider";
import DividerSettings from "@components/organisms/property/DividerSettings";
import DividerDesinger from "@components/organisms/designer/DividerDesinger";
import UploadDocumentsSettings from "@components/organisms/property/UploadDocumentsSettings";
import UploadDocuments from "@components/molecules/UploadDocuments";
import UploadDocumentsDesigner from "@components/organisms/designer/UploadDocumentsDesigner";

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

export const RADIO_DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

const INPUT_FIELDS: { [key: string]: InputFieldConfig } = {
  [fieldTypes.INPUT]: {
    type: fieldTypes.INPUT,
    propertyComponent: InputFieldSettings,
    designerComponent: InputFieldDesigner,
    renderComponent: InputField,
    icon: CiText,
    title: "Input",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.INPUT,
      variant: VARIANT.FIELD,
      label: "Label",
      name: "",
      placeholder: "Placeholder",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.SELECT]: {
    type: fieldTypes.SELECT,
    propertyComponent: SelectFieldSettings,
    designerComponent: SelectFieldDesigner,
    renderComponent: SelectInput,

    icon: MdCheckBoxOutlineBlank,
    title: "Select",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.SELECT,
      variant: VARIANT.FIELD,
      label: "Select Label",
      name: "",
      options: [],
      defaultValue: "",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.SECTION]: {
    type: fieldTypes.SECTION,
    propertyComponent: SectionFieldSettings,
    designerComponent: SectionDesigner,
    renderComponent: SectionComponent,
    icon: TbSection,
    title: "Section",
    variant: VARIANT.SECTION,
    construct: () => ({
      type: fieldTypes.SECTION,
      variant: VARIANT.SECTION,
      title: "section 1",
      isCollapsable: true,
      conditions: {
        combinator: "and",
        rules: [],
      },
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
      variant: VARIANT.STEPPER,
      title: "Step",
    }),
  },
  [fieldTypes.RADIO]: {
    type: fieldTypes.RADIO,
    propertyComponent: RadioButtonFieldSettings,
    designerComponent: RadioButtonFieldDesigner,
    renderComponent: RadioInput,
    icon: IoMdRadioButtonOn,
    title: "Radio",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.RADIO,
      variant: VARIANT.FIELD,
      label: "Radio Label",
      name: "",
      direction: RADIO_DIRECTION.VERTICAL,
      options: [],
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
      optionType: "default",
      buttonStyle: "solid",
    }),
  },
  [fieldTypes.CHECKBOX]: {
    type: fieldTypes.CHECKBOX,
    propertyComponent: CheckBoxFieldSettings,
    designerComponent: CheckboxFieldDesigner,
    renderComponent: CheckBox,
    icon: IoMdCheckbox,
    title: "CheckBox",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.CHECKBOX,
      variant: VARIANT.FIELD,
      label: "Checkbox Label",
      name: "",
      options: [],
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.DATETIME]: {
    type: fieldTypes.DATETIME,
    propertyComponent: DateTimeFieldSettings,
    designerComponent: DateTimeFieldDesigner,
    renderComponent: CustomDatePicker,
    icon: BsCalendar2DateFill,
    title: "DateTime",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.DATETIME,
      variant: VARIANT.FIELD,
      label: "DateTime label",
      name: "",
      defaultValue: "",
      dateFormat: "DD-MM-YYYY",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  // [fieldTypes.FILEUPLOAD]: {
  //     type: fieldTypes.FILEUPLOAD,
  //     propertyComponent: FileUploadFieldSettings,
  //     designerComponent: FileUploadFieldDesigner,
  //     renderComponent: FileUpload,
  //     icon: FaFileUpload,
  //     title: "File Upload",
  //     variant: VARIANT.FIELD,
  //     construct: () => ({
  //         type: fieldTypes.FILEUPLOAD,
  //         variant: VARIANT.FIELD,
  //         label: 'File Upload Label',
  //         name: '',
  //         validations: {
  //             required: false,
  //             maxCount: 1,
  //             accept: '',
  //             maxSize: null,
  //         },
  //         conditions: {
  //             combinator: 'and',
  //             rules: [],
  //         },
  //     }),
  // },
  [fieldTypes.UPLOADDOCUMENTS]: {
    type: fieldTypes.UPLOADDOCUMENTS,
    propertyComponent: UploadDocumentsSettings,
    designerComponent: UploadDocumentsDesigner,
    renderComponent: UploadDocuments,
    icon: FaFileUpload,
    title: "Upload Documents",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.UPLOADDOCUMENTS,
      variant: VARIANT.FIELD,
      label: "File Upload Label",
      name: "",
      validations: {
        required: false,
        maxCount: 1,
        accept: "",
        maxSize: null,
      },
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.FILEUPLOAD]: {
    type: fieldTypes.FILEUPLOAD,
    propertyComponent: ImageUploadFieldSettings,
    designerComponent: ImageUploadFieldDesigner,
    renderComponent: ImageUpload,
    icon: FaFileImage,
    title: "File Upload",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.FILEUPLOAD,
      variant: VARIANT.FIELD,
      label: "File Upload Label",
      name: "",
      validations: {
        required: false,
        maxCount: 1,
        accept: "",
        maxSize: null,
      },
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.IMAGECAPTURE]: {
    type: fieldTypes.IMAGECAPTURE,
    propertyComponent: CaptureFieldSettings,
    designerComponent: CaptureFieldDesigner,
    renderComponent: Capture,
    icon: AiFillCamera,
    title: "Capture",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.IMAGECAPTURE,
      variant: VARIANT.FIELD,
      label: "Capture",
      name: "",
      validations: {
        required: false,
      },
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.NUMBER]: {
    type: fieldTypes.NUMBER,
    propertyComponent: NumberFieldSettings,
    designerComponent: NumberFieldDesigner,
    renderComponent: NumberInput,
    icon: GoNumber,
    title: "Number",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.NUMBER,
      variant: VARIANT.FIELD,
      label: "Number Label",
      name: "",
      defaultValue: null,
      min: null,
      max: null,
      step: 1,
      showControls: true,
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.PASSWORD]: {
    type: fieldTypes.PASSWORD,
    propertyComponent: PasswordFieldSettings,
    designerComponent: PasswordFieldDesigner,
    renderComponent: PasswordInput,
    icon: MdOutlinePassword,
    title: "Password",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.PASSWORD,
      variant: VARIANT.FIELD,
      label: "Password Label",
      name: "",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },

  [fieldTypes.TEXTAREA]: {
    type: fieldTypes.TEXTAREA,
    propertyComponent: TextAreaFieldSettings,
    designerComponent: TextAreaFieldDesigner,
    renderComponent: CustomTextArea,
    icon: BsTextareaT,
    title: "TextArea",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.TEXTAREA,
      variant: VARIANT.FIELD,
      label: "Text Area Label",
      name: "",
      defaultValue: "",
      validations: {},
      rows: 3,
      cols: 30,
      maxLength: null,
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.GRID]: {
    type: fieldTypes.GRID,
    propertyComponent: GridFieldSettings,
    designerComponent: GridFieldDesigner,
    renderComponent: GridComponent,

    icon: TbGridDots,
    title: "Grid",
    variant: VARIANT.GRID,
    construct: () => ({
      type: fieldTypes.GRID,
      variant: VARIANT.GRID,
      cols: 2,
      placement: "start",
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.TEXT]: {
    type: fieldTypes.TEXT,
    propertyComponent: TextFieldSettings,
    designerComponent: TextFieldDesigner,
    renderComponent: TextField,
    icon: FaParagraph,
    title: "Text",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.TEXT,
      variant: VARIANT.FIELD,
      label: "Label",
      fontSize: 16,
      textColor: "",
      paragraph: "",
      placeholder: "Placeholder",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.AADHAR]: {
    type: fieldTypes.AADHAR,
    propertyComponent: AadharCardSettings,
    designerComponent: AadharCardDesigner,
    renderComponent: AadharCard,
    icon: FaAddressCard,
    title: "Aadhar Details",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.AADHAR,
      variant: VARIANT.FIELD,
      label: "Label",
      validations: {},
      mapFields: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
      config: {},
    }),
  },
  [fieldTypes.SUMMARY]: {
    type: fieldTypes.SUMMARY,
    propertyComponent: SummarySettings,
    designerComponent: SummaryDesigner,
    renderComponent: Summary,
    icon: BsTextParagraph,
    title: "Summary",
    variant: VARIANT.SUMMARY,
    construct: () => ({
      type: fieldTypes.SUMMARY,
      variant: VARIANT.SUMMARY,
      label: "Label",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.IMAGE]: {
    type: fieldTypes.IMAGE,
    propertyComponent: ImageSettings,
    designerComponent: ImageDesigner,
    renderComponent: Image,
    icon: FaFileImage,
    title: "Image",
    variant: VARIANT.IMAGE,
    construct: () => ({
      type: fieldTypes.IMAGE,
      variant: VARIANT.IMAGE,
      label: "Label",
      name: "",
      src: "",
      height: "",
      width: 60,
    }),
  },
  [fieldTypes.SAMEASABOVE]: {
    type: fieldTypes.SAMEASABOVE,
    propertyComponent: SameAsAboveFieldSetting,
    designerComponent: SameAsAboveDesigner,
    renderComponent: SameAsAbove,
    icon: FaCopy,
    title: "Same As Above",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.SAMEASABOVE,
      variant: VARIANT.FIELD,
      label: "Same As Above",
      validations: {},
      conditions: {
        combinator: "and",
        rules: [],
      },
    }),
  },
  [fieldTypes.DIVIDER]: {
    type: fieldTypes.DIVIDER,
    propertyComponent: DividerSettings,
    designerComponent: DividerDesinger,
    renderComponent: DividerWithHeader,
    icon: RxDividerVertical,
    title: "Divider",
    variant: VARIANT.FIELD,
    construct: () => ({
      type: fieldTypes.DIVIDER,
      variant: VARIANT.FIELD,
      title: "Divider",
    }),
  },
};

export default INPUT_FIELDS;
