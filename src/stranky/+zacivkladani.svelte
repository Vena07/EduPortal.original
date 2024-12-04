<script>
    let i = 1;

    // Reaktivní pole
    let zaci = $state([]);
    let rozvrhy = $state([]);
    let absencex = $state([]);
    let tridy = $state([]);

    // Obecná funkce pro načítání dat
    const loadData = async (url, setter) => {
        try {
            const response = await fetch(url);
            if (response.ok) setter(await response.json());
            else console.error(`Chyba při načítání ${url}:`, await response.text());
        } catch (error) {
            console.error(`Chyba při načítání ${url}:`, error);
        }
    };

    // Načtení dat
    $effect(() => loadData('/api/trida', (data) => (tridy = data)));
    $effect(() => loadData('/api/zak', (data) => (zaci = data)));
    $effect(() => loadData('/api/rozvrh', (data) => (rozvrhy = data)));
    $effect(() => loadData('/api/absence', (data) => (absencex = data)));
</script>

<h1>Žáci</h1>
    {#each tridy as trida}
        <div class="odíl">
                <h2 class="tridynazev" >{trida.nazev}</h2>
            <ol>    
                {#each zaci.filter(zak => zak.id_trida === trida.id_trida) as zak}
                    <li>
                        <p>Jmeno: {zak.jmeno}</p>
                        <p>ID: {zak.id_zaka}</p>
                    </li>
                {/each}  
            </ol>
        </div>
    {/each}
    
<style>
   
   .odíl {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background-color: lightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    max-width: 300px;
}

.tridynazev {
    font-size: 1.5em;
    text-decoration: underline;
    color: #333;
    margin-bottom: 10px
}

ol {
    list-style-type: decimal;
    padding-left: 20px;
}

li {
    margin-bottom: 10px;
}

li p {
    margin: 0;
}

</style>
