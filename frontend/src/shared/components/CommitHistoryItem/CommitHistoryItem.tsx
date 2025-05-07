import { ComponentConfig } from "@/graphql/graphql";
import { formatDate } from "@/util/helpers";

export interface CommitHistoryItemProps {
  item: ComponentConfig;
}

export const CommitHistoryItem: React.FC<CommitHistoryItemProps> = ({
  item,
}) => {
  return (
    <>
      <div className="flex flex-col border-b px-3 py-2">
        <span className="font-bold">{item.commitMessage}</span>
        <span className="text-small">{formatDate(item.createdAt)}</span>
      </div>
    </>
  );
};
