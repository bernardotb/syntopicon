// views.js — tabela de rotas. Cada view é um módulo independente.
import home from "./views/home.js";
import idea from "./views/idea.js";
import topic from "./views/topic.js";
import reference from "./views/reference.js";
import authorIndex, { authorPage, workPage } from "./views/bibliographic.js";
import inventory from "./views/inventory.js";
import compare from "./views/compare.js";
import tour from "./views/tour.js";
import volumes from "./views/volumes.js";
import about from "./views/about.js";

export default [
  { pattern: "/", view: home },
  { pattern: "/ideia/:slug", view: idea },
  { pattern: "/topico/:slug", view: topic },
  { pattern: "/referencia/:id", view: reference },
  { pattern: "/autores", view: authorIndex },
  { pattern: "/autor/:key", view: authorPage },
  { pattern: "/obra/:key", view: workPage },
  { pattern: "/inventario", view: inventory },
  { pattern: "/comparar", view: compare },
  { pattern: "/percurso", view: tour },
  { pattern: "/volumes", view: volumes },
  { pattern: "/sobre", view: about },
];
