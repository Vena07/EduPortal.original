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

<h1>Rozvrh</h1>
<table border="5px">
    <thead>
        <tr>
            <th>Den</th>
            <th>8:00 - 9:00</th>
            <th>9:00 - 10:00</th>
            <th>10:00 - 11:00</th>
            <th>11:00 - 12:00</th>
            <th>12:00 - 13:00</th>
        </tr>
    </thead>
    <tbody>
        {#each tridy as trida}
            <tr>
                <td class="tridynazev" colspan="6">{trida.nazev}</td>
            </tr>
            {#each rozvrhy.filter(row => row.id_trida === trida.id_trida) as row}
                <tr>
                    <td>{row.den}</td>
                    <td>{row.one_hodina}</td>
                    <td>{row.two_hodina}</td>
                    <td>{row.three_hodina}</td>
                    <td>{row.four_hodina}</td>
                    <td>{row.five_hodina}</td>
                </tr>
            {/each}
        {/each}
    </tbody>
</table>

<style>
    .tridynazev {
        text-align: center;
        font-weight: bold;
    }

    tr,
    td {
        padding: 10px;
    }
</style>
