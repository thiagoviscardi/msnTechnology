## Plantão extra V2 user interface

Frontend da aplicação plantão extra segunda versão

### Para iniciar o projeto

> Voce precisa ter em sua maquina: [nodejs](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/en/docs/install)

Inslate as dependências do projeto
```console
yarn
```

Inicie em modo desenvolvimento
```console
yarn start
```

### Para desenvolvimento com backend em ambiente local

> Você precisa ter instalado em sua maquina: [docker](https://docs.docker.com/engine/install) e [docker-compose](https://docs.docker.com/compose/install) 

Para iniciar a aplicação de backend em sua maquina faça:

1. Faça login no github packages

Crie seu personal access token: * [Personal access token com acesso a github packages](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

Faça login por linha de comando

```console
echo <seu-personal-access-token> | docker login ghcr.io --username <seu-usuario> --password-stdin
```

2. Clone o repositório e inicie as aplicações de backend

````
git clone git@github.com:thinkideaapp/plantaoextra-api.git
cd plantaoextra-api
git checkout dev
python init.py
````

Veja o repositorio https://github.com/thinkideaapp/plantaoextra-api,  se você precisar de mais detalhes sobre as aplicações do backend.
