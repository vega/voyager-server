/*
 * Convert Schema Object to plain JSON
 */
export function serializeSchema(schema: any) {
  return {
    fields: schema.fieldSchemas
  };
}
