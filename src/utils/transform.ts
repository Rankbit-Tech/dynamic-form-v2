import { Field, Section, Step } from "@store/useFormStore";

export const transformData = (steps: Step[], sections: Section[], fields: Field[]) => {
    const itemsById = {} as Record<string, any>;

    // Helper function to add items to their parent
    const addToParent = (item: Field | Section | Field, parentId: string) => {
        if (!itemsById[parentId]) {
            itemsById[parentId] = { children: [] };
        }
        itemsById[parentId].children.push(item);
    };

    // Process steps, sections, and fields
    steps.forEach(step => {
        itemsById[step.id] = { ...step, children: [] };
    });

    sections.forEach(section => {
        const item = { ...section, children: [] };
        itemsById[section.id] = item;
        if (section.parentId) {
            addToParent(item, section.parentId);
        }
    });

    fields.forEach(field => {
        const item = { ...field };
        if (field.parentId) {
            addToParent(item, field.parentId);
        }
    });

    // Extract top-level steps
    return steps.map(step => itemsById[step.id]);
};
