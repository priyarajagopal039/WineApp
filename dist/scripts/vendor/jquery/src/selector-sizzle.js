define(["./core","../external/sizzle/dist/sizzle"],function(e,i){e.find=i,e.expr=i.selectors,e.expr[":"]=e.expr.pseudos,e.uniqueSort=e.unique=i.uniqueSort,e.text=i.getText,e.isXMLDoc=i.isXML,e.contains=i.contains,e.escapeSelector=i.escape});