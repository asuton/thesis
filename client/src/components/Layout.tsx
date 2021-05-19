import ButtonAppBar from "./Navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const Layout: React.FC<Props> = (props: Props) => {
  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
