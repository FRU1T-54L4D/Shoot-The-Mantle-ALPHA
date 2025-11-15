namespace SpriteKind {
    export const NPC = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    shotDir = 1
    animation.runImageAnimation(
    mySprite,
    assets.animation`MC Back Anim`,
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.smiles, 10)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shotDir == 1) {
        projectile = sprites.createProjectileFromSprite(assets.image`Shot`, mySprite, 0, -150)
    } else if (shotDir == 2) {
        projectile = sprites.createProjectileFromSprite(assets.image`Shot`, mySprite, 0, 150)
    } else if (shotDir == 3) {
        projectile = sprites.createProjectileFromSprite(assets.image`Shot`, mySprite, -150, 0)
    } else if (shotDir == 4) {
        projectile = sprites.createProjectileFromSprite(assets.image`Shot`, mySprite, 150, 0)
    } else {
    	
    }
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
info.onScore(15, function () {
    game.setGameOverScoringType(game.ScoringType.None)
    game.gameOver(true)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    shotDir = 3
    animation.runImageAnimation(
    mySprite,
    assets.animation`MC Side Left Anim`,
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(sprite, effects.fire, 75)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    shotDir = 4
    animation.runImageAnimation(
    mySprite,
    assets.animation`MC Side Right Anim`,
    100,
    true
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    shotDir = 2
    animation.runImageAnimation(
    mySprite,
    assets.animation`MC Front Anim`,
    100,
    true
    )
})
let myEnemy: Sprite = null
let projectile: Sprite = null
let shotDir = 0
let DS_NPC: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`MC Front`, SpriteKind.Player)
let statusbar = statusbars.create(17, 3, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.setColor(6, 2)
controller.moveSprite(mySprite)
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
music.play(music.createSong(assets.song`falling-blossoms`), music.PlaybackMode.LoopingInBackground)
if (Math.percentChance(5)) {
    DS_NPC = sprites.create(assets.image`NPC`, SpriteKind.NPC)
    tiles.placeOnRandomTile(DS_NPC, sprites.castle.tilePath5)
}
game.onUpdate(function () {
    if (mySprite.vx + mySprite.vy == 0) {
        mySprite.setImage(assets.image`MC Front`)
    }
})
game.onUpdate(function () {
    if (mySprite.overlapsWith(myEnemy)) {
        statusbar.value += -2
    }
})
game.onUpdateInterval(3000, function () {
    myEnemy = sprites.create(assets.image`Enemy`, SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Enemy Anim`,
    100,
    true
    )
    tiles.placeOnRandomTile(myEnemy, sprites.castle.tileGrass1)
    myEnemy.follow(mySprite, 95)
})
