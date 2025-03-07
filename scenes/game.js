export class GameScene extends Phaser.Scene {

    // Altura e largura do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    // Arrays para armazenar plataformas e cabeças
    plataformas = [];
    cabecas = []; 

    // Variável para pontuação e referência do placar
    pontuacao = 0;
    placar;

    musica;

    // Chama o construtor da classe Phaser.Scene com o identificador "MainScene"
    constructor() {
        super("MainScene");
    }

    // Carrega as imagens e spritesheets necessárias para o jogo
    preload() {
        this.load.image("tiled", "../assets/mapp.png");
        this.load.tilemapTiledJSON('map', '../assets/mapa.json');
        this.load.image('back', '../assets/Background.png');
        this.load.spritesheet("grace_sprite", "../assets/spritesheetGrace.png", { frameWidth: 64, frameHeight: 64 });
        this.load.image('cabeca', '../assets/cabecaf.png');
        this.load.image('over', '../assets/gameover.png');
        this.load.audio('som', 'assets/musicajogo.mp3');

      
    }

    create() {

        // Adiciona a imagem de fundo e ajusta a sua escala
        this.add.image(0, 0, 'back').setScale(4);

        // Adiciona as cabeças ao array e posiciona no mapa
        this.cabecas.push(this.physics.add.staticImage(400, 360, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(600, 560, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(780, 430, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(1200, 556, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(1368, 460, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(1545, 370, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(1680, 530, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(1680, 210, "cabeca").setScale(1));
        this.cabecas.push(this.physics.add.staticImage(2460, 320, "cabeca").setScale(1));

        this.musica = this.sound.add('som', { loop: true });
        this.sound.volume = 1;
        this.input.once('pointerdown', () => {
            this.sound.unlock();
            this.musica.play();
            
                
        });
        

       // Configura cada cabeça para ser imóvel e define seu tamanho de colisão
        this.cabecas.forEach(cabeca => {
            cabeca.setSize(40, 40);
            cabeca.setImmovable(true);
        });

        // Cria o jogador, definindo sua posição inicial, escala e colisão 
        this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'grace_sprite').setScale(1.3);
        this.player.setCollideWorldBounds(true);
        this.player.setSize(45, 45);

        // Configura a câmera para seguir o jogador 
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, this.larguraJogo, this.alturaJogo);
        this.physics.world.setBounds(0, 0, this.larguraJogo, this.alturaJogo);

         // Cria as teclas de movimentação
        this.cursors = this.input.keyboard.createCursorKeys();

        // Adiciona colisão entre o jogador e as plataformas
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        // Adiciona colisão para cada cabeça
        this.cabecas.forEach(cabeca => {
            this.physics.add.collider(this.player, cabeca, (player, cabeca) => {
                cabeca.setVisible(false);
                cabeca.body.enable = false;
                console.log("Colisão detectada com uma cabeça");

                this.pontuacao += 1;
                this.placar.setText ('cabeças coletadas: ' + this.pontuacao)
            });
        });

        // Cria o mapa do tiled
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('Tileset (1)', 'tiled');

         // Cria as camadas do mapa
        const chao = map.createLayer('Camada de Blocos 1', tileset, 0, 0);
        const perdeu = map.createLayer('perdeu', tileset, 0, 0);

         // Define a colisão 
        chao.setCollisionByProperty({ collide: true });
        perdeu.setCollisionByProperty({ collide: true });
 
        // Adiciona colisão entre o jogador e a camada ao colidir, a cena atual é parada e a cena 'Gameover' é iniciada
            this.physics.add.collider(this.player, perdeu, (player, perdeu) => {
            this.scene.stop('GameScene');
            this.scene.start('Gameover');
        });
        
          // Adiciona colisão entre o jogador e a camada do chão
        this.physics.add.collider(this.player, chao);
    
        // Configura a câmera para seguir o jogador 
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    
        // Cria animações do jogador, ele anda para a direita, esquerda e fica parado
        this.anims.create({
        key: 'direita',
         frames: this.anims.generateFrameNumbers('grace_sprite', { start: 5, end: 8 }),
         frameRate: 10,
         repeat: -1
            });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('grace_sprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada',
            frames: [{ key: 'grace_sprite', frame: 4 }],
            frameRate: 20
        });

         // Adiciona o texto do placar na tela
        this.placar = this.add.text(100, 100, 'cabeças coletadas: ' + this.pontuacao, {font: "20px Arial", fill:"#ffffff", align: "left"} );

        console.log(map.heightInPixels);
        
    }

    update() {

        // Verifica se a pontuação atingiu 9 para mudar para a cena 'Ganhou'
        if(this.pontuacao==9){
            console.log("cade")
            this.scene.start('Ganhou')
        }

         // Atualiza a posição do placar para acompanhar o jogador
        this.placar.x = this.player.body.x - 350;
        this.placar.y = this.player.body.y - 250;

        // Verifica se o jogador está no chão para pular novamente
        if (this.player.body.onFloor()) {
            this.pulando = false;
            
        }

        // Movimenta para a esquerda
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }

        // Movimenta para a direita
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

        //define animação quando ele anda para a direita
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }

        } else {
            this.player.setVelocityX(0);
             //define animação quando ele anda para a esqueda
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play('parada', true);
            }
        }

         // Pulo
        if (this.cursors.up.isDown && !this.pulando) {
            this.player.setVelocityY(-490);
            this.pulando = true;
        }

        // Verifica se o jogador está caindo após um pulo
        if (this.player.body.velocity.y > 0 && this.pulando) {
    
        }

    }
}