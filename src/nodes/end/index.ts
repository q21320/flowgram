import { FlowNodeRegistry } from '../../typings';
import iconEnd from '../../assets/icon-end.jpg';
// import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';
export const EndNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.End,
  meta: {
    deleteDisable: true,
    copyDisable: true,
    defaultPorts: [{ type: 'input' }],
    size: {
      width: 360,
      height: 211,
    },
  },
  info: {
    icon: iconEnd,
    description:
      '工作流的结束节点，用于返回工作流运行后的结果信息。',
  },
  /**
   * Render node via formMeta
   */
  // formMeta,
  /**
   * End Node cannot be added
   */
  canAdd() {
    return false;
  },
};
