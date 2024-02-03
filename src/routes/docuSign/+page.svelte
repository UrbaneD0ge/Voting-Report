<script>
  import { onMount } from 'svelte';
  import Tbody from '../../components/Tbody.svelte';

  // let items = localStorage.getItem('items') || [];

  let items = globalThis.localStorage?.getItem('items') || [];

  console.log(items);

  onMount(() => {
    // let items = globalThis.localStorage?.getItem('items') || [];

    if (localStorage.getItem('data')) {
      // console.log(localStorage.getItem('data'));
      let data = JSON.parse(localStorage.getItem('data'));
      document.querySelector('#NPU').value = data.NPU;
      document.querySelector('#chair').value = data.chair;
      document.querySelector('#location').value = data.loc;
      document.querySelector('#planner').value = data.planner;
      document.querySelector('#date').value = data.date;
    }

    // if (localStorage.getItem('items')) {
    //   let items = localStorage.getItem('items');

    //   // TODO: Create a tbody component and append it to the table
    //   // reconstruct the table from the JSON object
    //   // for (let i = 0; i < Object.keys(items).length; i++) {
    //   //   // insert Tbody component here

    //   // }
    // }
    if (localStorage.getItem('pNotes')) {
      let pNotes = localStorage.getItem('pNotes') || '';
      document.querySelector('#pNotes').innerText = pNotes;
    }
  });
</script>

<div style="display: contents">
  <header class="container s-y_bCXRrkrYfP">
    <img
      id="dcpLogo"
      src="./NPU Logo Black.png"
      alt="Logo: City of Atlanta Dept of City Planning Neighborhood Planning Units"
      class="s-y_bCXRrkrYfP"
    />
    <h1 id="header" class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1bebo02">
      VOTING REPORT: NPU-A | 12-1-2023
    </h1>
  </header>
  <main class="container s-y_bCXRrkrYfP">
    <dialog
      class="text-center s-y_bCXRrkrYfP"
      id="dialog"
      style="border-radius: 10px;"
    >
      <span id="message" class="s-y_bCXRrkrYfP"></span>
      <br class="s-y_bCXRrkrYfP" />
      <button
        area-label="OK"
        class="btn btn-outline s-y_bCXRrkrYfP"
        onclick="dialog.close()"
        data-svelte-h="svelte-1yxa93y">OK</button
      >
    </dialog>
    <form id="pageInfo" class="s-y_bCXRrkrYfP">
      <div class="row s-y_bCXRrkrYfP">
        <div class="col s-y_bCXRrkrYfP">
          <label
            class="pHead s-y_bCXRrkrYfP"
            for="NPU"
            data-svelte-h="svelte-1wft529">NPU:</label
          >
          <select class="pHead s-y_bCXRrkrYfP" name="NPU" id="NPU"
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-taavfg"
              value="A">A</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-mc7nbi"
              value="B">B</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1twnrrs"
              value="C">C</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-cyhez2"
              value="D">D</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-kdudk4"
              value="E">E</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-ae47ri"
              value="F">F</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1hykc7s"
              value="G">G</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-10dzf2"
              value="H">H</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-yvw83w"
              value="I">I</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1xh4u6m"
              value="J">J</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-160gwns"
              value="K">K</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1o3elu6"
              value="L">L</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1virkf8"
              value="M">M</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1lj1emm"
              value="N">N</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-u2dh3s"
              value="O">O</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1nuiry"
              value="P">P</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-16ztanw"
              value="Q">Q</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1y4ldji"
              value="R">R</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1tqekns"
              value="S">S</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1oqv572"
              value="T">T</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1m6hxzi"
              value="V">V</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-upu0go"
              value="W">W</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1csrpn2"
              value="X">X</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-bn5wcs"
              value="Y">Y</option
            ><option
              class="s-y_bCXRrkrYfP"
              data-svelte-h="svelte-1a8eifi"
              value="Z">Z</option
            ></select
          >
          <button
            aria-label="clear saved agenda items"
            id="clear"
            class="mb-1 s-y_bCXRrkrYfP"
            type="reset"
            data-svelte-h="svelte-9cq8gd">Clear Table</button
          > <br class="s-y_bCXRrkrYfP" />
          <label
            class="pHead s-y_bCXRrkrYfP"
            for="chair"
            data-svelte-h="svelte-1nxrg05">Chair:</label
          >
          <input
            class="pHead s-y_bCXRrkrYfP"
            type="text"
            name="chair"
            id="chair"
          /> <br class="s-y_bCXRrkrYfP" />
          <label
            class="pHead s-y_bCXRrkrYfP"
            for="date"
            data-svelte-h="svelte-10gg54k">Meeting Date:</label
          >
          <input
            class="pHead s-y_bCXRrkrYfP"
            type="date"
            name="date"
            id="date"
            required=""
          />
        </div>
        <div class="col text-end noBreak s-y_bCXRrkrYfP">
          <label
            class="pHead s-y_bCXRrkrYfP"
            for="location"
            data-svelte-h="svelte-1qggbuj">Location:</label
          >
          <input
            class="pHead s-y_bCXRrkrYfP"
            type="text"
            name="location"
            id="location"
          /> <br class="s-y_bCXRrkrYfP" />
          <label
            class="pHead s-y_bCXRrkrYfP"
            for="planner"
            data-svelte-h="svelte-1xa7gx3">Planner:</label
          >
          <input
            class="pHead s-y_bCXRrkrYfP"
            type="text"
            name="planner"
            id="planner"
          /> <br class="s-y_bCXRrkrYfP" />
          <div id="fillToggle" class="s-y_bCXRrkrYfP">
            <label
              class="pHead s-y_bCXRrkrYfP"
              for="autofill"
              data-svelte-h="svelte-14okqrh"
              >Autofill application numbers:</label
            >
            <label class="switch s-y_bCXRrkrYfP"
              ><input id="autofill" type="checkbox" class="s-y_bCXRrkrYfP" />
              <span class="slider round s-y_bCXRrkrYfP"></span></label
            >
          </div>
        </div>
      </div>
    </form>

    <table id="table" class="s-y_bCXRrkrYfP">
      <thead class="s-y_bCXRrkrYfP"
        ><tr class="s-y_bCXRrkrYfP"
          ><th class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1mr7a7y">Type</th>
          <th class="s-y_bCXRrkrYfP" data-svelte-h="svelte-yg2c4v"
            >Application # / Name</th
          >
          <th class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1fag6li"
            >NPU Recommendation</th
          ></tr
        ></thead
      >
      {#each items as item (item.id)}
        <Tbody
          id={item.id}
          key={item.id}
          type={item.type}
          applName={item.applName}
          disp={item.disp}
          comments={item.comments}
        />
      {/each}
      <!-- TABLE CONTENTS GO HERE 🦃🦆🐔 -->
    </table>
    <div id="signature" style="display: block;" class="s-y_bCXRrkrYfP">
      <div class="row s-y_bCXRrkrYfP">
        <div class="col sign s-y_bCXRrkrYfP">
          <label
            for="chairS"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-ubo3tj">Chair Signature:</label
          >
          <input type="text" name="chairS" id="chairS" class="s-y_bCXRrkrYfP" />
          <br class="s-y_bCXRrkrYfP" />
          <label
            for="cDate"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-1e92ppj">Date:</label
          > <input type="text" name="cDate" id="cDate" class="s-y_bCXRrkrYfP" />
        </div>
        <div class="col sign s-y_bCXRrkrYfP">
          <label
            for="plannerS"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-19pj3xf">Planner Signature:</label
          >
          <input
            type="text"
            name="plannerS"
            id="plannerS"
            class="s-y_bCXRrkrYfP"
          /> <br class="s-y_bCXRrkrYfP" />
          <label
            for="pDate"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-smxmwc">Date:</label
          > <input type="text" name="pDate" id="pDate" class="s-y_bCXRrkrYfP" />
        </div>
      </div>
    </div>
    <div class="mt-3 noBreak s-y_bCXRrkrYfP">
      <legend class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1orji3r"
        >Planner's Notes:</legend
      >
      <!-- svelte-ignore a11y-missing-content -->
      <h5 id="pNotes"></h5>
      <div class="d-flex justify-content-around s-y_bCXRrkrYfP">
        <button
          name="print"
          id="print"
          class="m-4 flex-grow-1 s-y_bCXRrkrYfP"
          data-svelte-h="svelte-ax8brt"
          style="display: none;"
          >Print
        </button>

        <button
          name="docuSign"
          id="docuSign"
          class="m-4 flex-grow-1 btn btn-primary s-y_bCXRrkrYfP"
          onclick="window.open('/print', '_blank')"
          data-svelte-h="svelte-33byvj">DocuSign</button
        >
      </div>
      <div id="links" class="s-y_bCXRrkrYfP" style="display: flex;">
        <h5 class="s-y_bCXRrkrYfP">
          <a
            href="https://drive.google.com/file/d/1yFpIpTjEiqv4PuyYg1Jjc60yIQtx3J1h/view?usp=drive_link"
            target="_blank"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-1md42ym">Planner's Script</a
          >
        </h5>
        <h5 class="s-y_bCXRrkrYfP">
          <a
            href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/updates"
            target="_blank"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-1qkv34p">Updates Page</a
          >
          <button
            id="copyLink"
            onclick="copyLink()"
            class="s-y_bCXRrkrYfP"
            data-svelte-h="svelte-8t0w54">Copy Link</button
          >
        </h5>
      </div>
    </div>
  </main>
  <footer class="container s-y_bCXRrkrYfP">
    <details id="instructions" class="s-y_bCXRrkrYfP" style="display: block;">
      <li
        style="list-style-type:none;"
        class="s-y_bCXRrkrYfP"
        data-svelte-h="svelte-6kakqf"
      >
        Send the saved .PDF to the NPU Chair, Daniel Vasquez and Kip Dunlap.
      </li>
      <summary class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1essji5"
        >Instructions:</summary
      >
      <ul style="list-style-type:'✨'" class="s-y_bCXRrkrYfP">
        <h5 class="s-y_bCXRrkrYfP">
          <b class="s-y_bCXRrkrYfP" data-svelte-h="svelte-z9yesn">NEW!</b>
        </h5>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1j1lct2">
          When changes are made, agenda items and Planner's Notes are saved to
          your device until cleared. To clear them, click 'Clear Items' at the
          top of the page. Stored items are editable just like new ones!
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1fenk6d">
          When 'Autofill application numbers' is selected, applications with a
          defined naming convention will be formatted automatically (no need to
          enter dashes). This preference is also saved to your device.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-97nglr">
          Instead of a pop-up telling you to enter a meeting date, the
          datepicker will present itself.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1gqdyr5">
          Items are now draggable! Grab items by their type cell and drag them
          into any order you'd like.
        </li>
      </ul>
      <ul class="s-y_bCXRrkrYfP">
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-17kp18s">
          Fill page header info - this information is saved to your device for
          future use when you click print.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-17br7ii">
          For each voting item: Select item type, complete the pre-filled
          application numbers where applicable, and select NPU recommendation
          from drop-down - do not list the outcomes of each vote, only
          disposition.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-18ijxd1">
          Add comments/conditions if applicable and submit.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-9hm7dm">
          To delete an item, click the 'X' button next to the item. Comments and
          application numbers are editable after submission.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1ncrn8g">
          When finished, click 'Print'. You may print the page if you have
          access to a printer, or print to .PDF for emailing.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-mqon1m">
          In iOS - Tap the print preview image to share the filled form.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-cibx4">
          When saving, please do not rename the file - but pay attention to
          where the file is being saved.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-zh2fs">
          This page is built for Chrome browser, and can be downloaded for use
          offline.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-cr6yty">
          Recommendation field is not required, so you can pre-fill items and
          edit them later.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1dbahpi">
          If a recommendation isn't selected it will show as "PENDING" - Click
          on the recommendation cell to change it.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-6m9uve">
          The print button is disabled if any item's NPU Recommendation field is
          "PENDING". Select a recommendation to continue printing.
        </li>
        <li class="s-y_bCXRrkrYfP" data-svelte-h="svelte-1u5ubj">
          Add a comments line to an existing item by pressing 'tab' inside the
          Application Name field.
        </li>
      </ul>
    </details>
    <br class="s-y_bCXRrkrYfP" />
    <p class="s-y_bCXRrkrYfP">
      Prepared by the <a
        href="https://www.atlantaga.gov/government/departments/city-planning"
        target="_blank"
        class="s-y_bCXRrkrYfP"
        data-svelte-h="svelte-xbxkfh">Department of City Planning</a
      >, City of Atlanta | Send questions and bug reports to
      <a
        href="mailto:kdunlap@atlantaga.gov"
        class="s-y_bCXRrkrYfP"
        data-svelte-h="svelte-49a3gm">KDunlap@AtlantaGA.gov</a
      > | Version 1.6.9
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

  select,
  input,
  button {
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

  button {
    display: none !important;
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

  #clear {
    font-size: 1rem;
  }

  #copyLink {
    cursor: pointer;
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

  #links {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  #NPU {
    font-size: 1.4rem;
  }

  #pNotes {
    width: 100%;
    white-space: pre-wrap;
    font-size: 1.2rem;
  }

  #print,
  #docuSign {
    display: none;
  }

  #signature {
    break-inside: avoid;
  }

  #signature input {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    .text-end {
      text-align: inherit !important;
    }
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

  #fillToggle,
  #links,
  #instructions,
  #print {
    display: none !important;
    visibility: hidden !important;
  }

  input,
  select {
    border: none;
    border-bottom: 1px solid rgb(183, 183, 183);
    border-radius: 0;
    outline: none;
    box-shadow: none;
  }
  #pageInfo input {
    background-color: transparent;
  }
  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
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

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 30px;
    margin: 5px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #000000;
  }

  input:focus + .slider {
    box-shadow: 0 0 0px #000000;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
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
