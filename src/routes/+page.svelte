<script>
  // Správa stavu (reaktivní)
  let zaci = $state([]);
  let absencex = $state([]);
  let tridy = $state([]);

  // Vybraný žák
  let zacivybrano = $state('');
  let vybranyzak = $state(null);

  // Vkládání absence
  let datum = $state('');
  let duvod = $state('');


  // Obecná funkce pro načítání dat
  const loadData = async (table) => {
    try {
      const response = await fetch(`/api/data?table=${table}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Chyba při načítání ${table}:`, await response.text());
        return [];
      }
    } catch (error) {
      console.error(`Chyba při načítání ${table}:`, error);
      return [];
    }
  };

  // Načítání dat pomocí $effect
  $effect(() => {
    loadData('trida').then((data) => (tridy = data));
    loadData('zak').then((data) => (zaci = data));
    loadData('absence').then((data) => (absencex = data));
  });

  // Reaktivní sledování vybraného žáka
  $effect(() => {
    vybranyzak = zaci.find((zak) => zak.jmeno === zacivybrano);
  });

  // Funkce pro přidání absence
  const pridaniAbsence = async () => {
    if (!vybranyzak || !datum || !duvod) {
      alert('Vyplňte všechny údaje!');
      return;
    }

    try {
      const response = await fetch('/api/pridaniabsence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_zaka: vybranyzak.id_zaka, // Posíláme ID žáka
          datum,
          duvod,
        }),
      });

      if (response.ok) {
        const novaAbsence = await response.json();
        absencex = [...absencex, novaAbsence]; // Aktualizace lokálního pole absencí
        datum = '';
        duvod = '';
        alert('Absence byla úspěšně přidána.');
      } else {
        const errorText = await response.text();
        console.error('Chyba při přidávání absence:', errorText);
        alert('Chyba při přidávání absence: ' + errorText);
      }
    } catch (error) {
      console.error('Chyba při přidávání absence:', error);
      alert('Chyba při přidávání absence.');
    }
  };
</script>


<main>
<!-- Formulář pro výběr žáka a přidání absence -->
<div>
<label for="vyberZak">Vyber žáka:</label>
<select id="vyberZak" bind:value={zacivybrano}>
  <option value="" disabled>Vyber jméno uživatele</option>
  {#each zaci as zak}
    <option value={zak.jmeno}>{zak.jmeno}</option>
  {/each}
</select>
</div>

{#if vybranyzak}
<h2>Detail uživatele</h2>
<p><strong>ID:</strong> {vybranyzak.id_zaka}</p>
<p><strong>Jméno:</strong> {vybranyzak.jmeno}</p>
<p><strong>Třída:</strong> {vybranyzak.id_trida}.A</p>

<h3>Přidat absenci</h3>
<form onsubmit={e => { e.preventDefault(); pridaniAbsence(); }}>
  <label for="datum">Datum:</label>
  <input id="datum" type="date" bind:value={datum} required />

  <label for="duvod">Důvod:</label>
  <input id="duvod" type="text" bind:value={duvod} required />

  <button type="submit">Přidat absenci</button>
</form>

<!-- Zobrazení absencí -->
<h3>Seznam absencí</h3>
<table>
  <thead>
    <tr>
      <th>Datum</th>
      <th>Důvod</th>
    </tr>
  </thead>
  <tbody>
    {#each absencex.filter(absence => absence.id_zaka === vybranyzak.id_zaka) as absence}
      <tr>
        <td>{absence.datum.split('T')[0]}</td>
        <td>{absence.duvod}</td>
      </tr>
    {/each}
  </tbody>
</table>
{/if}
</main>
<style>
 main {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(to right, #e0c3fc, #8ec5fc);
    color: #333;
}

h2, h3 {
    color: #333;
    font-weight: 600;
}

div, form {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
}

input[type="date"], input[type="text"], select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
    background-color: #6200ea;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #3700b3;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #6200ea;
    color: white;
}

tr:hover {
    background-color: #f1f1f1;
}

  </style>