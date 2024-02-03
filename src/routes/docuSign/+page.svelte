<script>
  import { onMount } from 'svelte';
  import Tbody from '../../components/Tbody.svelte';

  export let items, data;

  data = JSON.parse(localStorage.getItem('data'));

  onMount(() => {
    items = JSON.parse(globalThis.localStorage?.getItem('items'));

    items = Object.values(items);

    console.log(items);

    if (localStorage.getItem('data')) {
      // console.log(localStorage.getItem('data'));
      let data = JSON.parse(localStorage.getItem('data'));
      // document.querySelector('#NPU').value = data.NPU;
      document.querySelector('#chair').value = data.chair;
      document.querySelector('#location').value = data.loc;
      document.querySelector('#planner').value = data.planner;
      // document.querySelector('#date').value = data.date;
    }

    if (localStorage.getItem('pNotes')) {
      let pNotes = localStorage.getItem('pNotes') || '';
      document.querySelector('#pNotes').innerText = pNotes;
    }
  });
</script>

<div style="display: contents">
  <header class="container">
    <img
      id="dcpLogo"
      src="./NPU Logo Black.png"
      alt="Logo: City of Atlanta Dept of City Planning Neighborhood Planning Units"
    />
    <h1 id="header">VOTING REPORT: NPU-{data.NPU} | {data.date}</h1>
  </header>
  <main class="container">
    <!-- UNUSED DIALOG ELEMENT -->
    <!-- <dialog class="text-center" id="dialog" style="border-radius: 10px;">
      <span id="message"></span>
      <br />
      <button area-label="OK" class="btn btn-outline" onclick="dialog.close()"
        >OK</button
      >
    </dialog>-->
    <form id="pageInfo">
      <label class="pHead" for="chair">Chair:</label>
      <input class="pHead" type="text" name="chair" id="chair" /> <br />
      <label class="pHead" for="location">Location:</label>
      <input class="pHead" type="text" name="location" id="location" />
      <br />
      <label class="pHead" for="planner">Planner:</label>
      <input class="pHead" type="text" name="planner" id="planner" />
    </form>

    <table id="table">
      <thead
        ><tr
          ><th>Type</th>
          <th>Application # / Name</th>
          <th>NPU Recommendation</th></tr
        ></thead
      >

      <!-- TABLE CONTENTS GO HERE 🦃🦆🐔 -->
      {#if !items}
        <tbody>
          <tr>
            <td colspan="3" class="text-center">No items added yet</td>
          </tr>
        </tbody>
      {:else}
        {#each items as item}
          <tbody>
            <tr>
              <td class="typeTD">{item.type}</td>
              <td class="applName">{item.applName}</td>
              <td class="disp">{item.disposal}</td>
            </tr>
            {#if item.comments}
              <tr>
                <td colspan="3" class="comments" contenteditable="true"
                  >{item.comments}</td
                >
              </tr>
            {/if}
          </tbody>
        {/each}
      {/if}
    </table>
    <div id="signature" style="display: block;">
      <div class="row">
        <div class="col sign">
          <label for="chairS">Chair Signature:</label>
          <input type="text" name="chairS" id="chairS" />
          <br />
          <label for="cDate">Date:</label>
          <input type="text" name="cDate" id="cDate" />
        </div>
        <div class="col sign">
          <label for="plannerS">Planner Signature:</label>
          <input type="text" name="plannerS" id="plannerS" /> <br />
          <label for="pDate">Date:</label>
          <input type="text" name="pDate" id="pDate" />
        </div>
      </div>
    </div>
    <div class="mt-3 noBreak">
      <legend>Planner's Notes:</legend>
      <!-- svelte-ignore a11y-missing-content -->
      <h5 id="pNotes"></h5>
    </div>
  </main>
  <footer class="container">
    <br />
    <p>
      Prepared by the <a
        href="https://www.atlantaga.gov/government/departments/city-planning"
        target="_blank">Department of City Planning</a
      >, City of Atlanta | Send questions and bug reports to
      <a href="mailto:kdunlap@atlantaga.gov">KDunlap@AtlantaGA.gov</a> | Version
      2.0.0
    </p>
  </footer>
</div>

<style>
  @font-face {
    font-family: 'Tungsten-SemiBold';
    src: url(fonts/Tungsten-Semibold.otf) format('opentype');
    letter-spacing: 2pt;
  }

  @font-face {
    font-family: 'GT-Eesti-Regular';
    src: url(fonts/GT-Eesti-Display-Regular.otf) format('opentype');
  }

  h1 {
    font-family: 'Tungsten-SemiBold', sans-serif;
    font-size: 3rem;
    /* font-weight: 600; */
    margin-bottom: 1rem;
  }

  main {
    font-size: 1.2rem;
    font-family: 'GT-Eesti-Regular', sans-serif;
  }

  input {
    font-size: 1.2rem;
    font-family: 'GT-Eesti-Regular', sans-serif;
    border-radius: 5px;
  }

  :global(.dragging) {
    opacity: 30%;
  }

  :global(.highlight) {
    background-color: #ff424281;
    padding: 1rem;
  }

  :global(.item) {
    background-color: lightgray;
  }

  .noBreak {
    break-inside: avoid;
  }

  .pHead {
    margin: 3px;
  }

  :global(.pHead input) {
    align-content: right;
    width: fit-content;
  }

  :global(.pHead label) {
    justify-self: left;
  }

  .row {
    align-items: center;
  }

  .sign {
    border: 1px solid #888;
    background-color: rgb(217, 217, 217);
    border-radius: 5px;
    padding: 2rem;
    margin: 1rem;
  }

  :global(.typeTD) {
    padding-left: 35px !important;
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  :global(.typeTD:active) {
    cursor: grabbing !important;
    cursor: -moz-grabbing !important;
    cursor: -webkit-grabbing !important;
  }

  table {
    margin-top: 20px;
    width: 100%;
  }

  :global(tbody) {
    break-inside: avoid;
    position: relative;
  }

  :global(tbody:nth-child(odd)) {
    background-color: lightgrey;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  :global(td > button) {
    position: absolute;
    left: 2px;
  }

  tbody > tr :nth-child(2) {
    width: 40%;
  }

  :global(tr > td:nth-child(3)) {
    text-align: end;
  }

  tr > th:nth-child(3) {
    text-align: end;
  }

  tr > th:nth-child(2) {
    text-align: center;
  }

  :global(td) {
    border: 1px solid rgb(110, 110, 110);
  }

  p {
    font-size: 0.8rem;
    position: relative;
    bottom: 0;
  }

  #dcpLogo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    margin-bottom: 3%;
    margin-top: 3%;
    min-width: 1.5in !important;
  }

  #pNotes {
    width: 100%;
    white-space: pre-wrap;
    font-size: 1.2rem;
  }

  #signature {
    break-inside: avoid;
  }

  #signature input {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    tbody > tr :nth-child(2) {
      max-width: 33%;
    }
    .container {
      width: 100% !important;
      margin: 5px 0 !important;
    }
  }

  @media only screen and (max-width: 425px) {
    .container {
      width: 100% !important;
    }
    #dcpLogo {
      width: 80%;
    }
  }

  @page {
    margin: 0mm !important;
  }

  #signature {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  main {
    margin: 0.2 !important;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }

  input {
    border: none;
    border-bottom: 1px solid rgb(183, 183, 183);
    border-radius: 0;
    outline: none;
    box-shadow: none;
  }
  #pageInfo input {
    background-color: transparent;
  }

  /* Autofill toggle switch */
  input:-webkit-any(autofill),
  input:-internal-autofill-selected,
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px inset;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    border-width: 2px !important;
    border-radius: 5px;
    background-color: #fff !important;
    color: #000 !important;
    font-size: 1.2rem !important;
  }

  /* Scroll bars */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: whitesmoke;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background-color: whitesmoke;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
</style>
