import { Input } from "antd";
import { Button } from "antd";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Item,
  Menu,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";

const { Search } = Input;

export interface EntityItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface EntityListProps {
  items: EntityItem[];
  header: string;
  selection: string[];
  addLabel?: string;
  searchLabel?: string;
}

const MENU_ID = "entity-list-menu";

const EntityList: React.FC<EntityListProps> = ({
  items,
  header,
  selection,
  addLabel,
  searchLabel,
}) => {
  const onSearch = (value: string) => console.log(value);

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event) {
    show({
      event,
      props: {
        key: "value",
      },
    });
  }

  return (
    <>
      <div className="w-64 h-full flex flex-col border-r">
        <div className="px-2 py-2 pb-3 flex item flex-col gap-2 items-stretch text-sm bg-gray-100">
          <div className="flex flex-row items-center gap-2">
            <Button
              type="link"
              size="small"
              icon={<PlusOutlined />}
              title={`Add new ${addLabel || ""}`}
              onClick={() => console.log("Button clicked")}
            />
            <span className="font-bold flex-grow">{header}</span>
          </div>
          <Search
            placeholder={searchLabel || "Search..."}
            onSearch={onSearch}
          />
        </div>
        <div className="flex-grow flex flex-col overflow-y-auto">
          {items.map((item) => (
            <div
              className={`cursor-pointer text-sm items-center flex flex-row gap-3 w-full px-3 py-1 ${
                selection.includes(item.id)
                  ? "bg-sky-500 text-white font-bold"
                  : "hover:bg-slate-200"
              }`}
              key={item.id}
              onContextMenu={handleContextMenu}
            >
              <div
                className={`rounded-full ${
                  item.active ? "bg-green-500" : "bg-gray-500"
                } w-2 h-2`}
              ></div>
              <span className="flex-grow">{item.label}</span>
              {selection.includes(item.id) && <ArrowRightOutlined />}
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
    </>
  );
};

export default EntityList;
