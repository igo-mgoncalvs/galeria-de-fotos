import classNames from 'classnames';
import { API } from 'constantes/API';
import { itemVw } from 'constantes/itemVw';
import styles from './descricao.module.scss';

type Props = {
  overview: string
}

export default function Descricao (props: Props) {
  const descricao = API();
  return (
    <div>
      <div style={{marginLeft: scrollX, width: descricao.length * itemVw()}}>
        <div className={styles.descricao}>
          <p className={classNames({
            [styles.desativa]: true,
            [styles.ativa]: window.innerWidth <= 425? false: true
          })}
          >
            {props.overview}
          </p>
        </div>
      </div>
    </div>
  );
}