import { useState, useEffect } from 'react';
import { useRefresh } from '@flowgram.ai/free-layout-editor';
import { useClientContext } from '@flowgram.ai/free-layout-editor';
import { Tooltip, IconButton, Divider } from '@douyinfe/semi-ui';
import { IconUndo, IconRedo } from '@douyinfe/semi-icons';

import { TestRunButton } from '../testrun/testrun-button';
import { AddNode } from '../add-node';
import { ZoomSelect } from './zoom-select';
import { SwitchLine } from './switch-line';
import { ToolContainer, ToolSection } from './styles';
import { Readonly } from './readonly';
import { MinimapSwitch } from './minimap-switch';
import { Minimap } from './minimap';
import { Interactive } from './interactive';
import { FitView } from './fit-view';
// import { Comment } from './comment';
import { AutoLayout } from './auto-layout';
import TemplateView from './template'
import { FlowDocumentJSON } from '../../typings/node';
export const DemoTools = (props: { setData: (data: FlowDocumentJSON) => void }) => {
  const { setData } = props
  const ctx = useClientContext();
  const { history, playground } = ctx
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);
  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);
  const refresh = useRefresh();

  useEffect(() => {
    const disposable = playground.config.onReadonlyOrDisabledChange(() => refresh());
    console.log('playground', playground);
    return () => disposable.dispose();
  }, [playground]);

  useEffect(() => {
    let nodes = ctx.document.getAllNodes();
    setIsTemplate(nodes.some(node => (node.flowNodeType !== 'start' && node.flowNodeType !== 'end')))
    ctx.document.onContentChange(() => {
      nodes = ctx.document.getAllNodes();
      setIsTemplate(nodes.some(node => (node.flowNodeType !== 'start' && node.flowNodeType !== 'end')))
    });
  }, [])

  return (
    <ToolContainer className="demo-free-layout-tools">
      <ToolSection>
        <Interactive />
        <AutoLayout />
        <SwitchLine />
        <ZoomSelect />
        <FitView />
        <MinimapSwitch minimapVisible={minimapVisible} setMinimapVisible={setMinimapVisible} />
        <Minimap visible={minimapVisible} />
        <Readonly />
        {/* <Comment /> */}
        <Tooltip content={'撤销'}>
          <IconButton
            type="tertiary"
            theme="borderless"
            icon={<IconUndo />}
            disabled={!canUndo || playground.config.readonly}
            onClick={() => history.undo()}
          />
        </Tooltip>
        <Tooltip content={'重做'}>
          <IconButton
            type="tertiary"
            theme="borderless"
            icon={<IconRedo />}
            disabled={!canRedo || playground.config.readonly}
            onClick={() => history.redo()}
          />
        </Tooltip>
        <Divider layout="vertical" style={{ height: '16px' }} margin={3} />
        <AddNode disabled={playground.config.readonly} />
        <Divider layout="vertical" style={{ height: '16px' }} margin={3} />
        <TestRunButton disabled={playground.config.readonly} />
      </ToolSection>
      {!isTemplate && <TemplateView setData={setData} />}
    </ToolContainer>
  );
};
