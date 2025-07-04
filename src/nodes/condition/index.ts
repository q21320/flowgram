import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import iconCondition from '../../assets/icon-condition.svg';
import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';

export const ConditionNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Condition,
  info: {
    icon: iconCondition,
    description:
      '根据设置的条件，连接多个下游分支。只有满足设置条件的分支会被执行。',
  },
  meta: {
    defaultPorts: [{ type: 'input' }],
    // Condition Outputs use dynamic port
    useDynamicPort: true,
    expandable: false, // disable expanded
  },
  formMeta,
  onAdd() {
    return {
      id: `condition_${nanoid(5)}`,
      type: 'condition',
      data: {
        title: '条件',
        conditions: [
          {
            key: `if_${nanoid(5)}`,
            value: {},
          },
          {
            key: `if_${nanoid(5)}`,
            value: {},
          },
        ],
      },
    };
  },
};
