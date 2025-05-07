import {
  CreateComponentConfigMutation,
  CreateComponentConfigMutationVariables,
  GetConfigHistoryQuery,
  GetConfigHistoryQueryVariables,
} from "@/graphql/graphql";
import { GetConfigHistoryQueryDocument } from "@/queries/getConfigHistory.query";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Checkbox, Collapse, CollapseProps, Input } from "antd";
import React, { useState } from "react";
import { CommitHistoryItem } from "../CommitHistoryItem/CommitHistoryItem";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { CreateComponentConfigMutationDocument } from "@/queries/createConfig.mutation";
import { deepEqual } from "@/util/helpers";
import {
  setOriginalBuffer,
  setVisualizeDiff,
} from "@/state/slices/editor.slice";

export interface RightPanelProps {}

export const RightPanel: React.FC<RightPanelProps> = ({}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const setOriginal = (val: string) => dispatch(setOriginalBuffer(val));
  const setDiff = (val: boolean) => dispatch(setVisualizeDiff(val));

  const {
    selectedComponentId: componentId,
    editingBuffer,
    originalBuffer,
  } = useAppSelector((state) => state.editor);

  const { data: historyData, refetch: refetchHistory } = useQuery<
    GetConfigHistoryQuery,
    GetConfigHistoryQueryVariables
  >(GetConfigHistoryQueryDocument, {
    variables: {
      input: {
        componentId: componentId || "",
        skip: 0,
        take: 10,
      },
    },
    skip: !componentId,
  });

  const [save, { loading }] = useMutation<
    CreateComponentConfigMutation,
    CreateComponentConfigMutationVariables
  >(CreateComponentConfigMutationDocument, {
    onCompleted: () => {
      refetchHistory();
    },
  });

  const onSave = () => {
    if (!componentId) {
      return;
    }

    // Validate json
    let edit;
    let original;

    try {
      edit = JSON.parse(editingBuffer);
      original = JSON.parse(originalBuffer);
      setError("");
    } catch (err) {
      setError("Invalid JSON configuration. Please correct and try again.");
      return;
    }

    if (typeof edit !== "object" || Array.isArray(edit) || edit === null) {
      setError("Configuration must be a valid JSON object.");
      return;
    }

    if (deepEqual(edit, original)) {
      setError("No changes done to the configuration.");
      return;
    }

    // Create configuration
    save({
      variables: {
        input: {
          commitMessage: message,
          componentId: componentId,
          payload: JSON.stringify(edit),
        },
      },
    });

    setOriginal(editingBuffer);
    setMessage("");
  };

  if (!componentId) {
    return null;
  }

  const history = historyData?.getConfigHistory || [];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Commit changes",
      children: (
        <div className="flex flex-col gap-3">
          <Input.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter commit message"
          />
          {error && (
            <div className="rounded-md px-3 py-2 bg-red-100 text-red-500 border-red-500 border">
              {error}
            </div>
          )}

          <Checkbox onChange={(e) => setDiff(e.target.checked)}>
            Visualize differences
          </Checkbox>
          <Button
            loading={loading}
            onClick={onSave}
            disabled={!message}
            type="primary"
          >
            Commit
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: "Commit History",

      children: (
        <div className="flex flex-col">
          {!history.length && (
            <div className="flex flex-col py-5 p-4 items-center justify-center text-gray-400">
              No configuration updates
            </div>
          )}
          {history.map((item) => (
            <CommitHistoryItem item={item} key={item.id} />
          ))}
        </div>
      ),
      styles: {
        body: {
          padding: 0,
        },
      },
    },
  ];

  return (
    <>
      <div
        className="flex flex-col border-l max-h-full h-full overflow-y-auto"
        style={{ width: 300, minWidth: 300, maxWidth: 300 }}
      >
        {/* New commit */}
        <Collapse
          defaultActiveKey={["1", "2"]}
          size="small"
          rootClassName="flex-grow max-h-full h-full"
          items={items}
        />
      </div>
    </>
  );
};
