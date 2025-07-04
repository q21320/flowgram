import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconLLM from '../../assets/icon-llm.jpg';

let index = 0;

export const FULIAINodeRegistry: FlowNodeRegistry = {
  executor: async (node, context) => {
    console.log(node,'node');
    console.log(context);
    
  },
  type: WorkflowNodeType.FuliAi,
  info: {
    icon: iconLLM,
    description:
      '采用多级逻辑筛选架构，通过LLM自然语言推理提取股票列表：同级条件并行匹配（OR逻辑），层级条件递进过滤（AND逻辑），结合结构化财务数据与非结构化语义分析，实现精准筛查。',
  },
  meta: {
    size: {
      width: 360,
      height: 300,
    },
  },
  onAdd() {
    return {
      id: `fuli_ai_${nanoid(5)}`,
      type: 'fuli_ai',
      data: {
        title: `股灵精萃_${++index}`,
        inputsValues: {
          promot: {
            type: 'constant',
            content: '',
          },
          day: {
            type: 'constant',
            content: '',
          },
          text: {
            type: 'constant',
            content: '',
          }
        },
        inputs: {
          type: 'object',
          required: ['day', 'text'],
          properties: {
            promot: {
              type: 'string',
              title: '提示词',
              extra: {
                placeholder: '请输入提示词',
                errorText:'请输入提示词',
              }
            },
            text: {
              type: 'string',
              title: '问题',
              extra: {
                placeholder: '请输入问题',
                errorText:'请输入问题',
              }
            },
            day: {
              type: 'number',
              title: '天数',
              extra: {
                placeholder: '请输入天数',
                errorText:'请输入天数',
              }
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: { type: 'string' },
          },
        },
      },
    };
  },
};
