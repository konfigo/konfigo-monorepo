import {
  CreateStagesMutation,
  CreateStagesMutationVariables,
} from "@/graphql/graphql";
import { CreateStagesMutationDocument } from "@/queries/createStages.mutation";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  addStage,
  removeStage,
  setContinueable,
  setStageName,
} from "@/state/slices/onboard.slice";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Step1: React.FC = () => {
  const stages = useAppSelector((st) => st.onboard.stages);

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState(-1);

  const add = () => {
    dispatch(addStage(""));
    setSelected(stages.length);
  };

  const remove = () => {
    dispatch(removeStage(selected));
    if (selected > 0) {
      setSelected((s) => s - 1);
    }
  };

  const name = (index: number, value: string) => {
    dispatch(setStageName({ index, name: value }));
  };

  useEffect(() => {
    if (
      stages.length === 0 ||
      stages.findIndex((s) => s.trim() === "") !== -1
    ) {
      dispatch(setContinueable(false));
    } else {
      dispatch(setContinueable(true));
    }
  }, [stages]);

  const EditableItem: React.FC<{ index: number }> = ({ index }) => {
    return (
      <Input
        className={"my-1 " + (selected === index ? "border-blue-400" : "")}
        placeholder="Name your stage"
        defaultValue={stages[index]}
        // onFocus={() => setSelected(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            name(index, (e.currentTarget as HTMLInputElement).value);
            add();
          }

          if (
            e.key === "Backspace" &&
            (e.currentTarget as HTMLInputElement).value === ""
          ) {
            remove();
          }
        }}
        onBlur={(e) => {
          name(index, e.target.value);
        }}
      />
    );
  };

  return (
    <>
      <Card variant="outlined" size="small" className="mb-5  bg-gray-100">
        <strong>Stages</strong>
        <p>
          Stages are the logical divisions of configurable entities in Konfigo.
          You can configure any amount of stages, its recommended to use
          Organization, Service, Environment stages.
          <br />
          <br />
          <strong>
            Warning: You will not be able to add or remove stages after this
            initial setup
          </strong>
        </p>
      </Card>

      <Form.Item label="Define stages">
        {stages.map((_, index) => (
          <EditableItem key={index} index={index} />
        ))}

        <div className="flex flex-row gap-2 mt-3">
          <Button onClick={add}>
            <PlusOutlined />
          </Button>
          <Button onClick={remove}>
            <MinusOutlined />
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export const Onboard: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { continueable, stages } = useAppSelector((st) => st.onboard);

  const steps = [<Step1 />];
  const stepTitles = ["Create stages", "Add users"];

  const [createStages, { loading }] = useMutation<
    CreateStagesMutation,
    CreateStagesMutationVariables
  >(CreateStagesMutationDocument);

  const next = () => {
    setStep(step + 1);
  };

  const previous = () => {
    setStep(step - 1);
  };

  const finish = async () => {
    await createStages({
      variables: {
        input: {
          names: stages,
        },
      },
    });

    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden">
        {/* <LayoutHeader /> */}
        <main className="flex-grow">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col" style={{ width: 500 }}>
              <div className="mb-5 flex flex-row items-center gap-3">
                <div className="flex flex-col gap-1 flex-grow">
                  <h1 className="text-2xl font-bold text-gray-600">
                    Setup Konfigo
                  </h1>
                  <h2 className="text-gray-500">{stepTitles[step]}</h2>
                </div>
                <h3 className="text-3xl text-gray-400">
                  {step + 1}/{steps.length}
                </h3>
              </div>

              <Form layout="vertical">{steps[step]}</Form>

              <div className="flex flex-row items-stretch gap-2">
                {step > 0 && (
                  <Button
                    onClick={previous}
                    className="my-2 flex-grow"
                    type="default"
                    size="large"
                  >
                    <ArrowLeftOutlined />
                    Previous
                  </Button>
                )}
                {step === steps.length - 1 ? (
                  <Button
                    onClick={finish}
                    className="my-2 flex-grow"
                    type="primary"
                    size="large"
                    disabled={!continueable}
                  >
                    <CheckOutlined />
                    Finish setup
                  </Button>
                ) : (
                  <Button
                    onClick={next}
                    className="my-2 flex-grow"
                    type="primary"
                    disabled={!continueable}
                    size="large"
                  >
                    Next
                    <ArrowRightOutlined />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
