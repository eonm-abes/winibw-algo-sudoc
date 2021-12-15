const algo_theses_base_url = "https://www.theses.fr/AlgoSudoc";
const max_number_of_ppn = 200;
const chunk_size = 200;

// le matching n'est réalisé que sur les deux premiers caractères du materialCode, les Aax et Oax sont donc couverts.
const allowed_doc_types = ["Aa", "Oa"];
const allowed_screens = ["SU Catalogue Affichage en liste"];

const winIBWMessageFormat = {
  error: 1,
  warning: 2,
  notification: 3,
};

function AlgoTheses() {
  if (!_should_mount()) {
    application.activeWindow.showMessage(
      `Impossible de récupérer le rapport d'AlgoThèses depuis cet écran`,
      winIBWMessageFormat.warning
    );

    return;
  }

  let ppns = application.activeWindow.materialCode ? _get_ppn() : _collect_ppn();

  if (ppns) {
    let urls = __urlBuilder("ppn", ppns);

    urls.forEach((url) => __get_report(url))
  }
}

function _includes(input, search_value) {
  for (elem in input) {
    if (input[elem] === search_value) {
      return true;
    }
  }
}

// le script ne peut être activé que pour une liste de résultats, ou un résultat dont le type commence par Aa ou Oa
function _should_mount() {
  return (
    _includes(allowed_doc_types, application.activeWindow.materialCode.replace(/[*+]/, "").slice(0, 2)) ||
    _includes(allowed_screens, application.activeWindow.caption || "")
  );
}

// récupère un PPN à partir de la notice
function _get_ppn() {
  return [application.activeWindow.getVariable("P3GPP")];
}

// récupère les PPNs à partir d'une liste de résultats
// seuls les ppn dont le type commence par Aa et Oa sont récupérés
function _collect_ppn() {
  let list_of_ppns = [];
  let number_of_ppn = Math.min(max_number_of_ppn, application.activeWindow.getVariable("P3GSZ"));

  application.activeWindow.command("af k " + "1", false);

  let max = number_of_ppn;

  // l'itération doit commencer à 1 pour récupérer proprement le contenur de P3VKZ
  for (let i = 1; i < max; i += 16) {
    application.activeWindow.command("af k " + i, false);

    search_results = application.activeWindow.getVariable("P3VKZ").split("\x1BH\x1BLPP");
    // retrait du premier élément qui est vide
    search_results.shift();

    search_results.forEach((search_result) => {
      let result = _parse_search_result(search_result);

      if (_includes(allowed_doc_types, result.doc_type)) {
        list_of_ppns.push(result.ppn);
      }
    });

    if (list_of_ppns.length >= max_number_of_ppn) {
      break;
    }
  }

  // on slice pour ne pas excéder max_number_of_ppn car on récupère les résultats 16 par 16.
  return list_of_ppns.splice(0, max_number_of_ppn);
}

function _parse_search_result(input) {
  ppn = input.slice(0, 9);
  doc_type = input.split(/\x1BE\x1BLMA[\*\+]?/)[1].split(" ")[0].slice(0, 2);

  return {
    ppn: ppn,
    doc_type: doc_type
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
  let chunks = [];
  for (i = 0, j = input.length; i < j; i += chunk_size) {
    temporary = input.slice(i, i + chunk_size);
    chunks.push(temporary);
  }

  return chunks;
}
