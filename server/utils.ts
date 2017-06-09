

export function serializeGroup(group: any) {
  return {
    name: group.name,
    items: group.items,
    groupBy: group.groupBy,
    orderGroupBy: group.orderGroupBy
  };
}
