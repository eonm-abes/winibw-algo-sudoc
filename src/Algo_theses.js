// description: Ce script permet de récuperer avec AlgoTheses les rapports de chargement de données de Theses.fr depuis WinIBW.
// author : Mathis EON
// email: eon@abes.fr

const algo_theses_base_url = "https://www.theses.fr/AlgoSudoc";
const chunk_size = 200;

const winIBWMessageFormat = {
  error: 1,
  warning: 2,
  notification: 3,
};

export function AlgoTheses() {
  let screen_results = application.activeWindow.getVariable("P3VKZ").split("\x1BH\x1BLPP");
  
  // on enlève le premier résultat qui n'est pas un PPN
  screen_results.shift();

  let ppns = screen_results.map((result) => {
      return result.substr(0, 9)
  })

  ppns = (ppns.length) ? ppns : [application.activeWindow.getVariable("P3GPP")]

  if (ppns) {
    let urls = __urlBuilder("ppn", ppns);

    urls.forEach((url) => __get_report(url))
  } else {
    application.activeWindow.showMessage(
      `Impossible de récupérer le rapport d'AlgoThèses depuis cet écran`,
      winIBWMessageFormat.warning
    );
  }
}

function __get_report(url) {
  application.activeWindow.showMessage(
    `Récupération du rapport d'AlgoThèses depuis : ${url}`,
    winIBWMessageFormat.notification,
  );

  application.shellExecute(`${url}&origin=winibw`, 5, "open", "");
}

function __urlBuilder(param_name, param_value) {
  let params = [].concat(param_value || []);

  return __chunk(params, chunk_size).map((chunk) => {
    return `${algo_theses_base_url}?${param_name}=${chunk.join(",")}`
  })
}

function __chunk(input, chunk_size) {
  return Array.from({ length: Math.ceil(input.length / chunk_size) }, (v, i) =>
    input.slice(i * chunk_size, i * chunk_size + chunk_size),
  );
}