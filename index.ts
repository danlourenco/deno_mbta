import { Command } from "https://deno.land/x/cliffy@v0.25.7/mod.ts";
import { select } from "https://deno.land/x/inquirer@v0.0.4/mod.ts";

export const API_TOKEN = Deno.env.get("API_TOKEN")

const BASE_URL = "https://api-v3.mbta.com/"
const LINES_ENDPOINT = `lines`;
const ROUTES_ENDPONT = `routes`
const wrappedFetch = (endpoint: string) => fetch(`${BASE_URL}${endpoint}?` + new URLSearchParams({ api_key: API_TOKEN}));

async function getLines() {
    return wrappedFetch(LINES_ENDPOINT)
        .then(res => res.json())
        .then(res => res.data)
}
// getLines();

async function getRoutes() {
    return wrappedFetch(ROUTES_ENDPONT)
        .then(res => res.json())
        .then(res => res.data)
    
}

const lines = await getLines();
lines.map(line => console.log(line?.attributes?.long_name))
console.log('END LINES')
const routes:any = await getRoutes();
const cRRoutes = routes.filter(route => route.attributes?.description === 'Commuter Rail').map(route => route.attributes.long_name);
console.log(cRRoutes);

await new Command()
    .name("mbta")
    .version("0.1.0")
    .description("Command line tool for train info")
    .parse(Deno.args);

