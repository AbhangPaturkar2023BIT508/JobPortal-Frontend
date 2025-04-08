import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";

const Experience = () => {
  //   const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [addExp, setAddExp] = useState(false);
  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Experience
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => {
              setAddExp(true);
            }}
            size="lg"
            color="brightSun.4"
            variant="subtle"
          >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>

          <ActionIcon
            onClick={handleClick}
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
            variant="subtle"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.experience?.map((exp, index) => (
          <ExpCard key={index} index={index} {...exp} edit={edit} />
        ))}
        {addExp && <ExpInput add setEdit={setAddExp} />}
      </div>
    </div>
  );
};

export default Experience;
