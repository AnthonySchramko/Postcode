interface HeaderProps {
  text: string;
}
const Header = ({ text }: HeaderProps) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default Header;
