<script>
  // get NPU from query params
  import { page } from '$app/stores';
  let npu = $page.url.pathname.slice(-1);
  export let data;

  data = data.props.data.features;

  // console.log(data);

  // replace the month number with the month name
  data?.forEach((app) => {
    switch (app.attributes.MonthChoice) {
      case '01_JAN':
        app.attributes.MonthChoice = 'January';
        break;
      case '02_FEB':
        app.attributes.MonthChoice = 'February';
        break;
      case '03_MAR':
        app.attributes.MonthChoice = 'March';
        break;
      case '04_APR':
        app.attributes.MonthChoice = 'April';
        break;
      case '05_MAY':
        app.attributes.MonthChoice = 'May';
        break;
      case '06_JUN':
        app.attributes.MonthChoice = 'June';
        break;
      case '07_JUL':
        app.attributes.MonthChoice = 'July';
        break;
      case '08_AUG':
        app.attributes.MonthChoice = 'August';
        break;
      case '09_SEP':
        app.attributes.MonthChoice = 'September';
        break;
      case '10_OCT':
        app.attributes.MonthChoice = 'October';
        break;
      case '11_NOV':
        app.attributes.MonthChoice = 'November';
        break;
      case '12_DEC':
        app.attributes.MonthChoice = 'December';
        break;
      // default:
      //   app.attributes.MonthChoice = 'the past month';
    }
    switch (app.attributes.Apptype) {
      case '1_MOSE':
        app.attributes.Apptype = 'Mayors Office of Special Events';
        break;
      case '2_LRB':
        app.attributes.Apptype = 'License Review Board';
        break;
      case '3_BZA':
        app.attributes.Apptype = 'Board of Zoning Adjustments';
        break;
      case '4_ZRB':
        app.attributes.Apptype = 'Zoning Review Board';
        break;
    }
  });

  function copyLink() {
    let thisButton = this.parentElement.querySelector('a');
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
</script>

<!-- set page title -->
<svelte:head>
  <title>{npu} Planners Script</title>
</svelte:head>

<main>
  <h1>NPU-{npu} Planners Script</h1>
<h2><span style="color: red;">This version of the Planner's Report script is *EXPERIMENTAL*. Please refer to the emailed version if possible!</span></h2>
<h3>Planners: Please read the updates below and paste the links in the Zoom chat.</h3>
<h2>August 2024</h2>
<h2><b>First, the updates from NPU-{npu}'s previous voting items.</b></h2>
<ul>
  {#if data.length == 0}
    <br />
    <h2><i>No application updates to report.</i></h2>
  {/if}
  {#each data as app}
    <!-- {#if app.attributes.LC1 != 'HELD'} -->
      <li>
        <h2>
          In {app.attributes.MonthChoice}, NPU-{app.attributes.NPU} voted to <span data-outcome="{app.attributes.Reccomendation}">{app.attributes.Reccomendation}</span>

          <b> <a href={app.attributes.ApplicationLink} target="_blank">{app.attributes.NameNumber}</a>
            | {app.attributes.Address}</b>.

          {#if app.attributes.Apptype == 'Mayors Office of Special Events' && app.attributes.LC1 == 'Approved'}
            On {new Date(app.attributes.LC1_date).toLocaleDateString(
              'default',
              { day: 'numeric', month: 'long' },
            )}, the Mayor’s Office of Special Events <span data-outcome="Approved">issued a permit</span> for this
            application.
          {:else if app.attributes.Apptype == 'Mayors Office of Special Events' && app.attributes.LC1 != 'Approved'}
          Application status is: <span data-outcome={app.attributes.LC1}>{app.attributes.LC1}</span>
          {:else}
            At their {new Date(app.attributes.LC1_date).toLocaleDateString(
              'default',
              { day: 'numeric', month: 'long' },
            )} hearing, the
            {app.attributes.Apptype}
            <span data-outcome="{app.attributes.LC1}">{app.attributes.LC1}</span> this application.
          {/if}

          {#if app.attributes.LC2 != null}
            {#if app.attributes.Apptype == 'License Review Board'}
              <br />
              On {new Date(app.attributes.LC2_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )}, the License Review Board {app.attributes.LC2} this application.
            {:else}
              <br />
              On {new Date(app.attributes.LC2_date).toLocaleDateString(
                'default',
                { day: 'numeric', month: 'long' },
              )}, the City Council Zoning Committee {app.attributes.LC2} this application.
            {/if}
          {/if}

          {#if app.attributes.LC3 != null}
            <br />
            On {new Date(app.attributes.LC3_date).toLocaleDateString(
              'default',
              { day: 'numeric', month: 'long' },
            )}, City Council {app.attributes.LC3} this application.
          {/if}
        </h2>
      </li>
    <!-- {/if} -->
  {/each}
</ul>
<hr>
<h2><b>Next, the updates from the Planning Department:</b></h2>
<ol>
    <li>
    <p>We are in the final month of our “Love Thy Neighbor” phase of the NPUs’ 50th anniversary. This phase celebrated good neighbors and promoted neighborhood pride. For more info about this and other events, text <b>NPUATL</b> to <b>24251</b>.</p>
    </li>
    <li>
    <p>The Department of City Planning is continuing to update <b>Plan_A, Atlanta’s Comprehensive Development Plan</b>. We encourage you to attend the workshop in your NPU or an adjacent NPU and visit <a href="https://www.atlantaforall.com/" target="_blank"><b>AtlantaForAll.com</b></a> to stay involved in the planning process.</p>
    </li>
    <li>
    <p>As you know, the City is working to rewrite our zoning code. On May 20<sup>th</sup>, the Department of City Planning released the new <b>ATL 2.0 Zoning</b> Ordinance Module I “Discussion Draft” for public review. This module includes draft standards for Form &amp; Frontage Districts and Use Districts. You can review and comment on the draft at <u><a href="https://atlzoning.com/" target="_blank"><b>ATLZoning.com</b></a></u>.</p>
    </li>
    <li>
    <p><b>NPU University</b> courses coming up are:</p>

    <ul>
        <li><i>Elections Integrity Clinic</i></li>
        <li><i>Navigating Mortgage & Renter Challenges</i></li>
        <li><i>Code Enforcement Academy</i></li>
        <li><i>Procedures III</i></li>
        <li><i>Community Engagement Playbook</i></li>
        <li><i>Density Matters and Neighborhood Revitalization</i></li>
        <li><i>Intro to Geographic Information Systems (GIS)</i></li>
    </ul>   </li>
</ol>
<h3>Links to post:</h3>
  <br>
  <div style="display: flex;justify-content:space-around">
  <h5>
    <a
      href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/updates"
      target="_blank">Updates Page</a
    ><br>
    <button id="copyLink" on:click={copyLink}>Copy Link</button>
  </h5>
  <h5>
    <a
      href="https://coaplangis.maps.arcgis.com/apps/dashboards/a7ab4e0bb5034b219c63a160a7538708#&NPU={npu}"
      target="_blank">Applications Table</a
    ><br>
    <button id="copyApp" on:click={copyLink}>Copy Link</button>
  </h5></div>
</main>

<style>
  button {
    border-radius: 5px;
  }
  main {
    text-align: left;
    margin: 1rem 6rem;
    max-width: 1200px;
    font-family: 'GT-Eesti-Regular';
  }
  h2 {
    font-size: 1em;
  }

  h5 {
    text-align: center;
  }

  li {
    margin: 1.5em;
  }

  span[data-outcome='support'], span[data-outcome='Approved'] {
    color: rgb(0, 169, 0);
  }

  span[data-outcome='nonsupport'], span[data-outcome='Denied'] {
    color: rgb(169, 0, 0);
  }

  span[data-outcome='defer'],span[data-outcome='HELD'] {
    color: rgb(169, 132, 0);
  }

  span[data-outcome='WITHDRAWN'] {
    color: rgb(148, 0, 188);
  }

  /* Select ul elements inside another ul */
  ol ul li, ol ul p {
    margin-block: 0;
  }

  /* .planA {
    color: #f36810;
  } */
</style>
