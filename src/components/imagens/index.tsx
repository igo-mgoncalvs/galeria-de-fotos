import { useState } from 'react';
import styles from './imagens.module.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import classNames from 'classnames';
import { API } from 'constantes/API';
import ListPoint from 'components/list-points';
import { itemVw } from 'constantes/itemVw';
import Descricao from 'components/descricao';

export default function Imagens () {
  const Img_Base = 'https://image.tmdb.org/t/p/w500';
  const imagens = API();

  const [scrollX, setScrollX] = useState(0);

  function next () {
    const tamanhoTotalMargem = ((imagens.length - 2) * (itemVw() * -1));

    if(scrollX < tamanhoTotalMargem){
      setScrollX(0);
    } else {
      setScrollX(scrollX - itemVw());
    }
  }

  function before () {
    const tamanhoTotalMargem = ((imagens.length - 2) * itemVw());

    if(scrollX < tamanhoTotalMargem && scrollX >= 0){
      setScrollX(0);
    } else {
      setScrollX(scrollX + itemVw());
    }
  }

  return (
    <section className={styles.imagensBox}>
      <div className={styles.navigates}>
        <div className={styles.navigates_before}>
          <NavigateBeforeIcon 
            onClick={() => before()} 
            style={{fontSize: 35, color:'#BE5B00', backgroundColor:' #FFC75A'}}
          />
        </div>
        <div className={styles.navigates_next}>
          <NavigateNextIcon 
            onClick={() => next()} 
            style={{fontSize: 35, color:'#BE5B00', backgroundColor:' #FFC75A'}}
          />
        </div>
      </div>
      
      <div className={styles.imagensBox_listArea} >
        <div className={styles.imagensBox_listArea_list} style={{marginLeft: scrollX}}>
          {imagens.map((item, key) => (
            <div key={key} className={styles.imagensBox_listArea_list_item}>
              <img
                src={`${Img_Base}${item.backdrop_path}`} 
                className={styles.imagensBox_listArea_list_item_img}
              />
              <Descricao overview={item.overview}/>
            </div>
          ))}
        </div>
      </div>

      <ListPoint x={scrollX} />

      <div className={styles.imagensBox_listArea} >
        <div className={styles.imagensBox_listArea_list} style={{marginLeft: scrollX, width: imagens.length * itemVw()}}>
          {imagens.map((item, key) => (
            <div key={key} className={styles.imagensBox_listArea_list_item}>
              <p className={classNames({
                [styles.desativa]: true,
                [styles.ativa]: window.innerWidth > 425? false: true,
              })}
              >
                {item.overview}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}