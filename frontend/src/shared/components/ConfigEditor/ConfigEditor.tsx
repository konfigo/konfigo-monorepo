import { json } from "@codemirror/lang-json";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useCallback, useState } from "react";
import { GetConfigHistoryQueryDocument } from "@/queries/getConfigHistory.query";
import {
  GetConfigHistoryQuery,
  GetConfigHistoryQueryVariables,
} from "@/graphql/graphql";
import { useQuery } from "@apollo/client";

export interface ConfigEditorProps {
  componentId?: string;
}

const ConfigEditor: React.FC<ConfigEditorProps> = ({ componentId }) => {
  const [value, setValue] = useState(``);

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    console.log(value, viewUpdate);
    setValue(value);
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
      onCompleted: (data) => {
        if (data.getConfigHistory.length > 0) {
          const prettifiedPayload = JSON.stringify(
            JSON.parse(data.getConfigHistory[0].payload),
            null,
            2,
          );
          setValue(prettifiedPayload);
        } else {
          setValue(`{}`);
        }
      },
    },
  );

  if (!componentId) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p>Select a component to view configurations</p>
      </div>
    );
  }

  return (
    <>
      <CodeMirror
        className="flex-grow text-lg overflow-auto"
        theme={githubDark}
        value={value}
        width="100%"
        height="100%"
        maxHeight="calc(100vh - 25px)"
        extensions={[json()]}
        onChange={onChange}
      />
    </>
  );
};

export default ConfigEditor;
