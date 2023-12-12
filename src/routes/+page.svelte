<script>
  import { onMount } from 'svelte';
  export let data;
  export const ssr = false;
  let NPU;

  $: ({ args } = data);

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

  onMount(() => {
    const submit = document.getElementById('submit');
    const table = document.getElementById('table');
    let dialog = document.getElementById('dialog');
    let message = document.getElementById('message');

    // function to store the values of the form in local storage
    function storeForm() {
      // header inputs
      let NPU = document.getElementById('NPU').selectedOptions[0].value || '';
      let chair = document.querySelector('#chair').value.trim() || '';
      let loc = document.querySelector('#location').value.trim() || '';
      let planner = document.querySelector('#planner').value.trim() || '';
      let date = document.getElementById('date').value || '';
      let fillToggle = document.querySelector('#autofill').checked;
      let pNotes = document.querySelector('#pNotes').value.trim() || '';
      // save the table contents as a JSON object
      let items = {};
      let i = 0;
      document.querySelectorAll('tbody').forEach((tbody) => {
        items[i] = {
          type: tbody.querySelector('.typeTD').innerText,
          applName: tbody.querySelector('.applName').innerText,
          disposal: tbody.querySelector('.disp').innerText,
          comments: tbody?.querySelector('.comments')?.innerText || null,
        };
        i++;
      });

      // save inputs to object
      let data = {
        NPU: NPU,
        chair: chair,
        loc: loc,
        planner: planner,
        date: date,
        fillToggle: fillToggle,
      };

      // save data to local storage
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('items', JSON.stringify(items));
      localStorage.setItem('pNotes', pNotes);

      console.log('form saved');
    }

    // on load, check if there is data in local storage and if so, pre-fill the form
    if (localStorage.getItem('data')) {
      // console.log(localStorage.getItem('data'));
      let data = JSON.parse(localStorage.getItem('data'));
      document.querySelector('#NPU').value = data.NPU;
      document.querySelector('#chair').value = data.chair;
      document.querySelector('#location').value = data.loc;
      document.querySelector('#planner').value = data.planner;
      document.querySelector('#autofill').checked = data.fillToggle;
    }

    if (localStorage.getItem('items')) {
      let items = JSON.parse(localStorage.getItem('items'));

      // TODO: Create a tbody component and append it to the table
      // reconstruct the table from the JSON object
      for (let i = 0; i < Object.keys(items).length; i++) {
        // create table row
        let row = document.createElement('tr');
        // create table cells
        let itmTypeCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        let applNameCell = document.createElement('td');
        let disposalCell = document.createElement('td');
        let commentsCell = document.createElement('td');
        // add text to cells
        itmTypeCell.innerText = items[i].type;
        itmTypeCell.setAttribute('class', 'typeTD');
        itmTypeCell.prepend(deleteButton);
        deleteButton.setAttribute('type', 'button');
        deleteButton.setAttribute('class', 'btn-close');
        deleteButton.setAttribute('aria-label', 'delete item');
        applNameCell.textContent = items[i].applName;
        applNameCell.setAttribute('contenteditable', 'true');
        applNameCell.classList.add('applName');
        disposalCell.textContent = items[i].disposal;
        disposalCell.classList.add('disp');
        commentsCell.textContent = items[i].comments;
        commentsCell.classList.add('comments');

        // wrap each new item in a <tbody> that is draggable
        let tbody = document.createElement('tbody');
        tbody.setAttribute('draggable', 'true');
        tbody.setAttribute('class', 'draggable');
        tbody.append(row);

        // append new tbody to table
        table.append(tbody);

        // append cells to row
        row.appendChild(itmTypeCell);
        row.appendChild(applNameCell);
        row.appendChild(disposalCell);

        // If there are comments, add them to the table
        if (items[i].comments !== '' && items[i].comments !== null) {
          // create new row for comments
          let commentsRow = document.createElement('tr');
          // create new cell for comments
          // let commentsCell = document.createElement('td')
          commentsCell.setAttribute('colspan', '3');
          commentsCell.setAttribute('contenteditable', 'true');
          commentsCell.classList.add('comments');
          // add text to cell
          commentsCell.textContent = items[i].comments;
          // append cell to row
          commentsRow.appendChild(commentsCell);
          // append row to tbody
          tbody.appendChild(commentsRow);
        }
      }
    }

    if (localStorage.getItem('pNotes')) {
      let pNotes = localStorage.getItem('pNotes') || '';
      document.querySelector('#pNotes').value = pNotes;
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
    // TODO: preFill not acknowledging form submission, remains on previous value. Remove from onMount function and bind to type value?
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
        case 'SD':
          applName.setAttribute('placeholder', 'SD-');
          if (autoFill.checked) {
            applName.value = 'SD-2';
            applName.setAttribute('type', 'tel');
            applName.oninput = (e) => {
              e.target.value = patternMatch({
                input: e.target.value,
                template: 'SD-xx-xxx',
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

      if (itmType === 'Type' || applName === '') {
        message.innerText = 'Please enter an item type and applicant name';
        dialog.showModal();
        return;
      }

      // create table row
      let row = document.createElement('tr');
      // create table cells
      let itmTypeCell = document.createElement('td');
      let deleteButton = document.createElement('button');
      let applNameCell = document.createElement('td');
      let disposalCell = document.createElement('td');
      let commentsCell = document.createElement('td');
      // add text to cells
      itmTypeCell.innerText = itmType;
      itmTypeCell.setAttribute('class', 'typeTD');
      itmTypeCell.prepend(deleteButton);
      deleteButton.setAttribute('type', 'button');
      deleteButton.setAttribute('class', 'btn-close');
      deleteButton.setAttribute('aria-label', 'delete item');
      applNameCell.textContent = applName;
      applNameCell.setAttribute('contenteditable', 'true');
      applNameCell.classList.add('applName');
      disposalCell.textContent = disposal;
      disposalCell.classList.add('disp');
      commentsCell.textContent = comments;
      commentsCell.classList.add('comments');

      // wrap each new item in a <tbody> that is draggable
      let tbody = document.createElement('tbody');
      tbody.setAttribute('draggable', 'true');
      tbody.setAttribute('class', 'draggable');
      tbody.append(row);

      // append new tbody to table
      table.append(tbody);

      // append cells to row
      row.appendChild(itmTypeCell);
      row.appendChild(applNameCell);
      row.appendChild(disposalCell);

      if (comments !== '') {
        // create new row for comments
        let commentsRow = document.createElement('tr');
        // create new cell for comments
        // let commentsCell = document.createElement('td')
        commentsCell.setAttribute('colspan', '3');
        commentsCell.setAttribute('contenteditable', 'true');
        commentsCell.classList.add('comments');
        // add text to cell
        commentsCell.textContent = comments;
        // append cell to row
        commentsRow.appendChild(commentsCell);
        // append row to tbody
        tbody.appendChild(commentsRow);
      }

      // console.log('new row added');
      // clear inputs
      document.querySelector('#addItem').reset();

      // // set disposal input to the first option
      // disposal.value = disposal.options[0].value;

      document
        .getElementById('applName')
        .setAttribute('placeholder', 'Application number or name');
      // removeDemo();
      storeForm();
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

    // Warn before leaving page
    // window.onbeforeunload = function (e) {
    //   return 'Unsaved form contents may be lost!';
    // };

    // set datepicker to today
    // today = document.querySelector('#date').valueAsDate = new Date();

    // expand pNotes textarea on to fit text
    document.querySelector('#pNotes').addEventListener('input', (e) => {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 2 + 'px';
    });

    document.querySelector('#pNotes').addEventListener('focusout', (e) => {
      storeForm();
    });

    // listen for focusout, if on .comments, storeForm()
    document.querySelector('#table').addEventListener('focusout', (e) => {
      if (e.target.classList.contains('comments')) {
        storeForm();
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
      document
        .querySelectorAll('td[contenteditable="true"]')
        .forEach((cell) => {
          if (cell.textContent === '') {
            cell.parentElement.remove();
          }
        });
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
    <div class="row">
      <div class="col">
        <label class="pHead" for="NPU">NPU:</label>
        <select class="pHead" name="NPU" id="NPU" bind:value={NPU}>
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
        <button
          aria-label="clear saved agenda items"
          id="clear"
          class="mb-1"
          type="reset">Clear Table</button
        >
        <br />
        <label class="pHead" for="chair">Chair:</label>
        <input class="pHead" type="text" name="chair" id="chair" />
        <br />
        <label class="pHead" for="date">Meeting Date:</label>
        <input class="pHead" type="date" name="date" id="date" required />
      </div>
      <div class="flex-row flex-wrap d-flex justify-content-end col noBreak">
        <div>
          <label class="pHead" for="location">Location:</label>
          <input class="pHead" type="text" name="location" id="location" />
        </div>
        <br />
        <div>
          <label class="pHead" for="planner">Planner:</label>
          <input class="pHead" type="text" name="planner" id="planner" />
        </div>
        <br />
        <div id="fillToggle">
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
        <option value="SD">SD</option>
        <option value="LOR">LOR</option>
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
      <button id="submit" value="submit" type="submit" class="mt-1"
        >Add to Table</button
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
      placeholder="Note any themes or discussions of concern to the NPU..."
      id="pNotes"
      cols="30"
      rows="3"
    ></textarea>
    <div class="d-flex justify-content-around">
      <!-- <button id='save' class='m-3 flex-grow-1'>Save</button> -->
      <button name="print" id="print" class="m-4 flex-grow-1"
        >Print to .PDF</button
      >
      <!-- <a href="/docuSign" id="docuSign" class="m-4 flex-grow-1 btn btn-primary"
        >DocuSign</a
      > -->
    </div>
    <div id="links">
      <h5>
        <a
          href="https://drive.google.com/file/d/1yFpIpTjEiqv4PuyYg1Jjc60yIQtx3J1h/view?usp=drive_link"
          target="_blank">Planner's Script</a
        >
      </h5>
      <h5>
        <a
          href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/updates"
          target="_blank">Updates Page</a
        >
        <button id="copyLink" on:click={copyLink}>Copy Link</button>
      </h5>
      <h5>
        <a
          href="https://coaplangis.maps.arcgis.com/apps/dashboards/1f96df45f3444796a0d73efbf18df677#&NPU={NPU}"
          target="_blank">Applications Table</a
        >
        <button id="copyApp" on:click={copyLink}>Copy Link</button>
      </h5>
    </div>
  </div>
</main>
<footer class="bin">
  <details id="instructions">
    <li style="list-style-type:none;">
      Send the saved .PDF to the NPU Chair, Daniel Vasquez and Kip Dunlap.
    </li>
    <summary>Instructions:</summary>
    <ul style="list-style-type:'✨'">
      <h5><b>NEW!</b></h5>
      <li>
        When changes are made, agenda items and Planner's Notes are saved to
        your device until cleared. To clear them, click 'Clear Items' at the top
        of the page. Stored items are editable just like new ones!
      </li>
      <li>
        When 'Autofill application numbers' is selected, applications with a
        defined naming convention will be formatted automatically (no need to
        enter dashes). This preference is also saved to your device.
      </li>
      <li>
        Instead of a pop-up telling you to enter a meeting date, the datepicker
        will present itself.
      </li>
      <li>
        Items are now draggable! Grab items by their type cell and drag them
        into any order you'd like.
      </li>
    </ul>
    <ul>
      <li>
        Fill page header info - this information is saved to your device for
        future use when you click print.
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
    <a href="mailto:kdunlap@atlantaga.gov">KDunlap@AtlantaGA.gov</a> | Version 1.6.9
  </p>
</footer>

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
  button,
  textarea {
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

  #clear {
    font-size: 1rem;
  }

  #conditions {
    grid-area: 2 / 1 / 3 / 4;
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

  #submit,
  #clear {
    grid-area: 3 / 3 / 4 / 4;
    border-radius: 5px;
  }

  @media only screen and (max-width: 768px) {
    #addItem {
      grid-template-columns: 1fr 1fr 1fr;
    }
    /* .text-end {
      text-align: inherit !important;
    } */
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
    #location {
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
    /* #clear {
    display: none !important;
  } */
    input,
    select {
      border: none;
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
</style>
