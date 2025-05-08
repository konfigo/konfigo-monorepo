import { ComponentConfig } from "@/graphql/graphql";
import { useAppDispatch } from "@/state/hooks";
import { setOldBuffer, setVisualizeDiff } from "@/state/slices/editor.slice";
import { formatDate } from "@/util/helpers";

export interface CommitHistoryItemProps {
  item: ComponentConfig;
}

export const CommitHistoryItem: React.FC<CommitHistoryItemProps> = ({
  item,
}) => {
  const dispatch = useAppDispatch();

  const setOldBuff = (val: string) => dispatch(setOldBuffer(val));
  const setDiff = (val: boolean) => dispatch(setVisualizeDiff(val));

  const onSetDiff = () => {
    const prettyPayload = JSON.stringify(JSON.parse(item.payload), null, 2);

    setOldBuff(prettyPayload);
    setDiff(true);
  };

  return (
    <>
      <div
        className="flex flex-col border-b px-3 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={onSetDiff}
      >
        <span className="font-bold">{item.commitMessage}</span>
        <span className="text-small">{formatDate(item.createdAt)}</span>
      </div>
    </>
  );
};
