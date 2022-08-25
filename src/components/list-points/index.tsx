import classNames from 'classnames';
import { API } from 'constantes/API';
import { itemVw } from 'constantes/itemVw';
import styles from './listPoints.module.scss';

type Props = {
  x: number
}

export default function ListPoint (scrollx: Props) {
  const list = API();

  return (
    <div className={styles.pointList}>
      {list.map((item, key) => (
        <p 
          key={key} 
          className={classNames({
            [styles.pointList_point]: true,
            [styles.pointList_point_ativo]: scrollx.x === key * (itemVw() * -1) ? true : false,
          })}
        />
      ))}
    </div>
  );
}