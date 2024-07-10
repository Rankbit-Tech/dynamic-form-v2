import React, { useEffect, useState } from 'react';
import { QueryBuilder, RuleGroupType, Field, formatQuery } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { Button, Select, Input, DatePicker } from 'antd';
import { useFormStore } from '@store/useFormStore';
import { VARIANT } from '@constants/fieldTypes';


const operators = [
    { name: 'equals', label: 'equals' },
    { name: 'notEquals', label: 'not equals' },
    { name: 'isEmpty', label: 'is empty' },
    { name: 'isNotEmpty', label: 'is not empty' },
];

const actions = [
    { name: 'hide', label: 'hide' },
    { name: 'show', label: 'show' },
    { name: 'disable', label: 'disable' },
];

const AntdControlElements = {
    addGroupAction: ({ handleOnClick }: any) => <Button onClick={handleOnClick}>+ Group</Button>,
    addRuleAction: ({ handleOnClick }: any) => <Button onClick={handleOnClick}>+ Rule</Button>,
    combinatorSelector: ({ value, handleOnChange, options }: any) => (
        <Select value={value} onChange={handleOnChange} >
            {options.map((option: any) => (
                <Select.Option key={option.name} value={option.name}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    ),
    fieldSelector: ({ value, handleOnChange, options }: any) => (
        <Select value={value} onChange={handleOnChange}>
            {options.map((option: any) => (
                <Select.Option key={option.name} value={option.name}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    ),
    operatorSelector: ({ value, handleOnChange, options }: any) => (
        <Select value={value} onChange={handleOnChange}>
            {options.map((option: any) => (
                <Select.Option key={option.name} value={option.name}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    ),
    valueEditor: ({ value, handleOnChange, field, operator }: any) => {
        if (operator === 'between' || operator === 'notBetween') {
            return (
                <Input
                    type="text"
                    value={value as string}
                    onChange={(e) => handleOnChange(e.target.value)}
                    placeholder="Enter value"
                />
            );
        }
        if (field === 'date') {
            return <DatePicker value={value as any} onChange={(date) => handleOnChange(date)} />;
        }
        return <Select value={value} onChange={(e) => handleOnChange(e)} placeholder="Please select options" className='min-w-[50px]'>
            {actions.map((action: any) => (
                <Select.Option key={action.name} value={action.name}>
                    {action.label}
                </Select.Option>
            ))}
        </Select>
    },
    actionSelector: ({ value, handleOnChange }: any) => (
        <Select value={value} onChange={handleOnChange}>
            {actions.map((action: any) => (
                <Select.Option key={action.name} value={action.name}>
                    {action.label}
                </Select.Option>
            ))}
        </Select>
    ),
};

interface QueryBuilderComponentProps {
    handleCondition: (values: Record<string, any>) => void
    conditions: RuleGroupType | Record<string, any>
}

const QueryBuilderComponent: React.FC<QueryBuilderComponentProps> = ({ handleCondition, conditions }) => {
    const [query, setQuery] = useState<RuleGroupType>({
        combinator: 'and',
        rules: [],
    });

    const fields: Field[] = useFormStore(state => {
        return state.fields.filter(field => field.variant === VARIANT.FIELD && field.name && field.label).map(field => ({
            name: field.name,
            label: field.label
        }));
    });


    const handleQueryChange = (newQuery: RuleGroupType) => {
        setQuery(newQuery);
        const query = formatQuery(newQuery, 'json_without_ids')
        handleCondition({ conditions: query },);
    };


    return (
        <div>
            <QueryBuilder
                fields={fields}
                operators={operators}
                query={query.rules.length > 0 ? query : conditions as RuleGroupType}
                onQueryChange={handleQueryChange}
                controlElements={AntdControlElements}
            />
        </div>
    );
};

export default QueryBuilderComponent;
