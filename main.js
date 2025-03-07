// Importa as cenas do jogo
import { GameScene } from "./scenes/game.js";
import { WelcomeScene } from "./scenes/welcome.js";
import { Gameover } from "./scenes/gameover.js";
import { Ganhou } from "./scenes/ganhou.js";

// Configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    roundPixel: false,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade", // Define o sistema de física 
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [WelcomeScene, GameScene, Gameover, Ganhou]  // Lista das cenas do jogo
};
//inicia o jogo
const game = new Phaser.Game(config);