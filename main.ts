import { QueryEngine } from "@comunica/query-sparql";

const query = async () => {
  const engine = new QueryEngine();
  const bindingsStream = await engine.queryBindings(
    `
  SELECT ?s ?p ?o WHERE {
    ?s ?p <http://dbpedia.org/resource/Belgium>.
    ?s ?p ?o
  } LIMIT 100`,
    {
      sources: ["https://fragments.dbpedia.org/2015/en"],
    }
  );

  bindingsStream.on("data", (binding) => {
    console.log(binding.toString()); // Quick way to print bindings for testing

    console.log(binding.has("s")); // Will be true

    // Obtaining values
    console.log(binding.get("s").value);
    console.log(binding.get("s").termType);
    console.log(binding.get("p").value);
    console.log(binding.get("o").value);
  });
};

query();
