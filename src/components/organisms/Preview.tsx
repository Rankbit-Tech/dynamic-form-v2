import { useFormStore } from "@store/useFormStore";
import { Button, Form, Steps } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import usePreview, { Step } from "@hooks/usePreview";
import useEventBus from "@hooks/useEventBus";
import { useEffect } from "react";
import Summary from "@components/molecules/Summary";
import { FormValues, SameAsAboveOption } from "types";
import dayjs from "dayjs";

interface PreviewProps {
  data: Record<string, any>[];
  onSubmit?: (formData: Record<string, any>, form?: FormInstance) => void;
  isPreview?: boolean;
  isUpdateState?: boolean;
  showSummaryOnly?: boolean;
}

interface Item {
  key: string;
  title: string;
  content: (step: Step, formValues: Record<string, any>) => void;
}

const Preview = ({
  data,
  onSubmit,
  isPreview,
  isUpdateState,
  showSummaryOnly,
}: PreviewProps) => {
  const { setIsPreview, formConfig, setFormValues, setCurrent } = useFormStore(
    (state) => state,
  );
  const { subscribe } = useEventBus();

  const [form] = useForm();

  const { current, next, prev, items, handleValueChange, formateDataStepWise } =
    usePreview(form, data);

  useEffect(() => {
    const unsubscribeAdharData = subscribe("sendAdharData", (data) => {
      form.setFieldsValue(data);
    });

    const unsubscribeSameAsAboveFields = subscribe(
      "fillSaveAsAbove",
      ({ options, isChecked }) => {
        const updatedValues: FormValues = {};

        options?.forEach(({ label, value }: SameAsAboveOption) => {
          updatedValues[value] = isChecked ? form.getFieldValue(label) : ""; // Copy or clear values
        });

        form.setFieldsValue(updatedValues);

        handleValueChange(null, { ...form.getFieldsValue(), ...updatedValues });
      },
    );

    if (formConfig?.initialValues) {
      const transformedValues = { ...formConfig.initialValues };

      Object.entries(transformedValues).forEach(([key, value]) => {
        try {
          if (typeof value === "string" && isNaN(Number(value))) {
            const parsedDate = dayjs(value);
            if (parsedDate.isValid()) {
              transformedValues[key] = parsedDate;
            } else {
              transformedValues[key] = value;
            }
          }
        } catch (e) {
          transformedValues[key] = value;
        }
      });
      form.setFieldsValue(transformedValues);
    }

    setFormValues((values: Record<string, any>) => {
      return { ...values, ...formConfig?.initialValues };
    });

    return () => {
      unsubscribeAdharData();
      unsubscribeSameAsAboveFields();
    };
  }, [form, handleValueChange, subscribe, formConfig, setFormValues]);

  // const convertIntoFormData = async (values: Record<string, any>) => {
  //   const formData = new FormData();

  //   Object.entries(values).forEach(([key, value]) => {
  //     if (!key.startsWith("dynamic_temp_field")) {
  //       if (Array.isArray(value)) {
  //         value.forEach((item, index) => {
  //           formData.append(`${key}[${index}]`, item);
  //         });
  //       } else if (typeof value === "object" && value !== null) {
  //         Object.entries(value).forEach(([subKey, subValue]: any[]) => {
  //           formData.append(`${key}[${subKey}]`, subValue);
  //         });
  //       } else {
  //         formData.append(key, value);
  //       }
  //     }
  //   });

  //   return formData;
  // };

  const handleFinish = async () => {
    // if (isPreview) return false;

    const values = form.getFieldsValue(true);
    const formatedData = formateDataStepWise(values);
    // const formData = await convertIntoFormData(formatedData);
    await form.validateFields();
    onSubmit?.(formatedData, form);
  };

  if (showSummaryOnly) {
    return <Summary isOnRenderPage={true} />;
  }

  const resetBuilderState = () => {
    setIsPreview(false);
    setCurrent(0);
  };
  return (
    <div>
      {isPreview && (
        <div className="w-full h-[50px] p-2 flex justify-end">
          <Button type="primary" onClick={resetBuilderState}>
            Builder
          </Button>
        </div>
      )}

      <div className="p-5 m-2">
        {data.length > 0 && (
          <Form.Provider>
            <Form
              form={form}
              layout="vertical"
              name="dynamic-form"
              onFinish={handleFinish}
              onValuesChange={handleValueChange}
            >
              <Steps current={current}>
                {items?.map((item: Item) => (
                  <Steps.Step key={item.key} title={item.title} />
                ))}
              </Steps>
              <div className="mt-4">{items[current].content}</div>
              <div className="mt-6">
                {current > 0 && (
                  <Button className="mx-2" onClick={prev}>
                    Previous
                  </Button>
                )}
                {current < items.length - 1 && (
                  <Button type="primary" onClick={next}>
                    Next
                  </Button>
                )}
                {current === items.length - 1 && (
                  <Button type="primary" htmlType="submit">
                    {isUpdateState ? "Update " : "Submit"}
                  </Button>
                )}
              </div>
            </Form>
          </Form.Provider>
        )}

        {data.length == 0 && (
          <h1 className="text-center font-semibold text-slate-600">
            No fields found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Preview;
