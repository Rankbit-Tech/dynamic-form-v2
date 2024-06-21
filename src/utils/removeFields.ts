export function removeField(fields: Record<string, any>, id: string) {
    const idsToRemove = new Set<string>()


    const collectIdsToRemove = (fieldId: string) => {
        idsToRemove.add(fieldId)

        fields.forEach((field: Record<string, any>) => {
            if (field.parentId == fieldId) {
                collectIdsToRemove(field.id)
            }
        })
    }

    collectIdsToRemove(id);

    return fields.filter((field: Record<string, any>) => !idsToRemove.has(field.id))
}