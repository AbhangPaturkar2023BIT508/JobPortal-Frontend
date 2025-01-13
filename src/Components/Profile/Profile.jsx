import React, { useState } from "react";
import {
  IconMapPin,
  IconBriefcase,
  IconPencil,
  IconDeviceFloppy,
  IconPlus,
} from "@tabler/icons-react";
import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { profile } from "../../Data/TalentData";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";

const Profile = () => {
  const select = fields;
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
        <div className="text-3xl font-semibold flex justify-between">
          {profile.name}
          <ActionIcon size="lg" color="brightSun.4" variant="subtle">
            {edit[0] ? (
              <IconDeviceFloppy
                onClick={() => {
                  handleEdit(0);
                }}
                className="h-4/5 w-4/5"
              />
            ) : (
              <IconPencil
                onClick={() => {
                  handleEdit(0);
                }}
                className="h-4/5 w-4/5"
              />
            )}
          </ActionIcon>
        </div>
        {edit[0] ? (
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </>
        ) : (
          <>
            <div className="text-xl flex gap-1 items-center">
              <IconBriefcase className="h-5 w-5" stroke={1.5} />
              {profile.role} &bull; {profile.company}
            </div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-400">
              <IconMapPin className="h-5 w-5" stroke={1.5} />
              {profile.location}
            </div>
          </>
        )}
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
            {profile.skills.map((skill, index) => (
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
          {profile.experience.map((exp, index) => (
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
          {profile.certifications.map((certi, index) => (
            <CertiCard key={index} edit={edit[4]} {...certi} />
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
