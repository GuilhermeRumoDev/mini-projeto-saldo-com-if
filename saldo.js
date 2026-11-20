// Importa o Chalk, usado para colorir as mensagens no terminal.
import chalk from "chalk"

// Importa a ferramenta do Node.js para fazer perguntas pelo terminal.
import readline from "node:readline/promises"

// Cria a conexão de leitura: recebe texto do teclado e escreve no terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Função principal do programa. Ela é async porque espera respostas do usuário.
async function main() {
    // Saldo inicial; ele permanece atualizado enquanto o programa está rodando.
    let saldo = 500

    // Controla a repetição do menu. A opção 4 muda este valor para false.
    let continuar = true

    // Repete o menu enquanto continuar for true.
    while (continuar) {
        // Exibe as opções do menu com texto ciano.
        console.log(chalk.cyan("1 - Consultar"))
        console.log(chalk.cyan("2 - Transferir"))
        console.log(chalk.cyan("3 - Depositar"))
        console.log(chalk.cyan("4 - Sair"))

        // Lê a opção escolhida e converte a resposta de texto para número.
        const menu = Number(await rl.question("Qual opção deseja ? "))

        // Opção 4: mostra a despedida e encerra a repetição do menu.
        if (menu === 4) {
            console.log(chalk.underline.yellow("Até logo!"))
            continuar = false
        // Verifica se a resposta não representa um número válido.
        } else if (Number.isNaN(menu)) {
            console.log(chalk.red("Opção não cadastrada!"))
        // Opção 1: mostra o saldo atual.
        } else if (menu === 1) {
            console.log(`Seu saldo: ${chalk.green("R$")}${chalk.green(saldo)}`)
        // Opção 2: pergunta quanto o usuário quer transferir.
        } else if (menu === 2) {
            const transferir = Number(await rl.question("Quanto deseja trânsferir ? "))

            // Recusa uma resposta que não seja um número finito.
            if (!Number.isFinite(transferir)) {
                console.log(chalk.red("Valor inválido!"))
            // Recusa valores zero ou negativos.
            } else if (transferir <= 0) {
                console.log(chalk.red("Digite um valor positivo para transferir!"))
            // Impede a transferência quando o saldo não é suficiente.
            } else if (transferir > saldo) {
                console.log(chalk.red("Saldo insuficiente!"))
            // Se passou pelas validações, subtrai o valor e mostra o novo saldo.
            } else {
                saldo -= transferir
                console.log(`Trânsferencia no valor de ${chalk.yellow("R$")}${chalk.yellow(transferir)} realiza com sucesso! `)
                console.log(`Saldo atual: ${chalk.yellow(`R$${saldo}`)}`)
            }
        // Opção 3: pergunta quanto o usuário quer depositar.
        } else if (menu === 3) {
            const depositar = Number(await rl.question("Quanto deseja depositar ? "))

            // Recusa uma resposta que não seja um número finito.
            if (!Number.isFinite(depositar)) {
                console.log(chalk.red("Digite um valor válido!"))
            // Recusa valores zero ou negativos.
            } else if (depositar <= 0) {
                console.log(chalk.red("Deposite um valor positivo!"))
            // Se passou pelas validações, soma o depósito ao saldo.
            } else {
                saldo += depositar
                console.log(`Deposito no valor ${chalk.green("R$")}${chalk.green(depositar)} concluido!`)
                console.log(`Saldo atual: ${chalk.green("R$")}${chalk.green(saldo)}`)
            }
        // Trata qualquer opção numérica que não exista no menu.
        } else {
            console.log(chalk.red("Escolha um numero que esteja no menu!"))
        }
    }

    // Fecha a interface do terminal quando o usuário escolhe sair.
    rl.close()
}

// Inicia a execução da função principal.
main()
