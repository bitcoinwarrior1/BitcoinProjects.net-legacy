var title = "State of the Dapps";
DocHead.setTitle(title);
/*meta data*/
var metaInfo = [
  {name: "description", content: "A Curated Collection of Decentralized Apps"},
  {name: "viewport", content: "user-scalable=no, initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1"}
];
_.each(metaInfo, function (metaItem) {
  DocHead.addMeta(metaItem);
});
var linkInfo = [{rel: "icon", type: "image/png", href: "assets/logo/favicon.png"}];
_.each(linkInfo, function (linkInfo) {
  DocHead.addLink(linkInfo);
});

