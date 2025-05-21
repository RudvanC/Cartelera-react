import styles from './NavbarGuest.module.css';
import Button from '../../commons/Button/Button.jsx'

function NavbarGuest() {
  return (
    <nav className={styles.nav}>
        <img src="/src/assets/logo.png" alt="logo Hooks & Chill" />
        <Button >Suscríbete</Button>
    </nav>
  );
}

export default NavbarGuest;