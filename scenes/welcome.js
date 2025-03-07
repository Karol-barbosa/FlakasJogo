export class WelcomeScene extends Phaser.Scene {

     // Largura e altura do jogo
    larguraJogo = 800;
    alturaJogo = 600;

    constructor() {
        super("WelcomeScene"); // Chama o construtor da classe Phaser.Scene com o nome "WelcomeScene"
    }

    preload() {
        // Carrega as imagens que vão ser usadas nesta cena
        this.load.image("back", "assets/Background.png");
        this.load.image("computador", "assets/computador_paisagem.png");
        this.load.image("play", "assets/botao_play.png");
    }

    create() {
        // Adiciona a imagem de fundo e centraliza
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "computador").setDisplaySize(this.larguraJogo, this.alturaJogo);

        // Cria um array de palavras que serão exibidas na tela
        const palavras = ['Desenvolvido', 'por', 'Karol'];

        // Configurações de estilo para o texto
        const estiloTexto = { fontFamily: 'Roboto', fontSize: '20px', fill: '#ffffff' };

          // Define o espaçamento entre as linhas do texto
        const espacamento = 20;

        // Loop para exibir cada palavra do array 
        for (let i = 0; i < palavras.length; i++) {
            const posicaoY = 330 + i * espacamento;
            this.add.text(this.larguraJogo / 9, posicaoY, palavras[i], estiloTexto).setOrigin(0.5);
        }

        // Adiciona o botão de jogar na tela
        this.botaoJogar = this.add.image(this.larguraJogo / 2, 330 + palavras.length * espacamento + 20, "play").setScale(0.1).setInteractive();

        // Configura para mudar quando o mouse passa no botão 
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        // Configura para voltar ao padrão quando o mouse sai do botão
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Configura o que acontece quando o botão é clicado
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene");
        });
    }

    update() {
       
    }
}
