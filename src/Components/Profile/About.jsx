import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";

const About = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [about, setAbout] = useState("");
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, about: about };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "About Updated Successfully");
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div>
          {edit && (
            <ActionIcon size="lg" color="green.8" variant="subtle">
              <IconCheck onClick={handleSave} className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            size="lg"
            color={edit ? "red.8" : "brightSun.4"}
            variant="subtle"
          >
            {edit ? (
              <IconX onClick={handleClick} className="h-4/5 w-4/5" />
            ) : (
              <IconPencil onClick={handleClick} className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <Textarea
          autosize
          minRows={3}
          placeholder="Enter about yourself..."
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      )}
    </div>
  );
};

export default About;
