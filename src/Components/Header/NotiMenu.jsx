import { Indicator, Menu, Notification, rem } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotifications, readNotification } from "../../Services/NotiService";

const NotiMenu = () => {
  const user = useSelector((state) => state.user);
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      getNotifications(user.id)
        .then((data) => {
          console.log(data);
          setNotifications(data);
        })
        .catch((err) => {
          console.error("Error fetching notifications:", err);
        });
    }
  }, [user]);
  const unread = (index) => {
    let notis = [...notifications];
    notis = notis.filter((item, i) => i !== index);
    setNotifications(notis);
    readNotification(notifications[index].id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error marking notification as read:", err);
      });
  };

  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator
            disabled={notifications.length <= 0}
            color="brightSun.4"
            offset={6}
            size={8}
            processing
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-2">
          {notifications.map((item, index) => (
            <Notification
              onClick={() => {
                navigate(item.route);
                unread(index);
                setOpened(false);
              }}
              onClose={() => unread(index)}
              key={index}
              className="hover:bg-mine-shaft-900 cursor-pointer"
              icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
              color="teal"
              title={item.action}
            >
              {item.message}
            </Notification>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-sm text-gray-500">
              No new notifications
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotiMenu;
