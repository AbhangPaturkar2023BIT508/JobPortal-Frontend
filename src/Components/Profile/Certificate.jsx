import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => {
                setAddCerti(true);
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
          {profile?.certification?.map((certi, index) => (
            <CertiCard key={index} index={index} edit={edit} {...certi} />
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti} />}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
