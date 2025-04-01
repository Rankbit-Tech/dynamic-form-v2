import { useEffect } from 'react';
import { Form } from 'antd';
import { getFormValues } from '@utils/index';

interface UseCodeExecutionProps {
  code?: string;
  name: string;
  dependencies?: string[];
}

const useCodeExecution = ({ code, name, dependencies = [] }: UseCodeExecutionProps) => {
  const form = Form.useFormInstance();
  const values = Form.useWatch(dependencies, form);

  useEffect(() => {
    if (!code) return;

    const executeCode = () => {
      try {
        const result = getFormValues(() => eval(code));
        if(result){
          form.setFieldValue(name, result);
        }
      } catch (error) {
        console.error('Error executing code:', error);
      }
    };

    // Execute on mount
    executeCode();

    // Watch for changes in dependencies
    if (values && dependencies.length > 0) {
      executeCode();
    }
  }, [code, name, values, form, dependencies]);
};

export default useCodeExecution; 