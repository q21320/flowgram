import { FC, useMemo, useState } from 'react';

import { NodeReport, WorkflowStatus } from '@flowgram.ai/runtime-interface';
import { Tag, Button, Select } from '@douyinfe/semi-ui';
import { IconSpin } from '@douyinfe/semi-icons';

import { IconWarningFill } from '../icon/warning';
import { IconSuccessFill } from '../icon/success';
import { NodeStatusHeader } from '../header';
import './index.css';
import { NodeStatusGroup } from '../group';

interface NodeStatusRenderProps {
  report: NodeReport;
}

const msToSeconds = (ms: number): string => (ms / 1000).toFixed(2) + 's';
const displayCount = 6;

export const NodeStatusRender: FC<NodeStatusRenderProps> = ({ report }) => {
  const { status: nodeStatus } = report;
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);

  const snapshots = report.snapshots || [];
  const currentSnapshot = snapshots[currentSnapshotIndex] || snapshots[0];

  // 节点 5 个状态
  const isNodePending = nodeStatus === WorkflowStatus.Pending;
  const isNodeProcessing = nodeStatus === WorkflowStatus.Processing;
  const isNodeFailed = nodeStatus === WorkflowStatus.Failed;
  const isNodeSucceed = nodeStatus === WorkflowStatus.Succeeded;
  const isNodeCanceled = nodeStatus === WorkflowStatus.Canceled;

  const tagColor = useMemo(() => {
    if (isNodeSucceed) {
      return 'node-status-succeed';
    }
    if (isNodeFailed) {
      return 'node-status-failed';
    }
    if (isNodeProcessing) {
      return 'node-status-processing';
    }
  }, [isNodeSucceed, isNodeFailed, isNodeProcessing]);

  const renderIcon = () => {
    if (isNodeProcessing) {
      return (
        <IconSpin
          spin
          style={{
            color: 'rgba(77,83,232,1',
          }}
        />
      );
    }
    if (isNodeSucceed) {
      return <IconSuccessFill />;
    }
    return <IconWarningFill className={tagColor} />;
  };
  const renderDesc = () => {
    const getDesc = () => {
      if (isNodeProcessing) {
        return '运行中';
      } else if (isNodePending) {
        return '运行终止';
      } else if (isNodeSucceed) {
        return '成功';
      } else if (isNodeFailed) {
        return '失败';
      } else if (isNodeCanceled) {
        return '取消';
      }
    };

    const desc = getDesc();

    return desc ? <p style={{ margin: 0 }}>{desc}</p> : null;
  };
  const renderCost = () => (
    <Tag size="small" className={tagColor}>
      {msToSeconds(report.timeCost)}
    </Tag>
  );

  const renderSnapshotNavigation = () => {
    if (snapshots.length <= 1) {
      return null;
    }

    const count = (
      <p
        style={{
          fontWeight: 500,
          color: '#333',
          fontSize: '15px',
          marginLeft: 12,
        }}
      >
        Total: {snapshots.length}
      </p>
    );

    if (snapshots.length <= displayCount) {
      return (
        <>
          {count}
          <div
            style={{
              margin: '12px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {snapshots.map((_, index) => (
              <Button
                key={index}
                size="small"
                type={currentSnapshotIndex === index ? 'primary' : 'tertiary'}
                onClick={() => setCurrentSnapshotIndex(index)}
                style={{
                  minWidth: '32px',
                  height: '32px',
                  padding: '0',
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: '1px solid',
                  borderColor:
                    currentSnapshotIndex === index ? '#4d53e8' : 'rgba(29, 28, 35, 0.08)',
                  fontWeight: currentSnapshotIndex === index ? '800' : '500',
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      );
    }

    // 超过5个时，前5个显示为按钮，剩余的放在下拉选择中
    return (
      <>
        {count}
        <div
          style={{
            margin: '12px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {snapshots.slice(0, displayCount).map((_, index) => (
            <Button
              key={index}
              size="small"
              type="tertiary"
              onClick={() => setCurrentSnapshotIndex(index)}
              style={{
                minWidth: '32px',
                height: '32px',
                padding: '0',
                borderRadius: '4px',
                fontSize: '12px',
                border: '1px solid',
                borderColor: currentSnapshotIndex === index ? '#4d53e8' : 'rgba(29, 28, 35, 0.08)',
                fontWeight: currentSnapshotIndex === index ? '800' : '500',
              }}
            >
              {index + 1}
            </Button>
          ))}
          <Select
            value={currentSnapshotIndex >= displayCount ? currentSnapshotIndex : undefined}
            onChange={(value) => setCurrentSnapshotIndex(value as number)}
            style={{
              width: '100px',
              height: '32px',
              border: '1px solid',
              borderColor:
                currentSnapshotIndex >= displayCount ? '#4d53e8' : 'rgba(29, 28, 35, 0.08)',
            }}
            size="small"
            placeholder="选择"
          >
            {snapshots.slice(displayCount).map((_, index) => {
              const actualIndex = index + displayCount;
              return (
                <Select.Option key={actualIndex} value={actualIndex}>
                  {actualIndex + 1}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </>
    );
  };

  if (!report) {
    return null;
  }

  return (
    <NodeStatusHeader
      header={
        <>
          {renderIcon()}
          {renderDesc()}
          {renderCost()}
        </>
      }
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '0px 2px 10px 2px',
        }}
      >
        {renderSnapshotNavigation()}
        <NodeStatusGroup title={'输入'} data={currentSnapshot?.inputs} />
        <NodeStatusGroup title={'输出'} data={currentSnapshot?.outputs} />
        <NodeStatusGroup title={'分支'} data={currentSnapshot?.branch} optional />
        <NodeStatusGroup title={'数据'} data={currentSnapshot?.data} optional />
      </div>
    </NodeStatusHeader>
  );
};
