import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import { Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";
import { useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const location = useLocation();
  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="w-full bg-mine-shaft-950 h-20 flex justify-between font-['poppins'] text-white px-6 items-center">
      <div className="flex gap-1 items-center text-bright-sun-400 ">
        <IconAnchor stroke={2.5} className="h-80 w-8" />
        <div className="text-3xl font-semibold">JobHook</div>
      </div>
      <NavLinks />
      <div className="flex gap-3 items-center">
        <ProfileMenu />
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="brightSun.4" offset={6} size={8} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
