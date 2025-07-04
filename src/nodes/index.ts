import { FlowNodeRegistry } from '../typings';
import { StartNodeRegistry } from './start';
import { EndNodeRegistry } from './end';
// import { LoopNodeRegistry } from './loop';
import { LLMNodeRegistry } from './llm';
import { FULIAINodeRegistry } from './fuliAi';
import { WorkflowNodeType } from './constants';
// import { ConditionNodeRegistry } from './condition';
// import { CommentNodeRegistry } from './comment';
export { WorkflowNodeType } from './constants';

export const nodeRegistries: FlowNodeRegistry[] = [
  // ConditionNodeRegistry,
  StartNodeRegistry,
  EndNodeRegistry,
  LLMNodeRegistry,
  FULIAINodeRegistry
  // LoopNodeRegistry,
  // CommentNodeRegistry,
];

export const visibleNodeRegistries = nodeRegistries.filter(
  (r) => r.type !== WorkflowNodeType.Comment
);
