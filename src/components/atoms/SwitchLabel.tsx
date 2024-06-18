import React from "react";
import { Switch, SwitchProps } from "antd";

interface SwitchProp extends SwitchProps {
  label: string;
}

const SwitchLabel: React.FC<SwitchProp> = ({
  label,
  ...switchProps
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-gray-700">{label}</label>
      <Switch {...switchProps} />
    </div>
  );
};

export default SwitchLabel;
