<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
  ></script>
  <script src="./npungl3r.js" async defer></script>
</svelte:head>

<header>
  <h1 class="display-4"><strong><span id="DCP">NPU</span>NGLR2</strong></h1>
</header>

<body>
  <div class="container">
    <form class="calendar col-12" onsubmit="return false">
      <div class="form-group">
        <label for="NPU">NPU Designation?</label>
        <select name="NPU" class="form-control" id="NPU" list="NPUs">
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
          <option value="U">U</option>
          <option value="V">V</option>
          <option value="W">W</option>
          <option value="X">X</option>
          <option value="Y">Y</option>
          <option value="Z">Z</option>
        </select>
        <label for="date">Date:</label>
        <input type="date" class="form-control" id="date" name="date" />
        <!-- </div>
        <div class="form-group"> -->
        <legend>Document type?</legend>
        <div id="legend" class="d-flex flex-wrap flex-row">
          <span class="mx-2">
            <input
              type="checkbox"
              name="Draft_to_Chair"
              value="draft"
              id="draft"
            />
            <label for="draft">Draft to Chair</label>
          </span>
          <span class="mx-2">
            <input
              type="checkbox"
              name="Final_to_Chair"
              value="final"
              id="final"
            />
            <label for="final">Final to Chair</label>
          </span>
          <span class="mx-2">
            <input type="checkbox" name="distro" value="distro" id="distro" />
            <label for="distro">Distribution List</label>
          </span>
          <span class="mx-2">
            <input
              type="checkbox"
              name="special"
              value="special"
              id="special"
            />
            <label for="special">Special</label>
          </span>
          <span class="mx-2">
            <input type="checkbox" name="access" value="access" id="access" />
            <label for="access">Meeting Access</label>
          </span>
          <span class="mx-2">
            <input
              type="checkbox"
              name="approved"
              value="approved"
              id="approved"
            />
            <label for="approved">Presentation Approved</label>
          </span>
          <br /><br />
          <span class="mx-2">
            <input
              type="checkbox"
              name="nextdoor"
              value="nextdoor"
              id="nextdoor"
            />
            <label for="nextdoor">Nextdoor Post</label>
          </span>
          <span class="mx-2">
            <input
              type="checkbox"
              name="ZoomCreds"
              value="ZoomCreds"
              id="ZoomCreds"
            />
            <label for="ZoomCreds">Zoom Credentials</label>
          </span>
          <span class="mx-2">
            <input
              type="checkbox"
              name="attendance"
              value="attendance"
              id="attendance"
            />
            <label for="attendance">Attendance</label>
          </span>
        </div>
      </div>
      <button id="submit" class="btn btn-primary">Submit</button>
      <button onclick="clearForm()" id="clear" class="btn btn-danger ml-2"
        >Clear</button
      >
      <!-- <button id="save" class="btn btn-success ml-2">Save</button> -->
    </form>
  </div>

  <div class="container" id="textZone"></div>
  <br />
  <div class="container">
    <div class="calendar d-flex">
      <table class="col-12 table-bordered">
        <tr>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
          <th>E</th>
          <th>F</th>
          <th>G</th>
          <th>H</th>
          <th>I</th>
          <th>J</th>
          <th>K</th>
          <th>L</th>
          <th>M</th>
          <th>N</th>
          <th>O</th>
          <th>P</th>
          <th>Q</th>
          <th>R</th>
          <th>S</th>
          <th>T</th>
          <th>V</th>
          <th>W</th>
          <th>X</th>
          <th>Y</th>
          <th>Z</th>
        </tr>
        <tr>
          <td>1</td>
          <td>8</td>
          <td>4</td>
          <td>2</td>
          <td>*</td>
          <td>6</td>
          <td>1</td>
          <td>1</td>
          <td>3</td>
          <td>3</td>
          <td>5</td>
          <td>1</td>
          <td>5</td>
          <td>2</td>
          <td>5</td>
          <td>5</td>
          <td>3</td>
          <td>1</td>
          <td>7</td>
          <td>2</td>
          <td>4</td>
          <td>4</td>
          <td>3</td>
          <td>5</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  </div>

  <br />
  <!-- gCal iFrame -->
  <div class="container">
    <div class="calendar container-fluid col-12">
      <div class="col-5">Month</div>
      <iframe
        class="container"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&showTitle=1&showNav=1&showDate=1&showTabs=0&showCalendars=0&title=City%20of%20Atlanta%20NPU%20Meetings&showPrint=0&src=bzZtY3RoaHBoanU0OGlrc2hlOTVudWptdThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23009688"
        style="border:solid 2px #777"
        height="600"
        frameborder="0"
        scrolling="no"
        title="City of Atlanta NPU Meetings Calendar"
      >
      </iframe>
    </div>
  </div>

  <!-- <script
    defer
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
    crossorigin="anonymous"
  ></script> -->
</body>

<style>
  body {
    background-color: rgb(6, 80, 80);
    /* font-family: 'GT-Eesti-Regular', sans-serif; */
    /* font-weight: 100; */
    margin-block: 4vh;
  }

  header {
    color: rgb(255, 243, 162);
    text-align: center;
    background-color: rgb(6, 80, 80);
  }

  /* h2 {
    text-align: center;
    color: black;
  }

  pre {
    font-family: Arial, Helvetica, sans-serif;
    font-size: large;
  }

  p {
    overflow-wrap: break-word;
    font-size: large;
  } */

  /* p:hover {
  cursor: grab;
} */

  :global(.calendar) {
    background-color: whitesmoke;
    padding: 10px;
    margin: 5px;
    border-radius: 20px;
    box-shadow: 5px 10px #888888;
  }

  #DCP {
    font-weight: bolder;
    text-shadow: black 5px 5px;
  }

  #date,
  #NPU {
    width: min-content;
    display: inline;
  }

  @media screen and (max-width: 600px) {
    #date,
    #NPU {
      display: block;
    }
    tr {
      display: block;
      float: left;
    }

    th,
    td {
      display: block;
    }
  }
</style>
