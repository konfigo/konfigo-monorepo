import { Input, InputRef, Spin } from "antd";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  CheckOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Item, Menu, Separator, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import {
  CreateComponentDocument,
  CreateComponentMutation,
  CreateComponentMutationVariables,
  DeleteComponentMutation,
  DeleteComponentMutationVariables,
  DuplicateComponentMutation,
  DuplicateComponentMutationVariables,
  GetComponentByParentQuery,
  GetComponentByParentQueryVariables,
  RenameComponentMutation,
  RenameComponentMutationVariables,
  Stage,
} from "@/graphql/graphql";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GetComponentByParentQueryDocument } from "@/queries/getComponentByParent.query";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setSelectedComponentId } from "@/state/slices/editor.slice";
import { DeleteComponentMutationDocument } from "@/queries/deleteComponent.mutation";
import { DuplicateComponentMutationDocument } from "@/queries/duplicateComponent.mutation";
import { RenameComponentMutationDocument } from "@/queries/renameComponent.mutation";

const { Search } = Input;

export interface EntityItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface EntityListProps {
  stages: Stage[];
  parentSelection?: string;
}

const MENU_ID = "entity-list-menu";

const EntityList: React.FC<EntityListProps> = ({ stages, parentSelection }) => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);
  const [localSelection, setLocalSelection] = useState<string>();

  const [contextSelected, setContextSelected] = useState<string>();

  const [create, setCreate] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const createInputRef = useRef<InputRef>(null);
  const renameInputRef = useRef<InputRef>(null);

  const editingComponentId = useAppSelector(
    (state) => state.editor.selectedComponentId,
  );

  const dispatch = useAppDispatch();
  const setEditorSelection = (val: string) =>
    dispatch(setSelectedComponentId(val));

  const { show } = useContextMenu({
    id: `${MENU_ID}_${parentSelection}`,
  });

  function handleContextMenu(event: any, id: string) {
    setContextSelected(id);

    show({
      event,
      props: {},
    });
  }

  useEffect(() => {
    if (!createInputRef.current) {
      return;
    }

    createInputRef.current.focus();
  }, [create, createInputRef.current]);

  const { data: componentsData, refetch: refetchComponentsData } = useQuery<
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

  const [createComponent, { loading: createComponentLoading }] = useMutation<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >(CreateComponentDocument, {
    onCompleted: () => {
      setCreate(false);
      refetchComponentsData();
    },
  });

  const [deleteComponent] = useMutation<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >(DeleteComponentMutationDocument, {
    onCompleted: () => {
      setCreate(false);
      refetchComponentsData();
    },
  });

  const [duplicateComponent] = useMutation<
    DuplicateComponentMutation,
    DuplicateComponentMutationVariables
  >(DuplicateComponentMutationDocument, {
    onCompleted: () => {
      setCreate(false);
      refetchComponentsData();
    },
  });

  const [renameComponent] = useMutation<
    RenameComponentMutation,
    RenameComponentMutationVariables
  >(RenameComponentMutationDocument, {
    onCompleted: () => {
      setCreate(false);
      refetchComponentsData();
    },
  });

  const onSubmitCreate = () => {
    const newName = createInputRef.current?.input?.value;

    if (!newName) {
      return;
    }

    createComponent({
      variables: {
        input: {
          name: newName,
          parentId: parentSelection,
        },
      },
    });
  };

  useEffect(() => {
    if (!renameInputRef.current) {
      return;
    }

    renameInputRef.current.focus();
  }, [renaming, renameInputRef.current]);

  const stage = stages[0];
  const components = componentsData?.getComponentByParent;

  const filteredComponents = components?.filter(
    (c) => search === "" || c.name.includes(search),
  );

  const selectComponent = (id: string) => {
    setLocalSelection(id);
  };

  const deleteContextSelection = useCallback(() => {
    console.log("DELETE", contextSelected, localSelection);
    if (!contextSelected) {
      return;
    }

    if (contextSelected === localSelection) {
      setLocalSelection(undefined);
    }

    deleteComponent({
      variables: {
        id: contextSelected,
      },
    });
  }, [contextSelected, localSelection]);

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
              onClick={() => setCreate(true)}
            />
            <span className="font-bold flex-grow">{stage.name}</span>
          </div>
          <Search
            placeholder={`Search for ${stage.name.toLowerCase()}...`}
            onSearch={onSearch}
          />
        </div>
        <div className="flex-grow flex flex-col overflow-y-auto">
          {search && search.trim().length > 0 && (
            <p className="px-2 mt-2 text-xs text-gray-500 text-center">
              Search results for {search}
            </p>
          )}
          {!components && <Spin indicator={<LoadingOutlined spin />} />}
          {!!filteredComponents &&
            filteredComponents.map((item) => (
              <div
                className={`cursor-pointer text-sm items-center flex flex-row gap-3 w-full px-3 py-1 ${
                  localSelection === item.id
                    ? "bg-teal-900 text-white font-bold"
                    : "hover:bg-slate-200"
                }`}
                key={item.id}
                onContextMenu={(ev) => handleContextMenu(ev, item.id)}
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
                {renaming && contextSelected === item.id ? (
                  <>
                    <Input
                      defaultValue={item.name}
                      ref={renameInputRef}
                      placeholder="Component name"
                      size="small"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          renameComponent({
                            variables: {
                              id: item.id,
                              newName: e.currentTarget.value,
                            },
                          });
                          setRenaming(false);
                        }

                        if (e.key === "Escape") {
                          setRenaming(false);
                        }
                      }}
                      onBlur={() => setRenaming(false)}
                    />
                  </>
                ) : (
                  <span className="flex-grow">{item.name}</span>
                )}
                {editingComponentId === item.id && <EditOutlined />}
                {localSelection === item.id && <ArrowRightOutlined />}
              </div>
            ))}

          {create && (
            <div className="flex flex-row gap-2 px-2 py-2">
              <Input
                ref={createInputRef}
                placeholder="Name new component"
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
                disabled={createComponentLoading}
                loading={createComponentLoading}
                onClick={onSubmitCreate}
              >
                <CheckOutlined />
              </Button>
            </div>
          )}
        </div>
        <Menu
          id={`${MENU_ID}_${parentSelection}`}
          animation="fade"
          style={{ boxShadow: "none" }}
          className="text-sm border-gray-300 border rounded-none"
        >
          <Item id="rename" onClick={() => setRenaming(true)}>
            Rename
          </Item>
          <Item disabled id="cut">
            Cut
          </Item>
          <Item disabled id="copy">
            Copy
          </Item>
          <Item
            id="duplicate"
            onClick={() => {
              if (!contextSelected) {
                return;
              }

              duplicateComponent({
                variables: {
                  id: contextSelected,
                },
              });
            }}
          >
            Duplicate
          </Item>
          <Item disabled>Paste</Item>
          <Item id="delete" onClick={deleteContextSelection}>
            Delete
          </Item>
          <Separator />
          <Item id="duplicate">Compare</Item>
        </Menu>
      </div>
      {localSelection && stages.length > 1 && (
        <EntityList stages={stages.slice(1)} parentSelection={localSelection} />
      )}
    </>
  );
};

export default EntityList;
