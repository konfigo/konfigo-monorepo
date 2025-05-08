import { json } from "@codemirror/lang-json";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useCallback } from "react";
import { GetConfigHistoryQueryDocument } from "@/queries/getConfigHistory.query";
import {
  GetConfigHistoryQuery,
  GetConfigHistoryQueryVariables,
} from "@/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  setEditingBuffer,
  setOriginalBuffer,
  setVisualizeDiff,
} from "@/state/slices/editor.slice";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { Button } from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export interface ConfigEditorProps {}

const ConfigEditor: React.FC<ConfigEditorProps> = ({}) => {
  const dispatch = useAppDispatch();

  const setEditing = (val: string) => dispatch(setEditingBuffer(val));
  const setOriginal = (val: string) => dispatch(setOriginalBuffer(val));
  const setDiff = (val: boolean) => dispatch(setVisualizeDiff(val));

  const {
    editingBuffer,
    originalBuffer,
    visualizeDiff,
    oldBuffer,
    selectedComponentId: componentId,
  } = useAppSelector((state) => state.editor);

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    console.log(value, viewUpdate);
    setEditing(value);
  }, []);

  useQuery<GetConfigHistoryQuery, GetConfigHistoryQueryVariables>(
    GetConfigHistoryQueryDocument,
    {
      variables: {
        input: {
          componentId: componentId || "",
          skip: 0,
          take: 1,
        },
      },
      skip: !componentId,
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.getConfigHistory.length > 0) {
          const prettifiedPayload = JSON.stringify(
            JSON.parse(data.getConfigHistory[0].payload),
            null,
            2,
          );
          setEditing(prettifiedPayload);
          setOriginal(prettifiedPayload);
        } else {
          setEditing(`{}`);
          setOriginal(`{}`);
        }
      },
    },
  );

  const downloadAsJson = () => {
    const blob = new Blob([editingBuffer], { type: "text/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.json";
    a.click();
  };

  if (!componentId) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p>Select a component to view configurations</p>
      </div>
    );
  }

  if (visualizeDiff) {
    return (
      <>
        <div className="h-full bg-gray-800">
          <div className="px-3 py-2">
            <Button onClick={() => setDiff(false)}>
              <EyeOutlined />
              Hide diff
            </Button>
          </div>
          <ReactDiffViewer
            oldValue={oldBuffer || originalBuffer}
            newValue={editingBuffer}
            splitView={true}
            useDarkTheme={true}
            compareMethod={DiffMethod.WORDS}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <CodeMirror
        className="flex-grow text-lg overflow-auto"
        theme={githubDark}
        value={editingBuffer}
        width="100%"
        height="100%"
        maxHeight="calc(100vh - 25px)"
        extensions={[json()]}
        onChange={onChange}
      />

      {/* Bottom right menu */}
      <div className="absolute bottom-5 left-14 flex flex-row gap-2">
        <Button type="primary" onClick={downloadAsJson}>
          <DownloadOutlined />
          JSON
        </Button>
      </div>
    </>
  );
};

export default ConfigEditor;
