class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }
    getNegociacaoSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana!');
            });
    }
    getNegociacaoSemanaPassada() {
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana passada!');
            });
    }
    getNegociacaoSemanaRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana retrasada!');
            });
    }
    getNegociacao() {
        return Promise.all([
            this.getNegociacaoSemana(),
            this.getNegociacaoSemanaPassada(),
            this.getNegociacaoSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;
        }).catch(err => {
            throw new Error(err)
        })
    }
}
