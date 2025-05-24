import { IconAnchor, IconX, IconXboxX } from "@tabler/icons-react";
import { Burger, Button, Drawer } from "@mantine/core";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { removeUser, setUser } from "../../Slices/UserSlice";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talent", url: "/find-talent" },
  { name: "Post Jobs", url: "/post-job/0" },
  { name: "Posted Job", url: "/posted-job/0" },
  { name: "Job History", url: "/job-history" },
  // { name: "Sign-Up", url: "/signup" },
];

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const didNavigateRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  // useEffect(() => {
  //   if (!token) {
  //     if (!didNavigateRef.current) {
  //       didNavigateRef.current = true;
  //       dispatch(removeUser());
  //       navigate("/login");
  //     }
  //     return;
  //   }

  //   try {
  //     const decoded = jwtDecode(localStorage.getItem("token") || "");
  //     dispatch(setUser({ ...decoded, email: decoded.username }));
  //   } catch (err) {
  //     if (!didNavigateRef.current) {
  //       didNavigateRef.current = true;
  //       localStorage.removeItem("token");
  //       dispatch(removeUser());
  //       navigate("/login");
  //     }
  //     return;
  //   }
  //     getProfile(user?.id)
  //       .then((data) => dispatch(setProfile(data)))
  //       .catch((err) => console.error("Error fetching profile data:", err));
  // }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      try {
        const decoded = jwtDecode(localStorage.getItem("token") || "");
        dispatch(setUser({ ...decoded, email: decoded.username }));
      } catch (err) {
        if (!didNavigateRef.current) {
          didNavigateRef.current = true;
          localStorage.removeItem("token");
          dispatch(removeUser());
          navigate("/login");
        }
      }
    }
    if (user?.profileId)
      getProfile(user?.id)
        .then((data) => {
          dispatch(setProfile(data));
        })
        .catch((err) => {
          console.error("Error fetching profile data:", err);
        });
  }, [token, navigate]);

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="w-full bg-mine-shaft-950 h-20 flex justify-between font-['poppins'] text-white px-6 items-center">
      <div className="flex gap-1 items-center text-bright-sun-400 ">
        <IconAnchor stroke={2.5} className="h-80 w-8" />
        <div className="xs-mx:hidden text-3xl font-semibold">JobHook</div>
      </div>
      <NavLinks />
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div> */}
        {user ? <NotiMenu /> : <></>}
        {}
        <Burger
          className="bs:hidden "
          opened={opened}
          onClick={open}
          aria-label="Toggle navigation"
        />
        <Drawer
          size="xs"
          position="right"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          opened={opened}
          onClose={close}
          closeButtonProps={{ icon: <IconX size={30} /> }}
        >
          <div className="flex flex-col gap-5 h-full w-full justify-center items-center">
            {links.map((link, index) => (
              <div
                key={index}
                className={`${
                  location.pathname === link.url ? "text-bright-sun-400" : ""
                }  h-full flex items-center`}
              >
                <Link
                  className="hover:text-bright-sun-400 text-xl"
                  key={index}
                  to={link.url}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
