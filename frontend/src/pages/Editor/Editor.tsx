import EntityList from "@/shared/components/EntityList/EntityList";
import React, { useEffect } from "react";
import "./Editor.css";
import { useQuery } from "@apollo/client";
import { GetStagesQueryDocument } from "@/queries/getStages.query";
import { GetStagesQuery } from "@/graphql/graphql";
import ConfigEditor from "@/shared/components/ConfigEditor/ConfigEditor";
import { RightPanel } from "@/shared/components/RightPanel/RightPanel";
import { useNavigate } from "react-router-dom";

const Editor: React.FC = () => {
  const { data: stagesData, loading } = useQuery<GetStagesQuery>(
    GetStagesQueryDocument,
    {
      fetchPolicy: "network-only",
    },
  );

  let navigate = useNavigate();

  useEffect(() => {
    if (!loading && stagesData && stagesData.getStages.length === 0) {
      navigate("/onboard");
    }
  }, [stagesData, loading]);

  if (!stagesData || stagesData.getStages.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-row h-full flex-grow">
        <div className="flex flex-row h-full">
          <EntityList stages={stagesData?.getStages} />
        </div>
        <div className="flex relative flex-col flex-grow h-full overflow-auto border-l">
          <ConfigEditor />
        </div>
        <RightPanel />
      </div>
    </>
  );
};

export default Editor;
