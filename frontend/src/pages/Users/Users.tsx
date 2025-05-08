import {
  PlusOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Input,
  InputRef,
} from "antd";
import Search from "antd/es/input/Search";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import React, { useCallback, useRef, useState } from "react";
import { githubDark } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json";
import { CommitHistoryItem } from "@/shared/components/CommitHistoryItem/CommitHistoryItem";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setVisualizeDiff } from "@/state/slices/editor.slice";

export const Users: React.FC = () => {
  const [create, setCreate] = useState(false);
  const onSearch = (value: string) => console.log(value);
  const createInputRef = useRef<InputRef>(null);

  const [policy, setPolicy] = useState(
    JSON.stringify(
      {
        policies: [
          {
            edit: true,
            delete: true,
            create: true,
            pattern: "*",
          },
        ],
      },
      null,
      2,
    ),
  );

  const onSubmitCreate = () => {};

  const onChange = useCallback((value: string) => {
    setPolicy(value);
  }, []);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const setDiff = (val: boolean) => dispatch(setVisualizeDiff(val));

  const { visualizeDiff } = useAppSelector((state) => state.editor);

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

          <Checkbox
            checked={visualizeDiff}
            onChange={(e) => setDiff(e.target.checked)}
          >
            Visualize differences
          </Checkbox>
          <Button disabled={!message} type="primary">
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
          {![].length && (
            <div className="flex flex-col py-5 p-4 items-center justify-center text-gray-400">
              No configuration updates
            </div>
          )}
          {[].map((item: any) => (
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
      <div className="flex-grow flex h-full flex-row">
        <div className="w-64 h-full flex flex-col border-r">
          <div className="px-2 py-2 pb-3 flex item flex-col gap-2 items-stretch text-sm bg-gray-100">
            <div className="flex flex-row items-center gap-2">
              <Button
                type="link"
                size="small"
                icon={<PlusOutlined />}
                title={`Add new`}
                onClick={() => setCreate(true)}
              />
              <span className="font-bold flex-grow">Users</span>
            </div>
            <Search placeholder={`Search for users...`} onSearch={onSearch} />
          </div>
          <div className="flex-grow flex flex-col overflow-y-auto">
            <div
              className={`cursor-pointer text-sm items-center flex flex-row gap-3 w-full px-3 py-1 ${
                true ? "bg-teal-900 text-white font-bold" : "hover:bg-slate-200"
              }`}
              onClick={() => {}}
            >
              <div
                className={`rounded-full ${
                  true ? "bg-green-500" : "bg-gray-500"
                } w-2 h-2`}
              ></div>
              <span className="flex-grow">admin</span>
              <ArrowRightOutlined />
            </div>

            {create && (
              <div className="flex flex-row gap-2 px-2 py-2">
                <Input
                  ref={createInputRef}
                  placeholder="Set new username"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setCreate(false);
                    }

                    if (e.key === "Enter") {
                      onSubmitCreate();
                    }
                  }}
                />
                <Button
                  disabled={false}
                  loading={false}
                  onClick={onSubmitCreate}
                >
                  <CheckOutlined />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-grow h-full position-relative">
          <CodeMirror
            className="flex-grow text-xl overflow-auto"
            theme={githubDark}
            value={policy}
            width="100%"
            height="100%"
            maxHeight="calc(100vh - 25px)"
            extensions={[json()]}
            onChange={onChange}
          />
        </div>

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
      </div>
    </>
  );
};
