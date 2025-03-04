import React, { useEffect, useState } from "react";
import { IconPencil, IconDeviceFloppy, IconPlus } from "@tabler/icons-react";
import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import Info from "./info";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [about, setAbout] = useState(profile.about);
  const [skills, setSkills] = useState(profile.skills);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const handleEdit = (idx) => {
    const newEdit = [...edit];
    newEdit[idx] = !newEdit[idx];
    setEdit(newEdit);
  };

  useEffect(() => {
    // console.log(profileFromSlice);
    getProfile(user.id)
      .then((data) => {
        dispatch(setProfile(data));
      })
      .catch((err) => {
        // console.log(err);
      });
  });
  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-full h-48 w-48 -bottom-1/3 left-3 border-mine-shaft-950 border-8 absolute"
          src="/avatar.png"
          alt=""
        />
      </div>
      <div className="px-3 mt-20">
        <Info />
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About
          <ActionIcon size="lg" color="brightSun.4" variant="subtle">
            {edit[1] ? (
              <IconDeviceFloppy
                onClick={() => {
                  handleEdit(1);
                }}
                className="h-4/5 w-4/5"
              />
            ) : (
              <IconPencil
                onClick={() => {
                  handleEdit(1);
                }}
                className="h-4/5 w-4/5"
              />
            )}
          </ActionIcon>
        </div>
        {edit[1] ? (
          <Textarea
            autosize
            minRows={3}
            placeholder="Enter about yourself..."
            value={about}
            onChange={(event) => setAbout(event.currentTarget.value)}
          />
        ) : (
          <div className="text-sm text-mine-shaft-300 text-justify">
            {profile.about}
          </div>
        )}
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills
          <ActionIcon size="lg" color="brightSun.4" variant="subtle">
            {edit[2] ? (
              <IconDeviceFloppy
                onClick={() => {
                  handleEdit(2);
                }}
                className="h-4/5 w-4/5"
              />
            ) : (
              <IconPencil
                onClick={() => {
                  handleEdit(2);
                }}
                className="h-4/5 w-4/5"
              />
            )}
          </ActionIcon>
        </div>
        {edit[2] ? (
          <TagsInput
            value={skills}
            onChange={setSkills}
            placeholder="Add skill"
            splitChars={[",", " ", "|"]}
          />
        ) : (
          <div className=" flex flex-wrap gap-2">
            {profile?.skills?.map((skill, index) => (
              <div
                key={index}
                className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      <Divider mx="xs" my="xl" />
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
              onClick={() => {
                handleEdit(3);
              }}
              size="lg"
              color="brightSun.4"
              variant="subtle"
            >
              {edit[3] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.experience?.map((exp, index) => (
            <ExpCard key={index} {...exp} edit={edit[3]} />
          ))}
          {addExp && <ExpInput add setEdit={setAddExp} />}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
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
              onClick={() => {
                handleEdit(4);
              }}
              size="lg"
              color="brightSun.4"
              variant="subtle"
            >
              {edit[4] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.certification ?.map((certi, index) => (
            <CertiCard key={index} edit={edit[4]} {...certi} />
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
