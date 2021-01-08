<div align="center">

# WinIBW AlgoThèses

![Build](https://github.com/eonm-abes/winibw-algo-theses/workflows/Build/badge.svg)
[![Latest Build](https://img.shields.io/badge/%F0%9F%93%A6%20lastest%20build-AlgoTheses.js-yellow)](https://github.com/eonm-abes/winibw-algo-theses/releases/latest/download/Algo_theses.js)
[![GitHub release](https://img.shields.io/github/release/eonm-abes/winibw-algo-theses.svg)](https://github.com/eonm-abes/winibw-algo-theses/releases/latest)
[![Contribution Welcome](https://img.shields.io/badge/contribution-welcome-green.svg)](https://github.com/eonm-abes/winibw-algo-theses/pulls)

</div>

Ce script permet de récuperer grâce à [AlgoThèses](http://documentation.abes.fr/sudoc/manuels/controle_bibliographique/rapports_chargement_theses_fr/index.html) les rapports de chargement de données de [Theses.fr](http://www.theses.fr/) depuis WinIBW.

## Installation

> __⚠️ Avant toute modification pensez à conserver une copie fonctionnelle du fichier `C:\oclcpica\WinIBW30\defaults\pref\setup.js`__

1- [Téléchargez la dernière version d'AlgoThèses](https://github.com/eonm-abes/winibw-algo-theses/releases/latest/download/Algo_theses.js)


2- Le fichier `Algo_theses.js` doit être copié dans le dossier : `C:\oclcpica\WinIBW30\chrome\ibw\scripts\`.<sup id="a1">[1](#f1)</sup> 

3- La ligne suivante doit être rajoutée au fichier `C:\oclcpica\WinIBW30\defaults\pref\setup.js` (à la suite des lignes contenant `ibw.standardScripts.script.XX`) :

```js
pref("ibw.standardScripts.script.AlgoTheses", "resource:/scripts/Algo_theses.js");
```

Le script est à présent installé, WinIBW doit être redémarré pour que l'installation devienne effective.

### Ajouter le script à l'interface de WinIBW

<div align="center">

![UI Install](img/ui_install_1.png "UI Install")

</div>

Depuis la barre de menu : `Options` ↪ `Personnaliser` (Ctrl+Shift+P)

<div align="center">

![UI Install](img/ui_install_2.png "UI Install")

</div>

Dans l'onglet `Commandes`➀ :

- Sélectionnez dans le panneau `Catégories`  l'entrée `Standard Fonctions`➁
- Sélectionnez dans le panneau `Commandes` le script `AlgoTheses`➂
- Glissez déposez le script sélectioné sur l'une des barres de menu de WinIBW

## Utilisation

Le script peut être utilisé depuis une notice ou une liste de notices. Lorsque le script est utilisé sur une liste de résultats seule la notice sélectionnée est analysée par AlgoTheses.

## Développement

Vous devez disposer d'un environement de développement [Node.js](https://nodejs.org/en/download/).

```
npm install
npm run build
```

Le script devant être installé se trouve dans le dossier `dist/`.

Le contenu du dossier `dist/` est généré automatiquement, il ne doit pas être édité à la main.

## Références

[Documentation d'AlgoThèses](http://documentation.abes.fr/sudoc/manuels/controle_bibliographique/rapports_chargement_theses_fr/index.html)<br>[Documentation des scripts WinIBW](http://documentation.abes.fr/sudoc/manuels/logiciel_winibw/scripts/index.html)

Développement :

[Scripting in WinIBW: Getting started](https://www.zeitschriftendatenbank.de/fileadmin/user_upload/ZDB/pdf/winibw/Scripting_in_WinIBW3_V_1_17.pdf)

---

<span id="f1">1</span> Si vous souhaitez conserver un dossier `scripts` propre qui ne contient que les scripts fournis par OCLC et par l'ABES, vous pouvez lier fichier Algo_theses.js au lieu de le copier. [↩](#a1)
