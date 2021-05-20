import ButtonAppBar from "./Navbar";
import HomeAppBar from "./NavbarHome";
import { useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layout: React.FC<Props> = (props: Props) => {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  console.log(usePathname());
  return (
    <>
      {usePathname() === "/home" ? (
        <HomeAppBar></HomeAppBar>
      ) : (
        <ButtonAppBar></ButtonAppBar>
      )}
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
