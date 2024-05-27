<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import Tbody from './../components/Tbody.svelte';
  import Loader from '../components/Loader.svelte';
  import VoteLine from '../components/VoteLine.svelte';
  export let items, data, form;
  let NPUselect, disabled;
  let loading = false;
  // let dialog = document.getElementById('dialog');
  // let message = document.getElementById('message');

  // // docuSign button is disabled until all required fields are filled, remove disabled attribute when all fields are filled
  // $: disabled = !(
  //   data?.NPU &&
  //   data?.chair &&
  //   data?.chairE &&
  //   data?.loc &&
  //   data?.planner &&
  //   data?.plannerE &&
  //   data.date !== 'NaN-NaN-NaN'
  // );

  // get items from local storage and turn them into an array
  items = JSON.parse(localStorage.getItem('items'));
  items ? (items = Object.values(items)) : (items = []);
  $: data = JSON.parse(localStorage.getItem('data'));

  function copyLink() {
    let thisButton = this.previousElementSibling;
    navigator.clipboard.writeText(thisButton.href);
    console.log(thisButton.href);
    this.innerText = 'Copied!';
    this.style.backgroundColor = 'black';
    this.style.color = 'white';
    this.style.borderColor = 'white';
    setTimeout(() => {
      this.innerText = 'Copy Link';
      this.style.backgroundColor = 'buttonface';
      this.style.color = 'black';
      this.style.borderColor = 'black';
    }, 1000);
  }

  // function to store the values of the form in local storage
  function storeForm() {
    // header inputs
    let NPU = document.getElementById('NPU').selectedOptions[0].value || '';
    let chair = document.querySelector('#chair').value.trim() || '';
    let planner = document.querySelector('#planner').value.trim() || '';
    // let chairE = document.querySelector('#chairE').value.trim() || '';
    // let plannerE = document.querySelector('#plannerE').value.trim() || '';
    let loc = document.querySelector('#loc').value.trim() || '';
    let date = document.getElementById('date').value || '';
    let fillToggle = document.querySelector('#autofill').checked;
    let pNotes = document.querySelector('#pNotes').value.trim() || '';

    // save the table contents as a JSON object
    let items = {};
    let i = 0;

    document.querySelectorAll('tbody').forEach((tbody) => {
      items[i] = {
        type: tbody?.querySelector('.typeTD')?.innerText,
        applName: tbody?.querySelector('.applName')?.innerText,
        disposal: tbody?.querySelector('.disp')?.innerText,
        comments: tbody?.querySelector('.comments')?.innerText || null,
      };
      i++;
    });

    // TODO: format date as MM-DD-YYYY
    date = new Date(`${date}T00:00:00`);
    date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    // save inputs to object
    data = {
      NPU: NPU,
      chair: chair,
      planner: planner,
      // chairE: chairE,
      // plannerE: plannerE,
      loc: loc,
      date: date,
      fillToggle: fillToggle,
      pNotes: pNotes,
    };

    // save data to local storage
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('items', JSON.stringify(items));
    // localStorage.setItem('pNotes', pNotes);

    console.log(data);
  }

  onMount(() => {
    const submit = document.getElementById('submit');
    // const table = document.getElementById('table');

    // on load, check if there is data in local storage and if so, pre-fill the form
    if (localStorage.getItem('data')) {
      // console.log(localStorage.getItem('data'));
      let data = JSON.parse(localStorage.getItem('data'));
      NPUselect = data.NPU;
      document.querySelector('#NPU').value = data.NPU;
      document.querySelector('#chair').value = data.chair;
      document.querySelector('#loc').value = data.loc;
      document.querySelector('#planner').value = data.planner;
      document.querySelector('#autofill').checked = data.fillToggle;
      document.querySelector('#date').value = data.date;
      // document.querySelector('#chairE').value = data.chairE;
      // document.querySelector('#plannerE').value = data.plannerE;
      document.querySelector('#pNotes').value = data.pNotes || '';
    }

    // Clear agenda items
    document.getElementById('clear').addEventListener('click', function () {
      document.getElementById('date').setAttribute('disabled', 'disabled');
      // localStorage.clear();
      // Delete only the items
      localStorage.removeItem('items');
      localStorage.removeItem('pNotes');
      location.reload();
    });

    // on itemType change, preFill the applName
    document.querySelector('#itmType').addEventListener('change', preFill);

    const autoFill = document.querySelector('#autofill');

    // on autofill toggle, save the form
    autoFill.addEventListener('change', () => {
      storeForm();
    });

    function preFill() {
      switch (document.querySelector('#itmType').value) {
        case 'MOSE':
          applName.setAttribute('placeholder', 'Applicant Name');
          applName.value = '';
          applName.setAttribute('type', 'text');
          applName.oninput = (e) => {
            e.target.value = patternMatch({
              input: e.target.value,
              template:
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            });
          };
          break;
        case 'LRB':
          applName.setAttribute('placeholder', 'Applicant Name');
          applName.value = '';
          applName.setAttribute('type', 'text');
          applName.oninput = (e) => {
            e.target.value = patternMatch({
              input: e.target.value,
              template:
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            });
          };
          break;
        case 'ZRB':
          applName.setAttribute('placeholder', 'Z-');
          if (autoFill.checked) {
            applName.value = 'Z-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'Z-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'SUP':
          applName.setAttribute('placeholder', 'U-');
          if (autoFill.checked) {
            applName.value = 'U-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'U-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'BZA':
          applName.setAttribute('placeholder', 'V-');
          if (autoFill.checked) {
            applName.value = 'V-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'V-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'Text Am.':
          applName.setAttribute('placeholder', 'Z-');
          if (autoFill.checked) {
            applName.value = 'Z-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'Z-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'CDP':
          applName.setAttribute('placeholder', 'CDP-');
          if (autoFill.checked) {
            applName.value = 'CDP-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'CDP-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'MSD':
          applName.setAttribute('placeholder', 'MSD-');
          if (autoFill.checked) {
            applName.value = 'MSD-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'MSD-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          disposal.value = 'R&C';
          break;
        case 'LOR':
          applName.setAttribute('placeholder', 'LOR-');
          if (autoFill.checked) {
            applName.value = 'LOR-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'LOR-xx-xxx',
              });
            };
          } else {
            applName.value = '';
          }
          disposal.value = 'R&C';
          break;
        case 'CIG':
          applName.setAttribute('placeholder', 'Community Impact Grant Vote');
          conditions.value = 'Yeas:    Nays:    Abstentions: ';
          if (autoFill.checked) {
            applName.value = 'Community Impact Grant vote';
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template:
                  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'CIG':
          applName.setAttribute('placeholder', 'Community Impact Grant Vote');
          conditions.value = 'Yeas:    Nays:    Abstentions: ';
          if (autoFill.checked) {
            applName.value = 'Community Impact Grant vote';
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template:
                  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              });
            };
          } else {
            applName.value = '';
          }
          break;
        case 'N/A':
          applName.removeAttribute('placeholder');
          applName.value = '';
          applName.setAttribute('type', 'text');
          applName.oninput = (e) => {
            e.target.value = patternMatch({
              input: e.target.value,
              template:
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            });
          };
          break;
        default:
          applName.setAttribute('placeholder', 'Application number or name');
          applName.setAttribute('placeholder', 'Application number or name');
          applName.value = '';
          applName.setAttribute('type', 'text');
          applName.oninput = (e) => {
            e.target.value = patternMatch({
              input: e.target.value,
              template:
                'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            });
          };
          break;
      }
    }

    // on submit, add form data to table
    submit.addEventListener('click', (e) => {
      e.preventDefault();

      // // Add Item form
      let itmType = document.querySelector('#itmType').selectedOptions[0].value;
      let applName = document.querySelector('#applName').value.trim();
      let disposal = document.querySelector('#disposal').value || '';
      let comments = document.querySelector('#conditions').value.trim() || '';
      let dialog = document.getElementById('dialog');
      let message = document.getElementById('message');

      if (itmType === 'Type' || applName === '') {
        message.innerText = 'Please enter an item type and applicant name';
        dialog.showModal();
        return;
      }

      // push new item to items array
      items.push({
        type: itmType,
        applName: applName,
        disposal: disposal,
        comments: comments,
      });

      document.querySelector('#addItem').reset();

      document
        .getElementById('applName')
        .setAttribute('placeholder', 'Application number or name');

      // reset item type to hidden option
      document.querySelector('#itmType').value = 'Type';

      preFill();
      storeForm();
      items = items;
    });

    // on button click, remove that tbody
    document.querySelector('#table').addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-close')) {
        if (confirm('Are you sure you want to delete this item?')) {
          e.target.parentElement.parentElement.parentElement.remove();
          storeForm();
        } else {
          return;
        }
      }
    });

    // on disposalCell click, show select box
    document.querySelector('#table').addEventListener('click', (e) => {
      if (e.target.classList.contains('disp')) {
        // e.target.setAttribute('contenteditable', 'false');
        e.target.innerHTML =
          '<select><option value="Approval">Approval</option><option value="Approval w/C">Approval w/C</option><option value="Denial">Denial</option><option value="Defer">Defer</option><option value="Abstain">Abstain</option><option value="R&C">Review & Comment</option></select>';
        e.target.firstChild.focus();
      }
      // on blur, change selected value to td text
      e.target.addEventListener('focusout', (e) => {
        if (e.target.tagName === 'SELECT') {
          e.target.parentElement?.classList.remove('highlight');
          // I don't know why this throws an error every time, but it works!
          e.target.parentElement.innerText = e.target.value;
          storeForm();
        }
      });
    });

    // listen for tab key press in applName cells, add new row for comments
    document.querySelector('#table').addEventListener('keydown', (e) => {
      if (
        e.target.classList.contains('applName') === true &&
        e.key === 'Tab' &&
        e.target.parentElement.nextElementSibling == null
      ) {
        // create new row for comments
        let commentsRow = document.createElement('tr');
        // create new cell for comments
        let commentsCell = document.createElement('td');
        commentsCell.setAttribute('colspan', '3');
        commentsCell.setAttribute('contenteditable', 'true');
        commentsCell.classList.add('comments');
        // add text to cell
        commentsCell.textContent = '';
        // append cell to row
        commentsRow.appendChild(commentsCell);
        // append row to tbody
        e.target.parentElement.parentElement.appendChild(commentsRow);
        storeForm();
      }
    });

    // expand pNotes textarea on to fit text
    document.querySelector('#pNotes').addEventListener('input', (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 2 + 'px';
    });

    document.querySelector('#pNotes').addEventListener('focusout', (e) => {
      storeForm();
    });

    document.querySelector('#NPU').addEventListener('change', (e) => {
      storeForm();
    });

    // listen for focusout, if on .comments, storeForm()
    document.querySelector('#table').addEventListener('focusout', (e) => {
      if (e.target.classList.contains('comments')) {
        storeForm();
      }
      // if comments are empty, remove the box
      if (e.target.textContent === '' && e.target.classList.contains('comments')) {
        e.target.parentElement.remove();
      }
    });

    // get date from datepicker
    let field = document.querySelector('#date');

    // listen for print event
    window.addEventListener('beforeprint', () => {
      let NPU = document.getElementById('NPU').value;
      let notes = document.getElementById('pNotes').value?.trim();

      // Get the date
      let date = new Date(`${field.value}T00:00:00`);
      // Format date as MM-DD-YYYY
      let dateString = `${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`;
      // console.log(dateString);

      // change document title
      document.title = `Voting Report_NPU-${NPU}_${dateString}`;
      document.querySelector('#header').innerText =
        `VOTING REPORT: NPU-${NPU}  |  ${dateString}`;
      // change pNotes textarea to <h5> element
      document.querySelector('#pNotes').outerHTML =
        `<h5 id="pNotes">${notes}</h5>`;
      // Hide instructions, print btn, and delete item buttons for printing
      // document.getElementById('instructions').style.display = 'none';
      document.getElementById('print').style.display = 'none';
      // document.getElementById('links').style.display = 'none';
      document.getElementById('signature').style.display = 'block';
      document.querySelectorAll('.btn-close').forEach((btn) => {
        btn.style.display = 'none';
      });

      // if comment cells are empty, remove them
      // document
      //   .querySelectorAll('td.comments[contenteditable="true"]')
      //   .forEach((cell) => {
      //     if (cell.textContent === '' && cell.classList.contains('comments')) {
      //       cell.parentElement.remove();
      //     }
      //   });
    });

    // on print button click, print page
    document.querySelector('#print').addEventListener('click', () => {
      storeForm();
      let dispCell = document.querySelectorAll('.disp');
      // // if datepicker is empty, return
      if (field.value === '') {
        // message.innerText = 'Please select a date';
        // dialog.showModal();
        // set focus to the datepicker
        field.showPicker();
        return;
      }
      // if any dispCell is "PENDING", cancel print and highlight cell
      dispCell.forEach((cell) => {
        if (cell.textContent === 'PENDING') {
          cell.classList.add('highlight');
          // return;
        } else {
          cell.classList.remove('highlight');
        }
      });
      // check if any disp cell contains "PENDING", if so, cancel printing
      // if (document.querySelectorAll('.highlight').length > 0) {
      //   message.innerText = 'Please select a disposition for all items';
      //   dialog.showModal();
      //   // return;
      // }
      // else {
      //   window.print();
      // }

      if (document.querySelectorAll('.highlight').length > 0) {
        if (
          window.confirm(
            'Some items do not have Recommendations! Are you sure you want to print?',
          )
        ) {
          window.print();
        } else {
          return;
        }
      } else {
        window.print();
      }
    });

    // reset title after print
    window.addEventListener('afterprint', () => {
      document.title = 'Planner’s Voting Report';
      document.getElementById('links').style.display = 'flex';
      document.getElementById('instructions').style.display = 'block';
      document.getElementById('print').style.display = 'block';
      document.querySelectorAll('.btn-close').forEach((btn) => {
        btn.style.display = 'inline';
      });
      document.getElementById('signature').style.display = 'none';
      let notes = document.getElementById('pNotes').textContent;
      document.querySelector('#pNotes').outerHTML =
        `<textarea id="pNotes" class="form-control" placeholder="Enter any notes here...">${notes}</textarea>`;
    });

    // auto-format application numbers
    function patternMatch({ input, template }) {
      try {
        if (autoFill.checked) {
          let j = 0;
          let plaintext = '';
          let countj = 0;
          while (j < template.length) {
            if (countj > input.length - 1) {
              template = template.substring(0, j);
              break;
            }

            if (template[j] == input[j]) {
              j++;
              countj++;
              continue;
            }

            if (template[j] == 'x') {
              template =
                template.substring(0, j) +
                input[countj] +
                template.substring(j + 1);
              plaintext = plaintext + input[countj];
              countj++;
            }
            j++;
          }

          return template;
        } else {
          return input;
        }
      } catch {
        return '';
      }
    }

    // make tbody rows draggable
    const draggables = document.querySelectorAll('.draggable');
    const container = document.getElementById('table');

    container.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
    });

    container.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
      storeForm();
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      // console.log(afterElement)
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll('.draggable:not(.dragging)'),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY },
      ).element;
    }

    storeForm();
  });
</script>

<header class="bin">
  <img
    id="dcpLogo"
    src="./NPU Logo Black.png"
    alt="Logo: City of Atlanta Dept of City Planning Neighborhood Planning Units"
  />
  <h1 id="header">VOTING REPORT</h1>
</header>

<main class="bin">
  <!-- modal -->
  <dialog class="text-center" id="dialog" style="border-radius: 10px;">
    <span id="message"></span>
    <br />
    <button area-label="OK" class="btn btn-outline" onclick="dialog.close()"
      >OK</button
    >
  </dialog>
  <form id="pageInfo">
    <div id="headerInputs" style="display: flex;justify-content:space-between;">
      <div class="col headerI">
        <div style="display: flex; justify-content:space-between;">
          <label class="pHead" for="chair">Chair:</label>
          <input
            class="pHead"
            type="text"
            name="chair"
            id="chair"
            on:blur={storeForm}
            required
          />
        </div>
        <!-- <div
          class="hidePrint"
          style="display: flex; justify-content:space-between;"
        >
          <label class="pHead" for="chairE">Chair Email:</label>
          <input
            class="pHead"
            type="email"
            name="chairE"
            id="chairE"
            on:blur={storeForm}
            required
          />
        </div> -->
        <div style="display: flex; justify-content:space-between;">
          <label class="pHead" for="date">Meeting Date:</label>
          <input
            class="pHead"
            type="date"
            name="date"
            id="date"
            on:blur={storeForm}
            required
          />
        </div>
        <div style="display: flex; justify-content:space-between;">
          <label class="pHead" for="NPU">NPU:</label>
          <select
            class="pHead"
            name="NPU"
            id="NPU"
            bind:value={NPUselect}
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">N</option>
            <option value="O">O</option>
            <option value="P">P</option>
            <option value="Q">Q</option>
            <option value="R">R</option>
            <option value="S">S</option>
            <option value="T">T</option>
            <option value="V">V</option>
            <option value="W">W</option>
            <option value="X">X</option>
            <option value="Y">Y</option>
            <option value="Z">Z</option>
          </select>
        </div>
      </div>

      <div
        class="headerI flex-column flex-wrap d-flex justify-content-between col noBreak"
      >
        <div style="display: flex; justify-content:space-between;">
          <label class="pHead" for="planner">Planner:</label>
          <input
            class="pHead"
            type="text"
            name="planner"
            id="planner"
            on:blur={storeForm}
            required
          />
        </div>
        <!-- <div
          class="hidePrint"
          style="display: flex; justify-content:space-between;"
        >
          <label class="pHead" for="plannerE">Planner Email:</label>
          <input
            class="pHead"
            type="email"
            name="plannerE"
            id="plannerE"
            on:blur={storeForm}
            required
          />
        </div> -->
        <div style="display: flex; justify-content:space-between;">
          <label class="pHead" for="loc">Location:</label>
          <input
            class="pHead"
            type="text"
            name="loc"
            id="loc"
            on:blur={storeForm}
            required
          />
        </div>

        <div
          id="fillToggle"
          style="display: flex; justify-content:space-between;"
        >
          <label class="pHead" for="autofill"
            >Autofill application numbers:</label
          >
          <label class="switch">
            <input id="autofill" type="checkbox" checked />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  </form>
  <br />
  <div id="newItem">
    <legend>New Item:</legend>
    <form onsubmit="return false" id="addItem">
      <select name="itmType" id="itmType" required>
        <option hidden selected disabled>Type</option>
        <option value="MOSE">MOSE</option>
        <option value="LRB">LRB</option>
        <option value="ZRB">ZRB</option>
        <option value="SUP">SUP</option>
        <option value="BZA">BZA</option>
        <option value="Text Am.">Text Am.</option>
        <option value="CDP">CDP Am.</option>
        <option value="MSD">MSD</option>
        <option value="LOR">LOR</option>
        <option value="CIG">CIG</option>
        <option value="N/A">Other...</option>
      </select>
      <input
        type="text"
        name="applName"
        id="applName"
        placeholder="Application number or name"
        required
        autocomplete="off"
      />
      <select name="disposal" id="disposal">
        <option value="PENDING" hidden selected readonly>Recommend</option>
        <option value="Approval">Approval</option>
        <option value="Approval w/C">Approval w/C</option>
        <option value="Denial">Denial</option>
        <option value="Defer">Defer</option>
        <option value="Abstain">Abstain</option>
        <option value="R&C">Review & Comment</option>
      </select>
      <textarea
        class="comments"
        name="conditions"
        id="conditions"
        cols="30"
        rows="2"
        placeholder="Comments / Conditions..."
      ></textarea>
      <button
        aria-label="clear saved agenda items"
        id="clear"
        class="mt-1"
        type="reset"
        ><i class="material-symbols-outlined">clear_all</i>Clear Table
      </button>
      <button id="submit" value="submit" type="submit" class="mt-1"
        ><i class="material-symbols-outlined">list_alt_add</i>Add to Table</button
      >
    </form>
  </div>
  <table id="table">
    <thead>
      <tr>
        <th>Type</th>
        <th>Application # / Name</th>
        <th>NPU Recommendation</th>
      </tr>
    </thead>
    <!-- TODO: Needs to update appropriately -->
    {#if !items || items.length == 0}
      <tr>
        <td colspan="3" class="text-center">No items.</td>
      </tr>
    {:else}
      {#each items as item}
        <Tbody {item} />
      {/each}
    {/if}
  </table>
  <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
  <div id="signature" style="display: none;">
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
        <input type="text" name="plannerS" id="plannerS" />
        <br />
        <label for="pDate">Date:</label>
        <input type="text" name="pDate" id="pDate" />
      </div>
    </div>
  </div>

  <div class="mt-3 noBreak">
    <legend>Planner's Notes:</legend>
    <textarea
      on:blur={storeForm}
      placeholder="Note any themes or discussions of concern to the NPU..."
      id="pNotes"
      cols="30"
      rows="3"
    ></textarea><br /><br />
<!-- DocuSign Form Status Message -->
    <!-- {#if form && form?.status == 200}
      <div style="text-align: center;">
        <h6>
          Sent Successfully! | Envelope ID: {form.body.confirmation?.envelopeId}
        </h6>
      </div>
    {:else if form && form?.status !== 200 && form?.status !== undefined}
      <div style="text-align: center;">
        <h6>
          DocuSigning Failed | Error: <span style="color: red;"
            >{form?.body.confirmation}</span
          >
        </h6>
      </div>
    {/if} -->
    <div class="d-flex justify-content-around align-flex-start">
      <div>
        <button name="print" id="print" class="finalButtons m-4"
          ><i class="material-symbols-outlined">picture_as_pdf</i>Print to .PDF</button
        >
      </div>
      <!-- <div>
        <form
        method="POST"
        use:enhance={() => {
          loading = true;
          return ({ update }) => {
            update().finally(async () => {
              loading = false;
              });
            };
          }}
        >

          {#key disabled}
            <button
              class="finalButtons btn btn-primary m-4"
              id="docuSign"
              on:click={storeForm}
              {disabled}
              data-tooltip={disabled ? 'Check fields at top!' : '✔ Ready to sign!'}
            >
              {#if loading}
                <Loader />
              {:else}
                <i class="material-symbols-outlined">signature</i>DocuSign
              {/if}</button
            >{/key}<br />
          <input type="hidden" name="data" value={JSON.stringify(data)} />
          <input type="hidden" name="items" value={JSON.stringify(items)} />
        </form>
      </div> -->
    </div>

    <div id="links" style="text-align: center;">
      <div>
        <h5>
          <a href="/plannersScript{NPUselect}" target="_blank"
            >Planner's Script</a
          >
        </h5>
        <p>(NPU-specific, opens in new window *EXPERIMENTAL*)</p>
      </div>
      <h5>
        <a
          href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/updates"
          target="_blank">Updates Page</a
        ><br>
        <button id="copyLink" on:click={copyLink}>Copy Link</button>
      </h5>
      <h5>
        <a
          href="https://coaplangis.maps.arcgis.com/apps/dashboards/a7ab4e0bb5034b219c63a160a7538708#&NPU={NPUselect}"
          target="_blank">Applications Table</a
        ><br>
        <button id="copyApp" on:click={copyLink}>Copy Link</button>
      </h5>
    </div>
  </div>
</main>
<footer class="bin">
  <details id="instructions" open>
    <li style="list-style-type:none;">
      Print the finished document to .PDF.<br>
      Email the .PDF to the NPU Chair, Daniel Vasquez, and Kip Dunlap.
    </li>
    <summary>Instructions:</summary>
    <ul style="list-style-type:'✨'">
      <!-- <h5><b>NEW!</b></h5>
      <li>DocuSign is here! When everything's ready, click the blue button to automatically email signing links to the chair and yourself (in that order). The completed document will be sent to the NPU team as well!
      </li> -->
      <!-- <li>
        Fill page header info - this information is saved to your device for
        future use when you click print. DocuSign depends on this info and is disabled until it's filled.
      </li> -->
      </ul>
      <ul>
      <li>
        When changes are made, data is saved to
        your device until cleared. To clear voting items, click 'Clear Items'. Stored items are editable just like new ones.
      </li>
      <li>
        When 'Autofill application numbers' is selected, applications with a
        defined naming convention will be formatted automatically (no need to
        enter dashes). This preference is also saved to your device.
      </li>
      <li>
        Items are draggable: Grab items by their type cell and drag them
        into any order you'd like (preferably matching agenda order!)
      </li>
      <li>
        For each voting item: Select item type, complete the pre-filled
        application numbers where applicable, and select NPU recommendation from
        drop-down - do not list the outcomes of each vote, only disposition.
      </li>
      <li>Add comments/conditions if applicable and submit.</li>
      <li>
        To delete an item, click the 'X' button next to the item. Comments and
        application numbers are editable after submission.
      </li>
      <li>
        When finished, click 'Print'. You may print the page if you have access
        to a printer, or print to .PDF for emailing.
      </li>
      <li>In iOS - Tap the print preview image to share the filled form.</li>
      <li>
        When saving, please do not rename the file - but pay attention to where
        the file is being saved.
      </li>
      <li>
        This page is built for Chrome browser, and can be downloaded for use
        offline.
      </li>
      <li>
        Recommendation field is not required, so you can pre-fill items and edit
        them later.
      </li>
      <li>
        If a recommendation isn't selected it will show as "PENDING" - Click on
        the recommendation cell to change it.
      </li>
      <li>
        The print button is disabled if any item's NPU Recommendation field is
        "PENDING". Select a recommendation to continue printing.
      </li>
      <li>
        Add a comments line to an existing item by pressing 'tab' inside the
        Application Name field.
      </li>
    </ul>
  </details>
  <br />
  <p>
    Prepared by the <a
      href="https://www.atlantaga.gov/government/departments/city-planning"
      target="_blank">Department of City Planning</a
    >, City of Atlanta | Send questions and bug reports to
    <a href="mailto:kdunlap@atlantaga.gov">KDunlap@AtlantaGA.gov</a> | Version 2.0.0
  </p>
</footer>

<style>
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
  button,
  textarea {
    font-size: 1.2rem;
    font-family: 'GT-Eesti-Regular', sans-serif;
    border-radius: 5px;
  }

  #clear,
  #submit,
  .finalButtons {
    display: flex;
    align-items: center;
    justify-content: center;
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

  .headerI {
    margin: 0 1rem;
  }

  .noBreak {
    break-inside: avoid;
  }

  .pHead {
    margin: 3px;
  }

  input[type='text'].pHead, input[type='email'].pHead {
    width: 60%;
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
    padding: 0px 10px 0 35px !important;
  }

  p {
    font-size: 0.8rem;
    position: relative;
    bottom: 0;
  }

  .bin {
    margin: 0 auto;
    max-width: 80vw;
    padding: 0 10px;
  }

  #addItem {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }

  #addItem select {
    width: 100%;
  }

  #addItem input {
    width: 100%;
  }

  .finalButtons {
    width: 200px;
    height: 45px;
  }

  /* #docusign disabled tooltip */
  [data-tooltip] {
    position: relative;
  }

  button[data-tooltip]:before {
    content: attr(data-tooltip);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    background: #000;
    color: #fff;
    border-radius: 5px;
    font-size: 1.2rem;
    white-space: nowrap;
    display: none;
  }

  [data-tooltip]:hover:before {
    display: block;
  }

button[disabled] {
  pointer-events: auto;
}

  #clear {
    font-size: 1rem;
  }

  #conditions {
    grid-area: 2 / 1 / 3 / 4;
    field-sizing: content;
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

  #newItem {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    background-color: lightgrey;
  }

  #NPU {
    font-size: 1.4rem;
  }

  #pNotes {
    width: 100%;
    white-space: pre-wrap;
    font-size: 1.2rem;
  }

  #print {
    border-radius: 5px;
  }

  #signature {
    break-inside: avoid;
  }

  #signature input {
    width: 100%;
  }

  #submit {
    grid-area: 3 / 3 / 4 / 4;
    border-radius: 5px;
  }

  #clear {
    grid-area: 3 / 1 / 4 / 2;
  }

  @media only screen and (max-width: 768px) {
    #addItem {
      grid-template-columns: 1fr 1fr 1fr;
    }

    main {
      margin: 0 0 !important;
      max-width: 100% !important;
    }

    #headerInputs {
      flex-direction: column;
      max-width: 100%;
    }

    tbody > tr :nth-child(2) {
      width: 33%;
    }
    .bin {
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 425px) {
    .bin {
      width: 100% !important;
    }
    #dcpLogo {
      width: 100%;
    }
    #submit {
      grid-area: 3 / 1 / 4 / 4;
    }
  }

  @page {
    margin: 0.25in 0.5in !important;
  }

  @media print {
    #planner,
    #loc {
      width: 45% !important;
    }
    #signature {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    main {
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
    }

    @page {
      margin: 0.5in 0.1in !important;
    }

    .hidePrint,
    #clear,
    #fillToggle,
    #links,
    #instructions,
    #newItem,
    #print,
    #docuSign {
      display: none !important;
      visibility: hidden !important;
    }

    :global(.typeTD) {
      padding-left: 35px !important;
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

  i {
    font-size: 1.5rem;
    padding-right: 5px;
  }
</style>
