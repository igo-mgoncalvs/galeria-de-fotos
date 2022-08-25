import axios from 'axios';
import { IImagens } from 'interfaces/IImagens';
import { IListaDeImagens } from 'interfaces/IListaDeImagens';
import { useEffect, useState } from 'react';

export const API = () => {
  const API_Key = 'f9b5bfbe213421f59ac9ce82bbc4953c';
  const API_Base = 'https://api.themoviedb.org/3/discover/movie?';

  const [imagens, setImagens] = useState<IImagens[]>([]);

  useEffect(() => {
    axios.get<IListaDeImagens<IImagens>>(`${API_Base}api_key=${API_Key}&language=pt-BR&sort_by=popularity.desc`)
      .then(resposta => {
        const listaGeral = resposta.data.results;
        const cincoItens = listaGeral.slice(2,7);
        setImagens(cincoItens);
      });
  }, []);

  return imagens;
};