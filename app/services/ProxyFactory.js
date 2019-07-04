class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFunction(target[prop])) {
                    return function () {
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    console.log(`Interceptado: ${prop}`)
                    acao(target);
                }
                return retorno;
            }
        })
    }
    static _ehFunction(func) {
        return typeof (func) == typeof (Function);
    }
}