# Game File Structure

All games should be placed in subdirectories under this path. You can place games here individually (e.g. `my-favourite-game`) or grouped in categories (e.g. `my-category/my-game-1`, `my-category/my-game-2`, etc).

Under each game directory, you should put the following contents:

- A declarative file named `game.json`, with your game metadata (see [below](#documentation-for-gamejson-properties)).
- A copy of your game's SWF file, if you want to play it offline.
- A directory named `screenshots`, with a number of [screenshot image files](#how-to-obtain-better-game-screenshots) of your game, named sequentially (e.g. `screenshot-0.png`, `screenshot-1.png`, etc). The first image file of the list will be your game cover.

## Documentation for `game.json` properties

- `title` _**(string)**_: game title
- `description` _**(array< string >)**_: game description, shown in info page; each element of the array corresponds to a paragraph of description text.
- `url` _**(string)**_: direct URL of the remote SWF file for online games; if you don't have a local copy of the SWF file for offline usage, the game will be loaded online using this URL.
  - PLEASE NOTE: some SWF games are developed in such a way that they won't be loaded properly (without [reverse engineering](https://github.com/jindrapetrik/jpexs-decompiler)) from a location other than its original website. For these cases, we recommend to load the game in online mode, providing its direct URL.
- `width`/`height` _**(number)**_: nominal width/height of the game, as given by [this procedure](#how-to-obtain-nominal-width-height-from-a-games-swf).
- `keywords` _**(object< string, array< string > >)**_: list of keywords used for filtering games at home page; each key of the object corresponds to a category (e.g. "Skills", "Math", "Language", "Science", "Themes", etc), and its value is an array of the keywords under this category.

## How to obtain better game screenshots

We strongly reccomemend the following conventions for screenshots' dimensions:

1. The height of the screenshot should have excatly **360px**.

2. The width of the screenshot should be proportional to its height, preserving the nominal aspect ratio obtained from `game.json`'s properties `width` and `height`.

When this app is running in development mode, any game will already be rendered with these dimensions, making it easier to take the required screenshots.

## How to obtain nominal width/height from a game's SWF

In order to get a game's nominal width/height, we need to download it, even if it's not suitable for offline usage. You can use the command `swfdump` from [SWFTools](http://swftools.org) to get them:

- `swfdump -X game.swf` will give the game's nominal width.
- `swfdump -Y game.swf` will give the game's nominal height.
