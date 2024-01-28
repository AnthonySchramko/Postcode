import styles from "./Header.module.scss";

interface HeaderProps {
  text: string;
}
const Header = ({ text }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Header;
