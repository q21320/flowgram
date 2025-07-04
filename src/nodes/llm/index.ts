import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconLLM from '../../assets/icon-llm.jpg';

let index = 0;
export const LLMNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.LLM,
  info: {
    icon: iconLLM,
    description:
      '调用大语言模型，并使用变量和提示词生成回复。',
  },
  meta: {
    size: {
      width: 360,
      height: 300,
    },
  },
  onAdd() {
    return {
      id: `llm_${nanoid(5)}`,
      type: 'llm',
      data: {
        title: `LLM_${++index}`,
        inputsValues: {
          modelName: {
            type: 'constant',
            content: 'deepseek-chat',
            title:'Model Name',
          },
          apiKey: {
            type: 'constant',
            content: 'sk-8d6c9a3bbe184c2f8a6d35c0bc42e306',
          },
          apiHost: {
            type: 'constant',
            content: 'https://api.deepseek.com/v1',
          },
          temperature: {
            type: 'constant',
            content: '0.5',
          },
          systemPrompt: {
            type: 'constant',
            content: '',
          },
          prompt: {
            type: 'constant',
            content: '你是谁',
          },
        },
        inputs: {
          type: 'object',
          required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
          properties: {
            modelName: {
              type: 'string',
            },
            apiKey: {
              type: 'string',
            },
            apiHost: {
              type: 'string',
            },
            temperature: {
              type: 'number',
            },
            systemPrompt: {
              type: 'string',
            },
            prompt: {
              type: 'string',
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
