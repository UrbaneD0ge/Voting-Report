<div style="display: contents">
  <header class="container">
    <img
      id="dcpLogo"
      src="./NPU Logo Black.png"
      alt="Logo: City of Atlanta Dept of City Planning Neighborhood Planning Units"
      class=""
    />
    <h1 id="header" class="">VOTING REPORT: NPU-A | 12-1-2023</h1>
  </header>
  <main class="container">
    <dialog class="text-center" id="dialog" style="border-radius: 10px;">
      <span id="message" class=""></span>
      <br class="" />
      <button area-label="OK" class="btn btn-outline" onclick="dialog.close()"
        >OK</button
      >
    </dialog>
    <form id="pageInfo" class="">
      <div class="row">
        <div class="col">
          <label class="pHead" for="NPU">NPU:</label>
          <select class="pHead" name="NPU" id="NPU"
            ><option class="" value="A">A</option><option class="" value="B"
              >B</option
            ><option class="" value="C">C</option><option class="" value="D"
              >D</option
            ><option class="" value="E">E</option><option class="" value="F"
              >F</option
            ><option class="" value="G">G</option><option class="" value="H"
              >H</option
            ><option class="" value="I">I</option><option class="" value="J"
              >J</option
            ><option class="" value="K">K</option><option class="" value="L"
              >L</option
            ><option class="" value="M">M</option><option class="" value="N"
              >N</option
            ><option class="" value="O">O</option><option class="" value="P"
              >P</option
            ><option class="" value="Q">Q</option><option class="" value="R"
              >R</option
            ><option class="" value="S">S</option><option class="" value="T"
              >T</option
            ><option class="" value="V">V</option><option class="" value="W"
              >W</option
            ><option class="" value="X">X</option><option class="" value="Y"
              >Y</option
            ><option class="" value="Z">Z</option></select
          >
          <button
            aria-label="clear saved agenda items"
            id="clear"
            class="mb-1"
            type="reset">Clear Table</button
          > <br class="" />
          <label class="pHead" for="chair">Chair:</label>
          <input class="pHead" type="text" name="chair" id="chair" />
          <br class="" />
          <label class="pHead" for="date">Meeting Date:</label>
          <input class="pHead" type="date" name="date" id="date" required="" />
        </div>
        <div class="col text-end noBreak">
          <label class="pHead" for="location">Location:</label>
          <input class="pHead" type="text" name="location" id="location" />
          <br class="" />
          <label class="pHead" for="planner">Planner:</label>
          <input class="pHead" type="text" name="planner" id="planner" />
          <br class="" />
          <div id="fillToggle" class="">
            <label class="pHead" for="autofill"
              >Autofill application numbers:</label
            >
            <label class="switch"
              ><input id="autofill" type="checkbox" class="" />
              <span class="slider round"></span></label
            >
          </div>
        </div>
      </div>
    </form>

    <table id="table" class="">
      <thead class=""
        ><tr class=""
          ><th class="">Type</th>
          <th class="">Application # / Name</th>
          <th class="">NPU Recommendation</th></tr
        ></thead
      >
      <!-- TABLE CONTENTS GO HERE 🦃🦆🐔 -->
      <!-- {#each data as item}
        <tr>
          <td class="typeTD">{item.type}</td>
          <td>{item.app}</td>
          <td>{item.rec}</td>
        </tr>
      {/each} -->
    </table>
    <div id="signature" style="display: block;" class="">
      <div class="row">
        <div class="col sign">
          <label for="chairS" class="">Chair Signature:</label>
          <input type="text" name="chairS" id="chairS" class="" />
          <br class="" />
          <label for="cDate" class="">Date:</label>
          <input type="text" name="cDate" id="cDate" class="" />
        </div>
        <div class="col sign">
          <label for="plannerS" class="">Planner Signature:</label>
          <input type="text" name="plannerS" id="plannerS" class="" />
          <br class="" />
          <label for="pDate" class="">Date:</label>
          <input type="text" name="pDate" id="pDate" class="" />
        </div>
      </div>
    </div>
    <div class="mt-3 noBreak">
      <legend class="">Planner's Notes:</legend>
      <!-- svelte-ignore a11y-missing-content -->
      <h5 id="pNotes"></h5>
      <div class="d-flex justify-content-around">
        <button
          name="print"
          id="print"
          class="m-4 flex-grow-1"
          style="display: none;">Print</button
        >
        <button
          name="docuSign"
          id="docuSign"
          class="m-4 flex-grow-1 btn btn-primary"
          onclick="window.open('/print', '_blank')">DocuSign</button
        >
      </div>
      <div id="links" class="" style="display: flex;">
        <h5 class="">
          <a
            href="https://drive.google.com/file/d/1yFpIpTjEiqv4PuyYg1Jjc60yIQtx3J1h/view?usp=drive_link"
            target="_blank"
            class="">Planner's Script</a
          >
        </h5>
        <h5 class="">
          <a
            href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/updates"
            target="_blank"
            class="">Updates Page</a
          >
          <button id="copyLink" onclick="copyLink()" class="">Copy Link</button>
        </h5>
      </div>
    </div>
  </main>
  <footer class="container">
    <details id="instructions" class="" style="display: block;">
      <li style="list-style-type:none;" class="">
        Send the saved .PDF to the NPU Chair, Daniel Vasquez and Kip Dunlap.
      </li>
      <summary class="">Instructions:</summary>
      <ul style="list-style-type:'✨'" class="">
        <h5 class="">
          <b class="">NEW!</b>
        </h5>
        <li class="">
          When changes are made, agenda items and Planner's Notes are saved to
          your device until cleared. To clear them, click 'Clear Items' at the
          top of the page. Stored items are editable just like new ones!
        </li>
        <li class="">
          When 'Autofill application numbers' is selected, applications with a
          defined naming convention will be formatted automatically (no need to
          enter dashes). This preference is also saved to your device.
        </li>
        <li class="">
          Instead of a pop-up telling you to enter a meeting date, the
          datepicker will present itself.
        </li>
        <li class="">
          Items are now draggable! Grab items by their type cell and drag them
          into any order you'd like.
        </li>
      </ul>
      <ul class="">
        <li class="">
          Fill page header info - this information is saved to your device for
          future use when you click print.
        </li>
        <li class="">
          For each voting item: Select item type, complete the pre-filled
          application numbers where applicable, and select NPU recommendation
          from drop-down - do not list the outcomes of each vote, only
          disposition.
        </li>
        <li class="">Add comments/conditions if applicable and submit.</li>
        <li class="">
          To delete an item, click the 'X' button next to the item. Comments and
          application numbers are editable after submission.
        </li>
        <li class="">
          When finished, click 'Print'. You may print the page if you have
          access to a printer, or print to .PDF for emailing.
        </li>
        <li class="">
          In iOS - Tap the print preview image to share the filled form.
        </li>
        <li class="">
          When saving, please do not rename the file - but pay attention to
          where the file is being saved.
        </li>
        <li class="">
          This page is built for Chrome browser, and can be downloaded for use
          offline.
        </li>
        <li class="">
          Recommendation field is not required, so you can pre-fill items and
          edit them later.
        </li>
        <li class="">
          If a recommendation isn't selected it will show as "PENDING" - Click
          on the recommendation cell to change it.
        </li>
        <li class="">
          The print button is disabled if any item's NPU Recommendation field is
          "PENDING". Select a recommendation to continue printing.
        </li>
        <li class="">
          Add a comments line to an existing item by pressing 'tab' inside the
          Application Name field.
        </li>
      </ul>
    </details>
    <br class="" />
    <p class="">
      Prepared by the <a
        href="https://www.atlantaga.gov/government/departments/city-planning"
        target="_blank"
        class="">Department of City Planning</a
      >, City of Atlanta | Send questions and bug reports to
      <a href="mailto:kdunlap@atlantaga.gov" class="">KDunlap@AtlantaGA.gov</a> |
      Version 1.6.9
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
