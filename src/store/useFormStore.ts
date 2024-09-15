import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type RecordType = Record<string, any>;
type recordArray = Record<string, any>[];

const test = [
  {
    id: "FRGyB9i1nauxQ-An061Uk",
    type: "STEPPER",
    variant: "STEPPER",
    title: "Workmen Details",
    validations: {},
    conditions: {},
    mapFields: {},
  },
  {
    id: "X3YbP3kn7l3Q71Xfh7esy",
    type: "SECTION",
    variant: "SECTION",
    title: "Aadhaar Details",
    isCollapsable: true,
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "FRGyB9i1nauxQ-An061Uk",
    validations: {},
    mapFields: {},
  },
  {
    id: "4wmKH-zYDW-aklIcqQNKR",
    type: "SECTION",
    variant: "SECTION",
    title: "Personal Details",
    isCollapsable: true,
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "FRGyB9i1nauxQ-An061Uk",
    validations: {},
    mapFields: {},
  },
  {
    id: "S-MlsG31j_7m70SqnesYf",
    type: "SECTION",
    variant: "SECTION",
    title: "section 1",
    isCollapsable: true,
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "FRGyB9i1nauxQ-An061Uk",
  },
  {
    id: "5wKbWiwewZA-_hmPzFiVv",
    type: "CHECKBOX",
    variant: "FIELD",
    label: "",
    name: "accept",
    options: [
      {
        label:
          "I hereby, at my own discretion, voluntarily submit the physical copy of my Aadhaar card / physical e-Aadhaar / masked Aadhaar / offline electronic Aadhaar / copies of my Aadhaar card in physical or electronic form or xml as issued by UIDAI (Aadhaar), for the purpose of establishing my identity / age / address proof and voluntarily give my consent for the purpose of employment-related verification. I understand that I have the right to withdraw this consent at any point in time and that I have the right to complain to the Data Protection Board of India for any breach of my personal identity.",
        value: "true",
      },
    ],
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [
        {
          field: "",
          operator: "equals",
          valueSource: "value",
          value: "",
        },
      ],
    },
    parentId: "X3YbP3kn7l3Q71Xfh7esy",
    mapFields: {},
  },
  {
    id: "p8jHQjP8DyZ0APh_va2uS",
    type: "AADHAR",
    variant: "FIELD",
    label: "Label",
    validations: {},
    mapFields: {},
    conditions: {
      combinator: "and",
      rules: [
        {
          field: "accept",
          operator: "isEmpty",
          valueSource: "value",
          value: "hide",
        },
      ],
    },
    parentId: "X3YbP3kn7l3Q71Xfh7esy",
  },
  {
    id: "Dh8e7n4ABH53P0-g3l0au",
    type: "GRID",
    variant: "GRID",
    cols: 4,
    placement: "start",
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4wmKH-zYDW-aklIcqQNKR",
    validations: {},
    mapFields: {},
  },
  {
    id: "TBLPDGLrMXLpo7Pw3sAfW",
    type: "SAMEASABOVE",
    variant: "FIELD",
    label: "Same As Above",
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4wmKH-zYDW-aklIcqQNKR",
  },
  {
    id: "4qp6Jxj74nA3Cy6r8oEiY",
    type: "GRID",
    variant: "GRID",
    cols: 4,
    placement: "start",
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4wmKH-zYDW-aklIcqQNKR",
    validations: {},
    mapFields: {},
  },
  {
    id: "iQQyJDGSe9dkoVcgS6BxH",
    type: "INPUT",
    variant: "FIELD",
    label: "First Name",
    name: "firstName",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "gNRiSt5WRXq18nq8pkRhQ",
    type: "INPUT",
    variant: "FIELD",
    label: " Middle Name",
    name: " middle Name",
    placeholder: "Placeholder",
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "INhhifDdMroe-CRBIWSU1",
    type: "INPUT",
    variant: "FIELD",
    label: " Last Name",
    name: "last name",
    placeholder: "Placeholder",
    validations: {
      required: false,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "-DmHJTElUOlwQ7VgG2FYQ",
    type: "INPUT",
    variant: "FIELD",
    label: " Long Name",
    name: "long name",
    placeholder: "Placeholder",
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "ghR-dvGbNj1o4U32Sy_TW",
    type: "INPUT",
    variant: "FIELD",
    label: "Aadhaar Long Name",
    name: "aadhaar_name",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [
        {
          field: "firstName",
          operator: "isEmpty",
          valueSource: "value",
          value: "hide",
        },
      ],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "lse26V2WL4Ww4p0oi6aBy",
    type: "RADIO",
    variant: "FIELD",
    label: "Gender",
    name: "gender",
    direction: "vertical",
    options: [
      {
        label: "Male",
        value: "true",
      },
      {
        label: "Female",
        value: "true",
      },
    ],
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    optionType: "default",
    buttonStyle: "solid",
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "q02SM9KBSwibN3JlBVntj",
    type: "INPUT",
    variant: "FIELD",
    label: " Father / Guardian's Name",
    name: "Father_name",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "eqqVucfJiQBTjvn0lPXWk",
    type: "DATETIME",
    variant: "FIELD",
    label: " Date of Birth",
    name: "dob",
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "eSPWugprizD_MtrTI5eSe",
    type: "DATETIME",
    variant: "FIELD",
    label: "Aadhaar Date of Birth",
    name: "Date of Birth",
    defaultValue: "",
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "0WKXcATQeG9gQAubY_hsE",
    type: "NUMBER",
    variant: "FIELD",
    label: "Mobile Number",
    name: "number",
    defaultValue: null,
    min: null,
    max: null,
    step: 1,
    showControls: true,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "Gj9wqnnQ-26bHch9b9NUH",
    type: "INPUT",
    variant: "FIELD",
    label: "Alternate Contact Number",
    name: "Alternate name",
    placeholder: "Placeholder",
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "UnVo49x27Tq69epZzR18U",
    type: "INPUT",
    variant: "FIELD",
    label: "Age",
    name: "age",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "TjFQ2F0f0S_8LHXNmcMWi",
    type: "NUMBER",
    variant: "FIELD",
    label: "Aadhaar Number",
    name: "Aadhaar Number",
    defaultValue: null,
    min: null,
    max: null,
    step: 1,
    showControls: true,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "pC1J8WWGW93tX-mQ8wdut",
    type: "SELECT",
    variant: "FIELD",
    label: " Marital Status",
    name: "Marital Status",
    options: [
      {
        label: "Married",
        value: "married",
      },
      {
        label: "Unmarried",
        value: "unmarried",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "CkoIpiXThB9RXeIYEHnUo",
    type: "NUMBER",
    variant: "FIELD",
    label: "Emergency Contact Number",
    name: "Emergency Contact Number",
    defaultValue: null,
    min: null,
    max: null,
    step: 1,
    showControls: true,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "BmkWhp7Rx8PsNznOYg6M8",
    type: "SELECT",
    variant: "FIELD",
    label: "Religion",
    name: "Religion",
    options: [
      {
        label: "Hindu",
        value: "Hindu",
      },
      {
        label: "Muslim",
        value: "Muslim",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "godCbfTYJolCGV-3FMfFx",
    type: "INPUT",
    variant: "FIELD",
    label: "Domicile",
    name: "Domicile",
    placeholder: "Placeholder",
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "8IQQ8CvFRtvjNefqDkqjt",
    type: "INPUT",
    variant: "FIELD",
    label: "Number of years spent in State",
    name: "Number of years spent in State",
    placeholder: "Placeholder",
    validations: {
      required: false,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "aqnTJIPmgXZ146qjMtaSw",
    type: "RADIO",
    variant: "FIELD",
    label: "",
    name: "",
    direction: "vertical",
    options: [
      {
        label: "Handicapped?",
        value: "Handicapped",
      },
    ],
    validations: {},
    conditions: {
      combinator: "and",
      rules: [],
    },
    optionType: "default",
    buttonStyle: "solid",
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "5IRJZ4mVdSXl7UYf9XYWc",
    type: "IMAGE",
    variant: "IMAGE",
    label: "Aadhaar Photo",
    src: "",
    height: "",
    width: 60,
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    conditions: {
      rules: [],
      combinator: "and",
      not: false,
    },
    validations: {},
    mapFields: {},
  },
  {
    id: "U7Wgsy3W4ZQJj6FRCP-8Z",
    type: "FILEUPLOAD",
    variant: "FIELD",
    label: "Biometric Image",
    name: "Biometric Image",
    accept: "",
    maxFileSize: null,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "P5gRB0wMfNaMqHIdjJ5UO",
    type: "FILEUPLOAD",
    variant: "FIELD",
    label: "Electronic Signature",
    name: "Electronic Signature",
    accept: "",
    maxFileSize: null,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "Dh8e7n4ABH53P0-g3l0au",
    mapFields: {},
  },
  {
    id: "HcrezgI8N6DZWxZKj6wSl",
    type: "INPUT",
    variant: "FIELD",
    label: "Present Address Line 1",
    name: "Present Address Line 1",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "QVWaewSoA-sWXoshwju-J",
    type: "INPUT",
    variant: "FIELD",
    label: "Present Address Line 2",
    name: "Present Address Line 2",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "-tT-G3QG1LhntKfD0NKbC",
    type: "INPUT",
    variant: "FIELD",
    label: "Present Address Line 3",
    name: "Present Address Line 3",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "iQsygSrXpeXmK2_YokVWY",
    type: "INPUT",
    variant: "FIELD",
    label: "Village/Mandal",
    name: "Village/Mandal",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "tM-B8eJ4JmcxEzzAmkHqC",
    type: "INPUT",
    variant: "FIELD",
    label: "State",
    name: "State",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "L9MZ3N72oIjaGphlZnpoP",
    type: "INPUT",
    variant: "FIELD",
    label: "District",
    name: "District",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "2HRRL8L875WABXEZZt8pK",
    type: "NUMBER",
    variant: "FIELD",
    label: "Pincode",
    name: "Pincode",
    defaultValue: null,
    min: null,
    max: null,
    step: 1,
    showControls: true,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "XZsdECdgl1VfeAZMb-7OH",
    type: "INPUT",
    variant: "FIELD",
    label: " Country",
    name: " Country",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "2zmtse2VYvck-0lHdc1ue",
    type: "INPUT",
    variant: "FIELD",
    label: "Tehsil",
    name: "Tehsil",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "b0bSbb7a3Z91GXNjQ2Ro3",
    type: "INPUT",
    variant: "FIELD",
    label: "Taluka",
    name: "Taluka",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "4qp6Jxj74nA3Cy6r8oEiY",
    mapFields: {},
  },
  {
    id: "ZDBdV674GbUNyO73tL-cV",
    type: "GRID",
    variant: "GRID",
    cols: 4,
    placement: "start",
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "S-MlsG31j_7m70SqnesYf",
    validations: {},
    mapFields: {},
  },
  {
    id: "UxbZYvjfK9xD-LzekEljA",
    type: "SELECT",
    variant: "FIELD",
    label: "Unit Name",
    name: "Unit Name",
    options: [
      {
        label: "Hazira West",
        value: "Hazira West",
      },
      {
        label: "Hazira East",
        value: "Hazira east",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "cZG1Kcy3PWSrGdWCRopPJ",
    type: "INPUT",
    variant: "FIELD",
    label: "Worker Code",
    name: "Worker Code",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "CchD-FSZd3ZscTWCFJPcZ",
    type: "NUMBER",
    variant: "FIELD",
    label: "EPN Number",
    name: "EPN Number",
    defaultValue: null,
    min: null,
    max: null,
    step: 1,
    showControls: true,
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "3dSBcNjoVSJ6_sfk0V22U",
    type: "INPUT",
    variant: "FIELD",
    label: " Location ID",
    name: " Location ID",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "rjN_LjWCf2FY_im1NDEcw",
    type: "SELECT",
    variant: "FIELD",
    label: "Technical Details",
    name: "Technical Details",
    options: [
      {
        label: "Electrical",
        value: "Electrical",
      },
      {
        label: "Civile",
        value: "Civile",
      },
      {
        label: "Mechanical",
        value: "Mechanical",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "2BMvMFDFNeeVnyB_UJn8T",
    type: "SELECT",
    variant: "FIELD",
    label: " Type of Contract",
    name: " Type of Contract",
    options: [
      {
        label: "Engineering fabrication  ",
        value: "fabrication ",
      },
      {
        label: "Engineering Work",
        value: "work",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "xq2JD8Bi-Jrol1uXWGKdM",
    type: "SELECT",
    variant: "FIELD",
    label: " Police Verification",
    name: " Police Verification",
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "mRlunrDZmKuDGGO-MDCL6",
    type: "SELECT",
    variant: "FIELD",
    label: " Gate Number",
    name: " Gate Number",
    options: [
      {
        label: "Gate2",
        value: "gate2",
      },
      {
        label: "Gate3",
        value: "gate3",
      },
    ],
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "NykTWzIUedlVF5-xTBAJu",
    type: "DATETIME",
    variant: "FIELD",
    label: "Safety Training From Date",
    name: "Safety Training From Date",
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "adKTB56XrT62etZbwhhiq",
    type: "DATETIME",
    variant: "FIELD",
    label: "Safety Training Upto Date",
    name: "Safety Training Upto Date",
    defaultValue: "",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
  {
    id: "Wm3Rax4NpY8Ye1jrVRH9G",
    type: "INPUT",
    variant: "FIELD",
    label: " Safety Training Remarks",
    name: " Safety Training Remarks",
    placeholder: "Placeholder",
    validations: {
      required: true,
    },
    conditions: {
      combinator: "and",
      rules: [],
    },
    parentId: "ZDBdV674GbUNyO73tL-cV",
    mapFields: {},
  },
];

interface Field {
  label: string;
  value: string;
}

interface Step {
  title: string;
  fields: Field[];
}
export type FormConfig = {
  initialValues?: any;
  context?: any;
};
interface FormState {
  fields: recordArray;
  isPreview: boolean;
  selectedField: RecordType | null;
  formValues: RecordType;
  formConfig: FormConfig;
  setSelected: (data: RecordType | null) => void;
  setFields: (data: RecordType | null) => void;
  setIsPreview: (flag: boolean) => void;
  setFormValues: (data: RecordType | null) => void;
  getSummary: () => Step[];
  setFormConfig: (data: FormConfig) => void;
}

export const useFormStore = create<FormState>()(
  devtools(
    immer((set, get) => ({
      fields: test,
      isPreview: false,
      selectedField: null,
      formValues: {},
      formConfig: {},
      setSelected: (data: RecordType | null) => {
        set((state: FormState) => {
          state.selectedField = data;
        });
      },
      setIsPreview: (flag: boolean) => {
        set((state: FormState) => {
          state.isPreview = flag;
          state.formValues = {};
        });
      },
      setFields: (callback: any) => {
        set((state: FormState) => {
          state.fields = callback(get().fields);
        });
      },
      setFormValues: (data: any) => {
        set((state: FormState) => {
          state.formValues = data;
        });
      },

      getSummary: () => {
        const { fields, formValues } = get();

        const groupedFields = fields.reduce((acc, field) => {
          if (field.variant === "FIELD") {
            const step = fields.find(
              (stepField) =>
                stepField.id === field.parentId &&
                stepField.variant === "STEPPER",
            );
            if (step) {
              if (!acc[step.id]) {
                acc[step.id] = {
                  title: step.title,
                  fields: [],
                };
              }
              acc[step.id].fields.push({
                label: field.label,
                value: formValues[field.name] || "No value",
              });
            }
          }
          return acc;
        }, {});

        return Object.values(groupedFields);
      },

      setFormConfig: (data: FormConfig) => {
        set((state: FormState) => {
          state.formConfig = data;
        });
      },
    })),
  ),
);
