import NavbarRecord from "./Navbar/NavbarRecord";
import NavbarHome from "./Navbar/NavbarHome";
import { useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Layout: React.FC<Props> = (props: Props) => {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const home = ["/", "/services"];
  return (
    <>
      {home.includes(usePathname()) ? (
        <NavbarHome></NavbarHome>
      ) : (
        <NavbarRecord></NavbarRecord>
      )}
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
