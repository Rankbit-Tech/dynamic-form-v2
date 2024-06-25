import { fieldTypes } from "@constants/fieldTypes";

export const transformData = (data: any) => {


    if (data.length == 0) return []
    const itemsById = {} as Record<string, any>;

    // Helper function to add items to their parent
    const addToParent = (item: any, parentId: string) => {
        if (!itemsById[parentId]) {
            itemsById[parentId] = { children: [] };
        }
        itemsById[parentId].children.push(item);
    };

    // Process the data
    data.forEach((item: any) => {
        const newItem = { ...item, children: [] };
        itemsById[item.id] = newItem;

        if (item.parentId) {
            addToParent(newItem, item.parentId);
        }
    });

    // Extract top-level steppers
    return data.filter((item: any) => item.type === fieldTypes.STEPPER).map((step: any) => itemsById[step.id]);
};