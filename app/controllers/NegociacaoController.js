class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._ordemAtual = '';
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoesView")),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );

        this._mensagem = new Bind(
            new Mensagens(),
            new MensagensView($("#mensagemView")),
            'texto'
        );

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection).listAll())
            .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(err => console.log(err))
    }
    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(conexao => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDAO(conexao)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(this._criaNegociacao());
                        this._mensagem.texto = 'Negociação concluida com sucesso!';
                        this._limpaForm();
                    })
                    .catch(err => this._mensagem.texto = err);
            })
    }
    importaNegociacoes() {
        let service = new NegociacaoService();
        service.getNegociacao()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação importada com sucesso!'
            }).catch(err => this._mensagem.texto = err);
    }
    remove() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value),
        );
    }
    _limpaForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    ordena(col) {
        if (this._ordemAtual == col) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[col] - b[col]);
        }
        this._ordemAtual = col;
    }
}