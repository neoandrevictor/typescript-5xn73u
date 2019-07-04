class DateHelper {
    constructor() {
        throw new Error('DateHelper não pode ser instanciado!!!')
    }

    static formataData(data) {
        return data.toDateString();
    }
    static textoParaData(texto) {
       
        return new Date(texto);
    }
}