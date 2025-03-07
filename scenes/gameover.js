export class Gameover extends Phaser.Scene {

    // Largura e altura do jogo
    larguraJogo = 800;
    alturaJogo = 600;
    
    // Chama o construtor da classe Phaser.Scene com o identificador "Gameover"
    constructor() {
        super("Gameover");
    }
    
    preload() {
        // Carrega a imagem de fundo 
        this.load.image("perdeu", "assets/gameover.png");

        // Carrega a imagem do botão enter
        this.load.image("enter", "assets/enter.png");
    }

    create() {
        // Adiciona a imagem de fundo e centralizada na tela 
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "perdeu").setDisplaySize(this.larguraJogo, this.alturaJogo);

        // Adiciona o botão enter e deixa na posição certa
        this.botaoJogar = this.add.image(this.larguraJogo / 1.9, 460, "enter").setScale(1).setInteractive();

         // Define o cursor do mouse como pointer
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        // Restaura o cursor padrão do mouse quando sai do botão
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // O jogo renicia quando o botão é clicado
        this.botaoJogar.on("pointerup", () => {
            location.reload();
        });
    }

    update() {
     
    }
}