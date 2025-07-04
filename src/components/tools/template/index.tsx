import './index.less'
import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';
import workflowImg from '@/assets/workflow.png'
import { Popover, Spin } from '@douyinfe/semi-ui';
import { nodeRegistries } from '../../../nodes';
import { templateInitialData } from '../../../initial-data';
import { useEditorProps } from '../../../hooks';
import { SidebarProvider, SidebarRenderer } from '../../sidebar';
import { useState } from 'react';
import { FlowDocumentJSON } from '../../typings/node';

export default function TemplateView(props: { setData: (data: FlowDocumentJSON) => void }) {
  const { setData } = props
  const templateItemClick = (key: number) => {
    console.log(key);
    setData(templateInitialData)
  }
  return (
    <>
      <div className='template'>
        {
          [1, 2, 3, 4, 5].map((item) => (
            <Popover
              style={{ left: '50% !important' }}
              key={item.toString()}
              content={<TemplateContent />}
              position='top'
              spacing={15}
            >
              <div className='template-item' onClick={() => templateItemClick(item)}>
                <div className='sc-kdBSHD bpvsJF' style={{ background: 'transparent', cursor: 'pointer' }}>
                  <img style={{ width: '24px', height: '24px' }} className='sc-esYiGF iRcTNL' src={workflowImg} alt="" />
                  <span className='semi-typography semi-typography-ellipsis semi-typography-ellipsis-single-line semi-typography-ellipsis-overflow-ellipsis semi-typography-ellipsis-overflow-ellipsis-text semi-typography-primary semi-typography-normal'>
                    工作流
                  </span>
                </div>
              </div>
            </Popover>
          ))
        }
      </div>
    </>
  );
}



const TemplateContent = () => {
  const [loading, setLoading] = useState(true);
  const editorProps = useEditorProps(templateInitialData, nodeRegistries, true);

  return (
    <Spin spinning={loading} childStyle={{ opacity: loading ? 0 : 1 }}>
      <div className='popover-content'>
        <FreeLayoutEditorProvider {...editorProps} onInit={() => {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        }} onAllLayersRendered={(ctx) => {
          ctx.document.fitView(true)
        }} >
          <SidebarProvider>
            <div style={{ width: '100%', height: '100%' }}>
              <EditorRenderer className="demo-editor" />
            </div>
            <SidebarRenderer />
          </SidebarProvider>
        </FreeLayoutEditorProvider>
      </div>
    </Spin>
  );
}
