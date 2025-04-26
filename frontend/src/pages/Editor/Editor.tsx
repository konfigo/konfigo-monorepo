import EntityList from "@/shared/components/EntityList/EntityList";
import React, { useState } from "react";
import "./Editor.css";
import { useQuery } from "@apollo/client";
import { GetStagesQueryDocument } from "@/queries/getStages.query";
import { GetStagesQuery } from "@/graphql/graphql";
import ConfigEditor from "@/shared/components/ConfigEditor/ConfigEditor";

const Editor: React.FC = () => {
  const [editorSelection, setEditorSelection] = useState<string>();

  const { data: stagesData } = useQuery<GetStagesQuery>(GetStagesQueryDocument);

  if (!stagesData) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-row h-full">
        <div className="flex flex-row h-full">
          <EntityList
            stages={stagesData?.getStages}
            setEditorSelection={setEditorSelection}
          />
        </div>
        <div className="flex position-relative flex-col flex-grow h-full overflow-auto border-l">
          <ConfigEditor componentId={editorSelection} />
        </div>
      </div>
    </>
  );
};

export default Editor;
