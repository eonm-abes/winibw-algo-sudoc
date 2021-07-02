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

function AlgoTheses() {
  let screen_results = application.activeWindow.getVariable("P3VKZ").split("\x1BH\x1BLPP");
  let ppns = [];

  for (let i in screen_results) {
    if (i > 0) {
      ppns.push(screen_results[i].substr(0, 9));
    }
  }

  ppns = (ppns.length) ? ppns : [application.activeWindow.getVariable("P3GPP")]

  if (ppns) {
    let urls = urlBuilder("ppn", ppns);
    
    for (let index in urls) {
      get_repport(urls[index])
    }
  } else {
    application.activeWindow.showMessage(
      `Impossible de récupérer le rapport d'AlgoThèses depuis cet écran`,
      winIBWMessageFormat.warning
    );
  }
}

function get_repport(url) {
  application.activeWindow.showMessage(
    `Récupération du rapport d'AlgoThèses depuis : ${url}`,
    winIBWMessageFormat.notification
  );

  application.shellExecute(`${url}&origin=winibw`, 5, "open", "");
}

function urlBuilder(param_name, param_value) {
  let params = [].concat(param_value || []);
  let urls = []

  let chunks = chunk(params, chunk_size)
  
  for (var i = 0; i < chunks.length; i++) {
    urls.push(`${algo_theses_base_url}?${param_name}=${chunks[i].join(",")}`)
  }

  return urls;
}

function chunk(input, chunk_size) {
  let chunks = [];

  for (let i = 0, j = input.length; i < j; i += chunk_size) {
    let temparray = input.slice(i, i + chunk_size);
    chunks.push(temparray)
  }

  return chunks
}
