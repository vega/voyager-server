import {SpecQueryModelGroup} from 'compassql/build/src/model';

import {plotObjects} from './plot';

export function serialize(modelGroup: SpecQueryModelGroup, data: any) {
  return {
    name: modelGroup.name,
    items: plotObjects(modelGroup, data),
    groupBy: modelGroup.groupBy,
    orderGroupBy: modelGroup.orderGroupBy
  };
}
