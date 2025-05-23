import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IconCalendarMonth,
  IconEye,
  IconHeart,
  IconMapPin,
} from "@tabler/icons-react";
import { Avatar, Button, Divider, Text } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../../Services/ProfileService";
import { changeApplicationStatus } from "../../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../../Services/Utilities";

const TalentCard = (props) => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [profile, setProfile] = useState({});
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);

  const ref = useRef(null);

  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else setProfile(props);
  }, [props]);

  const handleOffer = (status) => {
    let interview = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
      interviewTime: date,
    };
    if (status === "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview.interviewTime = date;
    }
    changeApplicationStatus(interview)
      .then((res) => {
        if (status === "INTERVIEWING")
          successNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully"
          );
        else if (status === "OFFERED")
          successNotification(
            "Offered Accepted",
            "Offer Accepted Successfully"
          );
        else successNotification("Rejected", "Offer Rejected Successfully");
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 bs-mx:w-[48%] md-mx:w-full">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              className="rounded-full"
              size="lg"
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile?.picture}`
                  : `/Avatar.png`
              }
            />
          </div>
          <div>
            <div className="font-semibold text-lg">{profile?.name}</div>
            <div className="text-sm text-mine-shaft-300 font-semibold">
              {profile?.jobTitle} &#x2022; {profile?.company}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex flex-wrap gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile?.skills?.map(
          (skill, index) => index < 4 && <div key={index}>{skill}</div>
        )}
      </div>
      <Text
        className="!text-xs !text-mine-shaft-300 text-justify"
        lineClamp={3}
      >
        {profile?.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview :{" "}
          {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-300">
            Exp. {profile?.totalExp ? profile.totalExp : 1} Years
          </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile?.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />
      <div className="flex items-center [&>*]:!w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="brightSun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className="w-5 h-5" />}
                  color="brightSun.4"
                  variant="light"
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                color="brightSun.4"
                variant="outline"
                onClick={() => handleOffer("OFFERED")}
                fullWidth
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                color="brightSun.4"
                variant="light"
                onClick={() => handleOffer("REJECTED")}
                fullWidth
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          color="brightSun.4"
          variant="filled"
          fullWidth
          autoContrast
          onClick={openApp}
        >
          View Application
        </Button>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            minDate={new Date()}
            onChange={setDate}
            label="Date"
            placeholder="Enter Date"
          />
          <TimeInput
            value={time}
            onChange={(e) => {
              setTime(e.currentTarget.value);
            }}
            label="Time"
            ref={ref}
            onClick={() => ref.current.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="brightSun.4"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>

      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-4">
          <div>
            Email : &emsp;{" "}
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div>
            Website : &emsp;{" "}
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={props.website}
              target="_blank"
            >
              {props.website}
            </a>
          </div>
          <div>
            Resume : &emsp;{" "}
            <span
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              onClick={() => {
                openBase64PDF(props.resume);
                console.log(props);
                console.log(profile);
              }}
            >
              <Button
                className="!text-bright-sun-400"
                leftSection={<IconEye />}
                variant="light"
                autoContrast
              >
                {profile?.name} Resume
              </Button>
            </span>
          </div>
          <div>
            Cover Letter : &emsp; <div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
