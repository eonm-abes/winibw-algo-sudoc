<div align="center">

# WinIBW AlgoSudoc

</div>

Ce script permet de récuper avec [AlgoSudoc](http://documentation.abes.fr/sudoc/manuels/controle_bibliographique/rapports_chargement_theses_fr/index.html) les rapports de chargement de données de Theses.fr depuis WinIBW.

## Installation

> __⚠️ Avant toute modification pensez à conserver une copie fonctionnelle du fichier `C:\oclcpica\WinIBW30\defaults\pref\setup.js`__

Le fichier `Algo_sudoc.js` doit être copié dans le dossier : `C:\oclcpica\WinIBW30\chrome\ibw\scripts\`

La ligne suivante doit être rajoutée au fichier `C:\oclcpica\WinIBW30\defaults\pref\setup.js` (à la suite des lignes `ibw.standardScripts.script.XX`) :

```js
pref("ibw.standardScripts.script.Algosudoc", "resource:/scripts/Algo_sudoc.js");
```

Le script est à présent installé, WinIBW doit être redémarré pour que l'installation soit effective.

### Ajouter le script à l'interface de WinIBW



## Utilisation

Le script peut être utilisé depuis une notice ou une liste de notices. Lorsque le script est utilisé sur une liste de résultats seule la notice sélectionnée est analysée par AlgoSudoc.

## Développement

```
npm install
npm run build
```

Le script qui doit être installé se trouve dans le dossier `dist/`.

Le contenu du dossier `dist/` est généré automatiquement, il ne doit pas être édité à la main.