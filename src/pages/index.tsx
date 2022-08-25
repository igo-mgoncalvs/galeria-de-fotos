import Imagens from 'components/imagens';
import styles from './header.module.scss';

export default function Home () {

  return (
    <>
      <h1 className={styles.header}>GALERIA</h1>

      <Imagens />
    </>
  );
}