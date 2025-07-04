import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';

import '@flowgram.ai/free-layout-editor/index.css';
import './styles/index.css';
import { nodeRegistries } from './nodes';
import { initialData } from './initial-data';
import { useEditorProps } from './hooks';
import { DemoTools } from './components/tools';
import { SidebarProvider, SidebarRenderer } from './components/sidebar';
import { useState, useEffect } from 'react';
import { getFlowDetail } from './api';
export const Editor = () => {
  // const [editorProps, setEditorProps] = useState(null);
  // const init = async () => {
  //   try {
  //     const res = await getFlowDetail();
  //     if (res.state && res.data.list[0]?.data) {
  //       const data = JSON.parse(decodeURIComponent(window.atob(res.data.list[0].data)));
  //       console.log(data, 'data');
  //       setEditorProps(useEditorProps(initialData, nodeRegistries))
  //     } else setEditorProps(useEditorProps(initialData, nodeRegistries));
  //   } catch (error) {
  //   }
  // };
  // setEditorProps(useEditorProps(initialData, nodeRegistries));
  // useEffect(() => {
  //   init();
  // }, []);
  const [data, setData] = useState(initialData);
  const [key,setKey] = useState(Date.now());
  const editorProps = useEditorProps(data, nodeRegistries);
  useEffect(()=>{
    setKey(Date.now());
  },[data])
  return (
    <div className="doc-free-feature-overview">
      <FreeLayoutEditorProvider key={key} {...editorProps}>
        <SidebarProvider>
            <div className="demo-container">
              <EditorRenderer className="demo-editor" />
            </div>
            <DemoTools setData={setData} />
            <SidebarRenderer />
        </SidebarProvider>
      </FreeLayoutEditorProvider>
    </div >
  );
};
