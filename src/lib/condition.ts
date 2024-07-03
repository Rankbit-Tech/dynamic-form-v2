export interface Rule {
    field: string
    operator: string
    value: string
    source: string
}

export interface Conditions {
    combinator: string
    rules: Rule[]
}

export const evaluateConditions = (conditions: Conditions, formValues: Record<string, any>) => {
    const { combinator, rules } = conditions;

    const evaluateRule = (rule: Rule) => {
        const fieldValue = formValues?.[rule.field] ?? '';
        switch (rule.operator) {
            case 'isEmpty':
                return !fieldValue;
            case 'isNotEmpty':
                return !!fieldValue;
            case 'equals':
                return fieldValue === rule.value;
            case 'notEquals':
                return fieldValue !== rule.value;
            default:
                return true;
        }
    };

    if (rules.length === 0) {
        return { hide: false, disable: false };
    }


    let shouldHide = false;
    let shouldDisable = false;

    if (combinator === 'and') {
        shouldHide = rules.every(evaluateRule);
        shouldDisable = rules.every(evaluateRule);
    } else if (combinator === 'or') {
        shouldHide = rules.some(evaluateRule);
        shouldDisable = rules.some(evaluateRule);
    }

    return {
        hide: shouldHide,
        disable: shouldDisable,
    };
};