export class Ganhou extends Phaser.Scene {

     // Largura e altura do jogo
    larguraJogo = 800;
    alturaJogo = 600;

    // Chama o construtor da classe Phaser.Scene com o identificador "Ganhou"
    constructor() {
        super("Ganhou");
    }

    // Carrega a imagem de fundo para a tela de vitória
    preload() {
        this.load.image("ganhou", "assets/ganhou.png");
    }
      

      // Adiciona a imagem de fundo e centraliza na tela 
    create() {
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "ganhou").setDisplaySize(this.larguraJogo, this.alturaJogo);
    }
       
    update() {
       
    }}
