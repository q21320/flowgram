import { FunctionComponent } from 'react';

import { SelectorBoxPopoverProps } from '@flowgram.ai/free-layout-editor';
import { WorkflowGroupCommand } from '@flowgram.ai/free-group-plugin';
import { Button, ButtonGroup, Tooltip } from '@douyinfe/semi-ui';
import { IconCopy, IconDeleteStroked, IconExpand, IconShrink } from '@douyinfe/semi-icons';

import { IconGroup } from '../group';
import { FlowCommandId } from '../../shortcuts/constants';

const BUTTON_HEIGHT = 24;

export const SelectorBoxPopover: FunctionComponent<SelectorBoxPopoverProps> = ({
  bounds,
  children,
  flowSelectConfig,
  commandRegistry,
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: bounds.right,
        top: bounds.top,
        transform: 'translate(-100%, -100%)',
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <ButtonGroup
        size="small"
        style={{ display: 'flex', flexWrap: 'nowrap', height: BUTTON_HEIGHT }}
      >
        <Tooltip content={'折叠'}>
          <Button
            icon={<IconShrink />}
            style={{ height: BUTTON_HEIGHT }}
            type="primary"
            theme="solid"
            onMouseDown={(e) => {
              commandRegistry.executeCommand(FlowCommandId.COLLAPSE);
            }}
          />
        </Tooltip>

        <Tooltip content={'展开'}>
          <Button
            icon={<IconExpand />}
            style={{ height: BUTTON_HEIGHT }}
            type="primary"
            theme="solid"
            onMouseDown={(e) => {
              commandRegistry.executeCommand(FlowCommandId.EXPAND);
            }}
          />
        </Tooltip>

        <Tooltip content={'创建分组'}>
          <Button
            icon={<IconGroup size={14} />}
            style={{ height: BUTTON_HEIGHT }}
            type="primary"
            theme="solid"
            onClick={() => {
              commandRegistry.executeCommand(WorkflowGroupCommand.Group);
            }}
          />
        </Tooltip>

        <Tooltip content={'复制'}>
          <Button
            icon={<IconCopy />}
            style={{ height: BUTTON_HEIGHT }}
            type="primary"
            theme="solid"
            onClick={() => {
              commandRegistry.executeCommand(FlowCommandId.COPY);
            }}
          />
        </Tooltip>

        <Tooltip content={'删除'}>
          <Button
            type="primary"
            theme="solid"
            icon={<IconDeleteStroked />}
            style={{ height: BUTTON_HEIGHT }}
            onClick={() => {
              commandRegistry.executeCommand(FlowCommandId.DELETE);
            }}
          />
        </Tooltip>
      </ButtonGroup>
    </div>
    <div>{children}</div>
  </>
);
