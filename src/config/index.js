const AMBIENTE_OFICIAL = true

const configuracoes_oficial = {
    jwtKey: 'codesotech'
}

const configuracoes_teste = {
    jwtKey: 'codesotech'
}

AMBIENTE_OFICIAL ? global.configs = configuracoes_oficial : global.configs = configuracoes_teste