import {SpecQueryModel, SpecQueryModelGroup} from 'compassql/build/src/model';
import {FieldQuery, isFieldQuery} from 'compassql/build/src/query/encoding';
import {toMap} from 'compassql/build/src/util';
import {Data} from 'vega-lite/build/src/data';
import {FacetedUnitSpec} from 'vega-lite/build/src/spec';

import {ShelfFieldDef} from './encoding';

export interface PlotFieldInfo {
  fieldDef: ShelfFieldDef;
  isEnumeratedWildcardField: boolean;
}

export interface PlotObject {
  fieldInfos: PlotFieldInfo[];

  spec: FacetedUnitSpec;
}

export function plotObjects(modelGroup: SpecQueryModelGroup, data: Data): PlotObject[] {
  return modelGroup.items.map(item => {
    let po: PlotObject = null;
    // FIXME if (item instanceof SpecQueryModelGroup) {
    if ('getTopSpecQueryModel' in item) {
      const childModelGroup = item as SpecQueryModelGroup;
      po = plotObject(data, childModelGroup.getTopSpecQueryModel());
    } else {

      // FIXME: include data in the main spec?
      po = plotObject(data, item as SpecQueryModel);
    }

    return po;
  });
}

// FIXME: include data in the main query?
function plotObject(data: Data, specQ: SpecQueryModel): PlotObject {

  const wildcardFieldIndex = toMap(specQ.wildcardIndex.encodingIndicesByProperty.get('field') || []);
  const fieldInfos: PlotFieldInfo[] = specQ.getEncodings()
    .filter(isFieldQuery)
    .map((fieldQ: FieldQuery, index): PlotFieldInfo => {
      const {aggregate, field, timeUnit, hasFn, bin, type} = fieldQ;
      // HACK not all properties are compatible
      return {
        fieldDef: {aggregate, field, timeUnit, hasFn, bin, type} as ShelfFieldDef,
        isEnumeratedWildcardField: index in wildcardFieldIndex
      };
    });

  const spec = {
    data,
    ...specQ.toSpec()
  };

  return {fieldInfos, spec};
}
