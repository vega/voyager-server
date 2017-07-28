
/*
 * Convert Group Object to plain JSON
 */
export function serializeGroup(group: any) {
  return {
    name: group.name,
    items: group.items,
    groupBy: group.groupBy,
    orderGroupBy: group.orderGroupBy
  };
}


/*
 * Convert Schema Object to plain JSON 
 */
export function serializeSchema(schema: any) {
  return {
    fields: schema.fieldSchemas
  };
}
