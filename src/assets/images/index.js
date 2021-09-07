import logo from "./logo.svg";
import logo2 from "./running.png";
import { ReactComponent as Logo } from "./running.svg";
import { ReactComponent as ShoeIcon } from "./logo.svg";
import { Icon, SvgIcon } from "@material-ui/core";
import DEFAULT_IMAGE_URL from "./default_image.jpg";

const LogoIcon = (props) => {
  return (
    <SvgIcon component="object" {...props}>
      <embed type="image/svg+xml" src={logo} />
    </SvgIcon>
  );
};

const Logo2Icon = (props) => {
  return (
    <Icon {...props}>
      <img src={logo2} alt="logo" sytle={{ width: 32, height: 16 }} />
    </Icon>
  );
};

const Logo4Icon = ({ customClass }) => {
  return <img src={logo2} alt="logo" height={32} className={customClass} />;
};

const Logo5Icon = ({ fill, height, myClass }) => {
  return (
    <div className={myClass}>
      <Logo fill={fill} width="100%" height={height} />
    </div>
  );
};

export {
  LogoIcon,
  Logo2Icon,
  Logo4Icon,
  Logo5Icon,
  DEFAULT_IMAGE_URL,
  ShoeIcon,
};
