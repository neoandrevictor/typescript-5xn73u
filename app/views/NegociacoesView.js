class NegociacoesView extends Views {
    constructor(elemento) {
        super(elemento)
    }
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead class="thead-light">
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            <tbody>
                ${model.negociacoes.map(n => `
                    <tr>
                        <td>${DateHelper.formataData(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <td colspan='3'></td>
                <td>
                    ${model.volumeTotal}
                </td>
            </tfoot>
        </table>
        `;
    }
}