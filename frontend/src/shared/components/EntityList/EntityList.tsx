import { Input, Spin } from "antd";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import {
  GetComponentByParentQuery,
  GetComponentByParentQueryVariables,
  Stage,
} from "@/graphql/graphql";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetComponentByParentQueryDocument } from "@/queries/getComponentByParent.query";

const { Search } = Input;

export interface EntityItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface EntityListProps {
  stages: Stage[];
  setEditorSelection: (id: string) => void;
  parentSelection?: string;
}

const MENU_ID = "entity-list-menu";

const EntityList: React.FC<EntityListProps> = ({
  stages,
  parentSelection,
  setEditorSelection,
}) => {
  const onSearch = (value: string) => console.log(value);
  const [localSelection, setLocalSelection] = useState<string>();

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event: any) {
    show({
      event,
      props: {
        key: "value",
      },
    });
  }

  const { data: componentsData } = useQuery<
    GetComponentByParentQuery,
    GetComponentByParentQueryVariables
  >(GetComponentByParentQueryDocument, {
    variables: {
      input: {
        parent: parentSelection,
      },
    },
    onCompleted: () => {
      setLocalSelection(undefined);
    },
  });

  const stage = stages[0];
  const components = componentsData?.getComponentByParent;

  const selectComponent = (id: string) => {
    setLocalSelection(id);
  };

  return (
    <>
      <div className="w-64 h-full flex flex-col border-r">
        <div className="px-2 py-2 pb-3 flex item flex-col gap-2 items-stretch text-sm bg-gray-100">
          <div className="flex flex-row items-center gap-2">
            <Button
              type="link"
              size="small"
              icon={<PlusOutlined />}
              title={`Add new`}
              onClick={() => console.log("Button clicked")}
            />
            <span className="font-bold flex-grow">{stage.name}</span>
          </div>
          <Search
            placeholder={`Search for ${stage.name.toLowerCase()}...`}
            onSearch={onSearch}
          />
        </div>
        <div className="flex-grow flex flex-col overflow-y-auto">
          {!components && <Spin indicator={<LoadingOutlined spin />} />}
          {!!components &&
            components.map((item) => (
              <div
                className={`cursor-pointer text-sm items-center flex flex-row gap-3 w-full px-3 py-1 ${
                  localSelection === item.id
                    ? "bg-sky-500 text-white font-bold"
                    : "hover:bg-slate-200"
                }`}
                key={item.id}
                onContextMenu={handleContextMenu}
                onClick={() => {
                  selectComponent(item.id);
                  setEditorSelection(item.id);
                }}
              >
                <div
                  className={`rounded-full ${
                    true ? "bg-green-500" : "bg-gray-500"
                  } w-2 h-2`}
                ></div>
                <span className="flex-grow">{item.name}</span>
                {localSelection === item.id && <ArrowRightOutlined />}
              </div>
            ))}
        </div>
        <Menu
          id={MENU_ID}
          animation="fade"
          style={{ boxShadow: "none" }}
          className="text-sm border-gray-300 border rounded-none"
        >
          <Item id="rename">Rename</Item>
          <Item id="cut">Cut</Item>
          <Item id="copy">Copy</Item>
          <Item id="duplicate">Duplicate</Item>
          <Item disabled>Paste</Item>
          <Separator />
          <Item id="duplicate">Compare</Item>
        </Menu>
      </div>
      {localSelection && stages.length > 1 && (
        <EntityList
          stages={stages.slice(1)}
          parentSelection={localSelection}
          setEditorSelection={setEditorSelection}
        />
      )}
    </>
  );
};

export default EntityList;
