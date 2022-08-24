import axios from 'axios';
import { IImagens } from 'interfaces/IImagens';
import { IListaDeImagens } from 'interfaces/IListaDeImagens';
import { useEffect, useState } from 'react';
import styles from './imagens.module.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import classNames from 'classnames';

export default function Imagens () {
  const API_Key = 'f9b5bfbe213421f59ac9ce82bbc4953c';
  const API_Base = 'https://api.themoviedb.org/3/discover/movie?';
  const Img_Base = 'https://image.tmdb.org/t/p/w500';

  const [imagens, setImagens] = useState<IImagens[]>([]);

  const [scrollX, setScrollX] = useState(0);

  const itemVw = window.innerWidth * 0.88 +50;

  useEffect(() => {
    axios.get<IListaDeImagens<IImagens>>(`${API_Base}api_key=${API_Key}&language=pt-BR&sort_by=popularity.desc`)
      .then(resposta => {
        const listaGeral = resposta.data.results;
        const cincoItens = listaGeral.slice(0,5);
        setImagens(cincoItens);
      });
  }, []);

  function next () {
    const tamanhoTotalMargem = ((imagens.length - 2) * (itemVw * -1));

    if(scrollX < tamanhoTotalMargem){
      setScrollX(0);
    } else {
      setScrollX(scrollX - itemVw);
    }
  }

  function before () {
    const tamanhoTotalMargem = ((imagens.length - 2) * itemVw);

    if(scrollX < tamanhoTotalMargem && scrollX >= 0){
      setScrollX(0);
    } else {
      setScrollX(scrollX + itemVw);
    }
  }
  console.log(scrollX);

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
              <p className={classNames({
                [styles.desativa]: true,
                [styles.ativa]: window.innerWidth > 425? true: false
              })}>
                {item.overview}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.imagensBox_pointList}>
        {imagens.map((item, key) => (
          <p key={key} className={classNames({
            [styles.imagensBox_pointList_point]: true,
            [styles.imagensBox_pointList_point_ativo]: scrollX === key * (itemVw * -1) ? true : false,
          })}></p>
        ))}
      </div>

      <div className={styles.imagensBox_listArea} >
        <div className={styles.imagensBox_listArea_list} style={{marginLeft: scrollX, width: imagens.length * itemVw}}>
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